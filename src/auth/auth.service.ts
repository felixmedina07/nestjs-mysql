import { Injectable, ConflictException } from '@nestjs/common';
import { UserSignupDTO } from './dto/user-signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user/user.repository';
import { JwtService } from '@nestjs/jwt';
import { User } from './user/user.entity';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  async signUp(userSignupDTO: UserSignupDTO): Promise<User> {
    try {
      const signup = await this.userRepository.signUp(userSignupDTO);
      return signup;
    } catch (e) {
      throw new ConflictException(`Conflict ${e.message}`);
    }
  }
  async signIn() {}
}
