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
		// Register user
		// registerUser: builder.mutation({
		// 	query: (payload: any) => ({
		// 		url: apiEndpoints.register,
		// 		method: 'POST',
		// 		body: payload,
		// 		header: 'Content-Type: application/json',
		// 	}),
		// 	invalidatesTags: [`Register`],
		// }),
		// Get User
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
	}),
});

export const { useGetGoalsQuery } = taskManagementApiSlice;
