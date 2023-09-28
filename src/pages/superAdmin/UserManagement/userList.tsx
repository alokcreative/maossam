import React, { FC, useEffect, useState } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import { useFormik } from 'formik';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
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
import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
import { Country, State, City } from 'country-state-city';
import { useEffectOnce } from 'react-use';
import { IServiceProps } from '../../../common/data/serviceDummyData';

interface ITableRowProps {
	id: string;
	name: string;
	surname: string;
	position: string;
	email: string;
	color: TColor;
	services: IServiceProps[];
	handleClick(...args: unknown[]): unknown;
	handleEditUser(...args: unknown[]): unknown;
}
const TableRow: FC<ITableRowProps> = ({
	id,
	name,
	surname,
	position,
	email,
	color,
	services,
	handleClick,
	handleEditUser,
}) => {
	return (
		<tr>
			<th scope='row'>{id}</th>
			<td>{name}</td>
			<td>{surname}</td>
			<td>{email}</td>
			<td>{position}</td>
			<td className='col-auto gap-2'>
				{services &&
					Object.values(services).map((service) => (
						<Badge color={color} className='me-2'>
							{service.name}
						</Badge>
					))}
			</td>
			<td>
				<Button
					color='info'
					icon='Edit'
					className='me-2'
					isLight
					isDisable={Number(id) > 8}
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

interface IOptionsProps {
	value?: string | number;
	text?: string | number;
}

const UserList = () => {
	const { themeStatus, darkModeStatus } = useDarkMode();
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['10']);
	const [countryList, setcountryList] = useState<IOptionsProps[]>();
	const [stateList, setstateList] = useState<IOptionsProps[]>();
	const [modalTitle, setmodalTitle] = useState<string>('');
	// const [userData, setUserData] = useState();
	const [userData, setUserData] = useState(
		Object.keys(USERS).map((key) => ({
			...USERS[key],
		})),
	);
	console.log(userData);
	useEffectOnce(() => {
		const countryListDetails = Country.getAllCountries();
		const LIST = countryListDetails.map(({ name, isoCode }) => ({
			value: isoCode,
			text: name,
		}));
		setcountryList(LIST);
	});
	const handleData = (id: unknown) => {
		const updatedData = userData.filter((user) => user.id !== id);
		setUserData(updatedData);
	};

	const [isOpen, setIsOpen] = useState(false);
	const formik = useFormik({
		initialValues: {
			id: userData.length + 1,
			fastname: '',
			lastname: '',
			email: '',
			password: '',
			phoneNumber: '',
			companyName: '',
			Country: '',
			State: '',
			gender: '',
		},
		onSubmit: (values, { resetForm }) => {
			// console.log(values.isAdmin);
			setIsOpen(false);
			resetForm();
			const user: IUserProps = {
				id: (userData.length + 1).toString(),
				name: values.fastname,
				lastname: values.lastname,
				email: values.email,
				src: '',
				password: '',
				role: Role.user,
			};
			setUserData([...userData, user]);
			// console.log(values.id.toString());
		},
	});
	useEffect(() => {
		const stateListupdated = State.getStatesOfCountry(formik.values.Country);
		const LIST = stateListupdated.map(({ name }) => ({
			value: name,
			text: name,
		}));
		setstateList(LIST);
	}, [formik.values.Country]);

	const newUser = () => {
		setIsOpen(true);
		setmodalTitle('New User');
	};
	const updateUserForm = useFormik({
		initialValues: {
			id: '',
			fastname: '',
			lastname: '',
			email: '',
			password: '',
			phoneNumber: '',
			companyName: '',
			Country: '',
			State: '',
			gender: '',
		},
		enableReinitialize: true,
		onSubmit: (values, { resetForm }) => {
			// console.log(values.isAdmin);
			setIsOpen(false);
			resetForm();
			const user: IUserProps = {
				id: (userData.length + 1).toString(),
				name: values.fastname,
				lastname: values.lastname,
				email: values.email,
				src: '',
				password: '',
				role: Role.user,
			};
			setUserData([...userData, user]);
			// console.log(values.id.toString());
		},
	});
	const handleEditUser = (id: string) => {
		setIsOpen(true);
		const user = userData.find((i) => i.id === id);
		updateUserForm.setFieldValue('id', user?.id);
		updateUserForm.setFieldValue('fastname', user?.name);
		updateUserForm.setFieldValue('lastname', user?.lastname);
		updateUserForm.setFieldValue('email', user?.email);
		updateUserForm.setFieldValue('password', user?.password);
		// updateUserForm.setFieldValue('phoneNumber', user?.phoneNumber);
		// updateUserForm.setFieldValue('companyName', user?.companyName);
		// updateUserForm.setFieldValue('Country', user?.Country);
		// updateUserForm.setFieldValue('State', user?.State);
		// updateUserForm.setFieldValue('gender', user?.gender);
		setmodalTitle(`Update User`);
	};
	return (
		<PageWrapper title={adminDashboardPagesMenu.users.text}>
			<SubHeader>
				<SubHeaderLeft />
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
										#
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
								{dataPagination(userData, currentPage, perPage).map((i) => (
									<TableRow
										key={i.id}
										// eslint-disable-next-line react/jsx-props-no-spreading
										{...i}
										handleClick={handleData}
										handleEditUser={handleEditUser}
									/>
								))}
							</tbody>
						</table>
					</CardBody>
					<PaginationButtons
						data={userData}
						label='items'
						setCurrentPage={setCurrentPage}
						currentPage={currentPage}
						perPage={perPage}
						setPerPage={setPerPage}
					/>
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
									<Avatar
										srcSet={USERS.JOHN.src}
										src={USERS.JOHN.src}
										color='info'
									/>
								</div>
								<div className='col-lg'>
									<div className='row g-4'>
										<div className='col-auto'>
											<input
												type='file'
												name='src'
												accept='image/*'
												onChange={(e) => {
													const file =
														e.currentTarget.files &&
														e.currentTarget.files[0];
													if (file) {
														formik.setFieldValue('src', file);
													}
												}}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='col-12 border-bottom' />
						<FormGroup id='fastname' label='First Name' className='col-lg-6'>
							<Input onChange={formik.handleChange} value={formik.values.fastname} />
						</FormGroup>
						<FormGroup id='fastname' label='Last name' className='col-lg-6'>
							<Input
								type='text'
								onChange={
									modalTitle === 'New User'
										? formik.handleChange
										: updateUserForm.handleChange
								}
								value={
									modalTitle === 'New User'
										? formik.values.fastname
										: updateUserForm.values.fastname
								}
							/>
						</FormGroup>
						<FormGroup id='email' label='Email' className='col-lg-6'>
							<Input
								type='email'
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
							/>
						</FormGroup>
						{modalTitle === 'New User' && (
							<FormGroup id='Password' label='Password' className='col-lg-6'>
								<Input
									type='password'
									onChange={formik.handleChange}
									value={formik.values.password}
								/>
							</FormGroup>
						)}
						<FormGroup id='phoneNumber' label='Phone Number' className='col-lg-6'>
							<Input
								type='text'
								onChange={
									modalTitle === 'New User'
										? formik.handleChange
										: updateUserForm.handleChange
								}
								value={
									modalTitle === 'New User'
										? formik.values.phoneNumber
										: updateUserForm.values.phoneNumber
								}
							/>
						</FormGroup>
						<FormGroup id='companyName' label='Company Name' className='col-lg-6'>
							<Input
								type='text'
								onChange={
									modalTitle === 'New User'
										? formik.handleChange
										: updateUserForm.handleChange
								}
								value={
									modalTitle === 'New User'
										? formik.values.companyName
										: updateUserForm.values.companyName
								}
							/>
						</FormGroup>
						<FormGroup id='Country' label='Country' className='col-lg-6'>
							<Select
								ariaLabel='Country'
								placeholder='Choose from list of countries'
								required
								list={countryList}
								onChange={
									modalTitle === 'New User'
										? formik.handleChange
										: updateUserForm.handleChange
								}
								value={
									modalTitle === 'New User'
										? formik.values.Country
										: updateUserForm.values.Country
								}
							/>
						</FormGroup>
						<FormGroup id='State' label='State' className='col-lg-6'>
							<Select
								ariaLabel='State'
								placeholder='Choose from list of State'
								required
								list={stateList}
								onChange={
									modalTitle === 'New User'
										? formik.handleChange
										: updateUserForm.handleChange
								}
								value={
									modalTitle === 'New User'
										? formik.values.State
										: updateUserForm.values.State
								}
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
							/>
						</FormGroup>
					</div>
				</ModalBody>
				<ModalFooter>
					<CardFooterLeft>
						<Button
							color='danger'
							onClick={() => {
								setIsOpen(false);
							}}>
							Cancel
						</Button>
					</CardFooterLeft>
					<CardFooterRight>
						<Button
							color='info'
							onClick={
								modalTitle === 'New User'
									? formik.handleSubmit
									: updateUserForm.handleSubmit
							}>
							{modalTitle === 'New User' ? 'Save' : 'Update'}
						</Button>
					</CardFooterRight>
				</ModalFooter>
			</Modal>
		</PageWrapper>
	);
};

export default UserList;
