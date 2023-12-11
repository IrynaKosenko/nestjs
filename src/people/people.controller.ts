import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  DefaultValuePipe,
  Query,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { PeopleService } from './people.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Person } from './entities/person.entity';
import { EntitiesInterceptors, EntityInterceptors } from 'src/common/interceptors';
import { NotNullUpdatedObjectException } from 'src/exceptions/NotNullUpdatedObject.exception';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/common/constants';

@Controller('people')
@ApiTags('people')
@ApiBearerAuth()
@UseGuards(RoleGuard)
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  @UseInterceptors(EntitiesInterceptors)
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async findAll(
    @Query('page', new DefaultValuePipe(1)) page: number,
    @Query('limit', new DefaultValuePipe(10)) limit: number,
  ): Promise<Pagination<Person>> {
    limit = limit > 10 ? 10 : limit;
    return this.peopleService.getAllPaginate({
      page,
      limit,
    });
  }

  @Get(':id')
  @UseInterceptors(EntityInterceptors)
  async findOne(@Param('id') id: number) {
    return await this.peopleService.findOne(id);
  }

  @Roles(Role.Admin)
  @Post()
  @UseInterceptors(EntityInterceptors)
  async create(@Body() createPersonDto: CreatePersonDto) {
    // if (!createPersonDto) throw new CreatedObjectException();
    return await this.peopleService.create(createPersonDto);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  @UseInterceptors(EntityInterceptors)
  async update(@Param('id') id: number, @Body() updatePersonDto: UpdatePersonDto) {
    if (Object.keys(updatePersonDto).length === 0) throw new NotNullUpdatedObjectException();
    return await this.peopleService.update(id, updatePersonDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  @UseInterceptors(EntityInterceptors)
  async remove(@Param('id') id: number) {
    return await this.peopleService.remove(id);
  }
}
