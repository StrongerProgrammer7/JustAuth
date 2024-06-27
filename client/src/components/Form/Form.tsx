
import { useContext } from "react";
import { Context } from "../../App";
import { observer } from "mobx-react-lite";
import css from './form.module.css';
import useForm from "./Form.hook";
import PulsarBtn from "../UI/btns/PulsarBtn/PulsarBtn";
import GradientCircularProgress from "../UI/loading/GradientLoading";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import LinkBtn from "../UI/btns/Link/LinkBtn";

const LoginForm = () =>
{
	const [state,dispatch] = useForm();
	const { store } = useContext(Context);

	const changeInput = (e: React.ChangeEvent<HTMLInputElement>) =>
	{
		dispatch({ type: e.target.type,payload: e.target.value });

	};

	const handleSubmit = () =>
	{
		if (!store.isRegistration)
			store.login(state.email,state.password);
		else
			store.registration(state.email,state.password);
	};

	const handleRegistration = () =>
	{
		store.setRegistration(!store.isRegistration);
	};
	return (
		<>
			<h1 className={css.form__title}>
				{
					store.isRegistration
						?
						"Registration"
						:
						"Sign in"
				}
			</h1>
			<input
				className={css.form__input}
				onChange={changeInput}
				type="email"
				placeholder="email"
				value={state.email}
			/>
			<input
				className={css.form__input}
				onChange={changeInput}
				type="password"
				placeholder="password"
				value={state.password}
			/>
			{
				store.isLoad
					?
					<GradientCircularProgress
					/>
					:
					<PulsarBtn
						title={store.isRegistration ? "Sign up" : "Sign in"}
						onClick={handleSubmit}
					/>
			}

			{
				!store.isLoad &&
				<LinkBtn
					styles={{
						bottom: "5px",
						right: "10px"
					}}
					handleClick={handleRegistration}
				>
					{
						!store.isRegistration
							?
							<span className={css.form__link_span}>Sign up <ArrowRightAltIcon /></span>
							:
							<span className={css.form__link_span}>Sign in <ArrowRightAltIcon /></span>
					}
				</LinkBtn>

			}

		</>
	);
};

export default observer(LoginForm);
