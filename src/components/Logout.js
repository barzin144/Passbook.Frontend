import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ApiCall } from '../helpers/ApiCall';
import { Set_User_Authentication_False, Set_User_Authentication_Token } from '../redux/actions';

const Logout = (props) => {
	ApiCall.Post('https://localhost:5001/Api/Account/Logout', {}).then((result) => {
		props.Set_User_Authentication_False();
	});

	return <Redirect to="/" />;
};

export default connect(null, { Set_User_Authentication_False, Set_User_Authentication_Token })(Logout);
