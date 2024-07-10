import { Module } from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { TrainerController } from './trainer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainerSchema } from './entities/trainer.entity';
import { HelpersModule } from 'src/helpers/helpers.module';

@Module({
  controllers: [TrainerController],
  providers: [TrainerService],
  imports: [
    MongooseModule.forFeature([{ name: 'Trainer', schema: TrainerSchema }]),
    HelpersModule,
  ],
  exports: [],
})
export class TrainerModule {}
