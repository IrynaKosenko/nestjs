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
import { PlanetService } from './planet.service';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Planet } from './entities/planet.entity';
import { EntityInterceptors, EntitiesInterceptors } from '../common/interceptors';
import { NotNullUpdatedObjectException } from '../exceptions/NotNullUpdatedObject.exception';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleGuard } from '../auth/guards/role.guard';
import { Role } from '../common/constants';

@Controller('planets')
@ApiTags('planets')
@ApiBearerAuth()
@UseGuards(RoleGuard)
export class PlanetController {
  constructor(private readonly planetService: PlanetService) {}

  @Roles(Role.Admin)
  @Post()
  @UseInterceptors(EntityInterceptors)
  async create(@Body() createPlanetDto: CreatePlanetDto) {
    return await this.planetService.create(createPlanetDto);
  }

  @Get()
  @UseInterceptors(EntitiesInterceptors)
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async findAll(
    @Query('page', new DefaultValuePipe(1)) page: number = 1,
    @Query('limit', new DefaultValuePipe(10)) limit: number = 10,
  ): Promise<Pagination<Planet>> {
    limit = limit > 10 ? 10 : limit;
    return this.planetService.paginate({
      page,
      limit,
    });
  }

  @Get(':id')
  @UseInterceptors(EntityInterceptors)
  async findOne(@Param('id') id: number) {
    return await this.planetService.findOne(id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  @UseInterceptors(EntityInterceptors)
  async update(@Param('id') id: number, @Body() updatePlanetDto: UpdatePlanetDto) {
    if (Object.keys(updatePlanetDto).length === 0) throw new NotNullUpdatedObjectException();
    return await this.planetService.update(id, updatePlanetDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  @UseInterceptors(EntityInterceptors)
  async remove(@Param('id') id: number) {
    return await this.planetService.remove(id);
  }
}
