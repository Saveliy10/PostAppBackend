import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterRequest {
	@IsString({ message: 'Name must be a string' })
	@IsNotEmpty({ message: 'Name is required' })
	@MaxLength(50, { message: 'Name must not exceed 50 characters' })
	name: string;

	@IsString({ message: 'Username must be a string' })
	@IsNotEmpty({ message: 'Username is required' })
	username: string;

	@IsString({ message: 'Password must be a string' })
	@IsNotEmpty({ message: 'Password is required' })
	@MinLength(8, { message: 'Password must be at least 8 characters long' })
	@MaxLength(100, { message: 'Password must not exceed 100 characters' })
	password: string;
}
