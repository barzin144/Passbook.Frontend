import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ApiCall } from '../helpers/ApiCall';
import { Form, Input, Button, Card, Row, Col } from 'antd';
import { Set_User_Authentication_True, Set_User_Authentication_Token } from '../redux/actions';

import 'antd/dist/antd.css';

const layout = {
	labelCol: {
		span: 5
	},
	wrapperCol: {
		span: 19
	}
};
const tailLayout = {
	wrapperCol: {
		offset: 5,
		span: 19
	}
};

const Login = (props) => {
	const onFinish = (values) => {
		ApiCall.Post('https://localhost:5001/Api/Account/Login', {
			userName: values.username,
			password: values.password,
			platform: 0
		}).then((result) => {
			props.Set_User_Authentication_True();
			props.Set_User_Authentication_Token(result.token);
		});
	};

	if (props.UserAuthentication) {
		return <Redirect to="/" />;
	}

	return (
		<Row justify="center">
			<Col xs={{ span: 24 }} lg={{ span: 10 }}>
				<Card title="Login Form">
					<Form {...layout} name="basic" onFinish={onFinish}>
						<Form.Item
							label="Username"
							name="username"
							rules={[
								{
									required: true,
									message: 'Please input your username!'
								}
							]}>
							<Input />
						</Form.Item>

						<Form.Item
							label="Password"
							name="password"
							rules={[
								{
									required: true,
									message: 'Please input your password!'
								}
							]}>
							<Input.Password />
						</Form.Item>
						<Form.Item {...tailLayout}>
							<Button type="primary" htmlType="submit">
								Login
							</Button>
						</Form.Item>
					</Form>
				</Card>
			</Col>
		</Row>
	);
};

const mapStateToProps = (state) => {
	return { UserAuthentication: state.UserReducer.UserAuthentication };
};

export default connect(mapStateToProps, { Set_User_Authentication_Token, Set_User_Authentication_True })(Login);
