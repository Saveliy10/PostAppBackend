import { IsEmail, IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateCommentDto {
	@IsString({ message: 'Name must be a string' })
	@IsNotEmpty({ message: 'Name cannot be empty' })
	@IsEmail()
	@Length(5, 30, { message: 'Email must be between 5 and 30 characters' })
	email: string;

	@IsString({ message: 'Body must be a string' })
	@IsNotEmpty({ message: 'Body cannot be empty' })
	@Length(5, 250, { message: 'Body must be between 5 and 250 characters' })
	body: string;

	@IsUUID()
	@IsNotEmpty({ message: 'Post ID cannot be empty' })
	postId: string;
}
