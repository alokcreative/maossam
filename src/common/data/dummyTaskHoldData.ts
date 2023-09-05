const data: {
	id: number;
	dueDate: string;
	name: string;
	category: string;
	expectedTime: string;
	status: string;
	assigned?: string;
	edit: string;
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
	},
];
export default data;
