import { Module } from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { TrainerController } from './trainer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainerSchema } from './entities/trainer.entity';
import { HelpersModule } from 'src/helpers/helpers.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [TrainerController],
  providers: [TrainerService],
  imports: [
    MongooseModule.forFeature([{ name: 'Trainer', schema: TrainerSchema }]),
    HelpersModule,
    AuthModule,
  ],
  exports: [MongooseModule],
})
export class TrainerModule {}
