import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt-strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainerModule } from 'src/trainer/trainer.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    ConfigModule,
    MongooseModule,
    forwardRef(() => TrainerModule),
    // Import the PassportModule
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // Import the JwtModule
    // JwtModule.register({
    //   secret: 'secretKey',
    //   signOptions: {
    //     expiresIn: '1d',
    //   },
    // }),

    // JwtModule.registerAsync({
    //   imports: [],
    //   inject: [],
    //   useFactory: async () => ({
    //     secret: 'secretKey',
    //     signOptions: {
    //       expiresIn: '1d',
    //     },
    //   }),
    // }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: '1d',
        },
      }),
    }),
  ],
  exports: [JwtStrategy, AuthService],
})
export class AuthModule {}
