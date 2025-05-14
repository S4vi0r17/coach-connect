import {
  IsString,
  IsEmail,
  IsOptional,
  IsNumber,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum ClientStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

export class CreateClientDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  @IsOptional()
  address?: string;

  @Type(() => Number)
  @IsNumber()
  age: number;

  @IsString()
  gender: string;

  @IsString()
  @IsOptional()
  healthNotes?: string;

  @Type(() => Date)
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  // @IsEnum(ClientStatus)
  status?: 'active' | 'inactive' | 'suspended';
}
