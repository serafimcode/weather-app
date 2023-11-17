import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../service';
import {
  SignInRequestDto,
  SignInResponseDto,
  SignUpRequestDTO,
  SignUpResponseDTO,
} from '../dto';
import { UserMapService } from '../mapper';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userMap: UserMapService,
  ) {}

  @Post('sign-up')
  async signUp(@Body() body: SignUpRequestDTO): Promise<SignUpResponseDTO> {
    try {
      const user = await this.authService.signUp(body);
      return this.userMap.toSignUpResponseDTO(user);
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }

  @Post('sign-in')
  async signIn(@Body() body: SignInRequestDto): Promise<SignInResponseDto> {
    try {
      const isUserValid = await this.authService.validateUser(
        body.login,
        body.password,
      );
      if (isUserValid) {
        const user = await this.authService.signIn(body);
        return this.userMap.toSignInResponseDTO(user);
      }
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }
}
