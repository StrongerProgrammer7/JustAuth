import { Table,Column,Model,DataType,BelongsTo,ForeignKey } from 'sequelize-typescript';
import { User } from 'src/user/user.entity';


@Table({ tableName: 'tokens' })
export class Token extends Model<Token>
{
	@Column(
		{
			allowNull: false,
			type: DataType.STRING(1000)
		}
	)
	refreshToken: string;

	@BelongsTo(() => User,'userId')
	user: User;

	@ForeignKey(() => User)
	@Column(
		{
			type: DataType.INTEGER,
			allowNull: false
		}
	)
	userId: number;

}
