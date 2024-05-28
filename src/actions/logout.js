// Наш экшн для выхода из аккаунта (logout)

import { request } from "../utils/request";
import { ACTION_TYPE } from "./action-type";

// экшн креэйтер
export const logout = () => {
	request("/logout", "POST");

	return {
		type: ACTION_TYPE.LOGOUT,
	};
};
