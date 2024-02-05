import React, { FC, useEffect, useState } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import { useFormik } from 'formik';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Page, { IPageProps } from '../../../layout/Page/Page';
import { adminDashboardPagesMenu } from '../../../menu';
import useDarkMode from '../../../hooks/useDarkMode';
import Button from '../../../components/bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import USERS, { Role } from '../../../common/data/userDummyData';
import Card, {
	CardBody,
	CardFooterLeft,
	CardFooterRight,
} from '../../../components/bootstrap/Card';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons';
import { TColor } from '../../../type/color-type';
import Badge from '../../../components/bootstrap/Badge';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Avatar from '../../../components/Avatar';
import Select from '../../../components/bootstrap/forms/Select';
import Label from '../../../components/bootstrap/forms/Label';
import UserImage from '../../../assets/img/wanna/wanna1.png';
import { Country, State, City } from 'country-state-city';
import { useEffectOnce } from 'react-use';
import { IServiceProps } from '../../../common/data/serviceDummyData';
import {
	useGetAllUserQuery,
	useDeleteProfileMutation,
	useUpdateProfileMutation,
	useCreateProfileMutation,
} from '../../../features/auth/authApiSlice';
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';
import ConfirmationModal from '../../documentation/components/ConfirmationModal';

interface ITableRowProps {
	index: number;
	id: string;
	first_name: string;
	last_name: string;
	position: string;
	email: string;
	company_name: string;
	phone_number: number;
	color: TColor;
	// services: IServiceProps[];
	handleClick(...args: unknown[]): unknown;
	handleEditUser(...args: unknown[]): unknown;
}
const TableRow: FC<ITableRowProps> = ({
	index,
	id,
	first_name,
	last_name,
	position,
	email,
	company_name,
	color,
	phone_number,
	handleClick,
	handleEditUser,
}) => {
	return (
		<tr>
			<th scope='row'>{index}</th>
			<td>{first_name}</td>
			<td>{last_name}</td>
			<td>{email}</td>
			<td>{company_name}</td>
			<td>{phone_number}</td>
			{/* <td className='col-auto gap-2'>
				{services &&
					Object.values(services).map((service) => (
						<Badge color={color} className='me-2'>
							{service.name}
						</Badge>
					))}
			</td> */}
			<td>
				<Button
					color='info'
					icon='Edit'
					className='me-2'
					isLight
					// isDisable={Number(id) > 8}
					onClick={() => handleEditUser(id)}
				/>
				<Button
					icon='Delete'
					className='me-1'
					color='danger'
					isLight
					onClick={() => handleClick(id)}
				/>
			</td>
		</tr>
	);
};

export interface IUserProps {
	first_name: string;
	last_name: string;
	email: string;
	// teamMember?: string;
	country?: string;
	company_name?: string;
	state?: string;
	phone_number?: string;
	gender?: string;
	avatar?: FormData;
	password?: string;
	// about?: { type?: string; exp?: string; FeieldActivity?: string };
}

export interface IUser {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	// teamMember?: string;
	country?: string;
	company_name?: string;
	state?: string;
	phone_number?: string;
	gender?: string;
	avatar?: object;
	// about?: { type?: string; exp?: string; FeieldActivity?: string };
}

interface IOptionsProps {
	value?: string | number;
	text?: string | number;
}

