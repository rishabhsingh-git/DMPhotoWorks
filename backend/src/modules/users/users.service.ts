import { HttpException, HttpStatus, Injectable, Logger, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersDto } from './dto/users.dto';
import { UsersModel } from './users.interface';


@Injectable()
export class UsersService {

    constructor(@InjectModel('Users') private userModel: Model<UsersModel>) { }

    async create(createUserDto: UsersDto): Promise<string> {

        try {

            const existingUser = await this.userModel.findOne({ $or: [{ userName: createUserDto?.userName, number: createUserDto?.number, email: createUserDto?.email }] });
            if (existingUser) {
                Logger.error('User already exists:', HttpStatus.CONFLICT);
                return `${HttpStatus.CONFLICT} : User already exists `

            }

            const createdUser = new this.userModel({
                userId: await this.generateUniqueUserId(),
                ...createUserDto,
            });
            await createdUser.save();
            return "User creation success"

        } catch (error) {
            Logger.error('Error while creating the user:', error);
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: error,
                    message: "Error while creating the user"
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async generateUniqueUserId(): Promise<string> {
        try {

            let randomNumber = Math.floor(1000 + Math.random() * 9000).toString();
            randomNumber = `US${randomNumber}`
            const existingUserId = await this.userModel.findOne({ userId: randomNumber })
            if (!existingUserId) {
                return randomNumber
            } else {
                let randomNumber = Math.floor(1000 + Math.random() * 9000).toString();
                randomNumber = `US${randomNumber}`
            }
        } catch (error) {
            Logger.error('Error while generating unique user id:', error);
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: error,
                    message: "Error while generating unique user id"
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async findOne(query: any): Promise<UsersDto> {
        try {

            let user = await this.userModel.findOne(query).lean().exec()
            return user
        } catch (error) {
            Logger.error('Error while fetching a user:', error);
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: error,
                    message: "Error while fetching a user"
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
