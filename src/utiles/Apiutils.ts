export const callAPIWithoutAuth = (url: string, method: string, body: string) => {
	const object = {
		url,
		method,
		body,
		headers: {
			'X-RapidAPI-Key': '5d8641db9fmsh04c1a1beb6e16e6p157d76jsn553e9f6dbc5a',
			'Content-Type': 'application/json',
			'X-RapidAPI-Host': 'logintesting.p.rapidapi.com',
		},
	};

	return object;
};

export const callAPI = () => {};
