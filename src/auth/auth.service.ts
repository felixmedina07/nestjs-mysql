import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserSignupDTO, UserSigninDTO } from './dto/user-signup.dto';
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

  async createToken(id: number, email: string) {
    const payload = { sub: id, email };
    return this.jwtService.sign(payload);
  }

  async signUp(userSignupDTO: UserSignupDTO): Promise<User> {
    try {
      const signup = await this.userRepository.signUp(userSignupDTO);
      return signup;
    } catch (e) {
      throw new ConflictException(`Conflict ${e.message}`);
    }
  }
  async signIn(userSigninDTO: UserSigninDTO) {
    const { email } = userSigninDTO;
    const userFound = await this.userRepository.search(email);
    if (userFound) {
      const passwordVerify = await this.userRepository.validatePassword(
        userSigninDTO,
      );
      if (passwordVerify) {
        const token = await this.createToken(userFound.id, email);
        return { token, user: userFound };
      }
      if (!passwordVerify) {
        throw new UnauthorizedException(`Invalid Password.`);
      }
    }
    if (!userFound) {
      throw new UnauthorizedException(`Invalid Credetians.`);
    }
  }
}
