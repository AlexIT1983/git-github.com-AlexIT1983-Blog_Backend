// Отдельный компонент для стилизации таблицы пользователей.

import styled from 'styled-components';
import PropTypes from 'prop-types';

const TableRowContainer = ({ children, className }) => (
	<div className={className}>{children}</div>
);

// styled component

export const TableRow = styled(TableRowContainer)`
	display: flex;
	align-items: center;
	border: ${({ border }) => (border ? '1px solid #000' : 'none')};

	& > div {
		display: flex;
		padding: 0 10px;
	}

	& .login-column {
		width: 172px;
	}
	& .registered-at-column {
		width: 213px;
	}
	& .role-column {
		width: auto;
	}
`;

// типизация компонента
TableRow.propTypes = {
	children: PropTypes.node.isRequired,
};
