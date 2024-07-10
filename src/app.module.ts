import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainerModule } from './trainer/trainer.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB_URI, {
      dbName: process.env.MONGO_DB_NAME,
    }),
    TrainerModule,
  ],
})
export class AppModule {}
