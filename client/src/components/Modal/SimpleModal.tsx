import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import css from './simplemodla.module.css';
import React,{ useEffect,useState } from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react-lite';

const style = {

};
interface ISimpleModal
{
	message: string;
	title: string;
	clearMessageAfterClose: () => void;
}

const SimpleModal: React.FC<ISimpleModal> = ({ message,title,clearMessageAfterClose }) =>
{
	const [isOpen,setIsOpen] = useState<boolean>(false);

	const handleOpen = () => setIsOpen(true);
	const handleClose = () => setIsOpen(false);

	useEffect(() =>
	{
		if (message.length > 0)
			handleOpen();
		else
			handleClose();
	},[message]);
	return ReactDOM.createPortal(
		<div>
			<Modal
				open={isOpen}
				onClose={clearMessageAfterClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"

			>
				<Box sx={style} className={css.simple_modal}>
					<Typography
						className={css.modal__title}
						id="modal-modal-title"
						variant="h6"
						component="h2">
						{title}
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }} className={css.modal__text}>
						{message}
					</Typography>
				</Box>
			</Modal>
		</div>,document.getElementById('portal')!
	);
};

export default observer(SimpleModal);

