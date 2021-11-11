import httpService from 'shared/services/http.service';

export const login = async (data: any) => {
	try {
		const response = await httpService.post(`/login`, data);
		return response;
	} catch (error) {
		return null;
	}
};

export const register = async (data: any) => {
	try {
		const response = await httpService.post(`/register`, data);
		return response;
	} catch (error) {
		return null;
	}
};

export const updateUserDetails = async (userId: string, data: any) => {
	try {
		const response = await httpService.put(`/user/${userId}`, data);
		return response;
	} catch (error) {
		return null;
	}
};

export const uploadFile = async (data: any) => {
	try {
		const response = await httpService.post(
			`/upload`,
			data,
			{},
			{
				'Content-Type': 'multipart/form-data'
			}
		);
		return response;
	} catch (error) {
		return null;
	}
};

export const forgotPassword = async (data: any) => {
	try {
		const response = await httpService.post(`/reset-pass`, data);
		return response;
	} catch (error) {
		return null;
	}
};

export const resetPassword = async (data: any) => {
	try {
		const response = await httpService.put(`/reset-pass`, data);
		return response;
	} catch (error) {
		return null;
	}
};

export const getTokenData = async (token: string) => {
	try {
		const response = await httpService.get(`/reset-pass/${token}`);
		return response;
	} catch (error) {
		return null;
	}
};

export const logout = async () => {
	try {
		const response = await httpService.get(`/logout`);
		return response;
	} catch (error) {
		return null;
	}
};
