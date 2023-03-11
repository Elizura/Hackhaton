import { Document } from 'mongoose';

export interface IUser extends Document {
  telegramId: string;
  username: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  points: number;
  rank: number;
  totalQuestions: [string];
  correctQuestions: number;
  role: string;
}
