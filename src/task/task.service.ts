import { Injectable,NotFoundException, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {TaskRepository} from './task.repository';
import {Task} from './task.entity';
import {Task as TaskInterface} from '../interfaces/task';
import {CreateTaskDTO, UpdateTaskDTO} from './dto/task.dto';
import { getRepository } from 'typeorm';
import { async } from 'rxjs';
@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
      ) {}

    async getTasks(): Promise<Task[]> {
     try{
      const tasks = await this.taskRepository.find();
      return tasks;
     }catch(e){
      throw new NotFoundException('Task Does not exits');
        }
    }

    async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
      try{
        const task = await this.taskRepository.createTask(createTaskDTO);
        return task;
      }catch(e){
       throw new NotFoundException('Task not save!')
      }
    }

    async getTask(taskID: number): Promise<Task>{
      const found = this.taskRepository.findOne({
        where:{id:taskID}
      })
      if (!found) {
        throw new NotFoundException(`Task with ID ${taskID} not found.`);
      }
      return found;
    }

    async deleteTask(taskID: number): Promise<Boolean> {
      try{
        const result = await this.taskRepository.delete({id: taskID});
        if (result.affected === 0) {
          throw new NotFoundException(`Task with ID ${taskID} not found.`);
        }
        return true;
      }catch(e){
        return e.message;
      }
    }
}
