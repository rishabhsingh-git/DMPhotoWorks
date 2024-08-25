import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AssetsModule } from './modules/assets/assets.module';
import { AppConfigModule } from './config/config.module';

@Module({
  imports: [
    DatabaseModule,  
    AssetsModule, 
    AppConfigModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
