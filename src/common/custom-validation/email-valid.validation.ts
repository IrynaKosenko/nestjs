import { BadRequestException, Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'email', async: true })
@Injectable()
export class ValidEmailValidation implements ValidatorConstraintInterface {
  async validate(value: string): Promise<boolean> {
    if (!this.isValidEmail(value)) {
      throw new BadRequestException('Invalid email address');
    }
    return true;
  }

  private isValidEmail(value: string) {
    return value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g);
  }
}
