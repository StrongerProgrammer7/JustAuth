import { Inject,Injectable } from "@nestjs/common";
import { Consts } from "src/const";
import { User } from "./user.entity";

@Injectable()
export class UserService
{
	constructor(@Inject(Consts.USERREPO) private userRepository: typeof User) { }

	async findAll(): Promise<User[]>
	{
		return this.userRepository.findAll<User>();
	}
}
