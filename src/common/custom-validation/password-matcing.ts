import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { RegistrationUserDto } from 'src/auth/dto/registration-user.dto';
import { PasswordNotMatchException } from 'src/exceptions/PasswordsNotMatch.exception';

@ValidatorConstraint({ name: 'passwordRepeated', async: true })
@Injectable()
export class isPasswordMatchingValidation implements ValidatorConstraintInterface {
  async validate(passwordRepeated: string, args: ValidationArguments): Promise<boolean> {
    const object = args.object as RegistrationUserDto;
    if (object.password !== passwordRepeated) {
      throw new PasswordNotMatchException();
    }
    return true;
  }
}
