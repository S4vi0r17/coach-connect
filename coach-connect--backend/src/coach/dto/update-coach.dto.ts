import { PartialType } from '@nestjs/mapped-types';
import { RegisterCoachDto } from '../../auth/dto/register-coach.dto';

export class UpdateCoachDto extends PartialType(RegisterCoachDto) {}
