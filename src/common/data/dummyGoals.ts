export const dateFormat = new Intl.DateTimeFormat('en-US', {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
});

interface ITask {
	id: number;
	name: string;
	description: string;
	status: string;
	expectedTime: string;
	dueDate?: string | undefined;
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
		name: 'Increase brand awareness',
		description:
			'Target audience, marketing channels, brand positioning, brand messaging, advertising budget',
		timeline: new Date(2023, 8, 2).toISOString().split('T')[0],
		status: 'Done',
		task: [
			{
				id: 1,
				name: 'Complete report on market research findings	',
				description: 'description 1',
				status: 'Pending',
				expectedTime: '45min',
				dueDate: '23-Oct-2023',
			},
		],
	},
	{
		id: 2,
		name: 'Generate leads',
		description:
			'Lead generation tactics, lead capture forms, lead nurturing workflows, conversion tracking, lead scoring',
		timeline: new Date(2023, 8, 5).toISOString().split('T')[0],
		status: 'New',
		task: [
			{
				id: 1,
				name: "Review and provide feedback on colleague's presentation	",
				description: 'description 1',
				status: 'Backlog',
				expectedTime: '45min',
				dueDate: '23-Oct-2023',
			},
			{
				id: 2,
				name: 'Review and provide 2',
				description: 'description 1',
				status: 'Backlog',
				expectedTime: '45min',
				dueDate: '28-Oct-2023',
			},
		],
	},
	{
		id: 3,
		name: 'Drive website traffic',
		description:
			'Search engine optimization (SEO), content marketing, social media marketing, paid advertising, referral programs',
		timeline: new Date(2023, 8, 14).toISOString().split('T')[0],
		status: 'Progress',
		task: [
			{
				id: 1,
				name: "Review and provide feedback on colleague's presentation	",
				description: 'description 1',
				status: 'Backlog',
				expectedTime: '45min',
				dueDate: '23-Oct-2023',
			},
			{
				id: 2,
				name: 'Review and provide 2',
				description: 'description 2',
				status: 'Backlog',
				expectedTime: '45min',
				dueDate: '28-Oct-2023',
			},
		],
	},
	{
		id: 4,
		name: 'Enhance customer engagement',
		description:
			'Email marketing campaigns, social media engagement, customer feedback surveys, loyalty programs, interactive content',
		timeline: new Date(2023, 7, 23).toISOString().split('T')[0],
		status: 'Done',
	},
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
