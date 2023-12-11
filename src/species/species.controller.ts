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
import { SpeciesService } from './species.service';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Species } from './entities/species.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { EntityInterceptors, EntitiesInterceptors } from 'src/common/interceptors';
import { NotNullUpdatedObjectException } from 'src/exceptions/NotNullUpdatedObject.exception';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/common/constants';

@Controller('species')
@ApiTags('species')
@ApiBearerAuth()
@UseGuards(RoleGuard)
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @Roles(Role.Admin)
  @Post()
  @UseInterceptors(EntityInterceptors)
  create(@Body() createSpeciesDto: CreateSpeciesDto) {
    return this.speciesService.create(createSpeciesDto);
  }

  @Get()
  @UseInterceptors(EntitiesInterceptors)
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async findAll(
    @Query('page', new DefaultValuePipe(1)) page: number = 1,
    @Query('limit', new DefaultValuePipe(5)) limit: number = 10,
  ): Promise<Pagination<Species>> {
    limit = limit > 10 ? 10 : limit;
    return this.speciesService.paginate({
      page,
      limit,
    });
  }

  @Get(':id')
  @UseInterceptors(EntityInterceptors)
  findOne(@Param('id') id: number) {
    return this.speciesService.findOne(id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  @UseInterceptors(EntityInterceptors)
  update(@Param('id') id: number, @Body() updateSpeciesDto: UpdateSpeciesDto) {
    if (Object.keys(updateSpeciesDto).length === 0) throw new NotNullUpdatedObjectException();
    return this.speciesService.update(id, updateSpeciesDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  @UseInterceptors(EntityInterceptors)
  remove(@Param('id') id: number) {
    return this.speciesService.remove(id);
  }
}
