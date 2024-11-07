// src/auth/jwt-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private authService: AuthService

    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        console.log(`==============================>`, request.cookies)
        const token = request.cookies['jwt'];

        if (!token) {
            throw new UnauthorizedException('Access token missing');
        }
        console.log(`You have been called========>`)
        try {
            const decoded = this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET || 'your_jwt_secret',
            });
            console.log(`You have been called========>`, decoded)
            const user = await this.authService.isUserExist(decoded?.userName)
            if (!user) {
                throw new UnauthorizedException('User does not exist');
            }

            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
