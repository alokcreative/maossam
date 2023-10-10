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
interface IProfilePayload {
	id: string;
	first_name?: string;
	last_name?: string;
	email?: string;
	avatar?: FormData;
	country?: string;
	state?: string;
	phone_number?: string;
	gender?: string;
}
export const getTokenFromLocalStorage = () => {
	return localStorage.getItem('access_token');
};
interface ILogoutProps {
	accessToken: string;
	refresh: { refresh: string };
}
export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// Register user
		registerUser: builder.mutation({
			query: (payload: IRegisterPayload) => ({
				url: apiEndpoints.register,
				method: 'POST',
				body: payload,
				header: 'Content-Type: application/json',
			}),
			invalidatesTags: [`Register`],
		}),
		// Login User
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
		// Logout
		logout: builder.mutation({
			query: (payload: ILogoutProps) => ({
				url: apiEndpoints.logout,
				method: 'POST',
				body: payload.refresh,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${payload.accessToken}`,
				},
			}),
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

		// Get  Profile
		getProfile: builder.query({
			query: (id) => ({
				url: apiEndpoints.update + id,
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('access_token')}`,
				},
			}),
		}),

		// Create Profile
		createProfile: builder.mutation({
			query: (payload: IProfilePayload) => ({
				url: apiEndpoints.update,
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
			query: (payload: IProfilePayload) => ({
				url: `${apiEndpoints.update}${payload.id}/`,
				method: 'PATCH',
				body: payload,
				headers: {
					// 'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${localStorage.getItem('access_token')}`,
				},
			}),
			invalidatesTags: [`Profile`],
		}),

		// Delete Profile
		deleteProfile: builder.mutation({
			query: ({ id, ...rest }: IProfilePayload) => ({
				url: apiEndpoints.update + id,
				method: 'DELETE',
				body: rest,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('access_token')}`,
				},
			}),
			invalidatesTags: [`Profile`],
		}),
	}),
});

export const {
	useRegisterUserMutation,
	useLoginUserMutation,
	useLogoutMutation,
	useGetUsersMutation,
	useGetProfileQuery,
	useCreateProfileMutation,
	useUpdateProfileMutation,
	useDeleteProfileMutation,
} = authApiSlice;
