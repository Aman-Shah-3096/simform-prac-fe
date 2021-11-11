import { isEmpty } from 'lodash';
import queryString from 'query-string';
import { Action } from 'shared/interface';
import { API_BASE_URL } from './constants';

export const getUrl = (url: string, params: any = {}): string => {
	let urlString = `${API_BASE_URL}${url}`;
	if (params && !isEmpty(params)) {
		urlString += `?${queryString.stringify(params)}`;
	}
	return urlString;
};

export const createAction = (action: string, data: any = null): Action => {
	return {
		type: action,
		payload: data
	};
};

export const isLoggedin = () => {
	if (localStorage.getItem('userDetails')) {
		return true;
	}
	return false;
};

export const setLoggedInUserDetails = (data: any) => {
	localStorage.setItem('userDetails', JSON.stringify(data));
};

export const setAuthJwt = (token: string) => {
	localStorage.setItem('accessToken', token);
};

export const getLoggedInUserDetails = () => {
	const userDetails: any = localStorage.getItem('userDetails');
	try {
		return JSON.parse(userDetails) || {};
	} catch (error) {
		return {};
	}
};

export const getAuthJwt = () => {
	const accessToken: any = localStorage.getItem('accessToken');
	return accessToken || '';
};

export const clearUserAuthDetails = () => {
	localStorage.removeItem('accessToken');
	localStorage.removeItem('userDetails');
};
