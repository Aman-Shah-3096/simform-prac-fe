import { TextField } from '@material-ui/core';
import { Formik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { loginAction } from 'shared/store/auth.action';
import { ROUTES } from 'shared/utils/constants';
import { loginFormValidationSchema } from 'shared/utils/validation-schema';

export const LoginForm: React.FC<{
	initialValues: any;
	onSubmit: (data: any) => any;
}> = (props) => {
	const [loginMessage, setLoginMessage] = useState('');
	const [messageType, setMessageType] = useState('');
	const dispatch = useDispatch();
	const history = useHistory();

	const login = async (data: any) => {
		return dispatch(
			loginAction({
				email: data.email,
				password: data.password
			})
		);
	};

	return (
		<div className="panel-wrapper">
			<div className="panel-header">Login</div>

			<Formik
				enableReinitialize={true}
				initialValues={props.initialValues}
				validationSchema={loginFormValidationSchema}
				validateOnBlur={false}
				validateOnChange={false}
				onSubmit={async (data: any) => {
					await login(data)
						.then((response: any) => {
							if (response) {
								if (response.isError) {
									setLoginMessage(
										response.message ||
											'Sorry, some error occured'
									);
									setMessageType('error');
								} else {
									setLoginMessage(
										response.message || 'Success'
									);
									setMessageType('success');
									history.push(ROUTES.home);
								}
							} else {
								setLoginMessage('Sorry, some error occured');
								setMessageType('error');
							}
						})
						.catch((err) => console.log(err));
				}}
			>
				{({
					handleSubmit,
					setFieldValue,
					setFieldError,
					values,
					errors
				}) => (
					<form onSubmit={handleSubmit} className="form-wrapper">
						<div className="form-item">
							<TextField
								fullWidth
								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
								label={'Email'}
								type="email"
								name="email"
								value={values.email}
								onChange={(e) => {
									const val = e.target.value;
									setFieldValue('email', val);
								}}
							/>
							{errors && errors.email && (
								<p className="error">{errors.email}</p>
							)}
						</div>

						<div className="form-item">
							<TextField
								fullWidth
								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
								label={'Password'}
								type="password"
								name="password"
								value={values.password}
								onChange={(e) => {
									const val = e.target.value;
									setFieldValue('password', val);
								}}
							/>
							{errors && errors.password && (
								<p className="error">{errors.password}</p>
							)}
						</div>

						<div className="text--right">
							<Link
								to={`${ROUTES.forgotPass}`}
								className="no--text-decoration text--bg font-size--14"
							>
								Forgot Password?
							</Link>
						</div>

						<button type="submit" className="form-action-btn">
							Login
						</button>

						{loginMessage && (
							<p className={`panel-message ${messageType}`}>
								{loginMessage}
							</p>
						)}
					</form>
				)}
			</Formik>
		</div>
	);
};
