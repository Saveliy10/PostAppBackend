import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
	constructor(private readonly prismaService: PrismaService) { }

	async create(createCommentDto: CreateCommentDto) {
		const { email, body, postId } = createCommentDto;
		const comment = await this.prismaService.comment.create({
			data: {
				email,
				body,
				postId,
			},
		});
		return comment;
	}

	async findAllCommentsByPostId(postId: string) {
		return await this.prismaService.comment.findMany({
			where: {
				postId,
			},
		});
	}

	// async findOne(id: number) {
	//   return `This action returns a #${id} comment`;
	// }

	// async update(id: number, updateCommentDto: UpdateCommentDto) {
	//   return `This action updates a #${id} comment`;
	// }

	// async remove(id: number) {
	//   return `This action removes a #${id} comment`;
	// }
}
