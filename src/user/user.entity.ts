import { Table,Column,Model,DataType,HasOne } from 'sequelize-typescript';
import { Token } from 'src/token/token.entity';

@Table({ tableName: 'users' })
export class User extends Model<User>
{

	@Column({
		allowNull: false,
		type: DataType.STRING,
		unique: true
	})
	login: string;

	@Column(
		{
			allowNull: false,
			type: DataType.STRING
		}
	)
	password: string;

	@Column(DataType.STRING)
	picture: string;

	@Column(DataType.BOOLEAN)
	isActivationLink: boolean;

	@Column(DataType.STRING)
	activationLink: string;

	@HasOne(() => Token)
	refreshToken: Token[];
}
