import { Document } from "mongoose";

export interface IQuestion extends Document{
    quizid: String;
    description:String;
    type:String;
    weight:number;
    underquiz:boolean;
    correctanswer:String;
    choices:String[];
}