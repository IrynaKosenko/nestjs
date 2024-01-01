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
import { StarshipService } from './starship.service';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { ApiBearerAuth, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Starship } from './entities/starship.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { EntityInterceptors, EntitiesInterceptors } from '../common/interceptors';
import { NotNullUpdatedObjectException } from '../exceptions/NotNullUpdatedObject.exception';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/constants';

@Controller('starships')
@ApiTags('starships')
@ApiBearerAuth()
@UseGuards(RoleGuard)
export class StarshipController {
  constructor(private readonly starshipService: StarshipService) {}

  @Roles(Role.Admin)
  @Post()
  @UseInterceptors(EntityInterceptors)
  @ApiOkResponse({
    description: 'The starship has been successfully created',
    type: CreateStarshipDto,
  })
  async create(@Body() createStarshipDto: CreateStarshipDto) {
    return await this.starshipService.create(createStarshipDto);
  }

  @Get()
  @UseInterceptors(EntitiesInterceptors)
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async findAll(
    @Query('page', new DefaultValuePipe(1)) page: number,
    @Query('limit', new DefaultValuePipe(10)) limit: number,
  ): Promise<Pagination<Starship>> {
    limit = limit > 10 ? 10 : limit;
    return this.starshipService.paginate({
      page,
      limit,
    });
  }

  @Get(':id')
  @UseInterceptors(EntityInterceptors)
  async findOne(@Param('id') id: number) {
    return await this.starshipService.findOne(id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  @UseInterceptors(EntityInterceptors)
  async update(@Param('id') id: number, @Body() updateStarshipDto: UpdateStarshipDto) {
    if (Object.keys(updateStarshipDto).length === 0) throw new NotNullUpdatedObjectException();
    return await this.starshipService.update(id, updateStarshipDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  @UseInterceptors(EntityInterceptors)
  async remove(@Param('id') id: number) {
    return await this.starshipService.remove(id);
  }
}
