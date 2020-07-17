import React from 'react';

import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';
import Passwords from './Passwords';

import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

const RouteSwitch = (props) => {
	const PrivateRoute = ({ children, ...rest }) => {
		return <Route {...rest} render={() => (props.UserAuthentication ? children : <Redirect to="/login" />)} />;
	};
	return (
		<Switch>
			<Route path="/Login">
				<Login />
			</Route>
			<Route path="/Register">
				<Register />
			</Route>
			<PrivateRoute path="/Passwords">
				<Passwords />
			</PrivateRoute>
			<Route path="/Logout">
				<Logout />
			</Route>
			<Route path="/">
				<Home />
			</Route>
		</Switch>
	);
};

const mapStateToProps = (state) => {
	return { UserAuthentication: state.UserReducer.UserAuthentication };
};

export default connect(mapStateToProps)(RouteSwitch);
