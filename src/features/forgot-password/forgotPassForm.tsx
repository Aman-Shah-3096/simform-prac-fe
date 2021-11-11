import { TextField } from '@material-ui/core';
import { forgotPassword } from 'api/index.api';
import { Formik } from 'formik';
import { useState } from 'react';
import { forgotPassFormValidationSchema } from 'shared/utils/validation-schema';

export const ForgotPassForm: React.FC<{
	initialValues: any;
	onSubmit: (data: any) => any;
}> = (props) => {
	const [message, setMessage] = useState('');
	const [messageType, setMessageType] = useState('');

	return (
		<div className="panel-wrapper">
			<div className="panel-header">Forgot Password?</div>

			<Formik
				enableReinitialize={true}
				initialValues={props.initialValues}
				validationSchema={forgotPassFormValidationSchema}
				validateOnBlur={false}
				validateOnChange={false}
				onSubmit={async (data: any) => {
					const response: any = await forgotPassword(data);

					if (response) {
						if (response.isError) {
							setMessage(
								response.message || 'Sorry, some error occured'
							);
							setMessageType('error');
						} else {
							setMessage(response.message || 'Success');
							setMessageType('success');
						}
					} else {
						setMessage('Sorry, some error occured');
						setMessageType('error');
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

						<button type="submit" className="form-action-btn">
							Send Reset Link
						</button>

						{message && (
							<p className={`panel-message ${messageType}`}>
								{message}
							</p>
						)}
					</form>
				)}
			</Formik>
		</div>
	);
};
