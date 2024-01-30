import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { ValidEmailValidation } from '../../common/custom-validation/email-valid.validation';

export class ValidationUserDto {
  @IsNotEmpty()
  @Validate(ValidEmailValidation)
  @ApiProperty({example:'exampleName@mail.com'})
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({example:'examplePassword'})
  password: string;
}
