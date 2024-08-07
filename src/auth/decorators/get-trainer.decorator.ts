import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const GetTrainer = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const trainer = request.user;

    if (!trainer) {
      throw new InternalServerErrorException(
        'Trainer not found (request.user)',
      );
    }

    return data ? trainer[data] : trainer;
  },
);
