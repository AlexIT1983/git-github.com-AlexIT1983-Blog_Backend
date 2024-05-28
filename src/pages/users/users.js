// Наш компонент для страницы пользователи

import { H2, PrivateContent } from "../../components";
import { TableRow, UserRow } from "./components";
import { useEffect, useState } from "react";
import { ROLE } from "../../constans";
import { checkAccess } from "../../utils";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../selectors";
import styled from "styled-components";
import { request } from "../../utils/request";

const UserContainer = ({ className }) => {
	// создадим состояние для списка ролей, пользователей и ошибки
	const [errorMessage, setErrorMessage] = useState(null);
	const [roles, setRoles] = useState([]);
	const [users, setUsers] = useState([]);
	const [shouldUpdateUserList, setshouldUpdateUserList] = useState(false);
	const userRole = useSelector(selectUserRole);

	// в хуке useEffect делаем запрос к серверу.
	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}

		Promise.all([request("/users"), request("/users/roles")]).then(
			([usersRes, rolesRes]) => {
				if (usersRes.error || rolesRes.error) {
					setErrorMessage(usersRes.error || rolesRes.error);
					return;
				}

				setUsers(usersRes.data);
				setRoles(rolesRes.data);
			},
		);
	}, [shouldUpdateUserList, userRole]);

	// функция для удаления пользователя
	const onUserRemove = (userId) => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}

		request(`/users/${userId}`, "DELETE").then(() => {
			setshouldUpdateUserList(!shouldUpdateUserList);
		});
	};

	return (
		<div className={className}>
			<PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
				<H2>Пользователи</H2>
				<div>
					<TableRow>
						<div className="login-column">Логин</div>
						<div className="registered-at-column">
							Дата регистрации
						</div>
						<div className="role-column">Роль</div>
					</TableRow>

					{users.map(({ id, login, roleId, registeredAt }) => (
						<UserRow
							key={id}
							id={id}
							login={login}
							roleId={roleId}
							registeredAt={registeredAt}
							roles={roles.filter(
								({ id: roleId }) => roleId !== ROLE.GUEST,
							)}
							onUserRemove={() => onUserRemove(id)}
						/>
					))}
				</div>
			</PrivateContent>
		</div>
	);
};

// стилизованный компонент пользователи
export const Users = styled(UserContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;
	width: 570px;
	margin: 0 auto;
	font-size: 18px;
`;
