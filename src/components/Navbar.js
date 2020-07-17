import React from 'react';
import { Menu } from 'antd';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const Navbar = (props) => {
	const location = useLocation();
	const selectedMenu = location.pathname === '/' ? 'Home' : location.pathname;

	return (
		<Menu theme="dark" mode="horizontal" defaultSelectedKeys={selectedMenu}>
			<Menu.Item key="Home">
				<Link to="/">Home</Link>
			</Menu.Item>
			{!props.UserAuthentication && (
				<Menu.Item key="Login">
					<Link to="/Login">Login</Link>
				</Menu.Item>
			)}
			{!props.UserAuthentication && (
				<Menu.Item key="Register">
					<Link to="/Register">Register</Link>
				</Menu.Item>
			)}
			{props.UserAuthentication && (
				<Menu.Item key="Passwords">
					<Link to="/Passwords">Passwords</Link>
				</Menu.Item>
			)}
			{props.UserAuthentication && (
				<Menu.Item key="Logout">
					<Link to="/Logout">Logout</Link>
				</Menu.Item>
			)}
		</Menu>
	);
};

const mapStateToProps = (state) => {
	return { UserAuthentication: state.UserReducer.UserAuthentication };
};

export default connect(mapStateToProps)(Navbar);
