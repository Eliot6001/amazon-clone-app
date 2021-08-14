import { SET_USER } from '../constants/index';

export const setUser = (user) => {
	if (user == '') {
		console.log('its null')
		return {
			type: SET_USER,
			payload: null,
		}
	}
	return {
		type: SET_USER,
		payload: {...user},
	};
};

