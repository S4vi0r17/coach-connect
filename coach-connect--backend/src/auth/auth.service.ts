import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterCoachDto, LoginCoachDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Coach, CoachDocument } from './entities/coach.entity';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

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

  private generateUniqueToken() {
    return Date.now().toString(32) + Math.random().toString(36).slice(2);
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
    throw new InternalServerErrorException(
      `Can't create Coach - Check server logs`,
    );
  }
}
