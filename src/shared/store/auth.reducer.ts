import * as actionTypes from 'shared/store/action-types';
import { Action, AuthState } from 'shared/interface';
import { getAuthJwt, getLoggedInUserDetails } from 'shared/utils/utilities';

const authInitialState: AuthState = {
	userDetails: getLoggedInUserDetails() || {},
	authJwt: getAuthJwt() || ''
};

const authReducer = (
	state: AuthState = authInitialState,
	action: Action
): AuthState => {
	switch (action.type) {
		case actionTypes.LOGIN:
			return {
				...state,
				userDetails: action.payload.userDetails,
				authJwt: action.payload.authJwt
			};
		case actionTypes.LOGOUT:
			return { ...state, userDetails: {} };
		case actionTypes.UPDATE_USER_DETAILS:
			return {
				...state,
				userDetails: action.payload.userDetails
			};
		default:
			return state;
	}
};

export { authReducer };
