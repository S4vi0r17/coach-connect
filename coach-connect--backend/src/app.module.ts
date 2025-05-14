import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CoachModule } from './coach/coach.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    MongooseModule.forRoot(process.env.MONGO_URI as string),

    CoachModule,

    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
