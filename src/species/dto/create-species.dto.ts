import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSpeciesDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'name' })
  name: string;

  @IsString()
  @ApiProperty({ example: 'artificial' })
  classification: string;

  @IsString()
  @ApiProperty({ example: 'sentient' })
  designation: string;

  @IsString()
  @ApiProperty({ example: '180' })
  average_height: string;

  @IsString()
  @ApiProperty({ example: 'yellow' })
  skin_colors: string;

  @IsString()
  @ApiProperty({ example: 'brown' })
  hair_colors: string;

  @IsString()
  @ApiProperty({ example: 'green' })
  eye_colors: string;

  @IsString()
  @ApiProperty({ example: '1000' })
  average_lifespan: string;

  @ApiProperty({ example: 1, required: false, nullable: true })
  homeworld?: number;

  @IsString()
  @ApiProperty({ example: 'konlum' })
  language: string;

  @ApiProperty({ example: [1, 2], type: 'array' })
  people: number[];

  @ApiProperty({
    example: [1, 2],
    type: 'array',
  })
  films: number[];
}
