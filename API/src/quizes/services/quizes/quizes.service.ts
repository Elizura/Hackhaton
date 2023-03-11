import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import { IQuestion } from 'src/questions/interfaces/questions.interface';
import { QuizDto } from 'src/quizes/dtos/quizes.dto';
import { IQuiz } from 'src/quizes/interfaces/quizes.interface';
import { QuizSchema } from 'src/quizes/schemas/quizes.schema';


// so the db expects schema , i get dto, iquiz save model
@Injectable()
export class QuizesService {
    constructor(
        @InjectModel('Quiz') private quizModel: Model<IQuiz>, 
        @InjectModel('Question') private questionModel: Model<IQuestion>
    ){}

    async create(quizdto: QuizDto): Promise<IQuiz>{
        try {
            const createdQuiz = new this.quizModel(quizdto);
            return await createdQuiz.save();
        } catch (error) {
            throw error;
        }
    }

    async findAll(): Promise<IQuiz[]> {
        try {
            return this.quizModel.find().exec();
        } catch (error) {
            throw error;
        }
    }

    async findOneQuiz(id: string): Promise<IQuiz> {
        try {
            return this.quizModel.findById(id).exec();
            
        } catch (error) {
            throw error   
        }
    }
    
    async update(id: string, quizDto: QuizDto): Promise<IQuiz> {
        try {
            return this.quizModel.findByIdAndUpdate(id, quizDto, { new: true }).exec();
        } catch (error) {
            throw error
        }
    }

    async delete(id: string): Promise<IQuiz> {
        try {
            return this.quizModel.findByIdAndDelete(id).exec();
        } catch (error) {
            throw error
        }
    }

}


