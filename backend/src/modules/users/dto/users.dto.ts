import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, IsStrongPassword } from 'class-validator';

export class UsersDto {
    @IsNotEmpty()
    @IsString()
    userName: string;

    @IsStrongPassword()
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEmail()
    email: string;


    @IsPhoneNumber()
    @IsNumber()
    @IsNotEmpty()
    number: number

    @IsBoolean()
    @IsNotEmpty()
    isAdmin: boolean

    @IsNotEmpty()
    @IsEnum(['Admin', 'Client'])
    role: string

    @IsNotEmpty()
    @IsString()
    userId?: String

}
