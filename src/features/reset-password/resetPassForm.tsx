import { TextField } from '@material-ui/core';
import { getTokenData, resetPassword } from 'api/index.api';
import { Formik } from 'formik';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { ROUTES } from 'shared/utils/constants';
import { resetPassFormValidationSchema } from 'shared/utils/validation-schema';

export const ResetPassForm: React.FC<{
	initialValues: any;
	onSubmit: (data: any) => any;
}> = (props) => {
	const [message, setMessage] = useState('');
	const [messageType, setMessageType] = useState('');
	const [isTokenValid, setIsTokenValid] = useState(false);
	const [token, setToken] = useState('');
	const history = useHistory();

	useEffect(() => {
		(async function () {
			const queryParams = queryString.parse(window.location.search);
			const token: string = queryParams.token
				? queryParams.token.toString()
				: '';

			if (token) {
				const response = await getTokenData(token);

				if (response) {
					if (response.isError) {
						setMessage(
							response.message || 'Sorry, some error occured'
						);
						setMessageType('error');
					} else {
						if (
							response.data &&
							!response.data.used &&
							response.data.expiresAt > Date.now()
						) {
							setIsTokenValid(true);
							setToken(token);
						} else {
							setMessage(
								'Reset token is either expired or invalid'
							);
							setMessageType('error');
						}
					}
				} else {
					setMessage('Sorry, some error occured');
					setMessageType('error');
				}
			} else {
				history.push(`${ROUTES.login}`);
			}
		})();
	}, [history]);

	return (
		<div className="panel-wrapper">
			<div className="panel-header">Reset Password</div>

			{!isTokenValid && message && (
				<p className="token-message">{message}</p>
			)}

			{isTokenValid && (
				<Formik
					enableReinitialize={true}
					initialValues={props.initialValues}
					validationSchema={resetPassFormValidationSchema}
					validateOnBlur={false}
					validateOnChange={false}
					onSubmit={async (data: any) => {
						delete data.confirmPassword;
						const response: any = await resetPassword({
							...data,
							token
						});

						if (response && response.isError) {
							setMessage(response.message);
						} else {
							history.push(`${ROUTES.login}`);
						}
					}}
				>
					{({
						handleSubmit,
						setFieldValue,
						setFieldError,
						values,
						errors
					}) => (
						<form onSubmit={handleSubmit}>
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
									label={'New Password'}
									type="password"
									name="newPassword"
									value={values.newPassword}
									onChange={(e) => {
										const val = e.target.value;
										setFieldValue('newPassword', val);

										if (val !== values.confirmPassword)
											setFieldError(
												'confirmPassword',
												"Passwords didn't match"
											);
										else
											setFieldError(
												'confirmPassword',
												''
											);
									}}
								/>
								{errors && errors.newPassword && (
									<p className="error">
										{errors.newPassword}
									</p>
								)}
							</div>

							<div className="form-item">
								<TextField
									fullWidth
									variant="outlined"
									InputLabelProps={{
										shrink: true
									}}
									label={'Confirm New Password'}
									type="password"
									name="confirmPassword"
									value={values.confirmPassword}
									onChange={(e) => {
										const val = e.target.value;
										setFieldValue('confirmPassword', val);

										if (val !== values.newPassword)
											setFieldError(
												'confirmPassword',
												"Passwords didn't match"
											);
										else
											setFieldError(
												'confirmPassword',
												''
											);
									}}
								/>
								{errors && errors.confirmPassword && (
									<p className="error">
										{errors.confirmPassword}
									</p>
								)}
							</div>

							<button type="submit" className="form-action-btn">
								Reset Password
							</button>

							{message && (
								<p className={`panel-message ${messageType}`}>
									{message}
								</p>
							)}
						</form>
					)}
				</Formik>
			)}
		</div>
	);
};
