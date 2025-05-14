import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CoachService } from './coach.service';
import { RegisterCoachDto, LoginCoachDto } from './dto';

@Controller('coach')
export class CoachController {
  constructor(private readonly coachService: CoachService) {}

  @Post('register')
  registerCoach(@Body() registerCoachDto: RegisterCoachDto) {
    return this.coachService.registerCoach(registerCoachDto);
  }

  @Get('confirm-email/:token')
  confirmEmail(@Param('token') token: string) {
    return this.coachService.confirmEmail(token);
  }

  @Post('login')
  login(@Body() loginCoachDto: LoginCoachDto) {
    return this.coachService.loginCoach(loginCoachDto);
  }
}
