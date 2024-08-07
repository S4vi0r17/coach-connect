import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetTrainer } from 'src/auth/decorators/get-trainer.decorator';
import { Trainer } from './entities/trainer.entity';

@Controller('trainer')
export class TrainerController {
  constructor(private readonly trainerService: TrainerService) {}

  @Post()
  create(@Body() createTrainerDto: CreateTrainerDto) {
    return this.trainerService.create(createTrainerDto);
  }

  @Get('confirm/:token')
  confirm(@Param('token') token: string) {
    return this.trainerService.confirm(token);
  }

  @Post('login')
  login(@Body() createTrainerDto: CreateTrainerDto) {
    return this.trainerService.login(createTrainerDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  profile(@GetTrainer() trainer: Trainer) {
    return trainer;
  }

  @Post('forgot')
  forgot(@Body() body: { email: string }) {
    return this.trainerService.forgot(body.email);
  }

  @Get('forgot/:token')
  getForgot(@Param('token') token: string) {
    return this.trainerService.checkToken(token);
  }

  @Post('forgot/:token')
  reset(@Param('token') token: string, @Body() body: { password: string }) {
    return this.trainerService.newPassword(token, body.password);
  }

  // Testing private routes
  // @Get('private')
  // @UseGuards(AuthGuard('jwt'))
  // privateRoute(@Req() req: Express.Request) {
  //   console.log(req.user);
  //   return 'This is a private route';
  // }

  // @Get('private')
  // @UseGuards(AuthGuard('jwt'))
  // privateRoute(@GetTrainer() trainer: Trainer) {
  //   return trainer;
  // }
}
