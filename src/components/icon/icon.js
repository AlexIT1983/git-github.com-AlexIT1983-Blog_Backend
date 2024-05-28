// Отдельный компонент для иконок, который принимает пропсы
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Создадим контейнер для иконки
const IconConteiner = ({ className, id, inactive, ...props }) => (
	<div className={className} {...props}>
		<i className={`fa ${id}`} aria-hidden="true"></i>
	</div>
);

// создаем стилизованный компонент для иконки
export const Icon = styled(IconConteiner)`
	font-size: ${({ size = '24xp' }) => size};
	margin: ${({ margin = '0' }) => margin};
	color: ${({ disabled }) => (disabled ? '#ccc' : '#000')};

	&:hover {
		cursor: ${({ inactive }) => (inactive ? 'default' : 'pointer')};
	}
`;

// типизация компонента
Icon.propTypes = {
	id: PropTypes.string.isRequired,
	inactive: PropTypes.string,
};
