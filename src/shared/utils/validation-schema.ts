import * as Yup from 'yup';

export const loginFormValidationSchema = Yup.object().shape({
	email: Yup.string().email().required('Email is required').strict(true),
	password: Yup.string().required('Password is required').strict(true)
});

export const registrationFormValidationSchema = Yup.object().shape({
	firstName: Yup.string().required('First Name is required').strict(true),
	lastName: Yup.string().required('Last Name is required').strict(true),
	profileImage: Yup.mixed().required('Profile Image is required'),
	email: Yup.string().email().required('Email is required').strict(true),
	password: Yup.string().required('Password is required').strict(true),
	confirmPassword: Yup.string().test(function (value) {
		const { password } = this.parent;
		if (!value)
			return this.createError({
				message: 'Confirm Password is required'
			});
		if (value === password) return true;
		else
			return this.createError({
				message: "Passwords didn't match"
			});
	})
});

export const userDetailsFormValidationSchema = Yup.object().shape({
	firstName: Yup.string().required('First Name is required').strict(true),
	lastName: Yup.string().required('Last Name is required').strict(true),
	profileImageUrl: Yup.string()
		.required('Profile Image is required')
		.strict(true),
	email: Yup.string().email().required('Email is required').strict(true)
});

export const forgotPassFormValidationSchema = Yup.object().shape({
	email: Yup.string().email().required('Email is required').strict(true)
});

export const resetPassFormValidationSchema = Yup.object().shape({
	newPassword: Yup.string().required('New Password is required').strict(true),
	confirmPassword: Yup.string().test(function (value) {
		const { newPassword } = this.parent;
		if (!value)
			return this.createError({
				message: 'Confirm Password is required'
			});
		if (value === newPassword) return true;
		else
			return this.createError({
				message: "Passwords didn't match"
			});
	})
});
