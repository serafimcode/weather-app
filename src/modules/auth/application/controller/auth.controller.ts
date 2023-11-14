import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../service';
import { SignUpRequestDTO, SignUpResponseDTO } from '../dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('test')
  test(): any {
    return { test: 'tested' };
  }

  @Post('sign-up')
  async signUp(@Body() body: SignUpRequestDTO): Promise<SignUpResponseDTO> {
    try {
      return await this.authService.signUp(body);
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }
}
