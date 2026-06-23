import { IsNotEmpty, Length } from 'class-validator';
import { IsString } from 'class-validator';

export class CreatePostDto {
	@IsString({ message: 'Title must be a string' })
	@IsNotEmpty({ message: 'Title should not be empty' })
	@Length(5, 40, { message: 'Title must be between 5 and 40 characters' })
	title: string;

	@IsString({ message: 'Body must be a string' })
	@IsNotEmpty({ message: 'Body should not be empty' })
	@Length(10, 100, { message: 'Body must be between 10 and 100 characters' })
	body: string;
}
