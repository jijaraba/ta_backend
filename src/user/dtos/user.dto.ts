import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IUser } from '../interfaces/user.interface';

export class UserDTO implements IUser {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @IsNotEmpty()
  @IsString()
  readonly username: string;
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
