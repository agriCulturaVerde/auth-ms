import { OmitType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

class User extends OmitType(CreateUserDto, ['password', 'dateCreated'] as const) { }

export class UserTokenDto {
    @ValidateNested()
    @Type(() => User)
    user: User;
    @IsString()
    token: string;
}
