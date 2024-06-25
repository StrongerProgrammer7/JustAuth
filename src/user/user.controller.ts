import { Body,Controller,Get,HttpStatus,Param,Post,Res } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ReqRegistrationDto,RespRegistrationDto } from './dto/RegistrationDto';
import { Response } from 'express';

@Controller('api')
export class UserController
{
	constructor(private readonly userService: UserService) { }



	@Post('registration')
	async regiistration(@Body() request: ReqRegistrationDto,
		@Res({ passthrough: true }) res: Response): Promise<RespRegistrationDto>
	{
		try
		{
			const { email,password } = request;
			if (!email || !password)
				throw new Error("Empty request body");
			const response = await this.userService.registration(email,password);
			res.cookie('refreshToken',response.refreshToken,{
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true
			});

			return response;
		}
		catch (error)
		{
			console.log(error);
		}
	}
	@Post('login')
	async login()
	{
		try
		{

		}
		catch (error)
		{

		}
	}
	@Post('logout')
	async logout()
	{
		try
		{

		}
		catch (error)
		{

		}
	}
	@Get('users')
	async findAll(): Promise<User[]>
	{
		try
		{

			return await this.userService.findAll();
		}
		catch (error)
		{

		}

	}
	@Get('activate/:link')
	async activate(@Param('link') link: string,@Res() response: Response): Promise<void>
	{
		try
		{
			await this.userService.activate(link);
			return response.redirect(process.env.CLIENT_URL);
		}
		catch (error)
		{
			console.log(error);
		}

	}
	@Get('refresh')
	async refresh(): Promise<User[]>
	{
		try
		{
			return await this.userService.findAll();
		}
		catch (error)
		{

		}

	}
}
