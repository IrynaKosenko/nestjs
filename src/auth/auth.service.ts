import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { compare } from 'bcrypt';
import { RegistrationUserDto } from './dto/registration-user.dto';
import { ValidationUserDto } from './dto/validation-user.dto';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityNotFoundException } from '../exceptions/NotFound.exception';
import { Payload } from '../common/constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async registerUser(userData: RegistrationUserDto) {
    const { passwordRepeated, ...restUser } = userData;
    const user = await this.usersService.create(restUser);

    if (!user)
      throw new BadRequestException(
        `A user with ${JSON.stringify(userData)} cannot be registered.`,
      );
    const { password, ...resultUser } = user;
    return resultUser;
  }

  async validateUser(email: string, pass: string): Promise<User> {
    const userDB = await this.usersRepository.findOne({ where: { email: email } });

    if (!userDB) throw new EntityNotFoundException('Such user');

    await this.verifyPassword(pass, userDB.password);

    return userDB;
  }

  async login(validationUserDto: ValidationUserDto) {
    const userDB = await this.usersRepository.findOneOrFail({
      where: { email: validationUserDto.email },
    });
    const { password, ...restUser } = userDB;

    const payload: Payload = { sub: validationUserDto.email, role: restUser.role };

    return {
      email: validationUserDto.email,
      access_token: this.jwtService.sign(payload),
    };
  }

  private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching = await compare(plainTextPassword, hashedPassword);
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Wrong credentials provided.');
    }
  }
}
