import React, { useState, useEffect, useRef } from 'react';

import AddOrEditPassword from './AddOrEditPassword';

import { ApiCall } from '../helpers/ApiCall';
import { useForm } from 'antd/lib/form/Form';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table, Popconfirm, Tooltip, Space, Row, Col } from 'antd';

const Passwords = () => {
	const [ form ] = useForm();
	const [ data, setData ] = useState([]);
	const [ tableLoading, setTableLoading ] = useState(true);
	const [ selectedRecordForEdit, setSelectedRecordForEdit ] = useState(null);
	const addOrEditPasswordRef = useRef();
	const columns = [
		{
			title: 'UserName',
			dataIndex: 'username'
		},
		{
			title: 'E-mail',
			dataIndex: 'emailAddress'
		},
		{
			title: 'Password',
			dataIndex: 'password'
		},
		{
			title: 'UsedIn',
			dataIndex: 'usedIn'
		},
		{
			title: 'Create Date Time',
			dataIndex: 'createdPersianDateTime'
		},
		{
			title: 'Update Date Time',
			dataIndex: 'updatedPersianDateTime'
		},
		{
			title: 'operation',
			dataIndex: 'operation',
			render: (text, record) => (
				<Space size="large">
					<Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
						<Tooltip title="Delete" color={'red'} placement="bottomLeft">
							<DeleteOutlined />
						</Tooltip>
					</Popconfirm>
					<Tooltip title="Edit" color={'cyan'} placement="bottomLeft">
						<EditOutlined onClick={() => handleEdit(record)} />
					</Tooltip>
				</Space>
			)
		}
	];

	const handleDelete = (key) => {
		setTableLoading(true);
		ApiCall.Delete('https://localhost:5001/Api/Password/DeletePassword', `id=${key}`)
			.then((result) => {
				getPasswords();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const getPasswords = () => {
		ApiCall.Get('https://localhost:5001/Api/Password/GetPasswords')
			.then((result) => {
				setData(
					result.map((record) => ({
						key: record.id,
						username: record.userName,
						emailAddress: record.emailAddress,
						password: record.password,
						usedIn: record.usedIn,
						createdPersianDateTime: record.createdPersianDateTime,
						updatedPersianDateTime: record.updatedPersianDateTime
					}))
				);
				setTableLoading(false);
				setSelectedRecordForEdit(null);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		getPasswords();
	}, []);

	useEffect(
		() => {
			if (selectedRecordForEdit !== null) {
				addOrEditPasswordRef.current.editPassword();
			}
		},
		[ selectedRecordForEdit ]
	);

	const handleEdit = (record) => {
		setSelectedRecordForEdit(record);
	};

	return (
		<React.Fragment>
			<AddOrEditPassword
				ref={addOrEditPasswordRef}
				form={form}
				selectedRecordForEdit={selectedRecordForEdit}
				setSelectedRecordForEdit={setSelectedRecordForEdit}
				getPasswords={getPasswords}
			/>
			<br />
			<Row>
				<Col span={24} style={{ overflow: 'auto', width: '100%' }}>
					<Table
						loading={tableLoading}
						columns={columns}
						dataSource={data}
						pagination={false}
						bordered={true}
					/>
				</Col>
			</Row>
		</React.Fragment>
	);
};

export default Passwords;
