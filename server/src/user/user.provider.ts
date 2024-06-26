import { Consts } from "src/const";
import { User } from "./user.entity";

export const userProvider =
	[
		{
			provide: Consts.USERREPO,
			useValue: User
		}
	];
