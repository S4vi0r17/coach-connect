import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ClientDocument = HydratedDocument<Client>;

@Schema()
export class Client {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  phone: string;

  @Prop()
  address?: string;

  @Prop()
  age: number;

  @Prop()
  gender: string;

  @Prop({ type: [String], default: [] })
  healthNotes?: string;

  @Prop({ type: Date, default: Date.now })
  startDate?: Date;

  // Active, Inactive, Suspended
  @Prop({ default: 'active' })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'Coach', required: true })
  coachId: Types.ObjectId;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
