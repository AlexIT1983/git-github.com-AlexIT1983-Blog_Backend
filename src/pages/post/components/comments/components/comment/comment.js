// Компонент для комментария
import { Icon } from "../../../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { removeCommentAsync } from "../../../../../../actions";
import { openModal, CLOSE_MODAL } from "../../../../../../actions";
import { ROLE } from "../../../../../../constans";
import { selectUserRole } from "../../../../../../selectors";
import PropTypes from "prop-types";
import styled from "styled-components";

// container
const CommentContainer = ({
	className,
	id,
	author,
	content,
	publishedAt,
	postId,
}) => {
	const dispatch = useDispatch();
	const userRole = useSelector(selectUserRole);

	// функция для удаления комментария
	const onCommentRemove = (id) => {
		dispatch(
			openModal({
				text: "Удалить комментарий?",
				onConfirm: () => {
					dispatch(removeCommentAsync(postId, id));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	// проверяем право доступа для админа и модератора на удаление комментария

	const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(userRole);

	return (
		<div className={className}>
			<div className="comment">
				<div className="information-panel">
					<div className="author">
						<Icon
							inactive="true"
							id="fa fa-user-circle-o"
							size="18px"
							margin="0 0 0 0px"
							onClick={() => {}}
						/>
						{author}
					</div>
					<div className="pubished-at">
						<Icon
							inactive="true"
							id="fa fa-calendar-o"
							size="18px"
							margin="0 0 0 10px"
							onClick={() => {}}
						/>
						{publishedAt}
					</div>
				</div>
				<div className="comment-text">{content}</div>
			</div>
			{isAdminOrModerator && (
				<Icon
					id="fa fa-trash-o"
					size="21px"
					margin="0 0 0 10px"
					onClick={() => {
						onCommentRemove(id);
					}}
				/>
			)}
		</div>
	);
};

// styled component
export const Comment = styled(CommentContainer)`
	display: flex;
	margin-top: 10px;

	& .comment {
		width: 550px;
		padding: 5px 10px;
		border: 1px solid #000;
	}

	& .information-panel {
		display: flex;
		justify-content: space-between;
	}
	& .athor {
		display: flex;
	}
	& .published-at {
		display: flex;
	}
`;

// типизация компонента
Comment.propTypes = {
	postId: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	author: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
};
