import apiSlice from './apiSlice';
import apiEndpoints from '../../utiles/ApiRoute';

interface ICreateTaskProps {
	goal_id: string;
	description: string;
	title: string;
	due_date?: string;
	expected_time?: string;
	// status: string;
}
interface IUpdateTaskProps {
	taskData: { description: string; title: string };
	task_id?: string;
}
interface IGoal {
	title: string;
	description: string;
	due_date?: string;
	expected_time?: string;
	// status: string;
	category?: string;
}

// interface Goal {
// 	goalData: IGoal;
// }

interface IGoalPayload {
	id: string;
	goalData: IGoal;
}
interface FAQ {
	// id: string;

	question: string;
	answer: string;
}
interface IUpdateFAQ {
	index?: number;
	faq: FAQ;
}
interface ISubtaskAssignProps {
	subtask_id?: string;
	scheduled_on: string;
}
interface ISubtaskPayload {
	task_id: string;
	title: string;
	description: string;
	intro?: string;
	due_date?: string;
	expected_time?: string;
	faq_data?: FAQ[];
}
interface IUpdateSubaskPayload {
	taskData: {
		task_id?: string;
		description?: string;
		title?: string;
		status?: string;
		due_date?: string;
		expected_time?: string;
	};
	subtaskId?: string;
}
interface IUpdateSubaskStatusPayload {
	taskData: {
		status?: string;
	};
	subtaskId?: string;
}
interface IMiniTaskCreatePayload {
	subtask_id: string;
	title: string;
	description: string;
}
interface IMiniTaskUpdatePayload {
	miniTaskId: string;
	miniTaskData: {
		subtask_id?: string;
		title?: string;
		description?: string;
		due_date?: string;
		status?: string;
	};
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

		// // Get SubTask
		// getSubTask: builder.query({
		// 	query: (id: string) => ({
		// 		url: `${apiEndpoints.updateSubTask}/${id}/faq/list/`,
		// 		method: 'GET',
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 			Authorization: `Bearer ${getTokenFromLocalStorage()}`,
		// 		},
		// 	}),
		// }),

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
		createSubTaskwithFAQ: builder.mutation({
			query: (payload: ISubtaskPayload) => ({
				url: `${apiEndpoints.createSubTaskwithFAQ}`,
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
		// Update sub task
		updateSubTaskStatus: builder.mutation({
			query: (payload: IUpdateSubaskStatusPayload) => ({
				url: `${apiEndpoints.updateSubTaskStatus}${payload.subtaskId}/`,
				method: 'POST',
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

		getSubTask: builder.mutation({
			query: (id: number) => ({
				url: `${apiEndpoints.getSubTask}${id}/faq/list/`,
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
		createMinitask: builder.mutation({
			query: (payload: IMiniTaskCreatePayload) => ({
				url: `${apiEndpoints.createMinitask}`,
				method: 'POST',
				body: payload,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${getTokenFromLocalStorage()}`,
				},
			}),
		}),
		updateMinitask: builder.mutation({
			query: (payload: IMiniTaskUpdatePayload) => ({
				url: `${apiEndpoints.updateMinitask}${payload.miniTaskId}/`,
				method: 'PATCH',
				body: payload.miniTaskData,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${getTokenFromLocalStorage()}`,
				},
			}),
		}),
		deleteMinitask: builder.mutation({
			query: (payload: number) => ({
				url: `${apiEndpoints.deleteMinitask}${payload}/`,
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${getTokenFromLocalStorage()}`,
				},
			}),
		}),
		getMiniTasksBySubId: builder.query({
			query: (id?: number) => ({
				url: `${apiEndpoints.minitaskListBySubId}${id}/mini-task/list/`,
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${getTokenFromLocalStorage()}`,
				},
			}),
		}),
		deleteFAQ: builder.mutation({
			query: (index: number) => ({
				url: `${apiEndpoints.deleteFAQ}${index}`,
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${getTokenFromLocalStorage()}`,
				},
			}),
		}),
		updateFAQ: builder.mutation({
			query: (payload: IUpdateFAQ) => ({
				url: `${apiEndpoints.updateFAQ}${payload.index}/`,
				method: 'PATCH',
				body: payload.faq,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${getTokenFromLocalStorage()}`,
				},
			}),
		}),
		asignSubtask: builder.mutation({
			query: (payload: ISubtaskAssignProps) => ({
				url: apiEndpoints.assignSubtask,
				method: 'POST',
				body: payload,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${getTokenFromLocalStorage()}`,
				},
			}),
		}),
		getCategoryList: builder.query({
			query: () => ({
				url: apiEndpoints.getCategoryList,
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
	useGetFaqBySubTaskIdQuery,
	useCreateSubTaskwithFAQMutation,
	useCreateSubTaskMutation,
	useUpdateSubTaskMutation,
	useUpdateSubTaskStatusMutation,
	useDeleteSubTaskMutation,
	useCreateMinitaskMutation,
	useUpdateMinitaskMutation,
	useDeleteMinitaskMutation,
	useGetMiniTasksBySubIdQuery,
	useGetSubTaskMutation,
	useDeleteFAQMutation,
	useUpdateFAQMutation,
	useAsignSubtaskMutation,
	useGetCategoryListQuery,
} = taskManagementApiSlice;
