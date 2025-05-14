import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CoachDocument = HydratedDocument<Coach> & {
  comparePassword(password: string): Promise<boolean>;
};

@Schema()
export class Coach {
  @Prop({ required: true, trim: true })
  firstName: string;

  @Prop({ required: true, trim: true })
  lastName: string;

  @Prop({ required: true, trim: true, unique: true })
  email: string;

  @Prop({ trim: true })
  phoneNumber?: string;

  @Prop({ required: true })
  password: string;

  @Prop({ unique: true })
  googleOAuthId?: string;

  @Prop({ default: false })
  isEmailConfirmed: boolean;

  @Prop({ default: null })
  emailConfirmationToken?: string;

  @Prop()
  photoUrl?: string;

  @Prop()
  bio?: string;
}

export const CoachSchema = SchemaFactory.createForClass(Coach);
