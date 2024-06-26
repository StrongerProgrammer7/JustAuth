import { UserDto } from "src/user/dto/UserDto";


export class TokenDto
{
	readonly user: UserDto;
	readonly userId: number;
	readonly refreshToken: string;

}


export class GenerateTokenDto
{
	readonly refreshToken: string;
	readonly accessToken: string;
}
