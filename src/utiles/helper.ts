interface ICategoryList {
	id: number;
	goal_count: number;
	created_at: string;
	updated_at: string;
	title: string;
	slug: string;
}

export const categoryEnum = [
	{ value: 1, text: 'Category1' },
	{ value: 2, text: 'Category2' },
	{ value: 3, text: 'Category3' },
	{ value: 4, text: 'Category4' },
	{ value: 5, text: 'Category5' },
];

export const categoryStringValue: { [key: string]: number } = {
	Category4: 4,
	Category2: 6,
	Category1: 5,
	Category3: 7,
};

export const formatCategory = (apiResponse: ICategoryList[]) => {
	return apiResponse.map((category: ICategoryList) => ({
		value: category.id,
		text: category.title,
	}));
};
