import { ConfigService } from '@nestjs/config';

export function isDev(configService: ConfigService): boolean {
    const env = configService.get<string>('NODE_ENV');
    return env !== 'production';
}
