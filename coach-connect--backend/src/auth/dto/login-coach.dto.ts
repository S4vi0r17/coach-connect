import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class LoginCoachDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Password must contain at least 8 characters, including uppercase, lowercase, number and special character',
    },
  )
  password: string;
}
