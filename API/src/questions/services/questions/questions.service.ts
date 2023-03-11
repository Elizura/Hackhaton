import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuestionDto } from 'src/questions/dtos/questions.dto';
import { IQuestion } from 'src/questions/interfaces/questions.interface';
import { IQuiz } from 'src/quizes/interfaces/quizes.interface';

@Injectable()
export class QuestionsService {
    constructor(
        @InjectModel('Question') private questionModel: Model<IQuestion>,
        @InjectModel('Quiz') private quizModel: Model<IQuiz>
    ){}


    async create(questiondto: QuestionDto): Promise<IQuestion>{
        try {
            const newQuestion = await new this.questionModel(questiondto).save();
            
            if (newQuestion.underquiz === true) {
                // now we do the populate logic
                const quiz_id = newQuestion.quizid;
                const required_quiz:IQuiz = await this.quizModel.findById(quiz_id);
                required_quiz.questions.push(newQuestion);

                required_quiz.save()

            }
            return newQuestion.save()
        } catch (error) {
            throw error;
        }
    }

    
    async findAll(): Promise<IQuestion[]> {
        try {
            return await this.questionModel.find().exec();
        } catch (error) {
            throw error;
        }
    }

    async findOneQuestion(id: string): Promise<IQuestion> {
        try {
            return await this.questionModel.findById(id).exec();
            
        } catch (error) {
            throw error   
        }
    }

    async update(id: string, questiondto: QuestionDto): Promise<IQuestion> {
        try {
            return await this.questionModel.findByIdAndUpdate(id, questiondto, { new: true }).exec();
        } catch (error) {
            throw error
        }
    }

    async delete(id: string): Promise<IQuestion> {
        try {
            return this.questionModel.findByIdAndDelete(id).exec();
        } catch (error) {
            throw error
        }
    }
}
