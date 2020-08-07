import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';
@Module({
    imports:[TypeOrmModule.forFeature([TaskRepository])],
    providers:[TaskService],
    controllers:[TaskController]
})
export class TaskModule {}
