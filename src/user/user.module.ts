import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/*.providers";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { userProvider } from "./user.provider";

@Module(
	{
		imports: [DatabaseModule],
		controllers: [UserController],
		providers:
			[
				UserService,
				...userProvider
			]
	}
)
export class UserModule { };
