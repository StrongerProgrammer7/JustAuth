import { Consts } from "src/const";
import { Token } from "./token.entity";


export const tokenProvider =
	[
		{
			provide: Consts.TOKENREPO,
			useValue: Token
		}
	];
