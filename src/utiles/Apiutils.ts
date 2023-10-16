export interface IApiRequest {
	headers: Headers;
}

export function constructApiRequest(): IApiRequest {
	const headers = new Headers({
		'Content-Type': 'application/json',
		Authorization: `Bearer ${localStorage.getItem('access_token')}`,
	});

	return { headers };
}

export const calcallAPIWithoutAuthlAPI = () => {};
