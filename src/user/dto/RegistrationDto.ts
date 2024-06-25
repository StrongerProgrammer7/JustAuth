import { ResUserDto } from "./UserDto";

export class ReqRegistrationDto
{
	readonly email: string;
	readonly password: string;
}

export class RespRegistrationDto 
{
	readonly refreshToken: string;
	readonly accessToken: string;
	readonly user: ResUserDto;

}

