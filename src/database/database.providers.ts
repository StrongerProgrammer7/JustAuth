import { Sequelize } from "sequelize-typescript";
import { User } from '../user/user.entity';
import { Consts } from "src/const";
import { Token } from "src/token/token.entity";

export const databaseProviders =
	[
		{
			provide: Consts.SEQUELIZE,
			useFactory: async () =>
			{
				const sequelize = new Sequelize(
					{
						dialect: 'mysql',
						host: process.env.HOST,
						port: Number(process.env.PORT_DB),
						username: process.env.USERNAME_DB,
						password: process.env.PASSWORD_DB,
						database: process.env.DATABASE,

					}
				);
				sequelize.addModels([User,Token]);
				await sequelize.sync();
				return sequelize;
			}
		}
	];
