import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateCatDto {
  @ApiProperty({
    description: 'The name of the Cat',
    example: 'Fluffy',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The age of the Cat',
    example: 2,
  })
  @IsInt()
  age: number;

  @ApiProperty({
    description: 'The breed of the Cat',
    example: 'Persian',
  })
  @IsNotEmpty()
  @IsString()
  breed: string;
}
