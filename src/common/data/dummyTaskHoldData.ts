const data: {
	id: number;
	dueDate: string;
	name: string;
	category: string;
	expectedTime: string;
	status: string;
	assigned?: string;
	edit: string;
	goalId: number;
}[] = [
	{
		id: 1,
		dueDate: 'Dec 28th 2022 ',
		name: 'Complete report on market research findings',
		category: 'Marketing Asset',
		expectedTime: '45min',
		status: 'Backlog',
		assigned: 'Mohan',
		edit: 'Edit',
		goalId: 1,
	},
	{
		id: 2,
		dueDate: 'Dec 28th 2022',
		name: 'Schedule a meeting with the team to discuss project updates',
		category: 'Product',
		expectedTime: '45min',
		status: 'Todo',
		assigned: 'John',
		edit: 'Edit',
		goalId: 1,
	},
	{
		id: 3,
		dueDate: 'Dec 28th 2022',
		name: 'Review and provide feedback on colleague\'s presentation',
		category: 'Client',
		expectedTime: '45min',
		status: 'InProgress',
		assigned: 'Mayc',
		edit: 'Edit',
		goalId: 3,
	},
	{
		id: 4,
		dueDate: 'Dec 28th 2022',
		name: 'Collaboration',
		category: 'Marketing Asset',
		expectedTime: '45min',
		status: 'Hold',
		assigned: 'Singh',
		edit: 'Edit',
		goalId: 3,
	},
	// {
	// 	id: 5,
	// 	dueDate: 'Dec 28th 2022',
	// 	name: 'Create a detailed budget proposal for the next quarter',
	// 	category: 'Client',
	// 	expectedTime: '45min',
	// 	status: 'Done',
	// 	assigned: 'Jaspal singh',
	// 	edit: 'Edit',
	// 	goalId: 2,
	// },
	// {
	// 	id: 6,
	// 	dueDate: 'July 04th 2023',
	// 	name: 'Create a detailed budget proposal for the next quarter',
	// 	category: 'Client',
	// 	expectedTime: '4days',
	// 	status: 'Done',
	// 	assigned: 'Chandra',
	// 	edit: 'Edit',
	// 	goalId: 4,
	// },
	// {
	// 	id: 7,
	// 	dueDate: 'July 6th 2023',
	// 	name: 'Create a detailed budget proposal for the next quarter',
	// 	category: 'Client',
	// 	expectedTime: '24Hours',
	// 	status: 'Done',
	// 	assigned: 'Rajiv',
	// 	edit: 'Edit',
	// 	goalId: 3,
	// },
	// {
	// 	id: 8,
	// 	dueDate: 'July 8th 2023',
	// 	name: 'Create a detailed budget proposal for the next quarter',
	// 	category: 'Marketing Asset',
	// 	expectedTime: '24Hours',
	// 	status: 'Done',
	// 	assigned: 'Sohan',
	// 	edit: 'Edit',
	// 	goalId: 2,
	// },
];
export default data;
