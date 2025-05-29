import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CoachService } from './coach.service';
import { RegisterCoachDto, LoginCoachDto } from '../auth/dto';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { GetCoach } from 'src/auth/decorators/get-coach.decorator';
import { NewPasswordDto } from 'src/auth/dto/new-password.dto';

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

  // Validate email and generate a unique token for password reset
  @Post('forgot-password')
  forgotPassword(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  // Check if the token is valid
  @Get('reset-password/:token')
  checkResetToken(@Param('token') token: string) {
    return this.authService.checkResetToken(token);
  }

  // Reset the password
  @Post('reset-password/:token')
  resetPassword(
    @Param('token') token: string,
    @Body() newPassword: NewPasswordDto,
  ) {
    return this.authService.resetPassword(token, newPassword.newPassword);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@GetCoach('coachId') coachId: string) {
    return this.coachService.profile(coachId);
  }
}
