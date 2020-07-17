import {
	SET_USER_AUTHENTICATION_TRUE,
	SET_USER_AUTHENTICATION_FALSE,
	SET_USER_AUTHENTICATION_TOKEN
} from './actionTypes';

export const Set_User_Authentication_True = () => ({
	type: SET_USER_AUTHENTICATION_TRUE,
	payload: {
		UserAuthentication: true
	}
});

export const Set_User_Authentication_False = () => ({
	type: SET_USER_AUTHENTICATION_FALSE,
	payload: {
		UserAuthentication: false
	}
});

export const Set_User_Authentication_Token = (token) => ({
	type: SET_USER_AUTHENTICATION_TOKEN,
	payload: {
		UserAuthenticationToken: token
	}
});
