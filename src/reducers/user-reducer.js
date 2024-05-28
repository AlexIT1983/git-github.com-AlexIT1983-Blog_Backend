// Наши редьюсер для user

import { ACTION_TYPE } from '../actions';
import { ROLE } from '../constans';

const initialUserState = {
	session: null,
	id: null,
	login: null,
	roleId: ROLE.GUEST,
}; // Начальное состояние

// сам редьюсер
export const userReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USER: {
			return {
				...state,
				...action.payload,
			};
		}
		case ACTION_TYPE.LOGOUT: {
			return initialUserState;
		}

		default:
			return state;
	}
};
