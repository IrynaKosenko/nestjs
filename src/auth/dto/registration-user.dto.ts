import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, Validate, MinLength } from 'class-validator';
import { Role } from 'src/common/constants';
import { EmailExistsValidation } from 'src/common/custom-validation/email-exist.validation';
import { ValidEmailValidation } from 'src/common/custom-validation/email-valid.validation';
import { isPasswordMatchingValidation } from 'src/common/custom-validation/password-matcing';

export class RegistrationUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @Validate(ValidEmailValidation)
  @Validate(EmailExistsValidation)
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MinLength(8)
  @Validate(isPasswordMatchingValidation)
  passwordRepeated: string;

  @IsEnum(Role)
  @ApiProperty({ enum: Role, default: Role.User })
  role: Role;
}
