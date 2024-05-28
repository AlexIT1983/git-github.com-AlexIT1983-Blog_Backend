// Компонент для статьи (post)

import { useEffect, useLayoutEffect, useState } from "react";
import { useMatch, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { PostContent, Comments, PostForm } from "./components";
import { Error, PrivateContent } from "../../components";
import { useDispatch } from "react-redux";
import { loadPostAsync, RESET_POST_DATA } from "../../actions";
import { selectPost } from "../../selectors";
import { ROLE } from "../../constans";

import styled from "styled-components";

// контейнер
const PostContainer = ({ className }) => {
	const dispatch = useDispatch();
	const params = useParams(); // для получения id статьи
	const [isLoading, setIsLoading] = useState(true);
	const isCreating = useMatch("/post");
	const isEditing = useMatch("/post/:id/edit");
	const post = useSelector(selectPost);
	const [error, setError] = useState(null);

	// будем стерать данные о постах
	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA);
	}, [dispatch]);

	// получим данные с сервера данные о странице
	useEffect(() => {
		// делаем проверку на создание новой статьи
		if (isCreating) {
			setIsLoading(false);
			return;
		}

		dispatch(loadPostAsync(params.id)).then((postData) => {
			setError(postData.error);
			setIsLoading(false);
		});
	}, [params.id, dispatch, isCreating]);

	if (isLoading) {
		return null;
	}

	const SpecificPostPage =
		isCreating || isEditing ? (
			<PrivateContent access={[ROLE.ADMIN]}>
				<div className={className}>
					<PostForm post={post} />
				</div>
			</PrivateContent>
		) : (
			<div className={className}>
				<PostContent post={post} />
				<Comments comments={post.comments} postId={post.id} />
			</div>
		);

	return error ? <Error error={error} /> : SpecificPostPage;
};

// Стилизованный компонент
export const Post = styled(PostContainer)`
	margin: 40px 0;
	padding: 0 80px;
`;
