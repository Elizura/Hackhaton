import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizController } from './controllers/quiz/quiz.controller';
import { QuizSchema } from './schemas/quizes.schema';
import { QuizesService } from './services/quizes/quizes.service';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Quiz', schema: QuizSchema }])],
  controllers: [QuizController],
  providers: [QuizesService],
  exports: [QuizesModule]
})
export class QuizesModule {}
