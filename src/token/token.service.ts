import { Inject } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { Consts } from "src/const";
import { Token } from "./token.entity";
import { ResUserDto } from "src/user/dto/UserDto";
import { GenerateTokenDto } from "./dto/tokenDto";

export class TokenService
{
	constructor(@Inject(Consts.TOKENREPO) private readonly tokenRepository: typeof Token) { }

	public generateToken(payload: ResUserDto): GenerateTokenDto
	{
		const accessToken = jwt.sign(payload,process.env.JWT_SECRET_KEY,
			{
				expiresIn: '15m'
			}
		);
		const refreshToken = jwt.sign(payload,process.env.REFRESH_TOKEN_KEY,
			{
				expiresIn: '30d'
			}
		);
		return {
			accessToken,
			refreshToken
		};
	}

	async saveToken(userId: number,refreshToken: string)
	{
		const tokenData = await this.tokenRepository.findOne({ where: { userId: userId } });
		if (tokenData)
		{
			tokenData.refreshToken = refreshToken;
			return tokenData.save();
		}
		const token = await this.tokenRepository.create({ userId: userId,refreshToken });
		return token;
	}
}
