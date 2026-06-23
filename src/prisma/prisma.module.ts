import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Делаем глобальным, чтобы не импортировать в каждый модуль
@Module({
	providers: [PrismaService],
	exports: [PrismaService],
})
export class PrismaModule {}
