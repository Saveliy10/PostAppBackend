import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
//import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostController {
	constructor(private readonly postService: PostService) {}

	@Post('create-post')
	create(@Body() createPostDto: CreatePostDto) {
		return this.postService.create(createPostDto);
	}

	@Get('find-all')
	findAll() {
		return this.postService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.postService.findOne(id);
	}

	// @Patch(':id')
	// update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
	// 	return this.postService.update(+id, updatePostDto);
	// }

	// @Delete(':id')
	// remove(@Param('id') id: string) {
	// 	return this.postService.remove(+id);
}
