import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private authService: AuthService

    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const token = request.cookies['accessToken'];

        if (!token) {
            throw new UnauthorizedException('Invalid or expired token');
        }

        try {
            const decoded = this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET
            });

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
