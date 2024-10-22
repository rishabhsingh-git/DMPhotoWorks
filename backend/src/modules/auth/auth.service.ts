import { HttpException, HttpStatus, Injectable, Logger, UnauthorizedException, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { UsersDto } from '../users/dto/users.dto';
import { LoginResponse } from './auth.interface';
import { Response } from 'express';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,

    ) { }


    async validateUser(userName: string, password: string): Promise<any> {
        const user = await this.usersService.findOne({ userName: userName });
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }


    async login(req: UsersDto, res: Response): Promise<LoginResponse> {
        try {

            const user = await this.validateUser(req.userName, req.password);
            if (!user) {
                throw new UnauthorizedException(
                    {
                        statsu: HttpStatus.UNAUTHORIZED,
                        message: "Invalid username or password. Please try again."
                    }
                );
            }
            const payload = { userName: user.userName, userId: user._id, number: user.number, isAdmin: user.isAdmin };
            const token = this.jwtService.sign(payload);


            res.cookie('jwt', token, {
                httpOnly: true,
                secure: false,
                maxAge: 1000 * 60 * 60 * 24,
                sameSite: 'strict',
            });

            res.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: 'Login Success!',
            });

            return {
                status: HttpStatus.OK,
                message: 'Login Success!',
            };


        } catch (error) {
            console.log(error)
            Logger.error('An unexpected error occurred while login! :', error);
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: error,
                    message: "An unexpected error occurred while login!"
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}

