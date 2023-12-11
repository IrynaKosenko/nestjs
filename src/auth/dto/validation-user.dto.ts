import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { ValidEmailValidation } from 'src/common/custom-validation/email-valid.validation';

export class ValidationUserDto {
  @IsNotEmpty()
  @Validate(ValidEmailValidation)
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
