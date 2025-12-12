import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) { }

  findAll() {
    return this.userModel.find().exec();
  }

  async create(createUserDto: CreateUserDto) {
    const saltRounds = 10;
    if (createUserDto.password) {
      createUserDto.password = await bcrypt.hash(createUserDto.password, saltRounds);
    }
    const created = new this.userModel(createUserDto);
    return await created.save();
  }

  async findOne(id: string) {
    return this.userModel.findOne({ _id: id }).lean().exec();
  }

  findUserByEmail(email: string) {
    return this.userModel.findOne({ email: email }).lean().exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { id: __, ...data } = updateUserDto as UpdateUserDto;
    await this.findOne(id);
    return this.userModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.userModel.deleteOne({ _id: id }).exec();
  }
}
