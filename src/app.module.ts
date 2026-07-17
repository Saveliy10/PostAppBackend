import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { PrismaModule } from './prisma/prisma.module';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		PostModule,
		PrismaModule,
		CommentModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
