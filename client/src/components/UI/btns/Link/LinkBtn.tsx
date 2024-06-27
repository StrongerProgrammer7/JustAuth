import React,{ PropsWithChildren } from 'react';
import css from './linkbtn.module.css';

interface ILinkBtn extends PropsWithChildren
{
	handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
	styles?:
	{
		bottom?: string;
		right?: string;
		top?: string;
		left?: string;
		position?: "relative" | "absolute";
	};
}

const LinkBtn = ({ handleClick,styles,children }: ILinkBtn) =>
{
	return (
		<button
			className={css.btn_link}
			onClick={handleClick}
			style={{
				...styles
			}}
		>
			{children}
		</button>
	);
};

export default LinkBtn;
