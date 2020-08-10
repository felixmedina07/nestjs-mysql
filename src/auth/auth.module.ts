import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from './user/user.repository';
import { BasicStrategy } from './strategy/basic.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: '1y'},
    })
  ],
  providers: [AuthService,BasicStrategy,JwtStrategy],
  controllers: [AuthController],
  exports:[PassportModule]
})
export class AuthModule {}
