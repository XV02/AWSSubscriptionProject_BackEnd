import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmailDocument = Email & Document;

@Schema()
export class Email {
  @Prop({ required: true })
  email: string;
}

export const CatSchema = SchemaFactory.createForClass(Email);
