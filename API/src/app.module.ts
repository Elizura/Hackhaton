import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizesModule } from './quizes/quizes.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    QuizesModule,
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://merwan:6IGLqHu46IRgXfcO@cluster0.w0ksqrr.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
