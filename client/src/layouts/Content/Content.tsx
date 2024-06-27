import { useContext,useState } from 'react';
import Header from '../../components/Header/Header';
import { Context } from '../../App';
import TableUser from '../../components/Table/TableUsers';
import PulsarBtn from '../../components/UI/btns/PulsarBtn/PulsarBtn';
import { IUser } from '../../utils/interfaces/IUser';
import css from "./content.module.css";
import { getDataAxios } from '../../http/request';
import { observer } from 'mobx-react-lite';
import GradientCircularProgress from '../../components/UI/loading/GradientLoading';

const Content = () =>
{
	const { store } = useContext(Context);
	const [users,setUsers] = useState<IUser[] | undefined>(undefined);

	const logout = () => 
	{
		store.logout();
	};

	const getUsers = async () =>
	{
		try 
		{
			store.setLoad(true);
			const response = await getDataAxios<IUser[]>('/users');
			setUsers(response.data);
		} catch (error) 
		{
			console.log('error',error);
		}
		finally
		{
			store.setLoad(false);
		}
	};

	return (
		<div className={css.content}>
			<Header
				isActivate={store.user.isActivationLink}
				email={store.user.login}
				logout={logout}
			/>
			{
				store.isLoad &&
				<GradientCircularProgress />
			}
			{
				!store.isLoad &&
				<>

					<PulsarBtn
						title={"Get list users"}
						onClick={getUsers}
					/>

					{
						users &&
						<TableUser
							users={users} />
					}

				</>
			}
		</div>
	);
};

export default observer(Content);
