import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ExerciseLevel } from '../interfaces/excercise-lever.interface';

@Schema({ timestamps: true })
export class Client extends Document {
  @Prop({ required: true, type: String, trim: true })
  name: string;

  @Prop({ required: true, type: String, trim: true })
  email: string;

  @Prop({ required: true, type: Number })
  phone: number;

  @Prop({ required: true, type: Number })
  weight: number;

  @Prop({ required: true, type: Number })
  height: number;

  @Prop({ required: true, type: String, enum: Object.values(ExerciseLevel) })
  exerciseLevel: ExerciseLevel;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Trainer' })
  trainer: string;

  @Prop({ type: String })
  note: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
