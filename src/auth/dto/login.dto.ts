import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class LoginRequest {
	@IsString({ message: 'Username must be a string' })
	@IsNotEmpty({ message: 'Username is required' })
	username: string;

	@IsString({ message: 'Password must be a string' })
	@IsNotEmpty({ message: 'Password is required' })
	@MinLength(8, { message: 'Password must be at least 8 characters long' })
	@MaxLength(100, { message: 'Password must not exceed 100 characters' })
	password: string;
}
