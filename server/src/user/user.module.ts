import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/*.providers";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { userProvider } from "./user.provider";
import { TokenModule } from "src/token/token.module";
import { tokenProvider } from "src/token/token.provider";
import { TokenService } from "src/token/token.service";

@Module(
	{
		imports: [DatabaseModule],
		controllers: [UserController],
		providers:
			[
				UserService,
				TokenService,
				...userProvider,
				...tokenProvider
			],
		exports: [UserService,TokenService]
	}
)
export class UserModule { };
