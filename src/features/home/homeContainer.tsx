import { RouteComponentProps } from 'react-router';
import { Component } from 'react';
import { logout } from 'api/index.api';
import { clearUserAuthDetails } from 'shared/utils/utilities';
import { ROUTES } from 'shared/utils/constants';
import { capitalize } from 'lodash';
import { UserDetailsForm } from './userDetailsForm';
import { connect } from 'react-redux';
import { Action, State } from 'shared/interface';
import { ThunkDispatch } from 'redux-thunk';
import { updateUserDetails } from 'shared/store/auth.action';

interface MapStateProps {
	userDetails: any;
	authJwt: string;
}

interface DispatchProps {
	updateUserDetails: (data: any) => Promise<any>;
}

interface Props extends MapStateProps, DispatchProps, RouteComponentProps {}

class Home extends Component<Props> {
	render() {
		const userDetails: any = this.props.userDetails;

		return (
			<div className="home-wrapper body-wrapper">
				<div className="user-account-wrapper">
					<span className="mr--10">
						Welcome,{' '}
						{`${capitalize(
							userDetails.firstName || ''
						)} ${capitalize(userDetails.lastName || '')}`}
					</span>
					<i
						className="fa fa-sign-out fa-2x logout-btn"
						title="Logout"
						onClick={() => {
							this.logout();
						}}
					></i>
				</div>
				<div className="content-wrapper">
					<div className="logo"></div>
					<UserDetailsForm
						userId={userDetails.userId}
						initialValues={{
							firstName: userDetails.firstName,
							lastName: userDetails.lastName,
							profileImageUrl: userDetails.profileImageUrl,
							email: userDetails.email
						}}
						onSubmit={(data: any) => {
							this.props.updateUserDetails(data);
						}}
					/>
				</div>
			</div>
		);
	}

	logout = async () => {
		await logout();
		clearUserAuthDetails();
		this.props.history.push(ROUTES.login);
	};
}

const mapStateToProps = (state: State): MapStateProps => ({
	...state.authState,
	userDetails: state.authState.userDetails,
	authJwt: state.authState.authJwt
});

const mapDispatchToProps = (
	dispatch: ThunkDispatch<
		Record<string, unknown>,
		Record<string, unknown>,
		Action
	>
): DispatchProps => ({
	updateUserDetails: (data: any) => dispatch(updateUserDetails(data))
});

export default connect<
	MapStateProps,
	DispatchProps,
	Record<string, unknown>,
	State
>(
	mapStateToProps,
	mapDispatchToProps
)(Home);
