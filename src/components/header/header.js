// Наш компонет Хедер (шапка)
import styled from 'styled-components';
import { ControlPanel, Logo } from './components';

// создаем компонент для описания в шапке
const Discription = styled.div`
	font-style: italic;
`;

// Контейнер для стилизованного компонента
const HeaderContainer = ({ className }) => (
	<header className={className}>
		<Logo />
		<Discription>
			Веб-технологии
			<br />
			Написание кода
			<br />
			Разбор ошибок
		</Discription>
		<ControlPanel />
	</header>
);

// Стилизованая версия Хедера(экспортируем ее)
export const Header = styled(HeaderContainer)`
	display: flex;
	justify-content: space-between;
	position: fixed;
	top: 0;
	width: 1000px;
	height: 120px;
	box-shadow: 0px -2px 18px #000;
	padding: 20px 40px;
	background-color: #fff;
`;
