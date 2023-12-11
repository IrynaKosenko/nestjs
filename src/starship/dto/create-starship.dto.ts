import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStarshipDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @ApiProperty()
  model: string;

  @ApiProperty()
  manufacturer: string;

  @ApiProperty()
  cost_in_credits: string;

  @ApiProperty()
  length: string;

  @ApiProperty()
  max_atmosphering_speed: string;

  @ApiProperty()
  crew: string;

  @ApiProperty()
  passengers: string;

  @ApiProperty()
  cargo_capacity: string;

  @ApiProperty()
  consumables: string;

  @ApiProperty()
  hyperdrive_rating: string;

  @ApiProperty()
  MGLT: string;

  @ApiProperty()
  starship_class: string;

  @ApiProperty({ example: [1, 2], type: 'array' })
  pilots: number[];

  @ApiProperty({ example: [1, 2], type: 'array' })
  films: number[];
}
