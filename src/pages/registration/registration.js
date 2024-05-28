// Наш компонент страница регистрации

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Input, Button, H2, AuthFormError } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Navigate } from "react-router-dom";
import { setUser } from "../../actions";
import { selectUserRole } from "../../selectors";
import { ROLE } from "../../constans";
import { useResetForm } from "../../hooks";
import { request } from "../../utils/request";

// схема для формы
const regFormSchema = yup.object().shape({
	login: yup
		.string()
		.required("Заполните логин.")
		.matches(
			/^\w+$/,
			"Неверно заполнен логин. Допускаются только буквы и цифры",
		)
		.min(3, "Неверно заполнен логин. Минимум 3 символа")
		.max(15, "Неверно заполнен логин. Максимум 15 символов"),
	password: yup
		.string()
		.required("Заполните пароль")
		.matches(
			/^[\w#%]+$/,
			"Неверно заполнен пароль. Допускаются буквы, цифры и знаки # %",
		)
		.min(6, "Неверно заполнен пароль. Минимум 6 символов")
		.max(30, "Неверно заполнен пароль. Максимум 30 символов"),
	passcheck: yup
		.string()
		.required("Заполните повтор пароля")
		.oneOf([yup.ref("password"), null], "Пароль не совпадает"),
});

// компонент-контейнер авторизации
const RegistrationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: "",
			password: "",
			passcheck: "",
		},
		resolver: yupResolver(regFormSchema),
	});
	const dispatch = useDispatch();

	// сделаем небольшой локальный state
	const [serverError, setServerError] = useState(null);

	// получаем roleId
	const roleId = useSelector(selectUserRole);

	// Через хук useResetForm(наш кастомный) будем делать сброс формы
	// передаем в нее функцию reset
	useResetForm(reset);

	// функци onsubmit
	const onSubmit = ({ login, password }) => {
		request("/register", "POST", { login, password }).then(
			({ error, user }) => {
				if (error) {
					setServerError(`Ошибка запроса: ${error}`);
					return;
				}
				dispatch(setUser(user));
				// отправить данные в sessionStorage
				sessionStorage.setItem("userData", JSON.stringify(user));
			},
		);
	};

	// объеденим ошибки валидации в один обработчик
	const formError =
		errors?.login?.message ||
		errors?.password?.message ||
		errors?.passcheck?.message;

	// объединение ошибки формы или сервера
	const errorMessage = formError || serverError;
	// делаем проверку на роль
	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<H2>Регистрация</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Логин..."
					{...register("login", {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="Пароль..."
					{...register("password", {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="Повтор пароля..."
					{...register("passcheck", {
						onChange: () => setServerError(null),
					})}
				/>
				<Button type="submit" width="240px" disabled={!!formError}>
					Зарегистрироваться
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
			</form>
		</div>
	);
};

// стилизованный компонент
export const Registration = styled(RegistrationContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;

	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`;
