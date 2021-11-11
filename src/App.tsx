import React, { Component } from 'react';
import { BrowserRouter, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import 'assets/styles/app.scss';

import store from './store';
import ScrollToTop from 'shared/components/ScrollToTop';
import RenderRoutes from 'shared/components/RenderRoutes';
import * as asyncComponent from './asyncComponent';
import { APP_ROUTE_PREFIX, ROUTES } from 'shared/utils/constants';
import AuthProtect from 'shared/components/AuthProtect';
import { Routes } from 'shared/interface';

const routes: Routes[] = [
	{
		exact: true,
		path: ROUTES.login,
		component: asyncComponent.Login
	},
	{
		exact: true,
		path: ROUTES.register,
		component: asyncComponent.Registration
	},
	{
		exact: true,
		path: ROUTES.forgotPass,
		component: asyncComponent.ForgotPassword
	},
	{
		exact: true,
		path: ROUTES.resetPass,
		component: asyncComponent.ResetPassword
	},
	{
		exact: true,
		guard: AuthProtect,
		path: ROUTES.home,
		component: asyncComponent.Home
	},
	{
		exact: true,
		path: APP_ROUTE_PREFIX,
		component: () => <Redirect to={ROUTES.login} />
	},
	{
		exact: true,
		path: '/',
		component: () => <Redirect to={ROUTES.login} />
	}
];

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<ScrollToTop />
					<RenderRoutes routes={routes} />
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
