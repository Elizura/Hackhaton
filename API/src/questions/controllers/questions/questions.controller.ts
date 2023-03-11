import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { QuestionDto } from 'src/questions/dtos/questions.dto';
import { IQuestion } from 'src/questions/interfaces/questions.interface';
import { QuestionsService } from 'src/questions/services/questions/questions.service';
import { IQuiz } from 'src/quizes/interfaces/quizes.interface';

@Controller('questions')
export class QuestionsController {

    constructor(private readonly questionService: QuestionsService){}

    @Post()
    addQuestion(@Body() questiondto: QuestionDto){
        return  this.questionService.create(questiondto)
    }

    @Get()
    getAllQuestion(){
        return this.questionService.findAll()
    }

    @Get("/:id")
    getOneQuestion(@Param('id') id: string){
        return  this.questionService.findOneQuestion(id)
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() questiondto: QuestionDto) {
        return await this.questionService.update(id, questiondto);
    }
    
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<IQuestion> {
        return await this.questionService.delete(id);
}
}