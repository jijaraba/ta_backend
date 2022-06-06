import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from '../user/dtos/user.dto';
import { LoginDTO } from '../user/dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.getByUsername(username);
    const isValidPassword = await this.userService.checkPassword(
      password,
      user.password,
    );

    if (user && isValidPassword) return user;

    return null;
  }

  /**
   * SignIn
   * @param user
   */
  async signIn(user: any) {
    const payload = {
      username: user.username,
      sub: 211111,
    };

    return {
      success: true,
      message: 'Signing in successfully',
      access_token: this.jwtService.sign(payload, { audience: 'ta' }),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  /**
   * SignUp
   * @param userDTO
   */
  async signUp(userDTO: UserDTO) {
    const user = await this.userService.store(userDTO);
    return await this.signIn(user);
  }
}
