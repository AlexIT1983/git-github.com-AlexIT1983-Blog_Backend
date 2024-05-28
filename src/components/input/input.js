// Создадим отдельный компонент для inputa

import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputContainer = forwardRef(({ className, width, ...props }, ref) => {
	return <input className={className} {...props} ref={ref} />;
});

// Стилизованный input
export const Input = styled(InputContainer)`
	width: ${({ width = '100%' }) => width}
	height: 40px;
	margin: 0 0 10px;
	border: 1px solid #000;
	padding: 20px;
	font-size: 18px;

`;

// типизация компонента
Input.propTypes = {
	width: PropTypes.string,
};
