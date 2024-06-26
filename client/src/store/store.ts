import { makeAutoObservable } from "mobx";
import { IUser } from "../utils/interfaces/IUser";
import { login,logout,registration } from "../service/AuthService";
import { handleError,parseToken,removeCookieDocument,setCookieDocument } from "../utils/helper";
import { EToken } from "../utils/enums";
import { IAuthResponse,IErrorAxios } from "../utils/interfaces/AuthReponse";
import axios from "axios";
import { API_URL } from "../utils/const";

export default class Store
{
	user = {} as IUser;
	isAuth = false;
	isLoad = false;
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

	setLoad(load: boolean)
	{
		this.isLoad = load;
	}
	async login(email: string,password: string) 
	{
		try 
		{
			this.setLoad(true);
			const response = await login(email,password);
			console.log(response);
			this.entryUser(response.data);
		} catch (error)
		{
			if (error instanceof IErrorAxios)
			{
				const erAxios = error.errors;
				return handleError('login',erAxios.response?.data.message,error)(error) as IErrorAxios;
			}

			handleError('login',"Unknown error",error);
		}
		finally
		{
			this.setLoad(false);
		}
	}

	async registration(email: string,password: string) 
	{
		try 
		{
			const response = await registration(email,password);
			console.log(response);
			this.entryUser(response.data);
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

	async checkAuth() 
	{
		try 
		{
			this.setLoad(true);
			const response = await axios.get<IAuthResponse>(`${API_URL}/refresh`,{ withCredentials: true });
			console.log(response);
			this.entryUser(response.data);
		} catch (error) 
		{
			if (error instanceof IErrorAxios)
			{
				const erAxios = error.errors;
				return handleError('checkAuth',erAxios.response?.data.message,error)(error) as IErrorAxios;
			}

			handleError('checkAuth',"Unknown error",error);
		}
		finally
		{
			this.setLoad(false);
		}
	}

	private entryUser(data: IAuthResponse)
	{
		const payloadToken = parseToken(data.accessToken);
		setCookieDocument(EToken.ACCESS_TOKEN,data.accessToken,payloadToken.exp);
		this.setAuth(true);
		this.setUser(data.user);
	}
}
