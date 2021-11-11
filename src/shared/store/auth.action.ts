import { ThunkDispatch } from 'redux-thunk';
import * as actionTypes from 'shared/store/action-types';
import { Action } from 'shared/interface';
import {
	createAction,
	setAuthJwt,
	setLoggedInUserDetails
} from 'shared/utils/utilities';
import { login } from 'api/index.api';

const loginAction = (data: any) => {
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	return async (
		dispatch: ThunkDispatch<
			Record<string, unknown>,
			Record<string, unknown>,
			Action
		>
	) => {
		const response = await login(data);

		let userDetails = {};
		let authJwt = '';
		if (response && !response.isError) {
			userDetails = response.data;
			authJwt = response.token;

			setLoggedInUserDetails(userDetails);
			setAuthJwt(authJwt);
			dispatch(
				createAction(actionTypes.LOGIN, {
					userDetails,
					authJwt
				})
			);
		}
		return response;
	};
};

const updateUserDetails = (data: any) => {
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	return async (
		dispatch: ThunkDispatch<
			Record<string, unknown>,
			Record<string, unknown>,
			Action
		>
	) => {
		setLoggedInUserDetails(data);
		dispatch(
			createAction(actionTypes.UPDATE_USER_DETAILS, {
				userDetails: data
			})
		);
	};
};

export { loginAction, updateUserDetails };
