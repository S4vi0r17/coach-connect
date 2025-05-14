import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Coach, CoachSchema } from './entities/coach.entity';
import { JwtModule } from '@nestjs/jwt';

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

    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET as string,
        signOptions: { expiresIn: '30d' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, MongooseModule, JwtModule],
})
export class AuthModule {}
