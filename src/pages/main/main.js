// Компонент для главной станицы ( main)
import { useMemo, useEffect, useState } from "react";
import { Pagination, PostCard, Search } from "./components";
import { PAGINATION_LIMIT } from "../../constans";
import { debounce } from "./utils";
import styled from "styled-components";
import { request } from "../../utils/request";

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [shouldSearch, setShouldSearch] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState("");

	useEffect(() => {
		// в хуке useEffect делаем запрос к серверу.
		request(
			`/posts?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`,
		).then(({ data: { posts, lastPage } }) => {
			setPosts(posts);
			setLastPage(lastPage);
		});
	}, [page, shouldSearch, searchPhrase]);

	const startDelayedSearch = useMemo(
		() => debounce(setShouldSearch, 2000),
		[],
	);
	// функция поиска
	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		// через 2 сек надо установить другое значение флага
		startDelayedSearch(!shouldSearch);
	};

	return (
		<div className={className}>
			<div className="posts-and-search">
				<Search searchPhrase={searchPhrase} onChange={onSearch} />
				{posts.length > 0 ? (
					<div className="post-list">
						{posts.map(
							({
								id,
								title,
								imageUrl,
								publishedAt,
								comments,
							}) => (
								<PostCard
									key={id}
									id={id}
									title={title}
									imageUrl={imageUrl}
									publishedAt={publishedAt}
									commentsCount={comments.length}
								/>
							),
						)}
					</div>
				) : (
					<div className="no-posts-found">Статьи не найдены</div>
				)}
			</div>

			{lastPage > 1 && posts.length > 0 && (
				<Pagination lastPage={lastPage} page={page} setPage={setPage} />
			)}
		</div>
	);
};

// стилизованный компонент

export const Main = styled(MainContainer)`
	justify-content: space-between;
	flex-direction: column;
	display: flex;

	& .post-list {
		display: flex;
		flex-wrap: wrap;
		padding: 20px 20px 80px;
	}
	& .no-posts-found {
		font-size: 18px;
		margin-top: 40px;
		text-align: center;
	}
`;
