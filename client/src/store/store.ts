import { makeAutoObservable } from "mobx";
import { IUser } from "../utils/interfaces/IUser";
import { login,logout,registration } from "../service/AuthService";
import { handleError,parseToken,removeCookieDocument,setCookieDocument } from "../utils/helper";
import { EToken } from "../utils/enums";
import { IErrorAxios } from "../utils/interfaces/AuthReponse";

export default class Store
{
	user = {} as IUser;
	isAuth = false;
	constructor()
	{
		makeAutoObservable(this);
	}

	setAuth(bool: boolean) 
	{
		this.isAuth = bool;
	}

	setUser(user: IUser)
	{
		this.user = user;
	}

	async login(email: string,password: string) 
	{
		try 
		{
			const response = await login(email,password);
			console.log(response);
			const payloadToken = await parseToken(response.data.accessToken);
			setCookieDocument(EToken.ACCESS_TOKEN,response.data.accessToken,payloadToken.exp,1);
			this.setAuth(true);
			this.setUser(response.data.user);
		} catch (error)
		{
			if (error instanceof IErrorAxios)
			{
				const erAxios = error.errors;
				return handleError('login',erAxios.response?.data.message,error)(error) as IErrorAxios;
			}

			handleError('login',"Unknown error",error);
		}
	}

	async registration(email: string,password: string) 
	{
		try 
		{
			const response = await registration(email,password);
			console.log(response);
			const payloadToken = parseToken(response.data.accessToken);
			console.log(payloadToken);
			setCookieDocument(EToken.ACCESS_TOKEN,response.data.accessToken,1);
			this.setAuth(true);
			this.setUser(response.data.user);
		} catch (error)
		{
			if (error instanceof IErrorAxios)
			{
				const erAxios = error.errors;
				return handleError('registration',erAxios.response?.data.message,error)(error) as IErrorAxios;
			}

			handleError('registration',"Unknown error",error);
		}
	}

	async logout() 
	{
		try 
		{
			await logout();
			removeCookieDocument(EToken.ACCESS_TOKEN);
			this.setAuth(false);
			this.setUser({} as IUser);
		} catch (error)
		{
			if (error instanceof IErrorAxios)
			{
				const erAxios = error.errors;
				return handleError('logout',erAxios.response?.data.message,error)(error) as IErrorAxios;
			}

			handleError('logout',"Unknown error",error);
		}
	}
}
