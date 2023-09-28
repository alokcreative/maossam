import apiSlice from './apiSlice';
import apiEndpoints from '../../utiles/ApiRoute';

interface IPayload {
	email: string;
	loginPassword: string;
}
export const productsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// getPosts: builder.query({
		//     query: () => '/posts',
		//     providesTags: ['Post'],
		//   }),
		getUser: builder.mutation({
			query: (payload: IPayload) => ({
				url: apiEndpoints.login,
				method: 'POST',
				body: payload,
				headers: {
					'X-RapidAPI-Key': '5d8641db9fmsh04c1a1beb6e16e6p157d76jsn553e9f6dbc5a',
					'Content-Type': 'application/json',
					'X-RapidAPI-Host': 'logintesting.p.rapidapi.com',
				},
			}),
		}),
	}),
});

export const { useGetUserMutation } = productsApiSlice;
