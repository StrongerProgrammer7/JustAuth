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
	isRegistration = false;
	isLoad = false;
	message = "";
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

	setRegistration(bool: boolean)
	{
		this.isRegistration = bool;
	}

	setMessage(str: string)
	{
		this.message = str;
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
				this.message = erAxios.response?.data.message || "";
				return handleError('login',erAxios.response?.data.message,error)(error) as IErrorAxios;
			}
			this.message = `Unknown error sorry status=${500}:(`;
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
			this.setLoad(true);
			const response = await registration(email,password);
			console.log(response);
			this.entryUser(response.data);
			this.message = "Success registration!";
		} catch (error)
		{
			if (error instanceof IErrorAxios)
			{
				const erAxios = error.errors;
				this.message = erAxios.response?.data.message || "";
				return handleError('registration',erAxios.response?.data.message,error)(error) as IErrorAxios;
			}
			this.message = `Unknown error sorry status=${500}:(`;
			handleError('registration',"Unknown error",error);
		}
		finally
		{
			this.setLoad(false);
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
				this.message = erAxios.response?.data.message || "";
				return handleError('logout',erAxios.response?.data.message,error)(error) as IErrorAxios;
			}
			this.message = `Unknown error sorry status=${500}:(`;
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
				this.message = erAxios.response?.data.message || "";
				return handleError('checkAuth',erAxios.response?.data.message,error)(error) as IErrorAxios;
			}
			this.message = `Unknown error sorry status=${500}:(`;
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
