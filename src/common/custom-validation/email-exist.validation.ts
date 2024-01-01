import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { EmailExistException } from '../../exceptions/EmailExist.exception';
import { User } from '../../users/entities/user.entity';
import { Repository } from 'typeorm';

@ValidatorConstraint({ name: 'email', async: true })
@Injectable()
export class EmailExistsValidation implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async validate(value: string): Promise<boolean> {
    return this.usersRepository.findOne({ where: { email: value } }).then((user) => {
      if (user && Object.keys(user).length > 0) {
        throw new EmailExistException();
      } else {
        return true;
      }
    });
  }
}
