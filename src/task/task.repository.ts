import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import {CreateTaskDTO} from './dto/task.dto';
import { Res } from '@nestjs/common';
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
   
    async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
        const {title,description} = createTaskDTO;

        const task = new Task();
        task.title = title;
        task.description = description;
        try{
           await task.save();
           return task;
        }catch(e){
           return e.message;
        }

    }
    
}