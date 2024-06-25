import { Controller,Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller()
export class UserController
{
	constructor(private readonly userService: UserService) { }

	@Get()
	async findAll(): Promise<User[]>
	{
		return await this.userService.findAll();
	}
}
