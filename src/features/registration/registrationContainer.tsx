import { RouteComponentProps } from 'react-router';
import { Component } from 'react';
import { RegistrationForm } from './registrationForm';
import { ROUTES } from 'shared/utils/constants';
import { Link } from 'react-router-dom';

class Registration extends Component<RouteComponentProps> {
	render() {
		return (
			<div className="body-wrapper">
				<div className="content-wrapper">
					<RegistrationForm
						initialValues={{
							firstName: '',
							lastName: '',
							profileImage: {
								file: null,
								base64: ''
							},
							email: '',
							password: '',
							confirmPassword: ''
						}}
						onSubmit={() => {}}
					/>
					<Link to={`${ROUTES.login}`}>
						<button type="button" className="redirect-btn">
							Back to Login
						</button>
					</Link>
				</div>
			</div>
		);
	}
}

export default Registration;
