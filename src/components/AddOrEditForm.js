import React from 'react';
import { Form, Input } from 'antd';

const AddOrEditForm = (props) => {
	const layout = {
		labelCol: {
			span: 8
		},
		wrapperCol: {
			span: 16
		}
	};

	return (
		<Form {...layout} name="basic" form={props.form}>
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
						message: 'Please input your E-mail!'
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
				label="usedIn"
				name="usedIn"
				rules={[
					{
						required: true,
						message: 'Please input your usedIn!'
					}
				]}>
				<Input />
			</Form.Item>
		</Form>
	);
};

export default AddOrEditForm;
