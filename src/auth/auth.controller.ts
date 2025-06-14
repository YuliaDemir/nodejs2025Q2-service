import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    async signup(@Body() dto: SignupDto) {
        return this.authService.signup(dto.login, dto.password);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() dto: LoginDto) {
        return this.authService.login(dto.login, dto.password);
    }

    @Post('refresh')
    async refresh(@Body() dto: RefreshTokenDto) {
        return this.authService.refreshToken(dto.refreshToken);
    }

}
