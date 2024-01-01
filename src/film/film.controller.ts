import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  UseInterceptors,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FilmService } from './film.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Film } from './entities/film.entity';
import { EntitiesInterceptors, EntityInterceptors } from '../common/interceptors';
import { NotNullUpdatedObjectException } from '../exceptions/NotNullUpdatedObject.exception';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/constants';
import { RoleGuard } from '../auth/guards/role.guard';

@Controller('films')
@ApiBearerAuth()
@ApiTags('films')
@UseGuards(RoleGuard)
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  @Roles(Role.Admin)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(EntityInterceptors)
  async create(@Body() createFilmDto: CreateFilmDto) {
    return await this.filmService.create(createFilmDto);
  }

  @Get()
  @UseInterceptors(EntitiesInterceptors)
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async findAll(
    @Query('page', new DefaultValuePipe(1)) page: number = 1,
    @Query('limit', new DefaultValuePipe(10)) limit: number = 10,
  ): Promise<Pagination<Film>> {
    limit = limit > 10 ? 10 : limit;
    return this.filmService.paginate({
      page,
      limit,
    });
  }

  @Get(':id')
  @UseInterceptors(EntityInterceptors)
  async findOne(@Param('id') id: number) {
    return await this.filmService.findOne(id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  @UseInterceptors(EntityInterceptors)
  async update(@Param('id') id: number, @Body() updateFilmDto: UpdateFilmDto) {
    if (Object.keys(updateFilmDto).length === 0) throw new NotNullUpdatedObjectException();
    return await this.filmService.update(id, updateFilmDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  @UseInterceptors(EntityInterceptors)
  async remove(@Param('id') id: number) {
    return await this.filmService.remove(id);
  }
}
