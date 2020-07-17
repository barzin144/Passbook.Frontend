import React from 'react';
import { Breadcrumb } from 'antd';
import { useLocation } from 'react-router-dom';

const RouteBreadcrumb = () => {
	const location = useLocation();

	return (
		<React.Fragment>
			{location.pathname !== '/' && (
				<Breadcrumb style={{ margin: '16px 0' }}>
					<Breadcrumb.Item key="home">Home</Breadcrumb.Item>
					{location.pathname.split('/').map((route) => {
						if (route !== '') return <Breadcrumb.Item key={route}>{route}</Breadcrumb.Item>;
						return null;
					})}
				</Breadcrumb>
			)}
		</React.Fragment>
	);
};

export default RouteBreadcrumb;
