import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { getAuthJwt, getUrl } from 'shared/utils/utilities';

const axiosInstance = axios.create();
const CancelToken = axios.CancelToken;
let cancel_req: any;

export { cancel_req };

export interface AxiosParams {
	method: Method;
	url: string;
	data?: any;
	queryParams?: AxiosRequestConfig['params'];
	headers?: AxiosRequestConfig['headers'];
}

const get = <T = any>(
	url: string,
	queryParams: AxiosParams['queryParams'] = {},
	headers: AxiosParams['headers'] = {}
): Promise<T> => {
	return commonAxios<T>({
		method: 'GET',
		url: getUrl(url),
		queryParams,
		headers
	});
};

const post = (
	url: string,
	params: any = {},
	queryParams = {},
	headers: AxiosParams['headers'] = {}
): Promise<any> => {
	return commonAxios({
		method: 'POST',
		url: getUrl(url, queryParams),
		data: params,
		headers
	});
};

const put = (
	url: string,
	params: any = {},
	headers: AxiosParams['headers'] = {}
): Promise<any> => {
	return commonAxios({
		method: 'PUT',
		url: getUrl(url),
		data: params,
		headers
	});
};

const deleteRequest = (
	url: string,
	params: any = {},
	headers: AxiosParams['headers'] = {}
): Promise<any> => {
	return commonAxios({
		method: 'DELETE',
		url: getUrl(url),
		data: params,
		headers
	});
};

const patch = (
	url: string,
	params: any = {},
	headers: AxiosParams['headers'] = {}
): Promise<any> => {
	return commonAxios({
		method: 'PATCH',
		url: getUrl(url),
		data: params,
		headers
	});
};

const commonAxios = <T = any>({
	method,
	url,
	data,
	queryParams,
	headers
}: AxiosParams): Promise<T> => {
	const reqHeaders: any = {
		'Content-Type': 'application/json',
		...headers
	};

	const token = getAuthJwt();
	if (token) {
		reqHeaders['access_token'] = `${token}`;
	}

	const body = data;

	const reqConfig: AxiosRequestConfig = {
		method: method,
		url: url,
		cancelToken: new CancelToken(function executor(c) {
			// An executor function receives a cancel function as a parameter
			cancel_req = c;
		}),
		headers: reqHeaders,
		data: body,
		params: queryParams
	};

	return new Promise((resolve, reject) => {
		axiosInstance(reqConfig)
			.then((response: AxiosResponse<any>) => {
				resolve(response.data);
			})
			.catch((error) => {
				if (
					error &&
					error.response &&
					error.response.data &&
					error.response.data.message
				) {
					resolve(error.response.data);
				} else {
					reject(error.response);
				}
			});
	});
};

const httpService = {
	get: get,
	post: post,
	put: put,
	deleteRequest: deleteRequest,
	patch: patch,
	commonAxios: commonAxios
};

export { axiosInstance };

export default httpService;
