import { Document } from "mongoose";
import { IQuestion } from "src/questions/interfaces/questions.interface";

export interface IQuiz extends Document{
    title: String;
    description:String;
    questions:IQuestion[];
    numQuestions:number;
    status:String;
}