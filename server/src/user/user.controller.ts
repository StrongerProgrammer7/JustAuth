import { Body,Controller,Get,HttpStatus,Next,Param,Post,Req,Res,UsePipes,ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ReqRegistrationDto } from './dto/RegistrationDto';
import { NextFunction,Request,Response } from 'express';
import { ApiError } from 'src/exception/api-error.service';
import { ResponseDto } from './dto/ResponseDto';
import { Cookies } from './cookie.decorator';
import { Consts } from 'src/const';

@Controller('api')
export class UserController
{
	constructor(private readonly userService: UserService) { }

	@Post('registration')
	@UsePipes(new ValidationPipe({ transform: true }))
	async regiistration(
		@Body() req: ReqRegistrationDto,
		@Res({ passthrough: true }) res: Response,
		@Next() next: NextFunction): Promise<ResponseDto>
	{
		try
		{
			const { email,password } = req;
			if (!email || !password)
				throw ApiError.BadRequest("Empty request body");
			const response = await this.userService.registration(email,password);
			res.cookie(Consts.REFRESH_TOKEN,response.refreshToken,{
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true
			});

			return response;
		}
		catch (error)
		{
			next(error);
		}
	}
	@Post('login')
	@UsePipes(new ValidationPipe({ transform: true }))
	async login(
		@Body() req: ReqRegistrationDto,
		@Res({ passthrough: true }) res: Response,
		@Next() next: NextFunction
	)
	{
		try
		{
			const { email,password } = req;
			if (!email || !password)
				throw ApiError.BadRequest("Empty request body");
			const response = await this.userService.login(email,password);
			res.cookie(Consts.REFRESH_TOKEN,response.refreshToken,{
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true
			});
			return response;
		}
		catch (error)
		{
			next(error);
		}
	}
	@Post('logout')
	async logout(
		@Cookies(Consts.REFRESH_TOKEN) refreshToken: string,
		@Res({ passthrough: false }) res: Response,
		@Next() next: NextFunction
	)
	{
		try
		{
			if (!refreshToken)
				return res.status(HttpStatus.ACCEPTED).json();
			const token = await this.userService.logout(refreshToken);
			res.clearCookie(Consts.REFRESH_TOKEN,
				{
					path: '/',
					domain: 'localhost'
				}
			);
			return res.status(HttpStatus.ACCEPTED).json({ token,message: "OK" });
		}
		catch (error)
		{
			next(error);
		}
	}

	@Get('refresh')
	async refresh(
		@Cookies(Consts.REFRESH_TOKEN) refreshToken: string,
		@Res({ passthrough: true }) res: Response,
		@Next() next: NextFunction
	)
	{
		try
		{
			if (!refreshToken)
				throw ApiError.UnAuthorizedError();
			const response = await this.userService.refresh(refreshToken);
			res.cookie(Consts.REFRESH_TOKEN,response.refreshToken,{
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true
			});
			return response;
		}
		catch (error)
		{
			next(error);
		}
	}

	@Get('users')
	async findAll(
		@Res({ passthrough: true }) response: Response,
		@Next() next: NextFunction): Promise<User[]>
	{
		try
		{
			return await this.userService.findAll();
		}
		catch (error)
		{
			next(error);
		}

	}
	@Get('activate/:link')
	async activate(
		@Param('link') link: string,
		@Res() response: Response,
		@Next() next: NextFunction): Promise<void>
	{
		try
		{
			if (!link)
				throw ApiError.BadRequest('Required param unique link!');
			await this.userService.activate(link);
			return response.redirect(process.env.CLIENT_URL);
		}
		catch (error)
		{
			next(error);
		}

	}

}
