export const API_BASE_URL = process.env.REACT_APP_BASE_URL;
export const APP_ROUTE_PREFIX = `/app`;

export const ROUTES = {
	login: `${APP_ROUTE_PREFIX}/login`,
	register: `${APP_ROUTE_PREFIX}/register`,
	forgotPass: `${APP_ROUTE_PREFIX}/forgot-password`,
	resetPass: `${APP_ROUTE_PREFIX}/reset-password`,
	home: `${APP_ROUTE_PREFIX}/home`
};
