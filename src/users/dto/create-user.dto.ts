import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, MinLength, Validate } from 'class-validator';
import { Role } from 'src/common/constants';
import { EmailExistsValidation } from 'src/common/custom-validation/email-exist.validation';
import { ValidEmailValidation } from 'src/common/custom-validation/email-valid.validation';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  username: string;

  @Validate(ValidEmailValidation)
  @Validate(EmailExistsValidation)
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MinLength(8)
  password: string;

  @IsEnum(Role)
  @ApiProperty({ enum: Role, default: Role.User })
  role: Role;
}
