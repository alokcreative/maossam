import dayjs from 'dayjs';

const salesData: {
	id: number;
	name: string;
	type: string;
	price: number;
	count: number;
	date: string;
}[] = [
	{
		id: 1,
		name: 'SEO Optimization Service',
		type: 'Service',
		price: 500,
		count: 10,
		date: '2023-07-20',
	},
	{
		id: 2,
		name: 'Task Management Software',
		type: 'Software',
		price: 200,
		count: 5,
		date: '2023-07-15',
	},
	{
		id: 3,
		name: 'Content Writing Service',
		type: 'Service',
		price: 200,
		count: 15,
		date: '2023-07-19',
	},
	{
		id: 4,
		name: 'Website Design and Development Service',
		type: 'Service',
		price: 1500,
		count: 3,
		date: '2023-07-18',
	},
	{
		id: 5,
		name: 'Email Marketing Campaign Service',
		type: 'Service',
		price: 300,
		count: 8,
		date: '2023-07-18',
	},
	{
		id: 6,
		name: 'Logo Design Service',
		type: 'Service',
		price: 100,
		count: 20,
		date: '2023-07-17',
	},
	{
		id: 7,
		name: 'Social Media Advertising Service',
		type: 'Service',
		price: 1000,
		count: 6,
		date: '2023-07-17',
	},
	{
		id: 8,
		name: 'Data Analysis Service',
		type: 'Service',
		price: 700,
		count: 12,
		date: '2023-07-16',
	},
	{
		id: 9,
		name: 'Graphic Design Service',
		type: 'Service',
		price: 300,
		count: 9,
		date: '2023-07-15',
	},
	{
		id: 10,
		name: 'Social Media Management Service',
		type: 'Service',
		price: 800,
		count: 5,
		date: '2023-07-19',
	},
	{
		id: 11,
		name: 'CRM Software',
		type: 'Software',
		price: 500,
		count: 4,
		date: '2023-07-14',
	},
	{
		id: 12,
		name: 'Project Management Software',
		type: 'Software',
		price: 400,
		count: 7,
		date: '2023-07-13',
	},
];
export default salesData;
