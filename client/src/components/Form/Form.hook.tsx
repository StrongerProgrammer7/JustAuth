import { ReducerState,useReducer } from "react";

type IAction =
	{
		type: string;
		payload: string;
	};
interface IInputs
{
	email: string;
	password: string;
}
const initialInput: IInputs =
{
	email: 'halif41026@luravel.com',
	password: '1234'
};

const inputReducer = (state: IInputs,action: IAction) =>
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

function useForm(): [IInputs,React.Dispatch<IAction>]
{
	const [state,dispatch] = useReducer(inputReducer,initialInput);
	return [state,dispatch];
}

export default useForm;
