import axios,{ AxiosError,AxiosRequestConfig,AxiosResponse,InternalAxiosRequestConfig,isAxiosError } from "axios";

import { API_URL } from "../utils/const";
import { EToken } from "../utils/enums";
import { getCookie } from "../utils/helper";
import { IErrorAxios } from "../utils/interfaces/AuthReponse";

const api = axios.create(
	{
		baseURL: API_URL,
		withCredentials: true
	}
);

api.interceptors.request.use(
	(config: InternalAxiosRequestConfig<unknown>) =>
	{
		const token = getCookie(EToken.ACCESS_TOKEN);
		if (token)
		{
			config.headers.setAuthorization(`Bearer ${token}`);
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

export async function getDataAxios<T>(url: string): Promise<AxiosResponse<T>>
{
	try
	{
		return await api.get<T>(url);
	}
	catch (error)
	{
		if (isAxiosError(error))
			throw IErrorAxios.AxiosError("Error with get data axios",error as AxiosError);
		console.log(error);
		throw new Error("Unknown error");
	}
}

export async function postDataAxios<T>(url: string,data: object,config: AxiosRequestConfig<object> = {}): Promise<AxiosResponse<T>>
{
	try
	{
		return await api.post<T>(url,data,config);
	}
	catch (error)
	{
		if (isAxiosError(error))
			throw IErrorAxios.AxiosError("Error with post data axios",error as AxiosError);
		console.log(error);
		throw new Error("Unknown error");
	}
}


export async function putDataAxios(url: string,data: object,config: AxiosRequestConfig<object> = {})
{
	try
	{
		return await api.put(url,data,config);
	}
	catch (error)
	{
		if (isAxiosError(error))
			throw IErrorAxios.AxiosError("Error with put data axios",error as AxiosError);
		console.log(error);
		throw new Error("Unknown error");
	}
}

export default api;
