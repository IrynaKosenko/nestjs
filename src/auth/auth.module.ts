import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local-strategy';
import { EmailExistsValidation } from 'src/common/custom-validation/email-exist.validation';
import { isPasswordMatchingValidation } from 'src/common/custom-validation/password-matcing';
import { ValidEmailValidation } from 'src/common/custom-validation/email-valid.validation';
import { RoleGuard } from './guards/role.guard';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    EmailExistsValidation,
    isPasswordMatchingValidation,
    ValidEmailValidation,
    UsersService,
    RoleGuard,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
