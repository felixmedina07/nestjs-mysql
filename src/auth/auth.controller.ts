import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Res,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { UserSignupDTO } from './dto/user-signup.dto';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  async SignUp(@Body(ValidationPipe) userSignupDTO: UserSignupDTO, @Res() res) {
    try {
      const user = await this.authService.signUp(userSignupDTO);
      res.status(HttpStatus.OK).json({
        user,
        message: 'usuario creado',
        statusCode: 202,
      });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}
