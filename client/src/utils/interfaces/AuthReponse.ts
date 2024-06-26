import { AxiosError } from "axios";
import { IUser } from "./IUser";

export interface IAuthResponse
{
	accessToken: string;
	refreshToken: string;
	user: IUser;
}

interface IResponseError
{
	message: string;
	statusCode: number;
}

export class IErrorAxios extends AxiosError<IResponseError>
{
	errors;

	constructor(message: string,error: AxiosError<IResponseError>)
	{
		super(message);
		this.errors = error;
	}

	static AxiosError(message: string,error: unknown)
	{
		const e = error as AxiosError<IResponseError>;
		return new IErrorAxios(message,e);
	}

}
