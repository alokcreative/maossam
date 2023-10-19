import { IApiRequest, constructApiRequest } from '../../utiles/Apiutils';
import apiSlice from './apiSlice';
import apiEndpoints from '../../utiles/ApiRoute';

interface ILogoutProps {
	accessToken: string;
	refresh: { refresh: string };
}

interface ICreateTaskProps {
	goal_id: string;
	description: string;
	title: string;
}
interface IUpdateTaskProps {
	taskData: { description: string; title: string };
	task_id?: string;
}
interface IGoal {
	title: string;
	description: string;
	// date: string;
	// status: string;
	category: string;
}

// interface Goal {
// 	goalData: IGoal;
// }

interface IGoalPayload {
	id: string;
	goalData: IGoal;
}
interface ISubtaskPayload {
	task_id: string;
	title: string;
	description: string;
}
interface IUpdateSubaskPayload {
	taskData: { task_id: string; description: string; title: string };
	subtaskId?: string;
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
			query: (payload: IGoal) => ({
				url: apiEndpoints.createGoal,
				method: 'POST',
				body: payload,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${getTokenFromLocalStorage()}`,
				},
			}),
			invalidatesTags: [`Goal`],
		}),

		// Update Goal
		updateGoal: builder.mutation({
			query: (payload: IGoalPayload) => ({
				url: `${apiEndpoints.updateGoal}${payload.id}/`,
				method: 'PATCH',
				body: payload.goalData,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${getTokenFromLocalStorage()}`,
				},
			}),
			invalidatesTags: [`Goal`],
		}),

		// Delete Goal
		deleteGoal: builder.mutation({
			query: (id: number) => ({
				url: `${apiEndpoints.deleteGoal}${id}/`,
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${getTokenFromLocalStorage()}`,
				},
			}),
			invalidatesTags: [`Goal`],
		}),
		// create task
		createTask: builder.mutation({
			query: (payload: ICreateTaskProps) => ({
				url: `${apiEndpoints.createTask}`,
				method: 'POST',
				body: payload,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${getTokenFromLocalStorage()}`,
				},
			}),
		}),
		// Delete task
		deleteTask: builder.mutation({
			query: (id: number) => ({
				url: `${apiEndpoints.deleteTask}${id}/`,
				method: 'Delete',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${getTokenFromLocalStorage()}`,
				},
			}),
			invalidatesTags: [`Goal`],
		}),
		// Update task
		updateTask: builder.mutation({
			query: (payload: IUpdateTaskProps) => ({
				url: `${apiEndpoints.updateTask}${payload.task_id}/`,
				method: 'PATCH',
				body: payload.taskData,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${getTokenFromLocalStorage()}`,
				},
			}),
		}),
		// create sub task

		createSubTask: builder.mutation({
			query: (payload: ISubtaskPayload) => ({
				url: `${apiEndpoints.createSubTask}`,
				method: 'POST',
				body: payload,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${getTokenFromLocalStorage()}`,
				},
			}),
			invalidatesTags: [`Goal`],
		}),
		// Delete sub task
		deleteSubTask: builder.mutation({
			query: (id: number) => ({
				url: `${apiEndpoints.deleteSubTask}${id}/`,
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${getTokenFromLocalStorage()}`,
				},
			}),
			invalidatesTags: [`Goal`],
		}),
		// Update sub task
		updateSubTask: builder.mutation({
			query: (payload: IUpdateSubaskPayload) => ({
				url: `${apiEndpoints.updateSubTask}${payload.subtaskId}/`,
				method: 'PATCH',
				body: payload.taskData,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${getTokenFromLocalStorage()}`,
				},
			}),
			invalidatesTags: [`Goal`],
		}),
		// Get task by goal id
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
		getTaskList: builder.query({
			query: () => ({
				url: apiEndpoints.taskList,
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${getTokenFromLocalStorage()}`,
				},
			}),
		}),
		getSubTaskByTaskId: builder.query({
			query: (id: number) => ({
				url: `${apiEndpoints.subTaskList}/${id}/sub-task/`,
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${getTokenFromLocalStorage()}`,
				},
			}),
		}),

		getFaqBySubTaskId: builder.query({
			query: (id?: number) => ({
				url: `${apiEndpoints.faqlistBySubtask}/${id}/faq/list/`,
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
	useGetTaskByGoalIdQuery,
	useGetSubTaskByTaskIdQuery,
	useGetTaskListQuery,
	useCreateTaskMutation,
	useDeleteTaskMutation,
	useUpdateTaskMutation,
	useGetFaqBySubTaskIdQuery
	useCreateSubTaskMutation,
	useUpdateSubTaskMutation,
	useDeleteSubTaskMutation,
} = taskManagementApiSlice;
