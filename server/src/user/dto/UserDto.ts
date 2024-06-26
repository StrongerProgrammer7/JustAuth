

export class UserDto
{
	readonly id?: number;
	readonly login: string;
	readonly password: string;
	readonly picture: string;
	readonly isActivationLink: boolean;
	readonly activationLink: string;

}

