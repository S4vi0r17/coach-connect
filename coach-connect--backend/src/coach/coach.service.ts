import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coach, CoachDocument } from './entities/coach.entity';
import { RegisterCoachDto, LoginCoachDto } from './dto';

@Injectable()
export class CoachService {
  constructor(
    @InjectModel(Coach.name)
    private readonly coachModel: Model<CoachDocument>,
  ) {}

  async registerCoach(registerCoachDto: RegisterCoachDto) {
    registerCoachDto.emailConfirmationToken = this.generateUniqueToken();

    try {
      const newCoach = await this.coachModel.create(registerCoachDto);
      return newCoach;
    } catch (error) {
      this.handleException(error);
      console.log(error);
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
      message: 'Login successful',
      coach,
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
