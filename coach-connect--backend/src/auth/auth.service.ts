import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterCoachDto, LoginCoachDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Coach, CoachDocument } from './entities/coach.entity';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Coach.name)
    private readonly coachModel: Model<CoachDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string): Promise<{ access_token: string }> {
    const foundCoach = await this.coachModel.findOne({ email });

    if (!foundCoach) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!foundCoach.isEmailConfirmed) {
      throw new BadRequestException('Email not confirmed');
    }

    const payload = { coachId: foundCoach._id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async registerCoach(registerCoachDto: RegisterCoachDto) {
    registerCoachDto.emailConfirmationToken = this.generateUniqueToken();

    try {
      const newCoach = await this.coachModel.create(registerCoachDto);

      // send email confirmation
      await this.createEmailTransport({
        email: newCoach.email,
        fullName: `${newCoach.firstName} ${newCoach.lastName}`,
        token: newCoach.emailConfirmationToken,
      });

      return newCoach;
    } catch (error) {
      this.handleException(error);
    }
  }

  async confirmEmail(token: string) {
    const coach = await this.coachModel.findOne({
      emailConfirmationToken: token,
    });

    if (!coach) {
      throw new BadRequestException('Invalid or expired token');
    }

    coach.isEmailConfirmed = true;
    coach.emailConfirmationToken = undefined;

    await coach.save();
    return { message: 'Email confirmed successfully' };
  }

  async loginCoach(loginCoachDto: LoginCoachDto) {
    const { email, password } = loginCoachDto;

    const coach = await this.coachModel.findOne({ email });

    if (!coach) {
      throw new BadRequestException('Invalid email');
    }

    if (!coach.isEmailConfirmed) {
      throw new BadRequestException('Email not confirmed');
    }

    const isPasswordValid = await coach.comparePassword(password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    return {
      fullName: `${coach.firstName} ${coach.lastName}`,
      email: coach.email,
      ...(await this.signIn(email)),
    };
  }

  async forgotPassword(email: string) {
    const coach = await this.coachModel.findOne({ email });

    if (!coach) {
      throw new BadRequestException(`Coach with email ${email} not found`);
    }

    const resetToken = this.generateUniqueToken();
    coach.emailConfirmationToken = resetToken;
    await coach.save();

    // Here you would send the reset token to the user's email
    return { message: 'Password reset token sent to email' };
  }

  async checkResetToken(token: string) {
    const coach = await this.coachModel.findOne({
      emailConfirmationToken: token,
    });

    if (!coach) {
      throw new BadRequestException('Invalid or expired token');
    }

    return { message: 'Token is valid' };
  }

  async resetPassword(token: string, newPassword: string) {
    const coach = await this.coachModel.findOne({
      emailConfirmationToken: token,
    });

    if (!coach) {
      throw new BadRequestException('Invalid or expired token');
    }

    coach.password = newPassword;
    coach.emailConfirmationToken = undefined;

    await coach.save();
    return { message: 'Password reset successfully' };
  }

  private generateUniqueToken() {
    return Date.now().toString(32) + Math.random().toString(36).slice(2);
  }

  private async createEmailTransport({
    email,
    fullName,
    token,
  }: {
    email: string;
    fullName: string;
    token: string | undefined;
  }) {
    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Confirma tu correo electrónico',
      html: `
      <div style="font-family: Arial, sans-serif; color: #222;">
        <h2>Hola ${fullName},</h2>
        <p>¡Gracias por registrarte en Coach Connect!</p>
        <p>Por favor, confirma tu correo electrónico haciendo clic en el siguiente botón:</p>
        <p>
        <a href="${process.env.FRONTEND_URL}/confirm-email/${token}" 
           style="display:inline-block;padding:10px 20px;background:#007bff;color:#fff;text-decoration:none;border-radius:4px;">
          Confirmar correo
        </a>
        </p>
        <p>Si no creaste una cuenta, puedes ignorar este correo.</p>
        <hr>
        <small>Este mensaje fue enviado automáticamente, por favor no respondas.</small>
      </div>
      `,
    };

    try {
      await transport.sendMail(mailOptions);
      Logger.log(`Email sent to ${email}`, 'AuthService');
    } catch (error) {
      Logger.error(`Failed to send email: ${error}`, 'AuthService');
    }
  }

  private hasCode(
    error: unknown,
  ): error is { code: number; keyValue?: { [key: string]: any } } {
    return typeof error === 'object' && error !== null && 'code' in error;
  }

  private handleException(error: unknown) {
    if (this.hasCode(error) && error.code === 11000) {
      throw new BadRequestException(
        `Coach with email ${error.keyValue?.email ?? 'unknown'} already exists`,
      );
    }

    Logger.error(
      error,
      'AuthService',
      'handleException',
      'Error while creating coach',
    );

    throw new InternalServerErrorException(
      `Can't create Coach - Check server logs`,
    );
  }
}
