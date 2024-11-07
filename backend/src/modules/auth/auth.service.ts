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


    async login(req: UsersDto, res: Response): Promise<void> {
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
            const accessToken = this.jwtService.sign(payload, {
                expiresIn: '15m',
            });
            const refreshToken = this.jwtService.sign(payload, {
                expiresIn: '7d',
            });

            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: true,
                maxAge: 15 * 60 * 1000,
                sameSite: 'strict',
            });
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                sameSite: 'strict',
            });

            res.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: 'Login Success!',
                payload
            });

        } catch (error) {
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

    async refreshAccessToken(refreshAccessToken: string, res: Response): Promise<void> {
        try {

            if (!refreshAccessToken) {
                throw new UnauthorizedException('No refresh token provided');
            }

            const payload = this.jwtService.verify(refreshAccessToken);
            const newAccessToken = this.jwtService.sign(
                {
                    userName: payload.userName,
                    userId: payload.userId,
                    number: payload.number,
                    isAdmin: payload.isAdmin,
                },
                { expiresIn: '15m' },
            );


            res.cookie('accessToken', newAccessToken, {
                httpOnly: true,
                secure: true,
                maxAge: 15 * 60 * 1000,
                sameSite: 'strict',
            });

            res.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: 'Access token refreshed!',
            });
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    async isUserExist(userName: string): Promise<boolean> {
        const user = await this.usersService.findOne({ userName: userName });
        if (user) {
            return true
        } else {
            return false
        }
    }
}



