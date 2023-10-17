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
	goalList: 'task-manager/goals/list/',
	taskList: 'task-manager/goals/tasks/list/',
	taslistByGoalId: 'task-manager/goals/',
	subTaskList: 'task-manager/goals/tasks',
};
export default apiEndpoints;
