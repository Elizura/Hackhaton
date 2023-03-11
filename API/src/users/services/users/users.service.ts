import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createUserDto } from 'src/users/dtos/create-user.dto';
import { IUser } from 'src/users/interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  async createUser(createDto: createUserDto): Promise<IUser> {
    try {
      const user: IUser = await this.userModel.create(createDto);
      return user;
    } catch (err) {
      throw err;
    }
  }

  async getAll(): Promise<IUser[]> {
    try {
      const users: IUser[] = await this.userModel.find();
      return users;
    } catch (err) {
      throw err;
    }
  }

  async getUser(id: string): Promise<IUser> {
    try {
      const user: IUser = await this.userModel.findOne({ telegramId: id });
      return user;
    } catch (err) {
      throw err;
    }
  }

  async update(id: string, updateDto): Promise<IUser> {
    try {
      const user: IUser = await this.userModel.findOneAndUpdate(
        { telegramId: id },
        updateDto,
        { new: true },
      );
      return user;
    } catch (err) {
      throw err;
    }
  }
  async delete(id: string) {
    try {
      await this.userModel.findOneAndDelete({ telegramId: id });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
