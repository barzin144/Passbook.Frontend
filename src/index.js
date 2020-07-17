import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store';
import App from './components/App';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

import 'antd/dist/antd.css';
import './styles/index.css';

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>,
	document.getElementById('root')
);

serviceWorker.unregister();
