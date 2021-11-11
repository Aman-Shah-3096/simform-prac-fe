import { RouteComponentProps } from 'react-router';
import { Component } from 'react';
import { ResetPassForm } from './resetPassForm';

class ResetPassword extends Component<RouteComponentProps> {
	render() {
		return (
			<div className="body-wrapper">
				<div className="content-wrapper">
					<ResetPassForm
						initialValues={{
							email: '',
							newPassword: '',
							confirmPassword: ''
						}}
						onSubmit={() => {}}
					/>
				</div>
			</div>
		);
	}
}

export default ResetPassword;
