import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserDTO } from '../user/dtos/user.dto';
import { LoginDTO } from '../user/dtos/login.dto';
import { RequestBodyObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Authentication')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @ApiOperation({
    summary: 'Login.',
    description: 'Login.',
    requestBody: <RequestBodyObject>{
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              username: {
                type: 'string',
                example: 'example@example.com',
              },
              password: {
                type: 'string',
                example: 'password',
              },
            },
          },
        },
      },
    },
  })
  @ApiOkResponse({ description: 'SignIn.', type: LoginDTO })
  async signIn(@Req() req) {
    return await this.authService.signIn(req.user);
  }

  @Post('signup')
  async signUp(@Body() userDTO: UserDTO) {
    return await this.authService.signUp(userDTO);
  }
}
