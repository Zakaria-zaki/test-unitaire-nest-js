import {
  IsDate,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  Max,
  MaxDate,
  MaxLength,
  Min,
  MinDate,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly firstName: string;

  @IsNotEmpty()
  readonly lastName: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(40)
  readonly password: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @MaxDate(require('moment')().subtract(13, 'y').toDate())
  readonly dateOfBirth: string;
}
