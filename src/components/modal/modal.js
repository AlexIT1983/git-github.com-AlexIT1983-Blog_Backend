// Отдельный компонент для модального окна.
import { useSelector } from 'react-redux';
import { Button } from '../button/button';
import {
	selectModalText,
	selectModalOnCancel,
	selectModalOnConfirm,
	selectModalIsOpen,
} from '../../selectors';
import styled from 'styled-components';

const ModalContainer = ({ className }) => {
	const isOpen = useSelector(selectModalIsOpen);
	const text = useSelector(selectModalText);
	const onConfirm = useSelector(selectModalOnConfirm);
	const onCancel = useSelector(selectModalOnCancel);

	// проверка на условие isOpen, если оно закрыто - то ничего не отображаем
	if (!isOpen) {
		return null;
	}

	return (
		<div className={className}>
			<div className="overlay"></div>
			<div className="box">
				<h3>Удалить комментарий?{text}</h3>
				<div className="buttons">
					<Button width="120px" onClick={onConfirm}>
						Да
					</Button>
					<Button width="120px" onClick={onCancel}>
						Отмена
					</Button>
				</div>
			</div>
		</div>
	);
};

export const Modal = styled(ModalContainer)`
	position: fixed;

	z-index: 20;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;

	& .overlay {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
	}

	& .box {
		position: relative;
		text-align: center;
		top: 50%;
		width: 400px;
		margin: 0 auto;
		padding: 0 20px 20px;
		background-color: #fff;
		border: 2px solid #000;
		transform: translate(0, -50%)
		z-index: 30;
	}

	& .buttons {
		display: flex;
		justify-content: center;
	}
	& .buttons button {
		margin: 0 5px;
	}
`;
