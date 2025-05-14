import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CoachService } from './coach.service';
import { RegisterCoachDto, LoginCoachDto } from '../auth/dto';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { GetCoach } from 'src/auth/decorators/get-coach.decorator';

@Controller('coach')
export class CoachController {
  constructor(
    private readonly coachService: CoachService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  registerCoach(@Body() registerCoachDto: RegisterCoachDto) {
    return this.authService.registerCoach(registerCoachDto);
  }

  @Get('confirm-email/:token')
  confirmEmail(@Param('token') token: string) {
    return this.authService.confirmEmail(token);
  }

  @Post('login')
  login(@Body() loginCoachDto: LoginCoachDto) {
    return this.authService.loginCoach(loginCoachDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@GetCoach('coachId') coachId: string) {
    return {
      id: coachId,
    };
  }
}
