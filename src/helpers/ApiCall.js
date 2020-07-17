import { message } from 'antd';
import store from '../redux/store';

const returnApiCallResult = (result) => {
	return new Promise((resolve, reject) => {
		result
			.json()
			.then(
				(result) => {
					if (!!result.errorMessage) {
						message.error(result.errorMessage);
					} else if (!!result.errors) {
						const errors = Object.keys(result.errors);
						errors.forEach((error) => {
							message.error(result.errors[error]);
						});
						return reject();
					} else if (!!result.message) {
						message.success(result.message);
						return resolve(result);
					} else {
						return resolve(result);
					}
				},
				(error) => {
					return reject(error);
				}
			)
			.catch((error) => {
				return reject(error);
			});
	});
};

export class ApiCall {
	static Post = async (url, data) => {
		const userAuthenticationToken = store.getState().UserReducer.UserAuthenticationToken;
		const result = await fetch(url, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				accept: 'application/json',
				Authorization: `Bearer ${userAuthenticationToken}`
			},
			body: JSON.stringify(data)
		});
		return returnApiCallResult(result);
	};

	static Delete = async (url, queryString) => {
		const userAuthenticationToken = store.getState().UserReducer.UserAuthenticationToken;
		const result = await fetch(`${url}?${queryString}`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json',
				accept: 'application/json',
				Authorization: `Bearer ${userAuthenticationToken}`
			}
		});
		return returnApiCallResult(result);
	};

	static Put = async (url, data, queryString) => {
		const userAuthenticationToken = store.getState().UserReducer.UserAuthenticationToken;
		const result = await fetch(`${url}?${queryString}`, {
			method: 'PUT',
			headers: {
				'content-type': 'application/json',
				accept: 'application/json',
				Authorization: `Bearer ${userAuthenticationToken}`
			},
			body: JSON.stringify(data)
		});
		return returnApiCallResult(result);
	};

	static Get = async (url) => {
		const userAuthenticationToken = store.getState().UserReducer.UserAuthenticationToken;
		const result = await fetch(url, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				accept: 'application/json',
				Authorization: `Bearer ${userAuthenticationToken}`
			}
		});
		return returnApiCallResult(result);
	};
}
