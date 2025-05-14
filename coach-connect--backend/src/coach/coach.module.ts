import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Coach, CoachSchema } from './entities/coach.entity';
import { CoachController } from './coach.controller';
import { CoachService } from './coach.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Coach.name,
        useFactory: () => {
          const schema = CoachSchema;
          schema.pre('save', async function (next) {
            if (this.isModified('password')) {
              const salt = await bcrypt.genSalt(10);
              this.password = await bcrypt.hash(this.password, salt);
            }
            next();
          });

          schema.method('comparePassword', async function (password: string) {
            return await bcrypt.compare(password, this.password);
          });

          return schema;
        },
      },
    ]),
  ],
  controllers: [CoachController],
  providers: [CoachService],
})
export class CoachModule {}
