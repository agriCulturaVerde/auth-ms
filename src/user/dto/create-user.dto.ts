import { Type } from "class-transformer";
import { IsString, MinLength, MaxLength, IsOptional, IsEmail, IsDate, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    name: string;

    @IsOptional()
    @IsString()
    @MaxLength(200)
    address?: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @IsStrongPassword()
    password: string;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    dateOfBirth?: Date;

    @IsDate()
    @Type(() => Date)
    dateCreated: Date = new Date();

    @IsOptional()
    @IsString()
    @MaxLength(20)
    telephone?: string;
}

