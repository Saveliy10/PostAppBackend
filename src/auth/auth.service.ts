import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterRequest } from './dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash, verify } from 'argon2';
import { JwtService, type JwtSignOptions } from '@nestjs/jwt';
import type { JwtPayload } from './interfaces/jwt.interface';
import { ConfigService } from '@nestjs/config';
import { LoginRequest } from './dto/login.dto';
import type { Response, Request } from 'express';
import { isDev } from '../../utils/is-dev.util';

@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_TOKEN_TTL: JwtSignOptions['expiresIn'];
  private readonly JWT_REFRESH_TOKEN_TTL: JwtSignOptions['expiresIn'];

  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.JWT_ACCESS_TOKEN_TTL = (this.configService.get<string>('JWT_ACCESS_TOKEN_TTL') ?? '15m') as JwtSignOptions['expiresIn'];
    this.JWT_REFRESH_TOKEN_TTL = (this.configService.get<string>('JWT_REFRESH_TOKEN_TTL') ?? '7d') as JwtSignOptions['expiresIn'];
  }

  async register(res: Response, dto: RegisterRequest) {
    const { name, username, password } = dto;

    const existUser = await this.prismaService.user.findUnique({
      where: {
        username,
      },
    });

    if (existUser) {
      throw new ConflictException('User with this username already exists');
    }

    const user = await this.prismaService.user.create({
      data: {
        name,
        username,
        password: await hash(password),
      },
    });

    return this.auth(res, user.id);
  }

  async login(res: Response, dto: LoginRequest) {
    console.log("LOGIN START");

    const { username, password } = dto;

    const user = await this.prismaService.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Invalid username or password');
    }

    console.log('user.password good');

    const isValidPassword = await verify(user.password, password);

    if (!isValidPassword) {
      throw new NotFoundException('Invalid username or password');
    }

    console.log('user.password valid');

    return this.auth(res, user.id);
  }

  async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies['refreshToken'];

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    let payload: JwtPayload;
    try {
      payload = await this.jwtService.verifyAsync(refreshToken) as JwtPayload;
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (payload) {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: payload.id,
        },
        select: {
          id: true,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return this.auth(res, user.id);
    }
  }

  async logout(res: Response) {
    this.setCookie(res, 'refreshToken', new Date(0));
    return { message: 'Logout successful' };
  }

  private auth(res: Response, id: string) {
    console.log("AUTH");
    const { accessToken, refreshToken } = this.generateTokens(id);

    console.log("TOKENS GENERATED");

    this.setCookie(res, refreshToken, new Date(7 * 24 * 60 * 60 * 1000 + Date.now())); // 7 days

    return { accessToken };
  }

  private generateTokens(id: string) {
    const payload: JwtPayload = { id };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_ACCESS_TOKEN_TTL,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_REFRESH_TOKEN_TTL,
    });

    return { accessToken, refreshToken };
  }

  private setCookie(res: Response, value: string, expires: Date) {
    res.cookie('refreshToken', value, {
      httpOnly: true,
      // domain: this.COOKIE_DOMAIN,
      expires,
      secure: !isDev(this.configService),
      sameSite: 'none',
    });
  }
}
