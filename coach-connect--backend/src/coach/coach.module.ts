import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { CoachController } from './coach.controller';
import { CoachService } from './coach.service';

@Module({
  imports: [AuthModule],
  controllers: [CoachController],
  providers: [CoachService],
})
export class CoachModule {}
