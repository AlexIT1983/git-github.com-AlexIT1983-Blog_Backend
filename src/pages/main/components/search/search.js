// Компонент для поиска на главное странице.

import { Icon, Input } from '../../../../components';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SearchContainer = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={className}>
			<Input
				value={searchPhrase}
				placeholder="Поиск статьи ..."
				onChange={onChange}
			/>
			<Icon inactive="true" id="fa-search" margin="0 7px 0 0 " size="18px" />
		</div>
	);
};

export const Search = styled(SearchContainer)`
	display: flex;
	position: relative;
	width: 340px;
	height: 40px;
	margin: 40px auto 0;

	& > input {
		padding: 5px 37px 5px 5px;
		width: 100%;
		margin: 0;
	}

	& > div {
		position: absolute;
		right: 4px;
		font-size: 21px;
		top: 5px;
	}
`;

// типизация компонента
Search.propTypes = {
	searchPhrase: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};
