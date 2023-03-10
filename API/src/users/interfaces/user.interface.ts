export interface IUser {
  telegramId: string;
  username: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  points: number;
  rank: number;
  totalQuestions: [string];
  correctQuestions: number;
}
