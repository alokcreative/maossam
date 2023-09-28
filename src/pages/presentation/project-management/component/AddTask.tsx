import React, { FC, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import Card, {
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import Button from '../../../../components/bootstrap/Button';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import Select from '../../../../components/bootstrap/forms/Select';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../layout/Page/Page';
import FacebookImg from '../../../../assets/logos/facebook.png';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../../layout/SubHeader/SubHeader';
import Avatar from '../../../../components/Avatar';
import User1Webp from '../../../../assets/img/wanna/wanna2.webp';
import User1Img from '../../../../assets/img/wanna/wanna2.png';
import CommonMyWallet from '../../../_common/CommonMyWallet';
import showNotification from '../../../../components/extras/showNotification';
import Icon from '../../../../components/icon/Icon';
import { pagesMenu } from '../../../../menu';
import editPasswordValidate from '../../demo-pages/helper/editPasswordValidate';

// interface IPreviewItemProps {
// 	title: string;
// 	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 	value: any | any[];
// }
// const PreviewItem: FC<IPreviewItemProps> = ({ title, value }) => {
// 	return (
// 		<>
// 			<div className='col-3 text-end'>{title}</div>
// 			<div className='col-9 fw-bold'>{value || '-'}</div>
// 		</>
// 	);
// };

interface IValues {
	firstName: string;
	lastName: string;
	displayName: string;
	emailAddress: string;
	date: string;
	time: string;
	addressLine: string;
	phoneNumber: string;
	addressLine2: string;
	city: string;
	state: string;
	zip: string;
	emailNotification: string[];
	pushNotification: string[];
	currentPassword?: string;
	newPassword?: string;
	confirmPassword?: string;
}
const validate = (values: IValues) => {
	const errors: IValues = {
		firstName: '',
		lastName: '',
		displayName: '',
		emailAddress: '',
		date: '',
		time: '',
		currentPassword: '',
		newPassword: '',
		confirmPassword: '',
		addressLine: '',
		addressLine2: '',
		phoneNumber: '',
		city: '',
		state: '',
		zip: '',
		emailNotification: [],
		pushNotification: [],
	};
	if (!values.firstName) {
		errors.firstName = 'Required';
	} else if (values.firstName.length < 3) {
		errors.firstName = 'Must be 3 characters or more';
	} else if (values.firstName.length > 20) {
		errors.firstName = 'Must be 20 characters or less';
	}

	if (!values.lastName) {
		errors.lastName = 'Required';
	} else if (values.lastName.length < 3) {
		errors.lastName = 'Must be 3 characters or more';
	} else if (values.lastName.length > 20) {
		errors.lastName = 'Must be 20 characters or less';
	}

	if (!values.displayName) {
		errors.displayName = 'Required';
	} else if (values.displayName.length > 30) {
		errors.displayName = 'Must be 20 characters or less';
	}

	if (!values.emailAddress) {
		errors.emailAddress = 'Required';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailAddress)) {
		errors.emailAddress = 'Invalid email address';
	}

	if (values.currentPassword) {
		if (!values.newPassword) {
			errors.newPassword = 'Please provide a valid password.';
		} else {
			errors.newPassword = '';

			if (values.newPassword.length < 8 || values.newPassword.length > 32) {
				errors.newPassword +=
					'The password must be at least 8 characters long, but no more than 32. ';
			}
			if (!/[0-9]/g.test(values.newPassword)) {
				errors.newPassword +=
					'Require that at least one digit appear anywhere in the string. ';
			}
			if (!/[a-z]/g.test(values.newPassword)) {
				errors.newPassword +=
					'Require that at least one lowercase letter appear anywhere in the string. ';
			}
			if (!/[A-Z]/g.test(values.newPassword)) {
				errors.newPassword +=
					'Require that at least one uppercase letter appear anywhere in the string. ';
			}
			if (!/[!@#$%^&*)(+=._-]+$/g.test(values.newPassword)) {
				errors.newPassword +=
					'Require that at least one special character appear anywhere in the string. ';
			}
		}

		if (!values.confirmPassword) {
			errors.confirmPassword = 'Please provide a valid password.';
		} else if (values.newPassword !== values.confirmPassword) {
			errors.confirmPassword = 'Passwords do not match.';
		}
	}

	return errors;
};
const AddTask: FC = () => {
	// const data = [
	// 	{ id: 1, firstName: 'John', lastName: 'Doe' },
	// 	{ id: 2, firstName: 'Ella', lastName: 'Oliver' },
	// 	{ id: 3, firstName: 'Sam', lastName: 'Roberts' },
	// 	{ id: 4, firstName: 'Grace', lastName: 'Buckland' },
	// 	{ id: 5, firstName: 'Jane', lastName: 'Lee' },
	// 	{ id: 6, firstName: 'Chloe', lastName: 'Walker' },
	// 	{ id: 7, firstName: 'Ryan', lastName: 'McGrath' },
	// ];

	// const [currentPage, setCurrentPage] = useState(1);
	// const [perPage, setPerPage] = useState(10);

	const navigate = useNavigate();

	const TABS = {
		ACCOUNT_DETAIL: 'Task Details',
		EXISTING_TASK: 'Pre-listed Tasks',
		PASSWORD: 'Password',
		MY_WALLET: 'My Wallet',
	};
	const [activeTab, setActiveTab] = useState(TABS.ACCOUNT_DETAIL);

	// const notificationTypes = [
	// 	{ id: 1, name: 'New Order' },
	// 	{ id: 2, name: 'New Customer' },
	// 	{ id: 3, name: 'Order Status' },
	// ];

	const formik = useFormik({
		initialValues: {
			firstName: 'John',
			lastName: 'Doe',
			displayName: 'johndoe',
			emailAddress: 'johndoe@site.com',
			date: "dayjs().add(1, 'days').format('YYYY-MM-DD')",
			time: '',
			phoneNumber: '',
			addressLine: '',
			addressLine2: '',
			city: '',
			state: '',
			zip: '',
			emailNotification: ['2'],
			pushNotification: ['1', '2', '3'],
		},
		validate,
		onSubmit: () => {
			showNotification(
				<span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>Updated Successfully</span>
				</span>,
				"The user's account details have been successfully updated.",
			);
		},
	});

	const formikPassword = useFormik({
		initialValues: {
			currentPassword: '',
			newPassword: '',
			confirmPassword: '',
		},
		validate: editPasswordValidate,
		onSubmit: () => {
			showNotification(
				<span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>Updated Successfully</span>
				</span>,
				"The user's password have been successfully updated.",
			);
		},
	});

	return (
		<PageWrapper title={pagesMenu.addtask.text}>
			<SubHeader>
				<SubHeaderLeft>
					<Button color='info' isLink icon='ArrowBack' onClick={() => navigate(-1)}>
						Back to List
					</Button>
					<SubheaderSeparator />
					<Avatar srcSet={FacebookImg} src={FacebookImg} size={40} />
					<span>
						<strong>Publish Facebook Post</strong>
					</span>
					{/* <span className='text-muted'>Edit User</span> */}
				</SubHeaderLeft>
			</SubHeader>
			<Page>
				<div className='row h-100 pb-3'>
					<div className='col-lg-3 col-md-6'>
						<Card stretch>
							<CardHeader>
								<CardLabel icon='AccountCircle'>
									<CardTitle tag='div' className='h5'>
										User Information
									</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody isScrollable>
								<div className='row g-3'>
									<div className='col-12'>
										<Button
											icon='Contacts'
											color='info'
											className='w-100 p-3'
											isLight={TABS.ACCOUNT_DETAIL !== activeTab}
											onClick={() => setActiveTab(TABS.ACCOUNT_DETAIL)}>
											{TABS.ACCOUNT_DETAIL}
										</Button>
									</div>
									<div className='col-12'>
										<Button
											icon='LocalPolice'
											color='info'
											className='w-100 p-3'
											isLight={TABS.EXISTING_TASK !== activeTab}
											onClick={() => setActiveTab(TABS.EXISTING_TASK)}>
											{TABS.EXISTING_TASK}
										</Button>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
					<div className='col-lg-9 col-md-6'>
						{TABS.ACCOUNT_DETAIL === activeTab && (
							<Card stretch>
								<CardHeader>
									<CardLabel icon='Assignment'>
										<CardTitle tag='div' className='h5'>
											Task Detail
										</CardTitle>
									</CardLabel>
								</CardHeader>
								<CardBody className=''>
									<div className='row g-4'>
										<div className='col-md-6'>
											<FormGroup id='taskName' label='Task Name' isFloating>
												<Input
													placeholder='First Name'
													autoComplete='additional-name'
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value=''
													// isValid={formik.isValid}
													// isTouched={formik.touched.taskName}
													// invalidFeedback={formik.errors.taskname}
													validFeedback='Looks good!'
												/>
											</FormGroup>
										</div>
										<div className='col-md-6'>
											<FormGroup
												id='category'
												label='Task Category'
												isFloating>
												<Select
													ariaLabel='Category'
													placeholder='Choose...'
													list={[
														{
															value: 'c1',
															text: 'Social Media / Facebook',
														},
														{
															value: 'c2',
															text: 'Facebook Post',
														},
														{
															value: 'c3',
															text: 'Social Media / Instagram',
														},
														{
															value: 'c4',
															text: 'Instagram Post',
														},
														{
															value: 'c5',
															text: 'Google/Blog',
														},
														{
															value: 'c6',
															text: 'Google/Web site',
														},
													]}
													onChange={formik.handleChange}
													value={formik.values.state}
												/>
											</FormGroup>
										</div>
										<div className='col-md-6'>
											<FormGroup
												id='product'
												label='Select Product'
												isFloating>
												<Select
													ariaLabel='Product'
													placeholder='Choose...'
													list={[
														{ value: 'p1', text: 'Product 1' },
														{ value: 'p2', text: 'Product 2' },
														{ value: 'p3', text: 'Product 3' },
													]}
													onChange={formik.handleChange}
													value={formik.values.state}
												/>
											</FormGroup>
										</div>
										<div className='col-md-6'>
											<FormGroup id='task' label='Select Task' isFloating>
												<Select
													ariaLabel='Task'
													placeholder='Choose...'
													list={[
														{
															value: 'p1',
															text: 'Write message',
														},
														{
															value: 'p2',
															text: 'Create illustration',
														},
														{
															value: 'p3',
															text: 'Write article',
														},
														{
															value: 'p3',
															text: 'Publish article on blog',
														},
													]}
													onChange={formik.handleChange}
													value={formik.values.state}
												/>
											</FormGroup>
										</div>
										<div className='col-md-6'>
											<FormGroup
												id='taskDuration'
												label='Average task duration'
												isFloating>
												<Input
													placeholder='Average task duration'
													autoComplete='average-task'
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value=''
													// isValid={formik.isValid}
													// isTouched={formik.touched.taskName}
													// invalidFeedback={formik.errors.taskname}
													validFeedback='Looks good!'
												/>
											</FormGroup>
										</div>
										<div className='col-md-6'>
											<FormGroup
												id='expectedtaskDuration'
												label='Your expected task duration'
												isFloating>
												<Input
													placeholder='Average task duration'
													autoComplete='expectedaverage-task'
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value=''
													// isValid={formik.isValid}
													// isTouched={formik.touched.taskName}
													// invalidFeedback={formik.errors.taskname}
													validFeedback='Looks good!'
												/>
											</FormGroup>
										</div>
										<div className='col-md-6'>
											<FormGroup id='date' label='Due Date' isFloating>
												<Input
													placeholder='Due Date'
													onChange={formik.handleChange}
													value={formik.values.date}
													type='date'
												/>
											</FormGroup>
										</div>
										<div className='col-md-6'>
											<FormGroup id='user' label='Select User' isFloating>
												<Select
													ariaLabel='User'
													placeholder='Choose...'
													list={[
														{
															value: 'u1',
															text: 'Jennifer Ferriera',
														},
														{
															value: 'u2',
															text: 'Ashley M. Maclin',
														},
														{
															value: 'u3',
															text: 'Katie A. Ruiz',
														},
														{
															value: 'u3',
															text: 'Felix L. Harley',
														},
													]}
													onChange={formik.handleChange}
													value={formik.values.state}
												/>
											</FormGroup>
										</div>
										{/* <div className='col-md-12'>
										<FormGroup id='time' label='Time' isFloating>
											<Input
												placeholder='Time'
												onChange={formik.handleChange}
												value={formik.values.time}
												type='time'
											/>
										</FormGroup>
									</div> */}
									</div>
								</CardBody>
								<CardFooter>
									<Button color='primary' isLight icon='Save'>
										Save
									</Button>
									<Button color='danger' isLight icon='Close'>
										Cancel
									</Button>
								</CardFooter>
							</Card>
						)}

						{TABS.EXISTING_TASK === activeTab && (
							<Card stretch>
								<CardHeader>
									<CardLabel icon='Assignment'>
										<CardTitle tag='div' className='h5'>
											Pre-listed Tasks
										</CardTitle>
									</CardLabel>
								</CardHeader>
								<CardBody>
									<table className='table table-modern layout-fixed'>
										<thead>
											<tr>
												<th colSpan={2}>Task Name</th>
												<th>Task Category</th>
												<th>Average Duration in minutes</th>
												<th>Your Expected duration</th>
												<th>Due Date</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>1</td>
												<td>Publish Facebook Post</td>
												<td>Social Media / Facebook</td>
												<td>20 </td>
												<td>40</td>
												<td>10 July, 2023</td>
											</tr>
											<tr>
												<td colSpan={6}>
													<table className='table table-modern'>
														<tr>
															<td>1.1</td>
															<td>Write message</td>
															<td>Facebook Post</td>
															<td>10</td>
															<td>30</td>
															<td>11 July, 2023</td>
														</tr>
														<tr>
															<td>1.2</td>
															<td>Create illustration</td>
															<td>-</td>
															<td>10</td>
															<td>30</td>
															<td>11 July, 2023</td>
														</tr>
													</table>
												</td>
											</tr>
											<tr>
												<td>2</td>
												<td>Publish Instagram Post</td>
												<td>Social Media / Instagram</td>
												<td>20 </td>
												<td>40</td>
												<td>10 July, 2023</td>
											</tr>
											<tr>
												<td colSpan={6}>
													<table className='table table-modern'>
														<tr>
															<td>2.1</td>
															<td>Write message</td>
															<td>Instagram Post</td>
															<td>10</td>
															<td>30</td>
															<td>11 July, 2023</td>
														</tr>
														<tr>
															<td>2.2</td>
															<td>Create illustration</td>
															<td>-</td>
															<td>10</td>
															<td>30</td>
															<td>11 July, 2023</td>
														</tr>
													</table>
												</td>
											</tr>
											<tr>
												<td>3</td>
												<td>Publish article on blog</td>
												<td>Google/Blog </td>
												<td>45 </td>
												<td>60</td>
												<td>10 July, 2023</td>
											</tr>
											<tr>
												<td colSpan={6}>
													<table className='table table-modern'>
														<tr>
															<td>3.1</td>
															<td>Write article</td>
															<td>Blog Article</td>
															<td>10</td>
															<td>30</td>
															<td>11 July, 2023</td>
														</tr>
														<tr>
															<td>3.2</td>
															<td>Create illustration</td>
															<td>-</td>
															<td>10</td>
															<td>30</td>
															<td>11 July, 2023</td>
														</tr>
														<tr>
															<td>3.3</td>
															<td>Publish on site</td>
															<td>-</td>
															<td>10</td>
															<td>30</td>
															<td>11 July, 2023</td>
														</tr>
														<tr>
															<td>3.4</td>
															<td>Check SEO</td>
															<td>-</td>
															<td>10</td>
															<td>30</td>
															<td>11 July, 2023</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</CardBody>
							</Card>
						)}
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default AddTask;
