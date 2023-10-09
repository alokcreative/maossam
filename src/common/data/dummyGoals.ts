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
export interface ISubTask {
	id: number;
	name: string;
	description: string;
	status: string;
	expectedTime: string;
	secheduledate: dayjs.ConfigType;
	miniTasks?: IMiniTask[] | undefined;
	questions?: IQuestion[] | undefined;
}

interface IQuestion {
	id: number;
	name: string;
	answer: string;
}
export interface ITask {
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
				subtaskIntro:
					"Here's a step-by-step guide on how to create and set up a Google Business Account:",
				subTask: [
					{
						id: 1,
						name: 'Basic Set up of Google My Business (Sub Task2 of Task 1)',
						description: '',
						status: 'Todo',
						expectedTime: '45min',
						secheduledate: dayjs().add(1, 'days').format('YYYY-MM-DD'),
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
						questions: [
							{
								id: 1,
								name: 'How will a Google My Business Account (GMB) help promote my company?',
								answer: 'Creating and setting up a Google Business Account, also known as a Google My Business (GMB) account, is essential for businesses looking to improve their online visibility and manage their information on Google Maps and Search.',
							},
							{
								id: 2,
								name: 'Get more visibility on Google with my Google Business - 100% Free ?',
								answer: "Google promotes companies with Google Business Accounts (Google My Business) by displaying their business information prominently in search results and Google Maps – and this is completely free of charge. This visibility helps businesses reach local customers and gain credibility.Here's how Google promotes businesses with GMB accounts: 1. Local Pack: When users search for local businesses or services, Google often displays a 'Local Pack' at the top of the search results page. This pack typically includes a map and a list of three businesses related to the search query. These businesses have Google My Business listings and are shown with essential details such as their name, address, phone number, ratings, and a link to their website. Being featured in the Local Pack is a significant advantage as it's the first thing users see when searching for local services.            2. Google Maps: Businesses with Google My Business accounts are listed on Google Maps. Users can easily find your business when they search for specific keywords or browse the map. Your listing will include essential information, such as your location, hours of operation, photos, reviews, and a link to your website. Users can also get directions to your business directly through Google Maps.            3.Knowledge Panel: Google often displays a Knowledge Panel on the right-hand side of the search results page for businesses with Google My Business listings. This panel provides a snapshot of essential information about your business, including your logo, address, phone number, website link, hours of operation, and a brief description. Users can access additional details by clicking on your listing.4.Reviews and Ratings: Google prominently displays customer reviews and ratings on your GMB listing. Positive reviews and high ratings can improve your business's visibility and credibility. Responding to reviews, both positive and negative, can also help enhance your online reputation.5.        Posts and Updates: Google My Business allows you to create posts and updates about your business. These can include promotions, events, new product announcements, and more. These posts may appear in your Knowledge Panel, providing additional information to potential customers and encouraging engagement.6.        Google Search: Beyond the Local Pack, Google may include your business in organic search results. Having an optimized GMB listing with accurate information can improve your overall search engine visibility, making it easier for potential customers to find you when searching for relevant keywords.7.        Google Ads Integration: If you run Google Ads campaigns, you can link your GMB account to your advertising efforts. This can include location extensions in ads, which display your business information alongside your ads, making them more relevant to local users.8.        Mobile Visibility: With the increasing use of mobile devices, businesses with Google My Business accounts benefit from better visibility on mobile searches, especially when users are looking for nearby businesses or services on their smartphones.To maximize the benefits of your Google My Business account, ensure that your listing is complete, accurate, and regularly updated. Encourage customer reviews and engagement on your profile, and use the platform's features like posts and updates to keep your audience informed and engaged. Google rewards businesses that actively manage their GMB accounts with improved visibility and greater opportunities to connect with potential customers.",
							},
						],
					},
					{
						id: 2,
						name: 'Sub Task2 of Task 1',
						description: '',
						status: 'Todo',
						expectedTime: '45min',
						secheduledate: dayjs().add(1, 'days').format('YYYY-MM-DD'),
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
						questions: [
							{
								id: 1,
								name: 'Task 1 SubTask 2 Question 1',
								answer: 'Task 1 SubTask 2 Answer 1.',
							},
							{
								id: 2,
								name: 'Task 1 SubTask 2 Question 2',
								answer: 'Task 1 SubTask 2 Answer 2',
							},
						],
					},
					{
						id: 3,
						name: 'Sub Task3 of Task 1',
						description: '',
						status: 'Done',
						expectedTime: '45min',
						secheduledate: dayjs().add(1, 'days').format('YYYY-MM-DD'),
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
						name: 'Sub Task4 of Task 1',
						description: '',
						status: 'Pending',
						expectedTime: '45min',
						secheduledate: dayjs().add(1, 'days').format('YYYY-MM-DD'),
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
				title: 'Market research findings',
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
						status: 'Pending',
						expectedTime: '45min',
						secheduledate: dayjs().add(1, 'days').format('YYYY-MM-DD'),
						questions: [
							{
								id: 1,
								name: 'Task 2 SubTask 1 Question 1',
								answer: 'Task 2 SubTask 1 Answer 1.',
							},
							{
								id: 2,
								name: 'Task 2 SubTask 1 Question 2',
								answer: 'Task 2 SubTask 1 Answer 2',
							},
						],
					},
					{
						id: 2,
						name: 'Sub Task2 of Task 2',
						description: '',
						status: 'Progress',
						expectedTime: '45min',
						secheduledate: dayjs().add(1, 'days').format('YYYY-MM-DD'),
						questions: [
							{
								id: 1,
								name: 'Task 2 SubTask 2 Question 1',
								answer: 'Task 2 SubTask  2 Answer 1',
							},
							{
								id: 2,
								name: 'Task 2 SubTask 2 Question2',
								answer: 'Task 2 SubTask 2 Answer 2  ',
							},
						],
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
						status: 'Done',
						expectedTime: '45min',
						secheduledate: dayjs().add(1, 'days').format('YYYY-MM-DD'),
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
						questions: [
							{
								id: 1,
								name: 'Question 1',
								answer: 'Answer 1',
							},
							{
								id: 2,
								name: 'Get more visibility on Google123 ',
								answer: 'Google promotes123 ',
							},
						],
					},
					{
						id: 2,
						name: 'Sub Task2 of Task 1',
						description: 'find the relevant web sites and directories for your company',
						status: 'Pending',
						expectedTime: '45min',
						secheduledate: dayjs().add(1, 'days').format('YYYY-MM-DD'),
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
						questions: [
							{
								id: 1,
								name: 'Question 1',
								answer: 'Answer 1',
							},
							{
								id: 2,
								name: 'Get more visibility on Google123 ',
								answer: 'Google promotes123 ',
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
						secheduledate: dayjs().add(1, 'days').format('YYYY-MM-DD'),
						questions: [
							{
								id: 1,
								name: 'Question 1',
								answer: 'Answer 1',
							},
							{
								id: 2,
								name: 'Get more ',
								answer: 'Google promotes ',
							},
						],
					},
					{
						id: 2,
						name: 'Sub Task2 of Task 2',
						description: '',
						status: 'Todo',
						expectedTime: '45min',
						secheduledate: dayjs().add(1, 'days').format('YYYY-MM-DD'),
						questions: [
							{
								id: 1,
								name: 'Question 2',
								answer: 'Answer 2',
							},
							{
								id: 2,
								name: 'Get more ',
								answer: 'Google promotes ',
							},
						],
					},
				],
			},
		],
	},
];

export default data;
