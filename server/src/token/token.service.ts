import { Inject } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { Consts } from "src/const";
import { Token } from "./token.entity";
import { GenerateTokenDto } from "./dto/tokenDto";
import { ResUserDto } from "src/user/dto/ResponseDto";

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

	async saveToken(userId: number,refreshToken: string): Promise<Token>
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

	async removeToken(refreshToken: string): Promise<number>
	{
		const tokenData = await this.tokenRepository.destroy({ where: { refreshToken: refreshToken } });
		return tokenData;
	}

	validateAccessToken(token): ResUserDto | null
	{
		try
		{
			const userData = jwt.verify(token,process.env.JWT_SECRET_KEY) as ResUserDto;
			return userData;
		} catch (error) 
		{
			return null;
		}
	}

	validateRefreshToken(token): ResUserDto | null
	{
		try
		{
			const userData = jwt.verify(token,process.env.REFRESH_TOKEN_KEY) as ResUserDto;
			return userData;
		} catch (error) 
		{
			return null;
		}
	}

	async findToken(refreshToken): Promise<Token>
	{
		const tokenData = await this.tokenRepository.findOne({ where: { refreshToken: refreshToken } });
		return tokenData;
	}
}
