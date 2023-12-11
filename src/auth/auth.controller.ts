import { Body, Controller, Post, UseInterceptors, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { ValidationUserDto } from './dto/validation-user.dto';
import { RegistrationUserDto } from './dto/registration-user.dto';
import { EntityInterceptors } from 'src/common/interceptors';
import { LocalAuthGuard } from './guards/local-auth.guards';
import { Public } from './decorators/public.decorator';

@Public()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() validationUserDto: ValidationUserDto) {
    return await this.authService.login(validationUserDto);
  }

  @Post('register')
  @UseInterceptors(EntityInterceptors)
  async register(@Body() registrationUserDto: RegistrationUserDto) {
    return this.authService.registerUser(registrationUserDto);
  }
}
