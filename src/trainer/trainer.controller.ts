import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetTrainer } from 'src/auth/decorators/get-trainer.decorator';
import { Trainer } from './entities/trainer.entity';
import { profile } from 'console';

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

  @Get()
  findAll() {
    return this.trainerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trainerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrainerDto: UpdateTrainerDto) {
    return this.trainerService.update(+id, updateTrainerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainerService.remove(+id);
  }
}
