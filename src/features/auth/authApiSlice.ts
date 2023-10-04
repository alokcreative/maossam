import apiSlice from './apiSlice';
import apiEndpoints from '../../utiles/ApiRoute';

interface IRegisterPayload {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	confirm_password: string;
}
interface ILoginPayload {
	email: string;
	password: string;
}
export const getTokenFromLocalStorage = () => {
	return localStorage.getItem('access_token');
};
export const productsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		registerUser: builder.mutation({
			query: (payload: IRegisterPayload) => ({
				url: apiEndpoints.register,
				method: 'POST',
				body: payload,
				header: 'Content-Type: application/json',
			}),
			invalidatesTags: [`Register`],
		}),
		loginUser: builder.mutation({
			query: (payload: ILoginPayload) => ({
				url: apiEndpoints.login,
				method: 'POST',
				body: payload,
				headers: {
					'Content-Type': 'application/json',
				},
			}),
			invalidatesTags: [`Login`],
		}),
		getUsers: builder.mutation({
			query: (payload: string) => ({
				url: apiEndpoints.profile,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${payload}`,
				},
			}),
		}),
	}),
});

export const { useRegisterUserMutation, useLoginUserMutation, useGetUsersMutation } =
	productsApiSlice;
