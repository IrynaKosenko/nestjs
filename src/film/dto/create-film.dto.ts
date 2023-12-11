import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateFilmDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  episode_id: string;

  @IsString()
  @ApiProperty()
  opening_crawl: string;

  @IsString()
  @ApiProperty()
  director: string;

  @IsString()
  @ApiProperty()
  producer: string;

  @IsString()
  @ApiProperty()
  release_date: string;

  @IsArray()
  @ApiProperty({ example: [1, 2], type: 'array' })
  characters: number[];

  @IsArray()
  @ApiProperty({ example: [1, 2], type: 'array' })
  planets: number[];

  @IsArray()
  @ApiProperty({ example: [1, 2], type: 'array' })
  starships: number[];

  @IsArray()
  @ApiProperty({ example: [1, 2], type: 'array' })
  vehicles: number[];

  @IsArray()
  @ApiProperty({ example: [1, 2], type: 'array' })
  species: number[];
}
