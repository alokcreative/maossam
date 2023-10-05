import dayjs from 'dayjs';

export const dateFormat = new Intl.DateTimeFormat('en-US', {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
});
export interface IMiniTask {
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
				name: "Task 1 Google My Business: Establish and/or configure your profile to improve your business's visibility and engagement on Google",
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
						description: '',
						status: 'Todo',
						expectedTime: '45min',
						secheduledate: dayjs().add(0.5, 'day'),
						miniTasks: [
							{
								id: 1,
								title: 'New Products will be added',
								description: 'Explore the internet and use our Best Practice step by step guide to find the relevant web sites and directories for your company',
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
								description: 'Explore the internet and use our Best Practice step by step guide to find the relevant web sites and directories for your company',
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
	// {
	// 	id: 2,
	// 	name: 'Generate leads',
	// 	description:
	// 		'Lead generation tactics, lead capture forms, lead nurturing workflows, conversion tracking, lead scoring',
	// 	timeline: new Date(2023, 8, 5).toISOString().split('T')[0],
	// 	status: 'New',
	// 	task: [
	// 		{
	// 			id: 1,
	// 			name: "Review and provide feedback on colleague's presentation	",
	// 			description: 'description 1',
	// 			status: 'Backlog',
	// 			expectedTime: '45min',
	// 			dueDate: '23-Oct-2023',
	// 		},
	// 		{
	// 			id: 2,
	// 			name: 'Review and provide 2',
	// 			description: 'description 1',
	// 			status: 'Backlog',
	// 			expectedTime: '45min',
	// 			dueDate: '28-Oct-2023',
	// 		},
	// 	],
	// },
	// {
	// 	id: 3,
	// 	name: 'Drive website traffic',
	// 	description:
	// 		'Search engine optimization (SEO), content marketing, social media marketing, paid advertising, referral programs',
	// 	timeline: new Date(2023, 8, 14).toISOString().split('T')[0],
	// 	status: 'Progress',
	// 	task: [
	// 		{
	// 			id: 1,
	// 			name: "Review and provide feedback on colleague's presentation	",
	// 			description: 'description 1',
	// 			status: 'Backlog',
	// 			expectedTime: '45min',
	// 			dueDate: '23-Oct-2023',
	// 		},
	// 		{
	// 			id: 2,
	// 			name: 'Review and provide 2',
	// 			description: 'description 2',
	// 			status: 'Backlog',
	// 			expectedTime: '45min',
	// 			dueDate: '28-Oct-2023',
	// 		},
	// 	],
	// },
	// {
	// 	id: 4,
	// 	name: 'Enhance customer engagement',
	// 	description:
	// 		'Email marketing campaigns, social media engagement, customer feedback surveys, loyalty programs, interactive content',
	// 	timeline: new Date(2023, 7, 23).toISOString().split('T')[0],
	// 	status: 'Done',
	// },
	// {
	// 	id: 5,
	// 	name: 'Improve conversion rate',
	// 	description:
	// 		'Website optimization, A/B testing, call-to-action optimization, landing page design, user experience analysis',
	// 	timeline: new Date(2023, 7, 28).toISOString().split('T')[0],
	// 	status: 'Progress',
	// },
	// {
	// 	id: 6,
	// 	name: 'Expand market reach',
	// 	description:
	// 		'Market research, competitor analysis, market segmentation, international expansion strategies, strategic partnerships',
	// 	timeline: new Date(2023, 8, 15).toISOString().split('T')[0],
	// 	status: 'Progress',
	// },
	// {
	// 	id: 7,
	// 	name: 'Strengthen customer loyalty',
	// 	description:
	// 		'Customer retention programs, personalized offers, VIP customer benefits, customer satisfaction surveys, referral programs',
	// 	timeline: new Date(2023, 8, 12).toISOString().split('T')[0],
	// 	status: 'New',
	// },
	// {
	// 	id: 8,
	// 	name: 'Boost social media presence',
	// 	description:
	// 		'Social media content calendar, influencer collaborations, user-generated content campaigns, social media advertising, community engagement',
	// 	timeline: new Date(2023, 8, 10).toISOString().split('T')[0],
	// 	status: 'New',
	// },
	// {
	// 	id: 9,
	// 	name: 'Enhance brand reputation',
	// 	description:
	// 		'Online reputation management, public relations campaigns, brand monitoring, customer testimonials, industry partnerships',
	// 	timeline: new Date(2023, 7, 25).toISOString().split('T')[0],
	// 	status: 'Progress',
	// },
];

export default data;
