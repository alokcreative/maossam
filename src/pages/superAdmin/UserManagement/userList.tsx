import React, { FC, useState } from 'react';
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
import USERS from '../../../common/data/userDummyData';
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
import UserImage7Webp from '../../../assets/img/wanna/wanna7.webp';
import SERVICES, { IServiceProps } from '../../../common/data/serviceDummyData';

interface ITableRowProps {
	id: string;
	name: string;
	surname: string;
	position: string;
	email: string;
	color: TColor;
	services: IServiceProps[];
	handleClick(...args: unknown[]): unknown;
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
}) => {
	const navigate = useNavigate();

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
					icon='Visibility'
					className='me-2'
					isLight
					isDisable={Number(id) > 8}
					onClick={() => navigate(`../${adminDashboardPagesMenu.users.path}/${id || 0}`)}
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
}
const UserList = () => {
	const { themeStatus, darkModeStatus } = useDarkMode();
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['10']);
	const navigate = useNavigate();
	const [userData, setUserData] = useState(
		Object.keys(USERS).map((key) => ({
			...USERS[key],
		})),
	);
	// console.log(userData);
	const handleData = (id: unknown) => {
		const updatedData = userData.filter((user) => user.id !== id);
		setUserData(updatedData);
	};

	const [isOpen, setIsOpen] = useState(false);
	const formik = useFormik({
		initialValues: {
			id: userData.length + 1,
			username: '',
			name: '',
			surname: '',
			email: '',
			password: '',
			isAdmin: 'no',
			src: '',
			role: '',
		},
		onSubmit: (values, { resetForm }) => {
			// console.log(values.isAdmin);
			setIsOpen(false);
			resetForm();
			const tmpbolval = values.isAdmin === 'Yes';
			const user: IUserProps = {
				id: (userData.length + 1).toString(),
				username: values.username,
				name: values.name,
				surname: values.surname,
				role: values.role,
				email: values.email,
				src: '',
				srcSet: '',
				fullImage: UserImage7Webp,
				password: '',
				isAdmin: tmpbolval,
			};
			setUserData([...userData, user]);
			// console.log(values.id.toString());
		},
	});
	return (
		<PageWrapper title={adminDashboardPagesMenu.users.text}>
			<SubHeader>
				<SubHeaderLeft>
					<span className='text-muted fst-italic me-2'>Last update:</span>
					<span className='fw-bold'>13 hours ago</span>
				</SubHeaderLeft>
				<SubHeaderRight>
					<Button color='info' icon='Add' isLight onClick={() => setIsOpen(true)}>
						Add New
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
									<th scope='col'>Name</th>
									<th scope='col' className='cursor-pointer'>
										Surname
									</th>
									<th scope='col'>Email</th>
									<th scope='col' className='cursor-pointer'>
										Position
									</th>
									<th scope='col' className='cursor-pointer'>
										Services
									</th>
									<th scope='col' className='cursor-pointer'>
										Action
									</th>
								</tr>
							</thead>
							<tbody>
								{dataPagination(userData, currentPage, perPage).map((i) => (
									// eslint-disable-next-line react/jsx-props-no-spreading
									<TableRow key={i.id} {...i} handleClick={handleData} />
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
					<ModalTitle id='user'>New User</ModalTitle>
				</ModalHeader>
				<ModalBody className='px-4'>
					<div className='row g-4'>
						<div className='col-12'>
							<div className='row g-4 align-items-center'>
								<div className='col-lg-auto'>
									<Avatar
										srcSet={USERS.JOHN.srcSet}
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
						<FormGroup id='name' label='Name' className='col-lg-6'>
							<Input onChange={formik.handleChange} value={formik.values.name} />
						</FormGroup>
						<FormGroup id='surname' label='Surname' className='col-lg-6'>
							<Input
								type='text'
								onChange={formik.handleChange}
								value={formik.values.surname}
							/>
						</FormGroup>
						<FormGroup id='email' label='Email' className='col-lg-6'>
							<Input
								type='email'
								onChange={formik.handleChange}
								value={formik.values.email}
							/>
						</FormGroup>
						<FormGroup id='username' label='Username' className='col-lg-6'>
							<Input
								type='text'
								onChange={formik.handleChange}
								value={formik.values.username}
							/>
						</FormGroup>
						<FormGroup id='position' label='Position' className='col-lg-6'>
							<Input
								type='text'
								onChange={formik.handleChange}
								value={formik.values.role}
							/>
						</FormGroup>
						<FormGroup id='Password' label='Password' className='col-lg-6'>
							<Input
								type='password'
								onChange={formik.handleChange}
								value={formik.values.password}
							/>
						</FormGroup>
						<FormGroup id='subscriptions' label='Subscriptions' className='col-lg-6'>
							<Select
								ariaLabel='Default select example'
								placeholder='Select...'
								onChange={formik.handleChange}
								value={formik.values.name}
								list={[
									{ value: 'no', text: 'No' },
									{ value: 'basic', text: 'Basic' },
									{ value: 'pro', text: 'Pro' },
								]}
							/>
						</FormGroup>
						<FormGroup>
							{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
							<Label>
								Group checkboxes or radios on the same horizontal row by adding{' '}
							</Label>
							<ChecksGroup isInline>
								<Checks
									type='radio'
									id='isAdmin'
									label='Yes'
									value='Yes'
									name='isAdmin'
									onChange={formik.handleChange}
									checked={formik.values.isAdmin}
								/>
								<Checks
									type='radio'
									id='isAdmin1'
									label='No'
									value='No'
									name='isAdmin'
									onChange={formik.handleChange}
									checked={formik.values.isAdmin}
								/>
							</ChecksGroup>
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
						<Button color='info' onClick={formik.handleSubmit}>
							Save
						</Button>
					</CardFooterRight>
				</ModalFooter>
			</Modal>
		</PageWrapper>
	);
};

export default UserList;
