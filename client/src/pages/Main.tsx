import { useContext,useEffect,useState } from "react";
import LoginForm from "../components/Login/LoginForm";
import { Context } from "../App";
import { getCookie } from "../utils/helper";
import { EToken } from "../utils/enums";
import { observer } from "mobx-react-lite";
import { IUser } from "../utils/interfaces/IUser";
import { getDataAxios } from "../http/request";

const Main = () =>
{
	const { store } = useContext(Context);
	const [users,setUsers] = useState<IUser[]>([]);
	useEffect(() =>
	{
		const refresh = async () =>
		{
			const token = getCookie(EToken.ACCESS_TOKEN);
			if (token)
				await store.checkAuth();
		};
		refresh();
	},[]);

	const logout = () => 
	{
		store.logout();
	};

	const getUsers = async () =>
	{
		try 
		{
			const response = await getDataAxios<IUser[]>('/users');
			setUsers(response.data);
		} catch (error) 
		{
			console.log('error',error);
		}
	};
	if (store.isLoad)
		return (
			<h1>Loading...</h1>
		);
	if (!store.isAuth)
		return (
			<LoginForm />

		);

	return (
		<div>
			<h1>User is entry</h1>
			<h2>Email: {store.user.login} | {store.user.isActivationLink ? "Activated" : "Not activated"}</h2>
			<button onClick={logout}>Logout</button>
			<button onClick={getUsers}>Get users</button>
			{
				users.map((user) =>
				{
					return (
						<div key={user.id}>
							{user.login}
						</div>
					);
				})
			}

		</div>
	);
};

export default observer(Main);
