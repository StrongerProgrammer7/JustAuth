
import { useContext,useReducer } from "react";
import { Context } from "../../App";
import { observer } from "mobx-react-lite";

type IAction =
	{
		type: string;
		payload: string;
	};
const initialInput =
{
	email: 'halif41026@luravel.com',
	password: '1234'
};

const inputReducer = (state: typeof initialInput,action: IAction) =>
{
	const { type,payload } = action;

	switch (type)
	{
		case 'email':

			return {
				...state,
				email: payload
			};
		case 'password':
			return {
				...state,
				password: payload
			};
		default:
			return state;
	}
};

const LoginForm = () =>
{
	const [state,dispatch] = useReducer(inputReducer,initialInput);
	const { store } = useContext(Context);

	const changeInput = (e: React.ChangeEvent<HTMLInputElement>) =>
	{
		dispatch({ type: e.target.type,payload: e.target.value });

	};

	const handleLogin = () =>
	{
		store.login(state.email,state.password);
	};

	const handleRegistration = () =>
	{
		store.registration(state.email,state.password);
	};
	return (
		<div>
			<input
				onChange={changeInput}
				type="email"
				placeholder="email"
				value={state.email}
			/>
			<input
				onChange={changeInput}
				type="password"
				placeholder="password"
				value={state.password}
			/>
			<button onClick={handleLogin}>Login</button>
			<button onClick={handleRegistration}>Registration</button>
		</div>
	);
};

export default observer(LoginForm);
