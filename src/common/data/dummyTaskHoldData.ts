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
		dueDate: 'Dec 28th 2022, 10:30 am',
		name: 'Complete report on market research findings',
		category: 'Marketing Asset',
		expectedTime: '45min',
		status: 'Approved',
		assigned: 'Mohan',
		edit: 'Edit',
		goalId: 1,
	},
	{
		id: 2,
		dueDate: 'Dec 28th 2022, 12:00 pm',
		name: 'Schedule a meeting with the team to discuss project updates',
		category: 'Product',
		expectedTime: '45min',
		status: 'Approved',
		assigned: 'John',
		edit: 'Edit',
		goalId: 1,
	},
	{
		id: 3,
		dueDate: 'Dec 28th 2022, 12:30 pm',
		name: 'Review and provide feedback on colleague\'s presentation',
		category: 'Client',
		expectedTime: '45min',
		status: 'Cancelled',
		assigned: 'Mayc',
		edit: 'Edit',
		goalId: 3,
	},
	{
		id: 4,
		dueDate: 'Dec 28th 2022, 03:00 pm',
		name: 'Collaboration',
		category: 'Marketing Asset',
		expectedTime: '45min',
		status: 'Rejected',
		assigned: 'Singh',
		edit: 'Edit',
		goalId: 3,
	},
	{
		id: 5,
		dueDate: 'Dec 28th 2022, 10:30 am',
		name: 'Create a detailed budget proposal for the next quarter',
		category: 'Client',
		expectedTime: '45min',
		status: 'Approved',
		assigned: 'Jaspal singh',
		edit: 'Edit',
		goalId: 2,
	},
	{
		id: 6,
		dueDate: 'July 04th 2023, 10:30 am',
		name: 'Create a detailed budget proposal for the next quarter',
		category: 'Client',
		expectedTime: '4days',
		status: 'Approved',
		assigned: 'Chandra',
		edit: 'Edit',
		goalId: 2,
	},
	{
		id: 7,
		dueDate: 'July 6th 2023, 10:30 am',
		name: 'Create a detailed budget proposal for the next quarter',
		category: 'Client',
		expectedTime: '24Hours',
		status: 'Approved',
		assigned: 'Rajiv',
		edit: 'Edit',
		goalId: 4,
	},
	{
		id: 8,
		dueDate: 'July 8th 2023, 10:30 am',
		name: 'Create a detailed budget proposal for the next quarter',
		category: 'Marketing Asset',
		expectedTime: '24Hours',
		status: 'Approved',
		assigned: 'Sohan',
		edit: 'Edit',
		goalId: 3,
	},
];
export default data;
