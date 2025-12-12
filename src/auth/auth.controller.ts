import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { UserTokenDto, LoginAuthDto } from './dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @MessagePattern('loginAuth')
  loginAuth(@Payload() loginAuthDto: LoginAuthDto): Promise<UserTokenDto> {
    return this.authService.login(loginAuthDto);
  }

  @MessagePattern('registerAuth')
  registerAuth(@Payload() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @MessagePattern('verifyTokenAuth')
  verifyTokenAuth(@Payload() token: string) {
    return this.authService.verifyToken(token);
  }

}
