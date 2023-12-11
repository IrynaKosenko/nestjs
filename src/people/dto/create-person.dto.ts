import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Gender } from 'src/common/constants';

export class CreatePersonDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsString()
  height: string;

  @ApiProperty()
  @IsString()
  mass: string;

  @ApiProperty()
  @IsString()
  hair_color: string;

  @ApiProperty()
  @IsString()
  skin_color: string;

  @ApiProperty()
  @IsString()
  eye_color: string;

  @IsString()
  @ApiProperty()
  birth_year: string;

  @IsEnum(Gender)
  @ApiProperty({ enum: ['female', 'male', 'n/a'], example: 'male' })
  gender: Gender;

  @IsOptional()
  @ApiProperty({ example: 1, required: false, nullable: true })
  homeworld?: number;

  @ApiProperty({ example: [1, 2], type: 'array' })
  films: number[];

  @ApiProperty({ example: [1, 2], type: 'array' })
  species: number[];

  @ApiProperty({ example: [1, 2], type: 'array' })
  vehicles: number[];

  @ApiProperty({ example: [1, 2], type: 'array' })
  starships: number[];
}
