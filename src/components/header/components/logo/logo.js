// Отдельный компонент для логотипа в шапке
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from '../../../icon/icon';

// Стилизованные компоненты для текста
const LargeText = styled.div`
	font-size: 48px;
	font-weight: 600;
	line-height: 48px;
	margin-top: 17px;
`;
const Smalltext = styled.div`
	font-size: 20px;
	font-weight: bold;
`;

const LogoContainer = ({ className }) => (
	<Link className={className} to="/">
		<Icon id="fa-code" size="70px" margin="0 10px 0 0" />
		<div>
			<LargeText>Блог</LargeText>
			<Smalltext>веб-разработчика</Smalltext>
		</div>
	</Link>
);

export const Logo = styled(LogoContainer)`
	display: flex;
	margin-top: -21px;
`;
