import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, Validate, MinLength } from 'class-validator';
import { Role } from '../../common/constants';
import { EmailExistsValidation } from '../../common/custom-validation/email-exist.validation';
import { ValidEmailValidation } from '../../common/custom-validation/email-valid.validation';
import { isPasswordMatchingValidation } from '../../common/custom-validation/password-matcing';

export class RegistrationUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({example:'exampleName'})
  username: string;

  @IsNotEmpty()
  @Validate(ValidEmailValidation)
  @Validate(EmailExistsValidation)
  @ApiProperty({example:'exampleName@mail.com'})
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({example:'examplePassword'})
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({example:'examplePassword'})
  @MinLength(8)
  @Validate(isPasswordMatchingValidation)
  passwordRepeated: string;

  @IsEnum(Role)
  @ApiProperty({ enum: Role, default: Role.User })
  role: Role;
}
