import { Inject,Injectable } from "@nestjs/common";
import { Consts } from "src/const";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt";
import * as uuid from "uuid";
import { MailService } from "src/mail/mail.service";
import { TokenService } from "src/token/token.service";
import { ApiError } from "src/exception/api-error.service";
import { ResponseDto,ResUserDto } from "./dto/ResponseDto";

@Injectable()
export class UserService
{
	private mailService = new MailService();
	constructor(
		@Inject(Consts.USERREPO) private readonly userRepository: typeof User,
		private readonly tokenService: TokenService) 
	{

	}

	private getUserForToken(user: User)
	{
		return {
			id: user.id,
			login: user.login,
		};
	}
	async registration(email: string,password: string): Promise<ResponseDto>
	{
		const candidate = await this.userRepository.findOne({ where: { login: email } });
		if (candidate)
			throw ApiError.BadRequest('User registered already');

		const hashPassowrd = await bcrypt.hash(password,5);
		const activationLink = uuid.v4();
		const user = await this.userRepository.create(
			{
				login: email,
				password: hashPassowrd,
				activationLink
			});

		await this.mailService.sendActivationMail(email,`${process.env.API_URL}/api/activate/${activationLink}`);

		const tokens = this.tokenService.generateToken(this.getUserForToken(user));
		await this.tokenService.saveToken(user.id,tokens.refreshToken);
		return {
			...tokens,
			user:
			{
				login: user.login,
				id: user.id,
				isActivationLink: user.isActivationLink
			}
		};
	}

	async activate(activationLink: string)
	{
		const user = await this.userRepository.findOne({ where: { activationLink: activationLink } });
		if (!user)
			throw ApiError.BadRequest('Not correct link activate');
		user.isActivationLink = true;
		await user.save();
	}

	async login(email: string,password: string): Promise<ResponseDto>
	{
		const user = await this.userRepository.findOne(({ where: { login: email } }));
		if (!user)
			throw ApiError.BadRequest('User does not exists!');

		const isPassEquals = await bcrypt.compare(password,user.password);
		if (!isPassEquals)
			throw ApiError.BadRequest('Not correct password');

		const tokens = this.tokenService.generateToken(this.getUserForToken(user));
		await this.tokenService.saveToken(user.id,tokens.refreshToken);
		return {
			...tokens,user:
			{
				login: user.login,
				id: user.id,
				isActivationLink: user.isActivationLink
			}
		};

	}

	async logout(refreshToken: string): Promise<number>
	{
		const token = await this.tokenService.removeToken(refreshToken);

		return token;
	}

	async refresh(refreshToken: string)
	{
		const userData = this.tokenService.validateRefreshToken(refreshToken);
		const tokenFromDatabase = await this.tokenService.findToken(refreshToken);
		if (!userData || !tokenFromDatabase)
			throw ApiError.UnAuthorizedError();

		const user = await this.userRepository.findByPk(userData.id);

		const tokens = this.tokenService.generateToken(this.getUserForToken(user));
		await this.tokenService.saveToken(user.id,tokens.refreshToken);
		return {
			...tokens,
			user:
			{
				login: user.login,
				id: user.id,
				isActivationLink: user.isActivationLink
			}
		};
	}

	async findAll(): Promise<User[]>
	{
		return await this.userRepository.findAll<User>();
	}
}
