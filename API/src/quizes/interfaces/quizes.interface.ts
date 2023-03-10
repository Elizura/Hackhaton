import { Document } from "mongoose";

export interface IQuiz extends Document{
    title: String;
    description:String;
    questions:String[];
    numQuestions:number;
    status:String;
}