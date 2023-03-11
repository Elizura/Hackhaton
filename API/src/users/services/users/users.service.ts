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
      const { lastRank, users } = await this.getAllRank();

      const lastUserRank: number = users.at(-1)['rank'];
      const lastUserPoint: number = users.at(-1)['points'];

      user.rank = lastUserPoint === 0 ? lastUserRank : lastRank + 1;
      await user.save();
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

  async isUserAdmin(id: string) {
    try {
      const user: IUser = await this.userModel.findById(id);
      return user.role === 'admin';
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

  async getAllRank() {
    try {
      const users = await this.userModel.find().sort({ points: -1 });

      let rankArray = [];
      for (let i = 0; i < users.length; i++) {
        rankArray.push(users[i]['points']);
      }

      const lastRank = await this.giveRank(rankArray, users);
      return { lastRank, users };
    } catch (err) {
      throw err;
    }
  }

  async giveRank(arrayArg, resultArg) {
    let rank = 1;
    let prev_rank = rank;
    let position = 0;
    // displaying the headers in the console

    // looping through the rank array
    for (let i = 0; i < arrayArg.length; i++) {
      /*
      If it is the first index, then automatically the position becomes 1.
      */
      if (i == 0) {
        position = rank;

        /*
      if the value contained in `[i]` is not equal to `[i-1]`, increment the `rank` value and assign it to `position`.
      The `prev_rank` is assigned the `rank` value.
      */
      } else if (arrayArg[i] != arrayArg[i - 1]) {
        rank++;
        position = rank;
        prev_rank = rank;

        /*
      Otherwise, if the value contained in `[i]` is equal to `[i-1]`,
      assign the position the value stored in the `prev_rank` variable then increment the value stored in the `rank` variable.*/
      } else {
        position = prev_rank;
        rank++;
      }

      const user: IUser = resultArg[i];
      user.rank = position;
      await user.save();
    }

    return rank;
  }
  async getRankById() {}
}
