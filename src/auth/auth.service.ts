import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import { envs } from 'src/config/envs';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserTokenDto, LoginAuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async signJWT(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  async verifyToken(token: string) {
    try {

      const { sub, iat, exp, ...user } = this.jwtService.verify(token, {
        secret: envs.jwtSecret,
      });

      return {
        user: user,
        token: await this.signJWT(user),
      }

    } catch (error) {
      console.log(error);
      throw new RpcException({
        status: 401,
        message: 'Invalid token'
      })
    }
  }
  async register(createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      const payload = { sub: user.email, userName: user.name };
      return {
        user,
        token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new RpcException({
        status: 400,
        message: error.message,
      });
    }
  }

  async login(loginAuthDto: LoginAuthDto): Promise<UserTokenDto> {
    const user = await this.userService.findUserByEmail(loginAuthDto.email);
    if (!user) {
      throw new RpcException({
        status: 400,
        message: 'User/Password not valid',
      });
    }
    const isPasswordValid = await bcrypt.compare(loginAuthDto.password, user.password);
    if (!isPasswordValid) {
      throw new RpcException({
        status: 400,
        message: 'User/Password not valid',
      });
    }


    const payload: JwtPayload = { sub: user.email, name: user.name };
    const { password, ...rest } = user;
    return {
      user: rest,
      token: await this.signJWT(payload),
    };
  }

}
