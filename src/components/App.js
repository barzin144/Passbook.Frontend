import React from 'react';
import Navbar from './Navbar';
import RouteSwitch from './RouteSwitch';
import Breadcrumb from './RouteBreadcrumb';

import { Layout } from 'antd';

import '../styles/App.css';

const { Header, Content, Footer } = Layout;

const App = () => {
	return (
		<Layout>
			<Header>
				<Navbar />
			</Header>
			<Content style={{ padding: '0 50px' }}>
				<Breadcrumb />
				<RouteSwitch />
			</Content>
			<Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
		</Layout>
	);
};

export default App;
