import { TextField } from '@material-ui/core';
import { updateUserDetails, uploadFile } from 'api/index.api';
import { Formik } from 'formik';
import { useRef, useState } from 'react';
import { Upload } from 'shared/components/Icons';
import { userDetailsFormValidationSchema } from 'shared/utils/validation-schema';

export const UserDetailsForm: React.FC<{
	userId: string;
	initialValues: any;
	onSubmit: (data: any) => any;
}> = (props) => {
	const [updateMessage, setUpdateMessage] = useState('');
	const [messageType, setMessageType] = useState('');
	const [editMode, setEditMode] = useState(false);
	const [localProfileImage, setLocalProfileImage] = useState({
		fileName: '',
		file: null,
		base64: ''
	});

	const profileImageUpload = useRef(null);
	const openUploader = (target: any) => {
		target.current.click();
	};

	return (
		<div className="panel-wrapper">
			<div className="panel-header">User Details</div>

			<Formik
				enableReinitialize={true}
				initialValues={props.initialValues}
				validationSchema={userDetailsFormValidationSchema}
				validateOnBlur={true}
				validateOnChange={true}
				onSubmit={async (data: any) => {
					if (localProfileImage.base64) {
						const formData = new FormData();
						formData.append(
							'profileImage',
							localProfileImage.file || ''
						);

						const imageUploadResponse: any = await uploadFile(
							formData
						);

						if (
							imageUploadResponse &&
							!imageUploadResponse.isError
						) {
							data.profileImageUrl = imageUploadResponse.data;
						}
					}

					const updatedData = {
						firstName: data.firstName,
						lastName: data.lastName,
						profileImageUrl: data.profileImageUrl
					};
					const response: any = await updateUserDetails(
						props.userId,
						updatedData
					);

					if (response) {
						if (response.isError) {
							setUpdateMessage(
								response.message || 'Sorry, some error occured'
							);
							setMessageType('error');
						} else {
							setUpdateMessage(response.message || 'Success');
							setMessageType('success');
							setEditMode(false);
							props.onSubmit({ ...data, userId: props.userId });
						}
					} else {
						setUpdateMessage('Sorry, some error occured');
						setMessageType('error');
					}
				}}
			>
				{({
					handleSubmit,
					setFieldValue,
					setFieldError,
					resetForm,
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
								disabled={!editMode}
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
								disabled={!editMode}
							/>
							{errors && errors.lastName && (
								<p className="error">{errors.lastName}</p>
							)}
						</div>

						<div className="form-item">
							{editMode && (
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
										name="profileImageUrl"
										value={localProfileImage.fileName || ''}
										onClick={() => {
											if (editMode)
												openUploader(
													profileImageUpload
												);
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
													setLocalProfileImage({
														file: data,
														base64: e.target.result,
														fileName: data.name
													});
												};
												reader.readAsDataURL(data);
											}
										}}
									/>
								</div>
							)}
							<div className="profile-view-wrapper">
								<div>Profile picture:</div>
								<img
									src={
										localProfileImage.base64 ||
										values.profileImageUrl
									}
									alt=""
								/>
							</div>
							{errors && errors.profileImageUrl && (
								<p className="error">
									{errors.profileImageUrl}
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
								label={'Email'}
								type="email"
								name="email"
								value={values.email}
								onChange={(e) => {
									const val = e.target.value;
									setFieldValue('email', val);
								}}
								disabled
							/>
							{errors && errors.email && (
								<p className="error">{errors.email}</p>
							)}
						</div>

						{editMode && (
							<div className="form-action-btn-wrapper">
								<button
									type="button"
									className="form-action-btn cancel-btn"
									onClick={() => {
										setEditMode(false);
										resetForm({ ...props.initialValues });
									}}
								>
									Cancel
								</button>

								<button
									type="submit"
									className="form-action-btn submit-btn"
								>
									Update
								</button>
							</div>
						)}

						{!editMode && (
							<button
								type="button"
								className="form-action-btn"
								onClick={() => setEditMode(true)}
							>
								Edit
							</button>
						)}

						{updateMessage && (
							<p className={`panel-message ${messageType}`}>
								{updateMessage}
							</p>
						)}
					</form>
				)}
			</Formik>
		</div>
	);
};
