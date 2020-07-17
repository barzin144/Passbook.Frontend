import React, { useState, forwardRef, useImperativeHandle } from 'react';

import AddOrEditForm from './AddOrEditForm';

import { ApiCall } from '../helpers/ApiCall';
import { Row, Col, Button, Modal } from 'antd';

const AddOrEditPassword = (props, ref) => {
	const [ modalVisibility, setmodalVisibility ] = useState(false);
	const { form, selectedRecordForEdit, setSelectedRecordForEdit, getPasswords } = props;

	useImperativeHandle(ref, () => ({
		editPassword() {
			form.setFieldsValue(selectedRecordForEdit);
			setmodalVisibility(true);
		}
	}));

	const showModal = () => {
		form.resetFields();
		setmodalVisibility(true);
	};

	const hideModal = () => {
		setmodalVisibility(false);
		setSelectedRecordForEdit(null);
	};

	const handleSave = (values) => {
		form
			.validateFields()
			.then((values) => {
				form.resetFields();
				if (selectedRecordForEdit === null) {
					ApiCall.Post('https://localhost:5001/Api/Password/AddPassword', {
						userName: values.username,
						password: values.password,
						usedIn: values.usedIn,
						emailAddress: values.emailAddress
					}).then((result) => {
						hideModal();
						getPasswords();
					});
				} else {
					ApiCall.Put(
						'https://localhost:5001/Api/Password/EditPassword',
						{
							userName: values.username,
							password: values.password,
							usedIn: values.usedIn,
							emailAddress: values.emailAddress
						},
						`id=${selectedRecordForEdit.key}`
					).then((result) => {
						hideModal();
						getPasswords();
					});
				}
			})
			.catch((info) => {
				console.log('Validate Failed:', info);
			});
	};

	return (
		<React.Fragment>
			<Row>
				<Col>
					<Button type="primary" onClick={showModal}>
						Add new password
					</Button>
				</Col>
			</Row>
			<Modal
				title="New password"
				visible={modalVisibility}
				onOk={handleSave}
				onCancel={hideModal}
				okText="Save"
				cancelText="Cancel">
				<AddOrEditForm form={form} />
			</Modal>
		</React.Fragment>
	);
};

export default forwardRef(AddOrEditPassword);
