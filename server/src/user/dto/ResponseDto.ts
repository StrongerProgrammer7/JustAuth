export class ResUserDto
{
	readonly id?: number;
	readonly login: string;
	readonly picture: string;
	readonly isActivationLink: boolean;
	readonly activationLink: string;
}


export class ResponseDto 
{
	readonly refreshToken: string;
	readonly accessToken: string;
	readonly user: ResUserDto;

}
