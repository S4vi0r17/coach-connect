import { PartialType } from '@nestjs/mapped-types';
import { RegisterCoachDto } from './register-coach.dto';

export class UpdateCoachDto extends PartialType(RegisterCoachDto) {}
