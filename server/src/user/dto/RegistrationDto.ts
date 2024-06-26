import { IsEmail,IsNotEmpty,Length } from "class-validator";

export class ReqRegistrationDto
{
	@IsEmail()
	readonly email: string;
	@IsNotEmpty()
	@Length(3,255)
	readonly password: string;
}


