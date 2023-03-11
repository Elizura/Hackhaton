import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizesModule } from './quizes/quizes.module';
import { QuestionsModule } from './questions/questions.module';

@Module({
  imports: [QuizesModule, MongooseModule.forRoot(
    'mongodb+srv://admin:admin@cluster0.ssogond.mongodb.net/?retryWrites=true&w=majority',
    {
      dbName: 'daniel',
    },
  ), QuestionsModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
