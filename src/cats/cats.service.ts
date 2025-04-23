import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './entities/cat.entity';
import { Model, Types } from 'mongoose';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  async findOne(id: Types.ObjectId): Promise<Cat> {
    return this.catModel.findById(id).exec();
  }

  async update(id: Types.ObjectId, updateCatDto: UpdateCatDto): Promise<Cat> {
    return this.catModel
      .findByIdAndUpdate(id, updateCatDto, { new: true })
      .exec();
  }

  async remove(id: Types.ObjectId) {
    return this.catModel.findByIdAndDelete(id).exec();
  }
}