const UserList = () => {
	const { data, error, isLoading, isSuccess, isFetching, refetch } = useGetAllUserQuery({});
	const [deleteProfile] = useDeleteProfileMutation();
	const [updateProfile] = useUpdateProfileMutation();
	const [createProfile] = useCreateProfileMutation();
	const { themeStatus, darkModeStatus } = useDarkMode();
	const [currentPage, setCurrentPage] = useState(1);
	// const [userList, setUserList] = useState(data);
	const [perPage, setPerPage] = useState(PER_COUNT['10']);
	const [countryList, setcountryList] = useState<IOptionsProps[]>();
	const [stateList, setstateList] = useState<IOptionsProps[]>();
	const [modalTitle, setmodalTitle] = useState<string>('');
	const [isOpen, setIsOpen] = useState(false);
	const [avatar, setAvatar] = useState(data ? data.avatar : UserImage);
	const [src, setSrc] = useState(data ? data.avatar : UserImage);
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [deletingID, setDeletingID] = useState('');

	// const [userData, setUserData] = useState();
	// const [userData, setUserData] = useState(
	// 	Object.keys(USERS).map((key) => ({
	// 		...USERS[key],
	// 	})),
	// );
	// console.log(userData);

	useEffectOnce(() => {
		const countryListDetails = Country.getAllCountries();
		const LIST = countryListDetails.map(({ name, isoCode }) => ({
			value: isoCode,
			text: name,
		}));
		setcountryList(LIST);
	});
	const handleData = (id: string) => {
		// console.log('id>>>>', id);
		// const updatedData = data.filter((user: IUserProps) => user.id !== id);
		// setUserData(updatedData);
		setShowConfirmation(true);
		setDeletingID(id);
	};
	const handleDeleteConfirmation = () => {
		setShowConfirmation(false);
		deleteProfile(deletingID)
			.unwrap()
			.then(() => {
				refetch().then((res) => {
					// setUserList(res.data);
				});
				showNotification(
					<span className='d-flex align-items-center'>
						<Icon icon='Info' size='lg' className='me-1' />
						<span>User Deleted Sucessfully</span>
					</span>,
					``,
				);
			});
	};

	const formik = useFormik({
		initialValues: {
			// id: userData.length + 1,
			first_name: '',
			last_name: '',
			email: '',
			password: '',
			phone_number: '',
			company_name: '',
			country: '',
			state: '',
			gender: '',
			avatar: undefined as File | undefined,
		},

		validate: (values) => {
			const errors: {
				// id: string;
				first_name?: string;
				last_name?: string;
				email?: string;
				password?: string;
				country?: string;
				company_name?: string;
				state?: string;
				phone_number?: string;
				gender?: string;
				avatar?: string;
			} = {};

			if (!values.first_name) {
				errors.first_name = 'Required';
			}

			if (!values.last_name) {
				errors.last_name = 'Required';
			}
			if (!values.email) {
				errors.email = 'Required';
			}

			if (!values.country) {
				errors.country = 'Required';
			}
			if (!values.state) {
				errors.state = 'Required';
			}

			if (!values.gender) {
				errors.gender = 'Required';
			}
			if (!values.phone_number) {
				errors.phone_number = 'Required';
			}
			if (values.phone_number.length !== 9) {
				errors.phone_number = 'Must be 9 digit';
			}
			if (!values.company_name) {
				errors.company_name = 'Required';
			}
			if (!values.password) {
				errors.password = 'Required';
			}
			// if (!values.avatar) {
			// 	errors.avatar = 'Required'; // Add error message for the avatar field
			// }

			return errors;
		},

		onSubmit: (values, { resetForm }) => {
			// console.log('NewUser>>>>', values);

			const userData = new FormData();
			userData.append('first_name', values.first_name);
			userData.append('last_name', values.last_name);
			userData.append('email', values.email);
			userData.append('country', values.country);
			userData.append('state', values.state);
			userData.append('gender', values.gender);
			userData.append('phone_number', values.phone_number);
			userData.append('company_name', values.company_name);
			userData.append('password', values.password);
			if (avatar instanceof File) {
				userData.append('avatar', avatar, avatar.name);
			}
			// createProfile({ userData }).then((res) => {
			// 	setIsOpen(false);
			// 	refetch();
			// });

			if (Object.keys(formik.errors).length === 0) {
				createProfile({ userData }).then((res) => {
					setIsOpen(false);
					refetch();
				});
			}
			setSrc(UserImage);
			setIsOpen(false);
			resetForm();
		},
	});

	const newUser = () => {
		setIsOpen(true);
		setmodalTitle('New User');
		// setAvatar(UserImage);
	};

	const updateUserForm = useFormik({
		initialValues: {
			id: '',
			first_name: '',
			last_name: '',
			email: '',
			// password: '',
			phone_number: '',
			company_name: '',
			country: '',
			state: '',
			gender: '',
			// avatar: FormData,
		},
		enableReinitialize: true,

		validate: (values) => {
			const errors: {
				// id: string;
				first_name?: string;
				last_name?: string;
				email?: string;
				password?: string;
				country?: string;
				company_name?: string;
				state?: string;
				phone_number?: string;
				gender?: string;
			} = {};

			if (!values.first_name) {
				errors.first_name = 'Required';
			}

			if (!values.last_name) {
				errors.last_name = 'Required';
			}
			if (!values.email) {
				errors.email = 'Required';
			}

			if (!values.country) {
				errors.country = 'Required';
			}
			if (!values.state) {
				errors.state = 'Required';
			}

			if (!values.gender) {
				errors.gender = 'Required';
			}
			if (!values.phone_number) {
				errors.phone_number = 'Required';
			}
			if (values?.phone_number?.length !== 10) {
				errors.phone_number = 'Must be 10 digit';
			}

			if (!values.company_name) {
				errors.company_name = 'Required';
			}

			return errors;
		},
		onSubmit: (values, { resetForm }) => {
			const userData = new FormData();
			userData.append('first_name', values.first_name);
			userData.append('last_name', values.last_name);
			userData.append('email', values.email);
			userData.append('country', values.country);
			userData.append('state', values.state);
			userData.append('gender', values.gender);
			userData.append('phone_number', values.phone_number);
			userData.append('company_name', values.company_name);
			if (avatar instanceof File) {
				userData.append('avatar', avatar, avatar.name);
			}
			updateProfile({ id: updateUserForm.values.id, userData }).then((res) => {
				setIsOpen(false);
				refetch();
			});
		},
	});
	const handleEditUser = (id: string) => {
		// console.log('id>>>>', id);
		setmodalTitle(`Update User`);
		setIsOpen(true);
		const user = data.find((i: IUser) => i.id === id);
		updateUserForm.setFieldValue('id', user?.id);
		updateUserForm.setFieldValue('avatar', user?.avatar);
		updateUserForm.setFieldValue('first_name', user?.first_name);
		updateUserForm.setFieldValue('last_name', user?.last_name);
		updateUserForm.setFieldValue('email', user?.email);
		// updateUserForm.setFieldValue('password', user?.password);
		updateUserForm.setFieldValue('phone_number', user?.phone_number);
		updateUserForm.setFieldValue('company_name', user?.company_name);
		updateUserForm.setFieldValue('country', user?.country);
		updateUserForm.setFieldValue('state', user?.state);
		updateUserForm.setFieldValue('gender', user?.gender);
		// const user1 = data.find((item: any) => item.id === id);
		setAvatar(user.avatar);
	};
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleImageChange = (event: any) => {
		event.preventDefault();
		const file = event.target.files[0];

		// updateUserForm.setFieldValue('avatar', file);
		// console.log('file >>', file);

		// setAvatar(file);

		if (file && (file.type.includes('png') || file.type.includes('jpeg'))) {
			setAvatar(file);
			const imageURL = URL.createObjectURL(file);
			setSrc(imageURL);
		} else {
			showNotification(
				<span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>Only PNG and JPEG Allowed</span>
				</span>,
				``,
			);
			event.target.value = '';
		}
	};
	useEffect(() => {
		const stateListupdated = State.getStatesOfCountry(formik.values.country);
		const LIST = stateListupdated.map(({ name }) => ({
			value: name,
			text: name,
		}));
		setstateList(LIST);
	}, [formik.values.country, updateUserForm.values.country]);

	return (
		<PageWrapper title={adminDashboardPagesMenu.users.text} isProtected>
			<SubHeader>
				<SubHeaderLeft>
					<div />
				</SubHeaderLeft>
				<SubHeaderRight>
					<Button color='info' icon='Add' isLight onClick={newUser}>
						Add User
					</Button>
				</SubHeaderRight>
			</SubHeader>
			<Page container='fluid'>
				<div className='display-6 fw-bold py-3'>User Management</div>
				<Card stretch>
					<CardBody className='table-responsive'>
						<table className='table table-modern table-hover'>
							<thead>
								<tr>
									<th scope='col' className='cursor-pointer'>
										Sr No
									</th>
									<th scope='col'>FirstName</th>
									<th scope='col' className='cursor-pointer'>
										LastName
									</th>
									<th scope='col'>Email</th>
									<th scope='col' className='cursor-pointer'>
										Company Name
									</th>
									<th scope='col' className='cursor-pointer'>
										Phone Number
									</th>
									<th scope='col' className='cursor-pointer'>
										Action
									</th>
								</tr>
							</thead>
							<tbody>
								{isSuccess &&
									data &&
									dataPagination(data, currentPage, perPage).map((i, index) => (
										<TableRow
											key={i.id}
											// eslint-disable-next-line react/jsx-props-no-spreading
											{...i}
											index={index + 1}
											handleClick={handleData}
											handleEditUser={handleEditUser}
										/>
									))}
							</tbody>
						</table>
					</CardBody>
					{data && isSuccess && data && (
						<PaginationButtons
							data={data && data}
							label='items'
							setCurrentPage={setCurrentPage}
							currentPage={currentPage}
							perPage={perPage}
							setPerPage={setPerPage}
						/>
					)}
				</Card>
			</Page>
			<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='lg' isStaticBackdrop>
				<ModalHeader setIsOpen={setIsOpen} className='p-4'>
					<ModalTitle id='user'>{modalTitle}</ModalTitle>
				</ModalHeader>
				<ModalBody className='px-4'>
					<div className='row g-4'>
						<div className='col-12'>
							<div className='row g-4 align-items-center'>
								<div className='col-lg-auto'>
									{modalTitle === 'New User' ? (
										<Avatar src={src} color='storybook' />
									) : (
										<Avatar src={avatar} color='storybook' />
									)}
								</div>
								<div className='col-lg'>
									<div className='row g-4'>
										<div className='col-auto'>
											<Input
												type='file'
												id='avatar'
												name='avatar'
												accept='image/*'
												onChange={handleImageChange}
												invalidFeedback={formik.errors.avatar}
												// isValid={formik.isValid}
												isTouched={formik.touched.avatar}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='col-12 border-bottom' />
						<FormGroup id='first_name' label='First Name' className='col-lg-6'>
							<Input
								name='first_name'
								onChange={
									modalTitle === 'New User'
										? formik.handleChange
										: updateUserForm.handleChange
								}
								value={
									modalTitle === 'New User'
										? formik.values.first_name
										: updateUserForm.values.first_name
								}
								invalidFeedback={formik.errors.first_name}
								isValid={formik.isValid}
								isTouched={formik.touched.first_name}
							/>
						</FormGroup>
						<FormGroup id='last_name' label='Last name' className='col-lg-6'>
							<Input
								name='last_name'
								type='text'
								onChange={
									modalTitle === 'New User'
										? formik.handleChange
										: updateUserForm.handleChange
								}
								value={
									modalTitle === 'New User'
										? formik.values.last_name
										: updateUserForm.values.last_name
								}
								invalidFeedback={formik.errors.last_name}
								isValid={formik.isValid}
								isTouched={formik.touched.last_name}
							/>
						</FormGroup>
						<FormGroup id='email' label='Email' className='col-lg-6'>
							<Input
								type='email'
								name='email'
								onChange={
									modalTitle === 'New User'
										? formik.handleChange
										: updateUserForm.handleChange
								}
								value={
									modalTitle === 'New User'
										? formik.values.email
										: updateUserForm.values.email
								}
								invalidFeedback={formik.errors.email}
								isValid={formik.isValid}
								isTouched={formik.touched.email}
							/>
						</FormGroup>
						{modalTitle === 'New User' && (
							<FormGroup id='password' label='Password' className='col-lg-6'>
								<Input
									type='password'
									onChange={formik.handleChange}
									value={formik.values.password}
									invalidFeedback={formik.errors.password}
									isValid={formik.isValid}
									isTouched={formik.touched.password}
								/>
							</FormGroup>
						)}
						<FormGroup id='phone_number' label='Phone Number' className='col-lg-6'>
							<Input
								type='text'
								name='phone_number'
								onChange={
									modalTitle === 'New User'
										? formik.handleChange
										: updateUserForm.handleChange
								}
								value={
									modalTitle === 'New User'
										? formik.values.phone_number
										: updateUserForm.values.phone_number
								}
								invalidFeedback={formik.errors.phone_number}
								isValid={formik.isValid}
								isTouched={formik.touched.phone_number}
							/>
						</FormGroup>
						<FormGroup id='company_name' label='Company Name' className='col-lg-6'>
							<Input
								type='text'
								name='company_name'
								onChange={
									modalTitle === 'New User'
										? formik.handleChange
										: updateUserForm.handleChange
								}
								value={
									modalTitle === 'New User'
										? formik.values.company_name
										: updateUserForm.values.company_name
								}
								invalidFeedback={formik.errors.company_name}
								isValid={formik.isValid}
								isTouched={formik.touched.company_name}
							/>
						</FormGroup>
						<FormGroup id='country' label='Country' className='col-lg-6'>
							<Select
								ariaLabel='Country'
								placeholder='Choose from list of countries'
								required
								list={countryList}
								name='country'
								onChange={
									modalTitle === 'New User'
										? formik.handleChange
										: updateUserForm.handleChange
								}
								value={
									modalTitle === 'New User'
										? formik.values.country
										: updateUserForm.values.country
								}
								invalidFeedback={formik.errors.country}
								isValid={formik.isValid}
								isTouched={formik.touched.country}
							/>
						</FormGroup>
						<FormGroup id='state' label='State' className='col-lg-6'>
							<Select
								ariaLabel='State'
								placeholder='Choose from list of State'
								required
								name='state'
								list={stateList}
								onChange={
									modalTitle === 'New User'
										? formik.handleChange
										: updateUserForm.handleChange
								}
								value={
									modalTitle === 'New User'
										? formik.values.state
										: updateUserForm.values.state
								}
								invalidFeedback={formik.errors.state}
								isValid={formik.isValid}
								isTouched={formik.touched.state}
							/>
						</FormGroup>
						<FormGroup id='gender' label='Gender' className='col-lg-6'>
							<Select
								ariaLabel='gender'
								placeholder='Choose gender'
								required
								list={[
									{ value: 'male', text: 'Male' },
									{ value: 'female', text: 'Female' },
									{ value: 'other', text: 'Other' },
								]}
								name='gender'
								onChange={
									modalTitle === 'New User'
										? formik.handleChange
										: updateUserForm.handleChange
								}
								value={
									modalTitle === 'New User'
										? formik.values.gender
										: updateUserForm.values.gender
								}
								invalidFeedback={formik.errors.gender}
								isValid={formik.isValid}
								isTouched={formik.touched.gender}
							/>
						</FormGroup>
					</div>
				</ModalBody>
				<ModalFooter>
					<CardFooterLeft>
						<Button
							color='info'
							onClick={
								modalTitle === 'New User'
									? formik.handleSubmit
									: updateUserForm.handleSubmit
							}>
							{modalTitle === 'New User' ? 'Save' : 'Update'}
						</Button>
					</CardFooterLeft>
					<CardFooterRight>
						<Button
							color='danger'
							onClick={() => {
								setIsOpen(false);
							}}>
							Cancel
						</Button>
					</CardFooterRight>
				</ModalFooter>
			</Modal>
			<ConfirmationModal
				isOpen={showConfirmation}
				setIsOpen={() => setShowConfirmation(false)}
				onConfirm={handleDeleteConfirmation}
			/>
		</PageWrapper>
	);
};

export default UserList;
