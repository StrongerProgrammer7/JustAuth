import { FC } from "react";
import LinkBtn from "../UI/btns/Link/LinkBtn";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import css from './header.module.css';

interface IHeader
{
	isActivate: boolean;
	email: string;
	logout: () => void;
}


const Header: FC<IHeader> = ({ email,isActivate,logout }) => 
{
	return (
		<header className={css.header}>
			<p className={`${css.header__text} ${isActivate ? "" : css.email_not_activate}`}>
				Email: {email} <br />
				{
					!isActivate && "Please activate email"
				}
			</p>
			<div className={css.header_wrapper_btn}>
				<LinkBtn
					styles={
						{
							position: "relative"

						}
					}
					handleClick={logout}>
					<span className={css.header__text_btn}>Logout <ArrowRightAltIcon /></span>
				</LinkBtn>
			</div>
		</header>
	);
};

export default Header;
