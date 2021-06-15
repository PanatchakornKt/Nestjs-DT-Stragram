import {
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsString,
  Matches,
} from 'class-validator';

export class UsersCredentailDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, {
    message: 'password is not strong enough.',
  })
  password: string;
}
