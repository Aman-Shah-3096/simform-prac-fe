import { lazy } from 'react';

const Login = lazy(() => import('features/login/loginContainer'));
const Registration = lazy(
	() => import('features/registration/registrationContainer')
);
const ForgotPassword = lazy(
	() => import('features/forgot-password/forgotPassContainer')
);
const ResetPassword = lazy(
	() => import('features/reset-password/resetPassContainer')
);
const Home = lazy(() => import('features/home/homeContainer'));

export { Login, Registration, ForgotPassword, ResetPassword, Home };
