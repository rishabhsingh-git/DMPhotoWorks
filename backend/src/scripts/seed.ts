import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../modules/users/users.service';
import { UsersDto } from '../modules/users/dto/users.dto';
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';

async function bootstrap() {
    try {
        const appContext = await NestFactory.createApplicationContext(AppModule);
        const usersService = appContext.get(UsersService);

        const userDto: UsersDto = {
            userName: 'rishabhs',
            password: 'Rishabh4554@',
            email: 'rishabhsingh4554@gmail.com',
            number: 7020402206,
            isAdmin: true,
            role: 'Admin',
        };

        userDto.password = await bcrypt.hash(userDto.password, 10);
        await usersService.create(userDto);
        await appContext.close();
    } catch (error) {
        Logger.error('Error while inserting the admin:', error);
        throw new HttpException(
            {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: error,
                message: "Error while inserting the admin !"
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
}

bootstrap()
    .then(() => console.log('Seeding completed.'))
    .catch((error) => console.error('Seeding failed:', error));
