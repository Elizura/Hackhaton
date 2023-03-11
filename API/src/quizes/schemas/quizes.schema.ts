import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IQuestion } from "src/questions/interfaces/questions.interface";

@Schema({timestamps:true})
export class Quiz {

    @Prop({required:true})
    title: String;

    @Prop({required:true})
    description:String;

    @Prop({required:true})
    questions:IQuestion[];

    @Prop({required:true})
    numQuestions:number;

    @Prop({required:true, enum:['open', 'closed']})
    status:String;

    // @Prop({required:true})
    // time:Date;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
