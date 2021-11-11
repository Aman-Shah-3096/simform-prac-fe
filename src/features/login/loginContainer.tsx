import { RouteComponentProps } from 'react-router';
import { Component } from 'react';
import { LoginForm } from './loginForm';
import { ROUTES } from 'shared/utils/constants';
import { Link } from 'react-router-dom';

class Login extends Component<RouteComponentProps> {
	render() {
		return (
			<div className="body-wrapper">
				<div className="content-wrapper">
					<LoginForm
						initialValues={{
							email: '',
							password: ''
						}}
						onSubmit={() => {}}
					/>
					<Link to={`${ROUTES.register}`}>
						<button type="button" className="redirect-btn">
							Create New Account?
						</button>
					</Link>
				</div>
			</div>
		);
	}
}

export default Login;
