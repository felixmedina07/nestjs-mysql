import {isNotEmpty, isNumber,} from 'class-validator';

export class CreateTaskDTO{
   readonly title: string;
   readonly description: string;
}

export class UpdateTaskDTO{
   readonly title: string;
   readonly description:string;
}