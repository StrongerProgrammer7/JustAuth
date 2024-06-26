import { HttpException } from "@nestjs/common";

export class ApiError extends HttpException
{
	errors;

	constructor(status,message,error = [])
	{
		super(message,status);
		this.errors = error;
	}

	static UnAuthorizedError()
	{
		return new ApiError(401,'User is not authorized');
	}

	static BadRequest(message: string,errors = [])
	{
		return new ApiError(400,message,errors);
	}
}
