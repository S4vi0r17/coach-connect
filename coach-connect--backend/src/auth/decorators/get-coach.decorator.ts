import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

// Extend Express Request interface to include 'coach'
declare module 'express' {
  interface Request {
    coach?: JwtPayload;
  }
}

export const GetCoach = createParamDecorator(
  (data: keyof JwtPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const coach = request.coach;

    if (!coach) {
      throw new InternalServerErrorException('Coach not found in request');
    }

    return data ? coach[data] : coach.coachId;
  },
);
