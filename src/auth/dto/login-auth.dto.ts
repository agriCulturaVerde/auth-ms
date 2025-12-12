import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';

export class LoginAuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    password: string;

}
