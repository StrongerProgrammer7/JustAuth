import { AxiosResponse } from "axios";
import { postDataAxios } from "../http/request";
import { IAuthResponse } from "../utils/interfaces/AuthReponse";

export const login = async (email: string,password: string): Promise<AxiosResponse<IAuthResponse>> =>
{
	return await postDataAxios<IAuthResponse>('/login',
		{
			email: email,
			password: password
		}
	);
};

export const registration = async (email: string,password: string): Promise<AxiosResponse<IAuthResponse>> =>
{
	return await postDataAxios<IAuthResponse>('/registration',
		{
			email: email,
			password: password
		}
	);
};

export const logout = async (): Promise<void> =>
{
	postDataAxios('/logout',{});
};
