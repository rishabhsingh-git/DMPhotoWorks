import { Controller, Post, Body, Request, UseGuards, UnauthorizedException, Res, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { UsersDto } from '../users/dto/users.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() @Req() req: UsersDto, @Res() res: Response) {
        return this.authService.login(req, res);
    }

    @Get('refresh-token')
    async refreshToken(refreshAccessToken: string, @Res() res: Response) {
        await this.authService.refreshAccessToken(refreshAccessToken, res);
    }
}
