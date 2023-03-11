import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { createUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('')
  async getAll() {
    return await this.usersService.getAll();
  }

  @Get('/ranking')
  async getRanking() {
    return await this.usersService.getAllRank();
  }
  @Get('/:id')
  async getById(@Param('id') id: string) {
    return await this.usersService.getUser(id);
  }
  @Post('')
  async create(@Body() createDto: createUserDto) {
    return await this.usersService.createUser(createDto);
  }
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() updateDto) {
    return await this.usersService.update(id, updateDto);
  }
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.usersService.delete(id);
  }
}
