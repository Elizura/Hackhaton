import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
@Schema({timestamps:true})
export class Question {

    @Prop({required:true})
    description:String;

    @Prop({required:true})
    quizid:String;

    @Prop({required:true})
    correctanswer:string;

    @Prop({required:true})
    weight:number;

    @Prop({required:true, enum: ['choice', 'input']})
    type:string;

    @Prop({required:true})
    status:boolean;

    // @Prop({required:true})
    // time:Date;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
