import { IQuestion } from "src/questions/interfaces/questions.interface";

export class QuizDto{
    title:String;
    description:String;
    questions:IQuestion[];
    numQuestions:number;
    status:String;      
}