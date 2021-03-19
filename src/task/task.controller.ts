import { Controller, Get, Res,HttpStatus, Post, Body, Param, Put,NotFoundException, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import {CreateTaskDTO,UpdateTaskDTO} from './dto/task.dto';
import { getRepository } from 'typeorm';
import { Task } from './task.entity';
import { async } from 'rxjs';
import {validate} from 'class-validator';
@Controller('task')
export class TaskController {
    constructor(private taskService:TaskService){}

    @Get('/')
    async getTasks(@Res() res){
        const tasks = await this.taskService.getTasks();
        if(tasks){
            res.status(HttpStatus.OK).json({
                tasks,
                message: 'tareas encontradas!'
            });
        }
    }

    @Get('/:taskID')
    async getTask(@Res() res ,@Param('taskID') taskID:number){
        await this.taskService.getTask(taskID)
        .then((taskOne) => {
            if(taskOne) {
                return res.status(HttpStatus.OK).json(taskOne)
            };
            if(!taskOne)  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:'error'});
        })
        .catch((e) => {
           return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:e.message});
        })
    }

    @Post('/')
    async createTask(@Res() res, @Body() createTaskDTO: CreateTaskDTO ){
        const task = await this.taskService.createTask(createTaskDTO);
        if(task){
            res.status(HttpStatus.OK).json({
                task,
                message: 'tarea creada',
                statusCode: 202
            })
        }
    }
    @Put('/:taskID')
    async updateTask(@Res() res, @Param('taskID') taskID:number,@Body() updateTaskDTO: UpdateTaskDTO){
        try{
            const task = await this.taskService.updateTask(taskID,updateTaskDTO);
            if(validate(task)){
                res.status(HttpStatus.OK).json({
                    task,
                    message: 'tarea actualizada',
                    statusCode: 202
                })
            }
            if(!task){
                res.status(HttpStatus.FOUND).json({
                    statusCode:500,
                    message:'error'
                })
            }
        }catch(e){
           res.status(HttpStatus.FOUND).json({
               statusCode:500,
               message:e.message
           })
        }
    }

    @Delete('/:taskID')
    async deletedTask(@Res() res,@Param('taskID') taskID:number): Promise<void>{
       try{
            const found = await this.taskService.deleteTask(taskID);
            if(found) {
                const task = getRepository(Task).delete(taskID);
                res.status(HttpStatus.OK).json({
                    task,
                    message: 'tarea borrada',
                    statusCode: 204
                })
             } else {
                res.status(HttpStatus.NOT_FOUND).json({
                    statusCode:HttpStatus.NOT_FOUND,
                    error: found,
                    message:'error fatal'
                })
            }
        }catch(e){
           res.status(HttpStatus.FOUND).json({
               statusCode:500,
               message:e.message
           })
        }
    }

}
