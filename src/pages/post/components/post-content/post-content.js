// Компонент для контента статьи

import { H2, Icon } from '../../../../components';
import { SpecialPanel } from '../special-panel/special-panel';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PROP_TYPES } from '../../../../constans';

const PostContentContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const navigate = useNavigate();
	return (
		<div className={className}>
			<img src={imageUrl} alt={title} />
			<H2>{title}</H2>
			<SpecialPanel
				id={id}
				publishedAt={publishedAt}
				margin="-20px 0 20px"
				editButton={
					<Icon
						id="fa fa-pencil-square-o"
						size="21px"
						margin="0 0 0 20px"
						onClick={() => navigate(`/post/${id}/edit`)}
					/>
				}
			/>

			<div className="post-text">{content}</div>
		</div>
	);
};

// стилизованный
export const PostContent = styled(PostContentContainer)`
	& img {
		float: left;
		margin: 0 20px 10px 0;
	}

	& .post-text {
		font-size: 18px;
		white-space: pre-line;
	}
`;

// типизация компонента
Comment.propTypes = {
	post: PROP_TYPES.POST.isRequired,
};
