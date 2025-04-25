import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CatDocument = HydratedDocument<Cat>;

@Schema({ versionKey: false })
export class Cat {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  breed: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  owner: { type: Types.ObjectId; ref: 'User' };
}

export const CatSchema = SchemaFactory.createForClass(Cat);
