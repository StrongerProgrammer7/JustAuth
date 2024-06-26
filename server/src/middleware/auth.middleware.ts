import { Injectable,NestMiddleware } from '@nestjs/common';
import { Request,Response,NextFunction } from 'express';
import { ApiError } from 'src/exception/api-error.service';
import { TokenService } from 'src/token/token.service';
import { ResUserDto } from 'src/user/dto/ResponseDto';

interface AuthRequest extends Request
{
	user?: ResUserDto;
}
@Injectable()
export class AuthMiddleware implements NestMiddleware 
{
	constructor(private readonly tokenService: TokenService) { }
	use(req: AuthRequest,res: Response,next: NextFunction) 
	{
		try 
		{
			const authorizationHeader = req.headers.authorization;
			if (!authorizationHeader)
				return next(ApiError.UnAuthorizedError());

			const accessToken = authorizationHeader.split(' ')[1];
			if (!accessToken)
				return next(ApiError.UnAuthorizedError());
			const userData = this.tokenService.validateAccessToken(accessToken);
			if (!userData)
				return next(ApiError.UnAuthorizedError());
			req.user = userData;
			next();
		} catch (error) 
		{
			return next(ApiError.UnAuthorizedError());

		}
	}

}
