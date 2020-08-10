import {IsString, Matches, MaxLength, MinLength} from 'class-validator';

export class UserSignupDTO {
    @IsString()
    @MinLength(4)
    @MaxLength(30)
    username: string;

    
}