import { IsString, MinLength } from 'class-validator';

export class CreateTrainerDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(5)
  email: string;

  password?: string;

  phone?: string;

  token?: string;

  confirmed?: boolean;
}
