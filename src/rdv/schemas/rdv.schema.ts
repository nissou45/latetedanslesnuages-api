import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RdvDocument = Rdv & Document;

@Schema({ timestamps: true })
export class Rdv {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  prestation: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  prix: string;

  @Prop({ default: 'à venir' })
  statut: string;
}

export const RdvSchema = SchemaFactory.createForClass(Rdv);
