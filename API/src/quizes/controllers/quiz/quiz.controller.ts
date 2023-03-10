import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { QuizDto } from 'src/quizes/dtos/quizes.dto';
import { IQuiz } from 'src/quizes/interfaces/quizes.interface';
import { QuizesService } from 'src/quizes/services/quizes/quizes.service';

@Controller('quizes')
export class QuizController {
    constructor(private readonly quizService: QuizesService){}

    @Post()
    addQuiz(@Body() quizDto: QuizDto){
        return this.quizService.create(quizDto)
    }
    
    @Get()
    getAllQuiz(){
        return this.quizService.findAll()
    }

    @Get("/:id")
    getOneQuiz(@Param('id') id: string){
        
            return this.quizService.findOneQuiz(id)
        
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() quizDto: QuizDto) {
        return this.quizService.update(id, quizDto);
    }
    
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<IQuiz> {
        return this.quizService.delete(id);
}
}
