import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @MessagePattern('createUser')
  create(@Payload() createUserDto: CreateUserDto) {
    return createUserDto;
    // return this.userService.create(createUserDto);
  }

  @MessagePattern('findUserByEmail')
  findOne(@Payload() email: string) {
    return email;
    // return this.userService.findOne(id);
  }

  @MessagePattern('updateUser')
  update(@Payload() updateUserDto: UpdateUserDto) {
    return updateUserDto;
    // return this.userService.update(updateUserDto.id, updateUserDto);
  }

  @MessagePattern('removeUser')
  remove(@Payload() id: number) {
    return this.userService.remove(id);
  }
}
