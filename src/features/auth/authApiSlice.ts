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
interface Payload{
	id: number;
	avatar: string | unknown;
	first_name: string;
	last_name: string;
	email: string;
	phone_number: number;
	country: string;
	state: string;
	gender: string;
	is_active: boolean;
	role: string;
	date_of_birth: string;
	created_at: string;
	updated_at: string;
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

		// Profile
		getProfile: builder.query({
			query: (id) => ({
				url: apiEndpoints.profile + id,
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					// Authorization: `Bearer ${localStorage.getItem('access_token')}`,
					Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk2MzQ4OTUxLCJpYXQiOjE2OTYzMjczNTEsImp0aSI6Ijk4YzU3OGQxMzc0ZjQ1ZTdiNTA2YmEwNGIwYWM1OTZmIiwidXNlcl9pZCI6MTAxfQ.vK8AvI3GHQOQN0LRCoNahaFBB7JYsl-sztNAjMEQJKM`,
				},
			}),
		}),

		// Create Profile
		createProfile: builder.mutation({
			query: (payload: Payload) => ({
				url: apiEndpoints.profile,
				method: 'POST',
				body: payload,
				headers: {
					'Content-Type': 'application/json',
				},
			}),
			invalidatesTags: [`Profile`],
		}),

		// Profile Update
		updateProfile: builder.mutation({
			query: (payload: Payload) => ({
				url: `${apiEndpoints.profile}${payload.id}/`,
				method: 'PATCH',
				body: payload,
				headers: {
					'Content-Type': 'application/json',
					// Authorization: `Bearer ${localStorage.getItem('access_token')}`,
					Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk2MzQ4OTUxLCJpYXQiOjE2OTYzMjczNTEsImp0aSI6Ijk4YzU3OGQxMzc0ZjQ1ZTdiNTA2YmEwNGIwYWM1OTZmIiwidXNlcl9pZCI6MTAxfQ.vK8AvI3GHQOQN0LRCoNahaFBB7JYsl-sztNAjMEQJKM`,
				},
			}),
			invalidatesTags: [`Profile`],
		}),

		// Get Profile
		deleteProfile: builder.mutation({
			query: ({ id, ...rest }: Payload) => ({
				url: apiEndpoints.profile + id,
				method: 'DELETE',
				body: rest,
				headers: {
					'Content-Type': 'application/json',
					// Authorization: `Bearer ${localStorage.getItem('access_token')}`,
					Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk2MzQ4OTUxLCJpYXQiOjE2OTYzMjczNTEsImp0aSI6Ijk4YzU3OGQxMzc0ZjQ1ZTdiNTA2YmEwNGIwYWM1OTZmIiwidXNlcl9pZCI6MTAxfQ.vK8AvI3GHQOQN0LRCoNahaFBB7JYsl-sztNAjMEQJKM`,
				},
			}),
			invalidatesTags: [`Profile`],
		}),
	}),
});

export const {
	useRegisterUserMutation, useLoginUserMutation, useGetUsersMutation,
	useGetProfileQuery,
	useCreateProfileMutation,
	useUpdateProfileMutation,
	useDeleteProfileMutation,
} = productsApiSlice;
