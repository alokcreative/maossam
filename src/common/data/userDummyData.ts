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

export interface IUserProps {
	id: string;
	username: string;
	name: string;
	surname: string;
	email: string;
	password: string;
	isAdmin: boolean;
	src: string;
	srcSet?: string;
	fullImage?: string;
	role?: string;
	company?: string;
	noOfTeam?: string;
	country?: string;
	state?: string;
	phoneNo?: number;
}

const john: IUserProps = {
	id: '1',
	username: 'john',
	name: 'John',
	surname: 'Doe',
	role: 'CEO, Founder',
	email: 'john@omtanke.studio',
	src: UserImage,
	srcSet: UserImageWebp,
	password: '@ABC123',
	isAdmin: false,
};

const grace: IUserProps = {
	id: '2',
	username: 'grace',
	name: 'Grace',
	surname: 'Buckland',
	role: 'Staff',
	email: 'grace@omtanke.studio',
	src: UserImage2,
	srcSet: UserImage2Webp,
	password: '@ABC123',
	isAdmin: false,
};

const jane: IUserProps = {
	id: '3',
	username: 'jane',
	name: 'Jane',
	surname: 'Lee',
	role: 'Staff',
	email: 'jane@omtanke.studio',
	src: UserImage3,
	srcSet: UserImage3Webp,
	password: '@ABC123',
	isAdmin: false,
};

const ryan: IUserProps = {
	id: '4',
	username: 'ryan',
	name: 'Ryan',
	surname: 'McGrath',
	role: 'Worker',
	email: 'ryan@omtanke.studio',
	src: UserImage4,
	srcSet: UserImage4Webp,
	password: '@ABC123',
	isAdmin: false,
};

const ella: IUserProps = {
	id: '5',
	username: 'ella',
	name: 'Ella',
	surname: 'Oliver',
	role: 'Worker',
	email: 'ella@omtanke.studio',
	src: UserImage5,
	srcSet: UserImage5Webp,
	password: '@ABC123',
	isAdmin: false,
};

const chloe: IUserProps = {
	id: '6',
	username: 'chloe',
	name: 'Chloe',
	surname: 'Walker',
	role: 'Staff',
	email: 'chloe@omtanke.studio',
	src: UserImage6,
	srcSet: UserImage6Webp,
	password: '@ABC123',
	isAdmin: false,
};

const sam: IUserProps = {
	id: '7',
	username: 'sam',
	name: 'Sam',
	surname: 'Roberts',
	role: 'Worker',
	email: 'sam@omtanke.studio',
	src: UserImage7,
	srcSet: UserImage7Webp,
	fullImage: User7Landing,
	password: '@ABC123',
	isAdmin: false,
};
const ravinder: IUserProps = {
	id: '8',
	username: 'ravinder',
	name: 'Ravinder',
	surname: 'Kumar',
	role: 'Co-Founder',
	email: 'ravinder@omtanke.studio',
	src: UserImage7,
	srcSet: UserImage7Webp,
	fullImage: User7Landing,
	password: '@ABC123',
	isAdmin: true,
};

const USERS: { [key: string]: IUserProps } = {
	JOHN: john,
	GRACE: grace,
	JANE: jane,
	RYAN: ryan,
	ELLA: ella,
	CHLOE: chloe,
	SAM: sam,
	RAVINDER: ravinder,
};

export function getUserDataWithUsername(username: string): IUserProps {
	// @ts-ignore
	return USERS[Object.keys(USERS).filter((f) => USERS[f].username.toString() === username)];
}

export function getUserDataWithId(id?: string): IUserProps {
	// @ts-ignore
	return USERS[Object.keys(USERS).filter((f) => USERS[f].id.toString() === id.toString())];
}


export default USERS;
