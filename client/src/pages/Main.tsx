import { useContext,useEffect,useState } from "react";
import Form from "../components/Form/Form";
import { Context } from "../App";
import { getCookie } from "../utils/helper";
import { EToken } from "../utils/enums";
import { observer } from "mobx-react-lite";
import css from './main.module.css';

import SimpleModal from "../components/Modal/SimpleModal";
import Content from "../layouts/Content/Content";

const Main = () =>
{
	const { store } = useContext(Context);
	const [animationLessSizeBlock,setAnimLessSizeBlock] = useState<string>("");
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

	useEffect(() =>
	{
		let timerId = undefined;
		if (store.isAuth)
		{
			clearTimeout(timerId);
			setAnimLessSizeBlock(css.less_size_block);
		}
		else
			timerId = setTimeout(() =>
			{
				setAnimLessSizeBlock("");
			},1500);
		return () =>
		{
			if (timerId)
				clearTimeout(timerId);
		};
	},[store.isAuth]);

	const clearErrorMessage = () =>
	{
		store.setMessage("");
	};


	return (
		<div className={css.main} >
			<div className={`${css.main_wrapper} ${store.isAuth ? css.main_content : animationLessSizeBlock}`} >

				{
					!store.isAuth
						?
						<div className={css.main_opacity_content}>
							<Form />
						</div>
						:
						<Content />
				}

			</div>
			{
				store.message.length > 0 &&
				<SimpleModal
					message={store.message}
					title={"Message for you"}
					clearMessageAfterClose={clearErrorMessage} />
			}
		</div>
	);
};

export default observer(Main);
