import UserImage from '../../assets/img/wanna/wanna1.png';
import UserImageWebp from '../../assets/img/wanna/wanna1.webp';
import UserImage2 from '../../assets/img/wanna/wanna2.png';
import UserImage2Webp from '../../assets/img/wanna/wanna2.webp';
import UserImage3 from '../../assets/img/wanna/wanna3.png';
import UserImage3Webp from '../../assets/img/wanna/wanna3.webp';
import UserImage4 from '../../assets/img/wanna/wanna4.png';
import UserImage4Webp from '../../assets/img/wanna/wanna4.webp';
import UserImage5 from '../../assets/img/wanna/wanna5.png';
import UserImage5Webp from '../../assets/img/wanna/wanna5.webp';
import UserImage6 from '../../assets/img/wanna/wanna6.png';
import UserImage6Webp from '../../assets/img/wanna/wanna6.webp';
import UserImage7 from '../../assets/img/wanna/wanna7.png';
import UserImage7Webp from '../../assets/img/wanna/wanna7.webp';

import User7Landing from '../../assets/img/wanna/landing1.png';
import { TColor } from '../../type/color-type';

export interface IUserProps {
	id: string;
	name: string;
	email: string;
	src: string;
	srcSet: string;
	isOnline: boolean;
	isReply?: boolean;
	color: TColor;
	fullImage?: string;
	services?: string[];
	location: string;
	phone: number;
	connection: string;
}

const davidson: IUserProps = {
	id: '1',
	name: 'Davidson Lee',
	email: 'davidson@omtanke.studio',
	src: UserImage,
	srcSet: UserImageWebp,
	isOnline: true,
	isReply: true,
	color: 'primary',
	services: ['Travel', 'Fitness', 'Technology'],
	phone: 555 - 1234,
	location: 'New York, USA',
	connection: 'Friend',
};

const emilywee: IUserProps = {
	id: '2',
	name: 'Emilywee Wilson',
	email: 'emilywee@omtanke.studio',
	src: UserImage2,
	srcSet: UserImage2Webp,
	isOnline: true,
	color: 'warning',
	services: ['Fashion', 'Photography', 'Music'],
	phone: 555 - 5678,
	location: 'Los Angeles, USA',
	connection: 'Colleague',
};

const michael: IUserProps = {
	id: '3',
	name: 'Michael Davis',
	email: 'michael@omtanke.studio',
	src: UserImage3,
	srcSet: UserImage3Webp,
	isOnline: true,
	color: 'secondary',
	services: ['Sports', 'Cooking', 'Gardening'],
	phone: 555 - 9876,
	location: 'London, UK',
	connection: 'Colleague',
};

const emily: IUserProps = {
	id: '4',
	name: 'Emily Wilson',
	email: 'emily@omtanke.studio',
	src: UserImage4,
	srcSet: UserImage4Webp,
	isOnline: false,
	color: 'info',
	services: ['Art', 'Reading', 'Outdoor', 'Activities'],
	phone: 555 - 4321,
	location: 'Sydney, Australia',
	connection: 'Other',
};

const david: IUserProps = {
	id: '5',
	name: ' David Lee',
	email: 'david@omtanke.studio',
	src: UserImage5,
	srcSet: UserImage5Webp,
	isOnline: false,
	color: 'success',
	services: ['Technology', 'Gaming', 'Movies'],
	phone: 555 - 2468,
	location: 'Toronto, Canada',
	connection: 'Friend',
};

const lisa: IUserProps = {
	id: '6',
	name: 'Lisa Anderson',
	email: 'lisa@omtanke.studio',
	src: UserImage6,
	srcSet: UserImage6Webp,
	isOnline: true,
	color: 'warning',
	services: ['Home Decor', 'Yoga', 'Travel'],
	phone: 555 - 32152,
	location: 'Toronto, Canada',
	connection: 'Friend',
};

const sam: IUserProps = {
	id: '7',
	name: 'Sam',
	email: 'sam@omtanke.studio',
	src: UserImage7,
	srcSet: UserImage7Webp,
	isOnline: false,
	color: 'danger',
	fullImage: User7Landing,
	services: ['Music', 'Hiking', 'Food'],
	phone: 123 - 2468,
	location: 'Toronto, Canada',
	connection: 'Colleague',
};

const CUSTOMER: { [key: string]: IUserProps } = {
	DAVIDSON: davidson,
	EMILYWEE: emilywee,
	MICHAEL: michael,
	EMILY: emily,
	DAVID: david,
	LISA: lisa,
	SAM: sam,
};

export function getCusDataWithUsername(username: string): IUserProps {
	// @ts-ignore
	return CUSTOMER[Object.keys(CUSTOMER).filter((f) => CUSTOMER[f].username.toString() === username)];
}

export function getCusDataWithId(id?: string): IUserProps {
	// @ts-ignore
	return CUSTOMER[Object.keys(CUSTOMER).filter((f) => CUSTOMER[f].id.toString() === id.toString())];
}

export default CUSTOMER;
