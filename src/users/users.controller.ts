import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { EntitiesInterceptors, EntityInterceptors } from '../common/interceptors';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/constants';
import { RoleGuard } from '../auth/guards/role.guard';

@UseGuards(RoleGuard)
@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(Role.Admin)
  @UseInterceptors(EntityInterceptors)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('/uuid/:id')
  @UseInterceptors(EntityInterceptors)
  findOneById(@Param('uuid') uuid: string) {
    return this.usersService.getByUuid(uuid);
  }

  @Get('/email/:email')
  @UseInterceptors(EntityInterceptors)
  findOne(@Param('email') email: string) {
    return this.usersService.getByEmail(email);
  }

  @Get()
  @UseInterceptors(EntitiesInterceptors)
  findAll() {
    return this.usersService.findAll();
  }

  @Roles(Role.Admin)
  @Delete('/uuid/:uuid')
  @UseInterceptors(EntityInterceptors)
  remove(@Param('uuid') uuid: string) {
    return this.usersService.remove(uuid);
  }
}
