import dayjs from 'dayjs';
import { TColor } from '../../type/color-type';

export const dateFormat = new Intl.DateTimeFormat('en-US', {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
});
export interface IMiniTask {
	id?: string | number;
	title?: string | number;
	status?: boolean;
	date?: dayjs.ConfigType;
	badge?: {
		text?: string;
		color?: TColor;
	};
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
const TODO_BADGES: {
	[key: string]: {
		text: string;
		color?: TColor;
	};
} = {
	NEW: { text: 'New', color: 'success' },
	UPDATE: { text: 'Update', color: 'info' },
	TEST: { text: 'Test', color: 'warning' },
	REPORT: { text: 'Report', color: 'info' },
	PRINT: { text: 'Print', color: 'danger' },
	CONTROL: { text: 'Control', color: 'primary' },
	MEETING: { text: 'Meeting', color: 'secondary' },
};
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
						name: 'Basic Set up of Google My Business (Sub Task1 of Task 1)',
						description:
							"Sign in to Google: If you don't have a Google account, create one at https://accounts.google.com/signup .Access Google My Business: Go to https://www.google.com/business/.Click 'Manage Now': On the Google My Business homepage, click the 'Manage Now' button. Click on it to start the process of creating your business account.Enter your business name in the provided field. Make sure the name you enter is accurate and matches your business's real-world name and social media account names . Google may verify this information later. Choose Your Business Category: Select the most appropriate category that describes your business. Google will use this information to help users find your business when searching for related services.Add a Location: You'll be prompted to enter your business location. If you have a physical storefront or office that customers can visit, enter your address. Make sure to write the complete and accurate address, in case Google sends a verification postcard.If your business operates solely online or you don't have a physical location, you can select the option to hide your address.Specify Your Service Area (if applicable): If your business serves customers within a specific geographic area and you don't want to display your address, define your service area by city, region, or postal code.Provide Contact Information: Ensure that this information is accurate and up to date.Enter your business phone number and website URL.Complete the Verification Process: Google will need to verify your business to ensure its legitimacy. You'll typically have a few verification options. Follow the instructions provided for your chosen verification method.Postcard: Google will send you a postcard with a verification code to the address you provided. Enter the code to verify.Phone: If eligible, you can verify your business by phone.Email: Some businesses may have the option to verify via email.",
						status: 'Backlog',
						expectedTime: '45min',
						secheduledate: dayjs().add(1, 'days').format('YYYY-MM-DD'),
						miniTasks: [
							{
								id: 1,
								title: 'Sign in to Google',
								status: true,
								date: dayjs().add(0.5, 'day'),
								badge: TODO_BADGES.NEW,
							},
							{
								id: 2,
								status: true,
								title: 'Cover images will be edited',
								date: dayjs().add(2, 'day'),
								badge: TODO_BADGES.UPDATE,
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
						name: 'Enter Your Business Name',
						description:
							"Provide the name of your business. Make sure it's accurate and matches the name of your business as it appears in the real world.",
						status: 'Backlog',
						expectedTime: '45min',
						secheduledate: dayjs().add(1, 'days').format('YYYY-MM-DD'),
						miniTasks: [
							{
								id: 1,
								title: 'Preparing for A/B testing',
								status: false,
								date: dayjs().add(2, 'day'),
								badge: TODO_BADGES.TEST,
							},
							{
								id: 2,
								title: 'Trademark Compliance',
								status: false,
								date: dayjs().add(4, 'day'),
								badge: TODO_BADGES.REPORT,
							},

							{
								id: 3,
								title: 'Legal Name vs. Doing Business As (DBA) Name',
								status: false,

								date: dayjs().add(4, 'day'),
								badge: TODO_BADGES.REPORT,
							},
							{
								id: 4,
								status: false,
								title: 'Google Analytics data will be examined',
								date: dayjs().add(4, 'day'),
								badge: TODO_BADGES.REPORT,
							},
						],
						questions: [
							{
								id: 1,
								name: 'When entering my business name on Google My Business, can I include additional keywords to improve visibility?',
								answer: "It's important to enter your business name on Google My Business exactly as it is in real-world usage. Google My Business guidelines discourage adding extraneous keywords to the business name field for the purpose of improving visibility. The business name should accurately reflect your business's actual name as it appears on signage, official documents, and marketing materials. Keyword stuffing or adding unnecessary terms may violate Google's policies and could lead to a suspension of your listing. Focus on representing your business authentically and providing accurate information to users. If you need to include additional keywords for optimization, it's best to do so in the appropriate description or category sections within the Google My Business profile.",
							},
							{
								id: 2,
								name: 'Quick way to setup business account',
								answer: 'Visit to www.google.com/account/',
							},
						],
					},
					{
						id: 3,
						name: 'Add Your Business Location',
						description:
							'Input the location of your business. If you have a physical storefront or office, you can add the address. If your business operates without a physical location, you can choose to hide your address.',
						status: 'Backlog',
						expectedTime: '45min',
						secheduledate: dayjs().add(1, 'days').format('YYYY-MM-DD'),
						miniTasks: [
							{
								id: 1,
								title: 'Access Google My Business',
								status: false,

								date: dayjs().add(9, 'day'),
								badge: TODO_BADGES.PRINT,
							},
							{
								id: 2,
								title: 'Business Dashboard',
								status: false,

								date: dayjs().add(9, 'day'),
								badge: TODO_BADGES.PRINT,
							},
							{
								id: 3,
								title: 'Invoices will be issued',
								status: false,

								date: dayjs().add(9, 'day'),
								badge: TODO_BADGES.PRINT,
							},
						],
					},
					{
						id: 4,
						name: 'Verify Your Business',
						description:
							'Google will need to verify that your business is legitimate. You can choose to verify your business through a postcard sent to your physical address, a phone call, or email, depending on your location and business type.',
						status: 'Backlog',
						expectedTime: '45min',
						secheduledate: dayjs().add(1, 'days').format('YYYY-MM-DD'),
						miniTasks: [
							{
								id: 1,
								title: 'Access Verification Section',
								status: false,

								date: dayjs().add(15, 'day'),
								badge: TODO_BADGES.CONTROL,
							},
							{
								id: 2,
								title: 'Enter Verification Code',
								status: false,

								date: dayjs().add(15, 'day'),
								badge: TODO_BADGES.CONTROL,
							},
							{
								id: 3,
								title: 'Dependencies check and update',
								status: false,

								date: dayjs().add(15, 'day'),
								badge: TODO_BADGES.CONTROL,
							},
						],
					},
				],
			},
			{
				id: 2,
				name: 'Google my business profile ',
				title: 'Get more visibility on Google with my Google Business - 100% Free ',
				description:
					'Briefly describe your business, its unique selling proposition, and what customers can expect when they visit or engage with your business. Include keywords related to your services, location, and value proposition.',
				status: 'Backlog',
				expectedTime: '45min',
				dueDate: '23-Oct-2023',
				subtaskIntro: 'Sub Task2 intro',
				subTask: [
					{
						id: 1,
						name: 'Optimize Your Business Profile:',

						description:
							"Once your business is verified, you can access your Google My Business dashboard. Here, you can optimize your profile by adding high-quality photos, business hours, a detailed description, and other relevant information. This helps your business stand out in search results.Add Photos :- Add high-quality photos of your business, including:- A clear profile photo (typically your business logo).- A cover photo that showcases your business.- Additional photos of your interior, exterior, products, and services.Add Videos : Accepted formats include MP4 and MOV, and the maximum video file size is 75 MB. Videos should be between 30 seconds and 2 minutes in length.Add your Business Description: Write a concise and informative business description. You have up to 750 characters to describe your products/services and what makes your business unique. Attributes : Add any relevant attributes to your business, such as wheelchair accessibility, outdoor seating, or Wi-Fi availability.Add Products and Services (if applicable): If your business offers specific products or services, you can add them to your GMB profile to provide more information to potential customers.See Explanation#4 on how to write a compelling product/servcice description on GMB.Add to My Google Business Products/Services in 'My Marketing Material'Set Up Messaging (if desired): Enable messaging through GMB to communicate with customers directly. Make sure you will check your messages on GMB on a daily basis.Engage with Customers: Use GMB features like FAQ to interact with potential customers and address their inquiries.Enable Google Booking (if applicable):  If your business accepts appointments or reservations, set up Google Booking to allow customers to book directly from your GMB listing.Create Posts: Use GMB posts to promote events, offers, and updates to your audience. If you are active on Social Media such as Facebook - You can copy a post published on this media and copy its content on GMB.",
						status: 'Hold',
						expectedTime: '45min',
						secheduledate: dayjs().add(1, 'days').format('YYYY-MM-DD'),
						questions: [
							{
								id: 1,
								name: 'How can I optimize my Google My Business profile',
								answer: 'Complete your profile: Fill out all sections, including business name, address, phone number, hours of operation, website, categories, and services offered.',
							},
							{
								id: 2,
								name: 'How important are customer reviews for my Google My Business profile ',
								answer: 'Positive reviews build trust and credibility among potential customers.',
							},
						],
					},
					{
						id: 2,
						name: 'Add or Claim Your Business',
						description: ' Claim Your Business ',
						status: 'Progress',
						expectedTime: '45min',
						secheduledate: dayjs().add(1, 'days').format('YYYY-MM-DD'),
						questions: [
							{
								id: 1,
								name: 'How long does it take to verify my business on Google My Business',
								answer: ' The verification process can take a few days to a couple of weeks, depending on the verification method you choose. The most common method is via mail, where Google sends a postcard with a verification code to your business address. ',
							},
							{
								id: 2,
								name: 'What kind of information should I include in my Google My Business profile',
								answer: ' Include essential business information such as business name, category, address, phone number, website, business hours, and a detailed business description. High-quality photos and regular updates are also recommended.',
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
								status: false,

								date: dayjs().add(32, 'day'),
								badge: TODO_BADGES.MEETING,
							},
							{
								id: 2,
								title: 'Cover images will be edited',
								status: false,
								date: dayjs().add(32, 'day'),
								badge: TODO_BADGES.MEETING,
							},
							{
								id: 3,
								title: 'End of month meeting',
								status: false,
								date: dayjs().add(32, 'day'),
								badge: TODO_BADGES.MEETING,
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
							},
							{
								id: 2,
								title: 'Cover images will be edited',
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
