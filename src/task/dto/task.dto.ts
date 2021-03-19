import {IsString, Matches, MaxLength, MinLength,IsNotEmpty} from 'class-validator';


export class CreateTaskDTO{
   @IsString()
   @MinLength(4)
   @IsNotEmpty()
   title: string;
   @IsString()
   @MinLength(4)
   @IsNotEmpty()
   description: string;
}

export class UpdateTaskDTO{
   @IsString({message: 'error'})
   @IsNotEmpty()
   @MinLength(4,{
      message:'error'
   })
   title: string;
   @IsString({message: 'error'})
   @IsNotEmpty()
   @MinLength(4,{
      message:'error'
   })
   description:string;
}