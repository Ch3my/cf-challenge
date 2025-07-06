import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() user: any) {
    // In a real application, you would validate user credentials here
    // For now, we'll just return a token for any user
    return this.authService.login(user);
  }
}
