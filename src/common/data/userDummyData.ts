import UserImage from '../../assets/img/wanna/wanna1.png';
import UserImage2 from '../../assets/img/wanna/wanna2.png';
import UserImage3 from '../../assets/img/wanna/wanna3.png';
import UserImage4 from '../../assets/img/wanna/wanna4.png';
import UserImage5 from '../../assets/img/wanna/wanna5.png';
import UserImage6 from '../../assets/img/wanna/wanna6.png';
import UserImage7 from '../../assets/img/wanna/wanna7.png';

export enum Role {
	admin,
	user,
	member,
}
export interface IUserProps {
	id: string;
	name: string;
	lastname: string;
	email: string;
	password: string;
	src: string;
	role: Role;
	teamMember?: string;
	country?: string;
	company?: string;
	state?: string;
	contact?: number;
	about?: { type?: string; exp?: string; FeieldActivity?: string };
}

const john: IUserProps = {
	id: '1',
	name: 'John',
	lastname: 'Doe',
	role: Role.user,
	email: 'john@omtanke.studio',
	src: UserImage,
	password: '@ABC123',
};

const grace: IUserProps = {
	id: '2',
	name: 'Grace',
	lastname: 'Buckland',
	role: Role.user,
	email: 'grace@omtanke.studio',
	src: UserImage2,
	password: '@ABC123',
};

const jane: IUserProps = {
	id: '3',
	name: 'Jane',
	lastname: 'Lee',
	role: Role.user,
	email: 'jane@omtanke.studio',
	src: UserImage3,
	password: '@ABC123',
};

const ryan: IUserProps = {
	id: '4',
	name: 'Ryan',
	lastname: 'McGrath',
	role: Role.user,
	email: 'ryan@omtanke.studio',
	src: UserImage4,
	password: '@ABC123',
};

const ella: IUserProps = {
	id: '5',
	name: 'Ella',
	lastname: 'Oliver',
	role: Role.user,
	email: 'ella@omtanke.studio',
	src: UserImage5,
	password: '@ABC123',
};

const chloe: IUserProps = {
	id: '6',
	name: 'Chloe',
	lastname: 'Walker',
	role: Role.user,
	email: 'chloe@omtanke.studio',
	src: UserImage6,
	password: '@ABC123',
};

const sam: IUserProps = {
	id: '7',
	name: 'Sam',
	lastname: 'Roberts',
	role: Role.user,
	email: 'sam@omtanke.studio',
	src: UserImage7,
	password: '@ABC123',
};
const ravinder: IUserProps = {
	id: '8',
	name: 'Ravinder',
	lastname: 'Kumar',
	role: Role.admin,
	email: 'ravinder@omtanke.studio',
	src: UserImage7,
	password: '@ABC123',
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

export function getUserDataWithUsername(email: string): IUserProps {
	// @ts-ignore
	return USERS[Object.keys(USERS).filter((f) => USERS[f].email.toString() === email)];
}

export function getUserDataWithId(id?: string): IUserProps {
	// @ts-ignore
	return USERS[Object.keys(USERS).filter((f) => USERS[f].id.toString() === id.toString())];
}

export default USERS;
