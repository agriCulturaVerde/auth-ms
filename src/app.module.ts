import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from './config/envs';

@Module({
  imports: [MongooseModule.forRoot(envs.databaseUrl), AuthModule, UserModule],
})
export class AppModule { }
