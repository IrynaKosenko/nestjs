import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePlanetDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  @ApiProperty()
  @IsString()
  rotation_period: string;
  @ApiProperty()
  @IsString()
  orbital_period: string;
  @ApiProperty()
  @IsString()
  diameter: string;
  @ApiProperty()
  @IsString()
  climate: string;
  @ApiProperty()
  @IsString()
  gravity: string;
  @ApiProperty()
  @IsString()
  terrain: string;
  @ApiProperty()
  @IsString()
  surface_water: string;
  @IsString()
  @ApiProperty()
  population: string;

  @ApiProperty({ example: [1, 2], type: 'array' })
  residents: number[];

  @ApiProperty({ example: [1, 2], type: 'array' })
  films: number[];
}
