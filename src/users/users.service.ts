import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundException } from '../exceptions/NotFound.exception';
import { genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email: email } });
    if (user) {
      return user;
    }
    throw new EntityNotFoundException('User');
  }

  async create(userData: CreateUserDto) {
    const hashedPassword = this.hashPassword(userData.password);

    const { password, ...paramsUser } = userData;

    const createdUser = this.usersRepository.create({
      ...paramsUser,
      password: hashedPassword,
    });
    await this.usersRepository.save(createdUser);

    return createdUser;
  }

  async getByUuid(uuid: string): Promise<User> {
    const userDB = await this.usersRepository.findOne({ where: { id: uuid } });
    if (!userDB) throw new EntityNotFoundException('Such user');
    return userDB;
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find();
    return users;
  }

  async remove(uuid: string) {
    const userDB = await this.usersRepository.findOne({ where: { id: uuid } });
    if (!userDB) throw new EntityNotFoundException('Such user');

    return await this.usersRepository.remove(userDB);
  }

  private hashPassword(plainTextPassword: string) {
    const salt = genSaltSync(10);
    return hashSync(plainTextPassword, salt);
  }
}
