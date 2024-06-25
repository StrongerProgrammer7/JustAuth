import { Inject,Injectable } from "@nestjs/common";
import { Consts } from "src/const";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt";
import * as uuid from "uuid";
import { MailService } from "src/mail/mail.service";
import { TokenService } from "src/token/token.service";
import { RespRegistrationDto } from "./dto/RegistrationDto";
import { ResUserDto } from "./dto/UserDto";

@Injectable()
export class UserService
{
	private mailService = new MailService();
	constructor(
		@Inject(Consts.USERREPO) private readonly userRepository: typeof User,
		private readonly tokenService: TokenService) 
	{

	}

	async registration(email: string,password: string): Promise<RespRegistrationDto>
	{
		const candidate = await this.userRepository.findOne({ where: { login: email } });
		if (candidate)
		{
			throw new Error('User is exists already');
		}
		const hashPassowrd = await bcrypt.hash(password,16);
		const activationLink = uuid.v4();
		const user = await this.userRepository.create(
			{
				login: email,
				password: hashPassowrd,
				activationLink
			});

		await this.mailService.sendActivationMail(email,`${process.env.API_URL}/api/activate/${activationLink}`);
		const userDto: ResUserDto = { ...user };
		const tokens = this.tokenService.generateToken(userDto);
		await this.tokenService.saveToken(user.id,tokens.refreshToken);
		return {
			...tokens,user
		};
	}

	async activate(activationLink: string)
	{
		const user = await this.userRepository.findOne({ where: { activationLink: activationLink } });
		if (!user)
			throw new Error('Not correct link activate');
		user.isActivationLink = true;
		await user.save();
	}
	async findAll(): Promise<User[]>
	{
		return this.userRepository.findAll<User>();
	}
}
