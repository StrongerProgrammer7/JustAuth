import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/*.providers";
import { tokenProvider } from "./token.provider";

@Module(
	{
		imports: [DatabaseModule],
		providers:
			[
				...tokenProvider
			]
	}
)
export class TokenModule { };
