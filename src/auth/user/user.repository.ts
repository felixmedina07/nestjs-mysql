import {
    ConflictException,
    InternalServerErrorException,
  } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import {UserSignupDTO} from '../dto/user-signup.dto';
import { validate } from 'class-validator';
import { async } from 'rxjs';
import { genSalt, hash } from 'bcryptjs';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(userSignupDTO:UserSignupDTO): Promise<User>{
        const {username,email,password} = userSignupDTO;
        const user = this.create();
        user.username = username;
        user.email = email;
        const salt = await genSalt(10);
        user.password = await hash(password, salt);
        try{
            await user.save();
            return user;
        }catch(error){
            if (error.code === '23505') {
                // Duplicate username
                throw new ConflictException('Username already exists');
              } else {
                throw new InternalServerErrorException();
              }
        }
    }

    
}