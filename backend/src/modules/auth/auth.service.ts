import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { UsersDto } from '../users/dto/users.dto';
import { Response, Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userName: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ userName: userName });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(req: UsersDto, res: Response): Promise<void> {
    try {
      console.log(
        `= = = =`,
        process.env.AWS_BUCKET_REGION,
        process.env.AWS_S3_BUCKET_NAM,
        process.env.AWS_ACCESS_KEY_ID,
        process.env.AWS_SECRET_ACCESS_KEY,
        process.env.JWT_SECRET,
      );
      const user = await this.validateUser(req.userName, req.password);
      if (!user) {
        throw new UnauthorizedException({
          statsu: HttpStatus.UNAUTHORIZED,
          message: 'Invalid username or password. Please try again.',
        });
      }
      const payload = {
        userName: user.userName,
        userId: user._id,
        number: user.number,
        isAdmin: user.isAdmin,
      };

      const accessToken = this.jwtService.sign(payload, {
        expiresIn: '2m',
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
        payload,
      });
    } catch (error) {
      console.log(`You have encountered error`);
      console.log(error);
      Logger.error('An unexpected error occurred while login! :', error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error,
          message: 'An unexpected error occurred while login!',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async refreshAccessToken(req: Request, res: Response): Promise<void> {
    try {
      const refreshToken = req.cookies['refreshToken'];
      console.log(`You had the access token`, refreshToken);
      if (!refreshToken) {
        throw new UnauthorizedException({
          statsu: HttpStatus.UNAUTHORIZED,
          message: 'No refresh token provided',
        });
      }

      console.log(`Still you came here `);
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET,
      });

      const user = await this.isUserExist(payload?.userName);

      if (!user) {
        throw new UnauthorizedException('User does not exist');
      }

      const userPayload = {
        userName: payload.userName,
        userId: payload.userId,
        number: payload.number,
        isAdmin: payload.isAdmin,
      };
      const newAccessToken = this.jwtService.sign(userPayload, {
        expiresIn: '15m',
      });

      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 15 * 60 * 1000,
        sameSite: 'strict',
      });

      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Access token refreshed!',
        userDetails: payload,
      });
    } catch (error) {
      throw new UnauthorizedException({
        statsu: HttpStatus.UNAUTHORIZED,
        message: 'Invalid refresh token',
      });
    }
  }

  async isUserExist(userName: string): Promise<boolean> {
    const user = await this.usersService.findOne({ userName: userName });
    if (user) {
      return true;
    } else {
      return false;
    }
  }
}
