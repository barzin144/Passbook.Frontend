import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ApiCall } from '../helpers/ApiCall';
import { Form, Input, Button, Card, Row, Col } from 'antd';
import { Set_User_Authentication_True, Set_User_Authentication_Token } from '../redux/actions';

const layout = {
	labelCol: {
		span: 8
	},
	wrapperCol: {
		span: 16
	}
};
const tailLayout = {
	wrapperCol: {
		offset: 8,
		span: 16
	}
};

const Register = (props) => {
	const onFinish = (values) => {
		ApiCall.Post('https://localhost:5001/Api/Account/Register', {
			userName: values.username,
			password: values.password,
			emailAddress: values.emailAddress
		}).then(() => {
			ApiCall.Post('https://localhost:5001/Api/Account/Login', {
				userName: values.username,
				password: values.password,
				platform: 0
			}).then((result) => {
				props.Set_User_Authentication_True();
				props.Set_User_Authentication_Token(result.token);
			});
		});
	};

	if (props.UserAuthentication) {
		return <Redirect to="/" />;
	}

	return (
		<Row justify="center">
			<Col xs={{ span: 24 }} lg={{ span: 10 }}>
				<Card title="Register Form">
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
							label="E-mail"
							name="emailAddress"
							rules={[
								{
									required: true,
									message: 'Please input your E-mail address!'
								},
								{
									type: 'email',
									message: 'The input is not valid E-mail!'
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

						<Form.Item
							name="confirm"
							label="Confirm Password"
							dependencies={[ 'password' ]}
							hasFeedback
							rules={[
								{
									required: true,
									message: 'Please confirm your password!'
								},
								({ getFieldValue }) => ({
									validator(rule, value) {
										if (!value || getFieldValue('password') === value) {
											return Promise.resolve();
										}
										return Promise.reject('The two passwords that you entered do not match!');
									}
								})
							]}>
							<Input.Password />
						</Form.Item>

						<Form.Item {...tailLayout}>
							<Button type="primary" htmlType="submit">
								Sign up
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

export default connect(mapStateToProps, { Set_User_Authentication_Token, Set_User_Authentication_True })(Register);
