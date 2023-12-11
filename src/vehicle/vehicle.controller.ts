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
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { ApiBearerAuth, ApiNotFoundResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Vehicle } from './entities/vehicle.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { EntityInterceptors, EntitiesInterceptors } from 'src/common/interceptors';
import { NotNullUpdatedObjectException } from 'src/exceptions/NotNullUpdatedObject.exception';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/common/constants';

@UseGuards(RoleGuard)
@Controller('vehicles')
@ApiTags('vehicles')
@ApiBearerAuth()
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Roles(Role.Admin)
  @Post()
  @UseInterceptors(EntityInterceptors)
  async create(@Body() createVehicleDto: CreateVehicleDto) {
    return await this.vehicleService.create(createVehicleDto);
  }

  @Get()
  @UseInterceptors(EntitiesInterceptors)
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async findAll(
    @Query('page', new DefaultValuePipe(1)) page: number,
    @Query('limit', new DefaultValuePipe(10)) limit: number,
  ): Promise<Pagination<Vehicle>> {
    limit = limit > 10 ? 10 : limit;
    return this.vehicleService.paginate({
      page,
      limit,
    });
  }

  @Get(':id')
  @UseInterceptors(EntityInterceptors)
  @ApiNotFoundResponse({
    description: "Couldn't find the vehicle",
  })
  async findOne(@Param('id') id: number) {
    return await this.vehicleService.findOne(id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  @UseInterceptors(EntityInterceptors)
  async update(@Param('id') id: number, @Body() updateVehicleDto: UpdateVehicleDto) {
    if (Object.keys(updateVehicleDto).length === 0) throw new NotNullUpdatedObjectException();
    return await this.vehicleService.update(id, updateVehicleDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  @UseInterceptors(EntityInterceptors)
  async remove(@Param('id') id: number) {
    return await this.vehicleService.remove(id);
  }
}
