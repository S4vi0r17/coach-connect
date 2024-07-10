import { Injectable } from '@nestjs/common';

@Injectable()
export class HelpersService {
  idGenerator() {
    return Math.random().toString(32).substring(2) + Date.now().toString(32);
  }
}
