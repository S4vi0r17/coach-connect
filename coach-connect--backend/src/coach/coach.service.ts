import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coach, CoachDocument } from '../auth/entities/coach.entity';
import { AuthService } from '../auth/auth.service';
import { UpdatePasswordDto } from './dto/update-password.dto';

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

  async updateProfile(coachId: string, updateData: Partial<Coach>) {
    const coach = await this.coachModel
      .findByIdAndUpdate(coachId, updateData, {
        new: true,
        runValidators: true,
      })
      .select('-password');

    if (!coach) {
      throw new BadRequestException('Coach not found');
    }

    return coach;
  }

  async updatePassword(coachId: string, updatePasswordDto: UpdatePasswordDto) {
    const { currentPassword, newPassword } = updatePasswordDto;

    const coach = await this.coachModel.findById(coachId);

    if (!coach) {
      throw new BadRequestException('Coach not found');
    }

    const currentPasswordMatch = await coach.comparePassword(currentPassword);

    if (!currentPasswordMatch) {
      throw new BadRequestException('Current password is incorrect');
    }

    coach.password = newPassword;
    coach.markModified('password');
    await coach.save();

    return {
      message: 'Password updated successfully',
      coach: await this.coachModel.findById(coachId).select('-password'),
    };
  }
}
