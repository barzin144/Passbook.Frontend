import {
	SET_USER_AUTHENTICATION_TRUE,
	SET_USER_AUTHENTICATION_FALSE,
	SET_USER_AUTHENTICATION_TOKEN
} from '../actionTypes';

const initialState = {
	UserAuthentication:
		!!localStorage.getItem('UserAuthenticationToken') && localStorage.getItem('UserAuthenticationToken') !== '',
	UserAuthenticationToken: localStorage.getItem('UserAuthenticationToken')
};

const UseReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_AUTHENTICATION_TRUE: {
			const { UserAuthentication } = action.payload;
			return {
				...state,
				UserAuthentication: UserAuthentication
			};
		}
		case SET_USER_AUTHENTICATION_FALSE: {
			const { UserAuthentication } = action.payload;
			localStorage.removeItem('UserAuthenticationToken');
			return {
				...state,
				UserAuthentication: UserAuthentication
			};
		}
		case SET_USER_AUTHENTICATION_TOKEN: {
			const { UserAuthenticationToken } = action.payload;
			localStorage.setItem('UserAuthenticationToken', UserAuthenticationToken);
			return {
				...state,
				UserAuthenticationToken: UserAuthenticationToken
			};
		}
		default:
			return state;
	}
};
export default UseReducer;
