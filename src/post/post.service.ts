import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
//import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Post } from '@prisma/client';

@Injectable()
export class PostService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(createPostDto: CreatePostDto): Promise<Post> {
		const { title, body } = createPostDto;
		const post = await this.prismaService.post.create({
			data: {
				title,
				body,
			},
		});
		return post;
	}

	async findAll() {
		return await this.prismaService.post.findMany();
	}

	async findOne(id: string) {
		return await this.prismaService.post.findUnique({
			where: {
				id,
			},
		});
	}

	// update(id: number, updatePostDto: UpdatePostDto) {
	// 	return `This action updates a #${id} post`;
	// }

	// remove(id: number) {
	// 	return `This action removes a #${id} post`;
	// }
}
