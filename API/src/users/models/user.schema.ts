import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  telegramId: string;
  @Prop({ required: true })
  username: string;
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: true })
  lastName: string;
  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true, default: 0 })
  points: number;

  @Prop({ required: true, default: 0 })
  correctQuestions: number;

  @Prop()
  rank: number;

  @Prop({ required: true, default: [] })
  totalQuestions: [string];

  @Prop({ required: true, enum: ['admin', 'user'], default: 'user' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
