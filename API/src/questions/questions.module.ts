import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizesModule } from 'src/quizes/quizes.module';
import { QuizSchema } from 'src/quizes/schemas/quizes.schema';
import { QuestionsController } from './controllers/questions/questions.controller';
import { QuestionSchema } from './schemas/questions.schema';
import { QuestionsService } from './services/questions/questions.service';

@Module({
  imports: [MongooseModule.forFeature([{name:'Question', schema: QuestionSchema}]),QuizesModule],
  controllers: [QuestionsController],
  providers: [QuestionsService]
})
export class QuestionsModule {}
