import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import {SwaggerModule} from '@nestjs/swagger';
import { TaskModule } from './task/task.module';
@Module({
  imports: [
  ConfigModule.forRoot({envFilePath: '.env', expandVariables: true,}),
  TypeOrmModule.forRoot(typeOrmConfig),
  TaskModule,
  SwaggerModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
