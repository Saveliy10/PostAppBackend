import { Controller, Post, Body, HttpCode, HttpStatus, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequest } from './dto/register.dto';
import { LoginRequest } from './dto/login.dto';
import type { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@Post('register')
	@HttpCode(HttpStatus.CREATED)
	async register(@Res({ passthrough: true }) res: Response, @Body() dto: RegisterRequest) {
		console.log('CONTROLLER CREATED', dto);
		return await this.authService.register(res, dto);
	}

	@Post('login')
	@HttpCode(HttpStatus.OK)
	async login(@Res({ passthrough: true }) res: Response, @Body() dto: LoginRequest) {
		console.log('CONTROLLER LOGIN', dto);
		return await this.authService.login(res, dto);
	}

	@Post('refresh')
	@HttpCode(HttpStatus.OK)
	async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		return await this.authService.refresh(req, res);
	}

	@Post('logout')
	@HttpCode(HttpStatus.OK)
	async logout(@Res({ passthrough: true }) res: Response) {
		return await this.authService.logout(res);
	}
}
