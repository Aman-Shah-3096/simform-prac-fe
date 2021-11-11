import { RouteComponentProps } from 'react-router';
import { Component } from 'react';
import { ForgotPassForm } from './forgotPassForm';
import { ROUTES } from 'shared/utils/constants';
import { Link } from 'react-router-dom';

class ForgotPassword extends Component<RouteComponentProps> {
	render() {
		return (
			<div className="body-wrapper">
				<div className="content-wrapper">
					<ForgotPassForm
						initialValues={{
							email: ''
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

export default ForgotPassword;
