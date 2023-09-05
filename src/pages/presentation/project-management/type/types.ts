import { TColor } from '../../../../type/color-type';
import { TIcons } from '../../../../type/icons-type';

export type TColumnData = { id: string; title: string; color: TColor; icon: TIcons };
export type TColumnsData = {
	[key: string]: TColumnData;
};
export type TCard = {
	id: string;
	title: string;
	subtitle: string;
	description: string;
	label: string;
	img?: string;
	user: {
		username: string;
		name: string;
		surname: string;
		email: string;
		password: string;
		isAdmin: boolean;
		src: any;
		srcSet?: string;
		fullImage?: string;
		role?: string;
		company?: string;
		noOfTeam?: string;
		country?: string;
		state?: string;
	};
	tasks: { status: boolean; id: string | number; text: string }[];
	tags: {
		id: string;
		title: string;
		color?: TColor;
	}[];
	attachments?: { id: string | number; file: string; path: string }[];
};
export type TCards = {
	[key: string]: TCard[];
};
