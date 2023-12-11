import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailExistsValidation } from 'src/common/custom-validation/email-exist.validation';
import { isPasswordMatchingValidation } from 'src/common/custom-validation/password-matcing';
import { ValidEmailValidation } from 'src/common/custom-validation/email-valid.validation';
import { RoleGuard } from 'src/auth/guards/role.guard';
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    EmailExistsValidation,
    ValidEmailValidation,
    isPasswordMatchingValidation,
    RoleGuard,
    JwtAuthGuard,
  ],
  exports: [UsersService],
})
export class UsersModule {}
