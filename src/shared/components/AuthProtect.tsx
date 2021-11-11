import { isEmpty } from 'lodash';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { ROUTES } from 'shared/utils/constants';
import { getLoggedInUserDetails } from 'shared/utils/utilities';

// check whether user is logged-in or not
const AuthProtect: React.FC<{
	children: any;
}> = (props) => {
	const userDetails = getLoggedInUserDetails();

	if (userDetails && !isEmpty(userDetails)) {
		return props.children;
	}

	return <Redirect to={ROUTES.login} />;
};

export default AuthProtect;
