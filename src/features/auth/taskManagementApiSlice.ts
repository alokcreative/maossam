import apiSlice from './apiSlice';
import apiEndpoints from '../../utiles/ApiRoute';

interface ILogoutProps {
	accessToken: string;
	refresh: { refresh: string };
}
export const taskManagementApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// Register user
		registerUser: builder.mutation({
			query: (payload: any) => ({
				url: apiEndpoints.register,
				method: 'POST',
				body: payload,
				header: 'Content-Type: application/json',
			}),
			invalidatesTags: [`Register`],
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

		// Create Goal
		createGoal: builder.mutation({
			query: (payload: any) => ({
				url: apiEndpoints.createGoal,
				method: 'POST',
				body: payload,
				header: 'Content-Type: application/json',
			}),
			invalidatesTags: [`Goal`],
		}),

		// Update Goal
		updateGoal: builder.mutation({
			query: (payload: any) => ({
				url: `${apiEndpoints.updateGoal}/${payload.id}`,
				method: 'PATCH',
				body: payload,
				header: 'Content-Type: application/json',
			}),
			invalidatesTags: [`Goal`],
		}),

		// Delete Goal
		deleteGoal: builder.mutation({
			query: (id: number) => ({
				url: `${apiEndpoints.updateGoal}/${id}`,
				method: 'DELETE',
				header: 'Content-Type: application/json',
			}),
			invalidatesTags: [`Goal`],
		}),
	}),
});

export const {
	useRegisterUserMutation,
	useGetProfileQuery,
	useCreateGoalMutation,
	useUpdateGoalMutation,
	useDeleteGoalMutation,
} = taskManagementApiSlice;
