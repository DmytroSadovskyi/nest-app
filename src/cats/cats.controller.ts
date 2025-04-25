import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  ValidationPipe,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { ParseObjectIdPipe } from 'src/parseObjectId.pipe';
import { Types } from 'mongoose';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new cat' })
  @ApiResponse({
    status: 201,
    description: 'The cat has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: CreateCatDto,
    description: 'JSON structure for cat object',
  })
  create(@Body(ValidationPipe) createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cats' })
  @ApiResponse({
    status: 200,
    description: 'List of cats',
  })
  findAll() {
    return this.catsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a cat by ID' })
  @ApiResponse({
    status: 200,
    description: 'The cat has been successfully retrieved.',
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.catsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a cat by ID' })
  @ApiResponse({
    status: 200,
    description: 'The cat has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({
    type: UpdateCatDto,
    description: 'JSON structure for cat object',
  })
  update(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body(ValidationPipe) updateCatDto: UpdateCatDto,
  ) {
    return this.catsService.update(id, updateCatDto);
  }
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a cat by ID' })
  @HttpCode(204)
  async remove(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.catsService.remove(id);
  }
}
