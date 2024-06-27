import { FC } from 'react';
import css from './pulsarbtn.module.css';

interface IPulsarBtn
{
	title: string;
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const PulsarBtn: FC<IPulsarBtn> = ({ title,onClick }) => 
{
	return (
		<div className={css.btn_container}>
			<button
				data-testid={`cypress-pulsar-btn-${title}`}
				className={css.btn}
				onClick={onClick}>{title}
			</button>
		</div>
	);
};

export default PulsarBtn;
