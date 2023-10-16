import apiSlice from './apiSlice';
import apiEndpoints from '../../utiles/ApiRoute';

interface ILogoutProps {
	accessToken: string;
	refresh: { refresh: string };
}
export const getTokenFromLocalStorage = () => {
	return localStorage.getItem('access_token');
};
export const taskManagementApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getGoals: builder.query({
			query: () => ({
				url: apiEndpoints.goalList,
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${getTokenFromLocalStorage()}`,
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
		// Delete Goal
		getTaskByGoalId: builder.query({
			query: (id?: number) => ({
				url: `${apiEndpoints.taslistByGoalId}${id}/list/`,
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${getTokenFromLocalStorage()}`,
				},
			}),
		}),
	}),
});

export const {
	useCreateGoalMutation,
	useUpdateGoalMutation,
	useDeleteGoalMutation,
	useGetGoalsQuery,
	useGetTaskByGoalIdQuery
} = taskManagementApiSlice;

