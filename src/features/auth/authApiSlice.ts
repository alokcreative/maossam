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
interface IResetPayload {
	resetCode: string | undefined;
	payload: any;
}
interface IUserDetails {
	first_name?: string;
	last_name?: string;
	email?: string;
	country?: string;
	state?: string;
	phone_number?: string;
	gender?: string;
	avatar?: FormData;
}
interface IProfilePayload {
	id: string;
	userdetails?: IUserDetails;
	userData?: FormData;
	avatar?: FormData;
}

interface ICreatePayload {
	userData?: FormData;
	avatar?: FormData;
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
		// Forget Password
		forgetPassword: builder.mutation({
			query: (email: string) => ({
				url: apiEndpoints.forgotPassword,
				method: 'POST',
				body: email,
				headers: {
					'Content-Type': 'application/json',
				},
				// redirect: 'follow',
			}),
		}),
		// Forget Password
		setPassword: builder.mutation({
			query: (payload: IResetPayload) => ({
				url: `${apiEndpoints.setPassword}${payload.resetCode}/`,
				method: 'POST',
				body: payload.payload,
				headers: {
					'Content-Type': 'application/json',
				},
				// redirect: 'follow',
			}),
		}),
		// Forget Password
		changePassword: builder.mutation({
			query: (payload: string) => ({
				url: apiEndpoints.changePassword,
				method: 'POST',
				body: payload,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('access_token')}`,
				},
				// redirect: 'follow',
			}),
		}),
		// Get Login User
		getUsers: builder.mutation({
			query: (payload: string) => ({
				url: apiEndpoints.profile,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${payload}`,
				},
			}),
		}),

		// Get User
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

		// Create User
		createProfile: builder.mutation({
			query: (payload: ICreatePayload) => ({
				url: apiEndpoints.createUser,
				method: 'POST',
				body: payload.userData,
				headers: {
					// 'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('access_token')}`,
				},
			}),
			invalidatesTags: [`Profile`],
		}),

		// Update User
		updateProfile: builder.mutation({
			query: (payload: IProfilePayload) => ({
				url: `${apiEndpoints.update}${payload.id}/`,
				method: 'PATCH',
				body: payload.userdetails || payload.avatar || payload.userData,
				headers: {
					// 'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${localStorage.getItem('access_token')}`,
				},
			}),
			invalidatesTags: [`Profile`],
		}),

		// Delete User
		deleteProfile: builder.mutation({
			query: (id: string) => ({
				url: `${apiEndpoints.deleteUser}${id}/`,
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('access_token')}`,
				},
			}),
			invalidatesTags: [`Profile`],
		}),

		// Get All User
		getAllUser: builder.query({
			query: () => ({
				url: apiEndpoints.allUser,
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('access_token')}`,
				},
			}),
		}),
	}),
});

export const {
	useRegisterUserMutation,
	useLoginUserMutation,
	useLogoutMutation,
	useForgetPasswordMutation,
	useSetPasswordMutation,
	useChangePasswordMutation,
	useGetUsersMutation,
	useGetProfileQuery,
	useCreateProfileMutation,
	useUpdateProfileMutation,
	useDeleteProfileMutation,
	useGetAllUserQuery,
} = authApiSlice;
