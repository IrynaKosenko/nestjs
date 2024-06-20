import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailExistsValidation } from '../common/custom-validation/email-exist.validation';
import { PasswordMatchingValidation } from '../common/custom-validation/password-matcing';
import { ValidEmailValidation } from '../common/custom-validation/email-valid.validation';
import { RoleGuard } from '../auth/guards/role.guard';
import JwtAuthGuard from '../auth/guards/jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [],
  providers: [
    UsersService,
    EmailExistsValidation,
    ValidEmailValidation,
    PasswordMatchingValidation,
    RoleGuard,
    JwtAuthGuard,
  ],
  exports: [UsersService],
})
export class UsersModule {}
