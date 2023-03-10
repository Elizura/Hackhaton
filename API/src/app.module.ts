import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizesModule } from './quizes/quizes.module';

@Module({
  imports: [QuizesModule, MongooseModule.forRoot(
    'mongodb+srv://admin:admin@cluster0.ssogond.mongodb.net/?retryWrites=true&w=majority',
    {
      dbName: 'daniel',
    },
  ),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
