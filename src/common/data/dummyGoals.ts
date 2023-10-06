import dayjs from 'dayjs';

export const dateFormat = new Intl.DateTimeFormat('en-US', {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
});
interface IMiniTask {
	id?: string | number;
	title?: string | number;
	description: string;
}
interface ISubTask {
	id: number;
	name: string;
	description: string;
	status: string;
	expectedTime: string;
	secheduledate: dayjs.ConfigType;
	miniTasks?: IMiniTask[] | undefined;
}
interface ITask {
	id: number;
	name: string;
	title: string;
	description: string;
	status: string;
	expectedTime: string;
	dueDate?: string | undefined;
	subtaskIntro: string;
	subTask?: ISubTask[] | undefined;
}

export const data: {
	id: number;
	name: string;
	description: string;
	timeline: string;
	status: string;
	task?: ITask[] | undefined;
}[] = [
	{
		id: 1,
		name: 'Enhance your presence on Google',
		description:
			'Improve Your Online Presence and Stand Out on Google with simple but imperative tasks to complete ASAP- 100 % free',
		timeline: new Date(2023, 8, 2).toISOString().split('T')[0],
		status: 'Done',
		task: [
			{
				id: 1,
				name: 'Google My Business',
				title: "Establish and/or configure your profile to improve your business's visibility and engagement on Google",
				description:
					'Creating and setting up a Google Business Account, also known as a Google My Business (GMB) account, is essential for businesses looking to improve their online visibility and manage their information on Google Maps and Search',
				status: 'Todo',
				expectedTime: '45min',
				dueDate: '23-Oct-2023',
				subtaskIntro: "Here's a step-by-step guide on how to create and set up a Google Business Account:",
				subTask: [
					{
						id: 1,
						name: 'Sub Task1 of Task 1: Basic Set up of Google My Business',
						description: '',
						status: 'Todo',
						expectedTime: '45min',
						secheduledate: dayjs().add(0.5, 'day'),
						miniTasks: [
							{
								id: 1,
								title: 'New Products will be added',
								description:
									'Explore the internet and use our Best Practice step by step guide to find the relevant web sites and directories for your company',
							},
							{
								id: 2,
								title: 'Cover images will be edited',
								description: 'Explore the company',
							},
						],
					},
					{
						id: 2,
						name: 'Sub Task2 of Task 1',
						description: '',
						status: 'Todo',
						expectedTime: '45min',
						secheduledate: dayjs().add(0.5, 'day'),
						miniTasks: [
							{
								id: 1,
								title: 'Mini Task1 of Task 1',
								description:
									'Explore the internet and use our Best Practice step by step guide to find the relevant web sites and directories for your company',
							},
							{
								id: 2,
								title: 'Cover images will be edited',
								description: 'Explore the company',
							},
						],
					},
					{
						id: 3,
						name: 'Sub Task3 of Task 1',
						description: '',
						status: 'Todo',
						expectedTime: '45min',
						secheduledate: dayjs().add(0.5, 'day'),
						miniTasks: [
							{
								id: 1,
								title: 'Mini Task1 of Task 1',
								description:
									'Explore the internet and use our Best Practice step by step guide to find the relevant web sites and directories for your company',
							},
							{
								id: 2,
								title: 'Cover images will be edited',
								description: 'Explore the company',
							},
						],
					},
					{
						id: 4,
						name: 'Sub Task3 of Task 1',
						description: '',
						status: 'Todo',
						expectedTime: '45min',
						secheduledate: dayjs().add(0.5, 'day'),
						miniTasks: [
							{
								id: 1,
								title: 'Mini Task1 of Task 1',
								description:
									'Explore the internet and use our Best Practice step by step guide to find the relevant web sites and directories for your company',
							},
							{
								id: 2,
								title: 'Cover images will be edited',
								description: 'Explore the company',
							},
						],
					},
				],
			},
			{
				id: 2,
				name: 'Task 2 Complete report on market research findings',
				title:"Market research findings",
				description: 'description 1',
				status: 'Pending',
				expectedTime: '45min',
				dueDate: '23-Oct-2023',
				subtaskIntro: 'Sub Task2 intro',
				subTask: [
					{
						id: 1,
						name: 'Sub Task1 of Task 2',
						description: '',
						status: 'Todo',
						expectedTime: '45min',
						secheduledate: dayjs().add(0.5, 'day'),
					},
					{
						id: 2,
						name: 'Sub Task2 of Task 2',
						description: '',
						status: 'Todo',
						expectedTime: '45min',
						secheduledate: dayjs().add(0.5, 'day'),
					},
				],
			},
		],
	},
	{
		id: 2,
		name: 'Enhance your presence on Google2',
		description:
			'Improve Your Online Presence and Stand Out on Google with simple but imperative tasks to complete ASAP- 100 % free',
		timeline: new Date(2023, 8, 2).toISOString().split('T')[0],
		status: 'Done',
		task: [
			{
				id: 1,
				name: 'Task 1 Goal 2 Google My Business',
				title: "Establish and/or configure your profile to improve your business's visibility and engagement on Google",
				description:
					'Creating and setting up a Google Business Account, also known as a Google My Business (GMB) account, is essential for businesses looking to improve their online visibility and manage their information on Google Maps and Search',
				status: 'Todo',
				expectedTime: '45min',
				dueDate: '23-Oct-2023',
				subtaskIntro: 'Task 1 Intro',
				subTask: [
					{
						id: 1,
						name: 'Sub Task1 of Task 1',
						description: 'internet and use our Best Practice',
						status: 'Todo',
						expectedTime: '45min',
						secheduledate: dayjs().add(0.5, 'day'),
						miniTasks: [
							{
								id: 1,
								title: 'New Products will be added',
								description:
									'Explore the internet and use our Best Practice step by step guide to find the relevant web sites and directories for your company',
							},
							{
								id: 2,
								title: 'Cover images will be edited',
								description: 'Explore the company',
							},
						],
					},
					{
						id: 2,
						name: 'Sub Task2 of Task 1',
						description: 'find the relevant web sites and directories for your company',
						status: 'Todo',
						expectedTime: '45min',
						secheduledate: dayjs().add(0.5, 'day'),
						miniTasks: [
							{
								id: 1,
								title: 'Mini Task1 of Task 1',
								description:
									'Explore the internet and use our Best Practice step by step guide to find the relevant web sites and directories for your company',
							},
							{
								id: 2,
								title: 'Cover images will be edited',
								description: 'Explore the company',
							},
						],
					},
				],
			},
			{
				id: 2,
				name: 'Task 2 Complete report on market research findings	',
				title: 'Research findings',
				description: 'description 1',
				status: 'Pending',
				expectedTime: '45min',
				dueDate: '23-Oct-2023',
				subtaskIntro: 'Sub Task2 intro',
				subTask: [
					{
						id: 1,
						name: 'Sub Task1 of Task 2',
						description: '',
						status: 'Todo',
						expectedTime: '45min',
						secheduledate: dayjs().add(0.5, 'day'),
					},
					{
						id: 2,
						name: 'Sub Task2 of Task 2',
						description: '',
						status: 'Todo',
						expectedTime: '45min',
						secheduledate: dayjs().add(0.5, 'day'),
					},
				],
			},
		],
	},
];

export default data;
