import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { UserSignupDTO, UserSigninDTO } from '../dto/user-signup.dto';
import { compare, genSalt, hash } from 'bcryptjs';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(userSignupDTO: UserSignupDTO): Promise<User> {
    const { username, email, password } = userSignupDTO;
    const user = this.create();
    user.username = username;
    user.email = email;
    const salt = await genSalt(10);
    user.password = await hash(password, salt);
    try {
      await user.save();
      return user;
    } catch (error) {
      if (error.code === '23505') {
        // Duplicate username
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async search(email: string): Promise<User> {
    const searchUser = await this.findOne({ where: { email: email } });
    try {
      return searchUser;
    } catch (err) {
      throw new NotFoundException(`User ${email} not found`);
    }
  }

  async validatePassword(userSigninDTO: UserSigninDTO): Promise<Boolean> {
    const { email, password } = userSigninDTO;
    const foundPassword = await this.findOne({
      where: { email: email },
    });
    const pas = await compare(password, foundPassword.password);
    if (pas) {
      return true;
    } else {
      throw new NotFoundException(`Password not found`);
    }
  }
}
