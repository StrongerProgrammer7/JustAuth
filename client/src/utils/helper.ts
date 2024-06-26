import { jwtDecode,JwtPayload } from "jwt-decode";

export function handleError(name: string,message?: string,error?: unknown)
{
	console.group("Handle Error");
	console.log(name);
	console.log(message);
	console.error(error);
	console.groupEnd();
	return (err: unknown) =>
	{
		throw err;
	};
}

export const getCookie = (name: string): string | undefined | unknown =>
{
	try 
	{
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2)
		{
			return parts.pop()?.split(";").shift();
		}
	}
	catch (error) 
	{
		handleError("getCookie",`Error with get cookie ${name}`)(error);
		throw error;
	}
};

export const setCookieDocument = (name: string,value: string,max_age?: number,extDays = 1,path = "/") =>
{
	try 
	{
		const max = max_age || new Date().getTime();
		const d = new Date(max * 1000).toString();
		const expires = "expires=" + d;
		document.cookie = `${name}=${value}; ${expires}; path=${path};`;
	}
	catch (error) 
	{
		handleError("setCookieDocument",`Error with set cookie ${name} -${value} - ${max_age}`)(error);
	}
};

export const removeCookieDocument = (name: string) =>
{
	try 
	{
		document.cookie = `${name}=; path=/; expires = Thu, 01 Jan 1970 00:00:00 GMT`;
	}
	catch (error) 
	{
		handleError("setCookieDocument",`Error with set cookie ${name}`)(error);
	}
};

export const parseToken = (token: string): JwtPayload =>
{
	try 
	{
		return jwtDecode(token);
	}
	catch (error) 
	{
		console.error(error);
		throw new Error("JSON parse token error");
	}
};
