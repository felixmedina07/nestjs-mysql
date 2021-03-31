import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Res,
  HttpStatus,
  Req,
  Get,
  UseGuards,
} from '@nestjs/common';
import { UserSignupDTO, UserSigninDTO } from './dto/user-signup.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
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
  @Post('/signin')
  async SignIn(@Body(ValidationPipe) userSigninDTO: UserSigninDTO, @Res() res) {
    const login = await this.authService.signIn(userSigninDTO);
    try {
      res.status(HttpStatus.OK).json({
        login,
        message: 'Signin completed!',
        statusCode: 201,
      });
    } catch (error) {
      return error.message;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/ver')
  async Ver(@Res() res, @Req() req) {
    const user = req.user;

    res.status(HttpStatus.OK).json({
      user,
      message: 'Signin completed!',
      statusCode: 201,
    });
  }
}
