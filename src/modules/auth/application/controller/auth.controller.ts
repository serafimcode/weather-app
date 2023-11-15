import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../service';
import {
  SignInRequestDto,
  SignInResponseDto,
  SignUpRequestDTO,
  SignUpResponseDTO,
} from '../dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() body: SignUpRequestDTO): Promise<SignUpResponseDTO> {
    try {
      return await this.authService.signUp(body);
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }

  @Post('sign-in')
  async signIn(@Body() body: SignInRequestDto): Promise<SignInResponseDto> {
    try {
      return await this.authService.signIn(body);
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }
}
