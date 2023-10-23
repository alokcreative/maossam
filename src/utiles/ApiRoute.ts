const apiEndpoints = {
	register: 'users/register/',
	login: 'users/login/',
	profile: 'users/profile/',
	getUser: 'users/getuser',
	signup: 'users/register/',
	logout: 'users/logout/',
	forgotPassword: 'users/password/forgot/',
	setPassword: 'users/password/generate/',
	changePassword: 'users/password/change/',
	createUser: 'users/create/',
	update: 'users/update/',
	allUser: 'users/list/',
	deleteUser: 'users/delete/',
	deleteGoal: 'task-manager/goals/delete/',
	updateGoal: 'task-manager/goals/update/',
	createGoal: 'task-manager/goals/create/',
	createTask: 'task-manager/goals/tasks/create/',
	deleteTask: 'task-manager/goals/tasks/delete/',
	updateTask: 'task-manager/goals/tasks/update/',
	createSubTask: 'task-manager/goals/tasks/sub-task/create/',
	createSubTaskwithFAQ: 'task-manager/goals/tasks/sub-task-with-faq/create/',
	deleteSubTask: 'task-manager/goals/tasks/sub-task/delete/',
	updateSubTask: 'task-manager/goals/tasks/sub-task/update/',
	goalList: 'task-manager/goals/list/',
	taskList: 'task-manager/goals/tasks/list/',
	taslistByGoalId: 'task-manager/goals/',
	subTaskList: 'task-manager/goals/tasks',
	faqlistBySubtask: 'task-manager/goals/tasks/sub-task',
	createMinitask: 'task-manager/goals/tasks/sub-task/mini-task/create/',
	updateMinitask: 'task-manager/goals/tasks/sub-task/mini-task/update/',
	deleteMinitask: 'task-manager/goals/tasks/sub-task/mini-task/delete/',
	minitaskListBySubId: 'task-manager/goals/tasks/sub-task/',
};
export default apiEndpoints;
