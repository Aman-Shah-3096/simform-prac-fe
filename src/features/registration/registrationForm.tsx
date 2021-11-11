import { TextField } from '@material-ui/core';
import { register, uploadFile } from 'api/index.api';
import { Formik } from 'formik';
import { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { Upload } from 'shared/components/Icons';
import { ROUTES } from 'shared/utils/constants';
import { registrationFormValidationSchema } from 'shared/utils/validation-schema';

export const RegistrationForm: React.FC<{
	initialValues: any;
	onSubmit: (data: any) => any;
}> = (props) => {
	const [registerMessage, setRegisterMessage] = useState('');
	const [messageType, setMessageType] = useState('');

	const profileImageUpload = useRef(null);
	const openUploader = (target: any) => {
		target.current.click();
	};

	const history = useHistory();

	return (
		<div className="panel-wrapper">
			<div className="panel-header">Register</div>

			<Formik
				enableReinitialize={true}
				initialValues={props.initialValues}
				validationSchema={registrationFormValidationSchema}
				validateOnBlur={false}
				validateOnChange={false}
				onSubmit={async (data: any) => {
					delete data.confirmPassword;

					if (data.profileImage.file) {
						const formData = new FormData();
						formData.append(
							'profileImage',
							data.profileImage.file || ''
						);

						const imageUploadResponse: any = await uploadFile(
							formData
						);

						if (
							imageUploadResponse &&
							!imageUploadResponse.isError
						) {
							data.profileImageUrl = imageUploadResponse.data;
							delete data.profileImage;
						}
					}

					const response: any = await register(data);

					if (response) {
						if (response.isError) {
							setRegisterMessage(
								response.message || 'Sorry, some error occured'
							);
							setMessageType('error');
						} else {
							setRegisterMessage(response.message || 'Success');
							setMessageType('success');
							history.push(ROUTES.login);
						}
					} else {
						setRegisterMessage('Sorry, some error occured');
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
								label={'First Name'}
								type="text"
								name="firstName"
								value={values.firstName}
								onChange={(e) => {
									const val = e.target.value;
									setFieldValue('firstName', val);
								}}
							/>
							{errors && errors.firstName && (
								<p className="error">{errors.firstName}</p>
							)}
						</div>

						<div className="form-item">
							<TextField
								fullWidth
								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
								label={'Last Name'}
								type="text"
								name="lastName"
								value={values.lastName}
								onChange={(e) => {
									const val = e.target.value;
									setFieldValue('lastName', val);
								}}
							/>
							{errors && errors.lastName && (
								<p className="error">{errors.lastName}</p>
							)}
						</div>

						<div className="form-item">
							<div className="profile-field-wrapper">
								<TextField
									fullWidth
									variant="outlined"
									className={`profile-field-input-wrapper`}
									InputLabelProps={{
										shrink: true
									}}
									label={'Upload Profile Image'}
									type="text"
									name="profileImage"
									value={values.profileImage?.file?.name}
									onClick={() => {
										openUploader(profileImageUpload);
									}}
									disabled
								/>
								<div className="upload-icon">
									<Upload />
								</div>
								<input
									type="file"
									accept="image/*"
									style={{ display: 'none' }}
									ref={profileImageUpload}
									onChange={(e: any) => {
										const data = e.target.files[0];

										if (data) {
											const reader = new FileReader();
											reader.onload = (e: any) => {
												setFieldValue('profileImage', {
													file: data,
													base64: e.target.result
												});
											};
											reader.readAsDataURL(data);
										}
									}}
								/>
							</div>
							{values.profileImage?.base64 && (
								<div className="profile-view-wrapper">
									<div>Profile picture:</div>
									<img
										src={values.profileImage?.base64}
										alt=""
									/>
								</div>
							)}
							{errors && errors.profileImage && (
								<p className="error">{errors.profileImage}</p>
							)}
						</div>

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

									if (val !== values.confirmPassword)
										setFieldError(
											'confirmPassword',
											"Passwords didn't match"
										);
									else setFieldError('confirmPassword', '');
								}}
							/>
							{errors && errors.password && (
								<p className="error">{errors.password}</p>
							)}
						</div>

						<div className="form-item">
							<TextField
								fullWidth
								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
								label={'Confirm Password'}
								type="password"
								name="confirmPassword"
								value={values.confirmPassword}
								onChange={(e) => {
									const val = e.target.value;
									setFieldValue('confirmPassword', val);

									if (val !== values.password)
										setFieldError(
											'confirmPassword',
											"Passwords didn't match"
										);
									else setFieldError('confirmPassword', '');
								}}
							/>
							{errors && errors.confirmPassword && (
								<p className="error">
									{errors.confirmPassword}
								</p>
							)}
						</div>

						<button type="submit" className="form-action-btn">
							Register
						</button>

						{registerMessage && (
							<p className={`panel-message ${messageType}`}>
								{registerMessage}
							</p>
						)}
					</form>
				)}
			</Formik>
		</div>
	);
};
