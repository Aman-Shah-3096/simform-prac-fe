export interface Action {
	type: string;
	payload: any;
}

export interface AuthState {
	userDetails: any;
	authJwt: string;
}

export interface State {
	authState: AuthState;
}

export interface ApiResponse {
	isError: boolean;
	data?: any;
	message: string;
}

export interface Routes {
	exact: boolean;
	path: string;
	component: any;
	guard?: any;
}
