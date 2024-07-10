import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Trainer extends Document {
  @Prop({ required: true, unique: true, type: String, trim: true })
  name: string;

  @Prop({ unique: true, required: true, type: String, trim: true })
  email: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ type: String, default: null, trim: true })
  phone: string;

  @Prop({ type: String, default: Date.now().toString() })
  token: string;

  @Prop({ type: Boolean, default: false })
  confirmed: boolean;
}

export const TrainerSchema = SchemaFactory.createForClass(Trainer);
