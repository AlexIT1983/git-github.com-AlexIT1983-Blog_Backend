// Наш проект Блог (Модуль2 Практика)

import { Routes, Route } from "react-router-dom";
import { Error, Header, Footer, Modal } from "./components";
import { ERROR } from "./constans";
import { Authorization, Registration, Users, Post, Main } from "./pages";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./actions";
import styled from "styled-components";

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1000px;
	min-height: 100%;
	margin: 0 auto;
	background-color: #fff;
	position: relative;
`;

const Page = styled.div`
	padding: 120px 0 20px;
	text-decoration: bold;
	font-size: 22px;
`;

export const Blog = () => {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem("userData");

		// если пользователя нету, ничего не делать
		if (!currentUserDataJSON) {
			return;
		}

		// преобразуем данные из формата JSON
		const currentUserData = JSON.parse(currentUserDataJSON);

		dispatch(
			setUser({
				...currentUserData,
				roleId: Number(currentUserData.roleId),
			}),
		);
	}, [dispatch]);

	return (
		<AppColumn>
			<Header />

			<Page>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/users" element={<Users />} />
					<Route path="/post" element={<Post />} />
					<Route path="/post/:id" element={<Post />} />
					<Route path="/post/:id/edit" element={<Post />} />
					<Route
						path="*"
						element={<Error error={ERROR.PAGE_NOT_EXIST} />}
					/>
				</Routes>
			</Page>
			<Footer />
			<Modal />
		</AppColumn>
	);
};
