import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coach, CoachDocument } from '../auth/entities/coach.entity';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class CoachService {
  constructor(
    @InjectModel(Coach.name)
    private readonly coachModel: Model<CoachDocument>,
    private readonly authService: AuthService,
  ) {}

  async profile(coachId: string) {
    const coach = await this.coachModel.findById(coachId).select('-password');

    if (!coach) {
      throw new BadRequestException('Coach not found');
    }

    return coach;
  }
}
