import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { PrismaModule } from './prisma/prisma.module';
import { CommentModule } from './comment/comment.module';

@Module({
	imports: [PostModule, PrismaModule, CommentModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
