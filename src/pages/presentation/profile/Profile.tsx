import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDispatch } from 'react-redux';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import UserImage from '../../../assets/img/wanna/wanna1.png';
import useTourStep from '../../../hooks/useTourStep';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import Avatar from '../../../components/Avatar';
import CommonDesc from '../../../common/other/CommonDesc';
import { useFormik } from 'formik';
import { update } from '../../../features/auth/authSlice';
import Todo, { ITodoListItem } from '../../../components/extras/Todo';
import { TColor } from '../../../type/color-type';
import dayjs from 'dayjs';

const Profile = () => {
	useTourStep(19);

	const { id } = useParams();
	const userdata = JSON.parse(localStorage.getItem('user')!);
	// console.log('userdata>>>', userdata);

	const [src, setSrc] = useState(userdata ? userdata.src : UserImage);

	const [passwordChangeCTA, setPasswordChangeCTA] = useState<boolean>(false);
	const dispatch = useDispatch();
	const formik = useFormik({
		initialValues: {
			firstName: userdata.name,
			lastName: userdata.surname,
			emailAddress: userdata.email,
			phone: userdata.phoneNo,
			currentPassword: '',
			confirmPassword: '',
			newPassword: '',
			image: src,
		},
		validate: (values) => {
			const errors: {
				firstName?: string;
				emailAddress?: string;
				confirmPassword?: string;
				currentPassword?: string;
			} = {};

			return errors;
		},
		onSubmit: (values) => {
			// console.log(values);
			const userdetails = {
				id: userdata.id,
				username: values.firstName,
				name: values.firstName,
				surname: values.lastName,
				role: userdata.role,
				email: values.emailAddress,
				fullImage: userdata.fullImage,
				isAdmin: userdata.isAdmin,
				src,
				srcSet: userdata.srcSet,
				company: userdata.company,
				noOfTeam: userdata.noOfTeam,
				country: userdata.country,
				state: userdata.state,
				phoneNo: values.phone,
			};
			// console.log(values);
			const value = JSON.stringify(userdetails);
			localStorage.setItem('user', value);
			const user = { user: userdetails };
			dispatch(update(user));
		},
	});
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleImageChange = (event: any) => {
		const file = event.target.files[0];
		console.log("file >>", file)
		if (file) {
			const imageURL = URL.createObjectURL(file);
			console.log(imageURL);
			

			setSrc(imageURL);
			formik.setFieldValue('image', imageURL);
		}
	};

	/**
	 * To/Do List
	 */
	const TODO_BADGES: {
		[key: string]: {
			text: string;
			color?: TColor;
		};
	} = {
		NEW: { text: 'New', color: 'success' },
		UPDATE: { text: 'Update', color: 'info' },
		TEST: { text: 'Test', color: 'warning' },
		REPORT: { text: 'Report', color: 'info' },
		PRINT: { text: 'Print', color: 'danger' },
		CONTROL: { text: 'Control', color: 'primary' },
		MEETING: { text: 'Meeting', color: 'secondary' },
	};
	const [list, setList] = useState<ITodoListItem[]>([
		{
			id: 1,
			status: true,
			title: 'New Products will be added',
			date: dayjs().add(0.5, 'day'),
			badge: TODO_BADGES.NEW,
		},
		{
			id: 2,
			status: true,
			title: 'Cover images will be edited',
			date: dayjs().add(2, 'day'),
			badge: TODO_BADGES.UPDATE,
		},
		{
			id: 3,
			status: false,
			title: 'Preparing for A/B testing',
			date: dayjs().add(2, 'day'),
			badge: TODO_BADGES.TEST,
		},
		{
			id: 4,
			status: false,
			title: 'Google Analytics data will be examined',
			date: dayjs().add(4, 'day'),
			badge: TODO_BADGES.REPORT,
		},
		{
			id: 5,
			status: false,
			title: 'Invoices will be issued',
			date: dayjs().add(9, 'day'),
			badge: TODO_BADGES.PRINT,
		},
		{
			id: 6,
			status: false,
			title: 'Dependencies check and update',
			date: dayjs().add(15, 'day'),
			badge: TODO_BADGES.CONTROL,
		},
		{
			id: 7,
			status: false,
			title: 'End of month meeting',
			date: dayjs().add(32, 'day'),
			badge: TODO_BADGES.MEETING,
		},
	]);

	return (
		<PageWrapper title={`${userdata.name} ${userdata.surname}`}>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Profile', to: '/' },
							// { title: 'Edit User', to: '/' },
						]}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					<span className='text-muted fst-italic me-2'>Last update:</span>
					<span className='fw-bold'>13 hours ago</span>
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row'>
					<div className='col-12'>
						<div className='display-4 fw-bold py-3'>Profile</div>
					</div>
				</div>
				<div className='row h-100 align-content-start'>
					<div className='col-md-8'>
						<Card>
							<CardBody>
								<div className='col-12'>
									<div className='row g-4 align-items-center'>
										<div className='col-lg-auto'>
											{src ? (
												<Avatar src={src} color='storybook' />
											) : (
												<Avatar src={UserImage} color='storybook' />
											)}
										</div>
										<div className='col-lg'>
											<div className='row g-4'>
												<div className='col-auto'>
													<Input
														type='file'
														autoComplete='photo'
														aria-label='Upload image file'
														onChange={handleImageChange}
														onBlur={formik.handleBlur}
													/>
												</div>
												<div className='col-auto'>
													<Button color='dark' isLight icon='Delete'>
														Delete Avatar
													</Button>
												</div>
												<div className='col-12'>
													<p className='lead text-muted'>
														Avatar helps your teammates get to know you.
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</CardBody>
						</Card>
						<Card>
							<CardHeader>
								<CardLabel icon='Person' iconColor='success'>
									<CardTitle tag='div' className='h5'>
										Personal Information
									</CardTitle>
									<CardSubTitle tag='div' className='h6'>
										User's credentials
									</CardSubTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='row g-4'>
									<div className='col-md-6'>
										<FormGroup id='firstName' label='First Name' isFloating>
											<Input
												placeholder='First Name'
												autoComplete='additional-name'
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.firstName}
												isValid={formik.isValid}
												// isTouched={formik.touched.firstName}
												// invalidFeedback={formik.errors.firstName}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
									<div className='col-md-6'>
										<FormGroup id='lastName' label='Last Name' isFloating>
											<Input
												placeholder='Last Name'
												autoComplete='family-name'
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.lastName}
												isValid={formik.isValid}
												// isTouched={formik.touched.lastName}
												// invalidFeedback={formik.errors.lastName}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
								</div>
							</CardBody>
						</Card>
						<Card>
							<CardHeader>
								<CardLabel icon='Phonelink' iconColor='danger'>
									<CardTitle tag='div' className='h5'>
										Contact Information
									</CardTitle>
									<CardSubTitle tag='div' className='h6'>
										User's contact information
									</CardSubTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='row g-4'>
									<div className='col-md-6'>
										<FormGroup
											id='emailAddress'
											label='Email address'
											isFloating>
											<Input
												type='email'
												placeholder='Email address'
												autoComplete='email'
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.emailAddress}
												isValid={formik.isValid}
												// isTouched={formik.touched.emailAddress}
												// invalidFeedback={formik.errors.emailAddress}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
									<div className='col-md-6'>
										<FormGroup id='phone' label='Phone Number' isFloating>
											<Input
												type='tel'
												placeholder='Phone Number'
												autoComplete='tel'
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.phone}
												isValid={formik.isValid}
												// isTouched={formik.touched.phone}
												// invalidFeedback={formik.errors.phone}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
								</div>
							</CardBody>
						</Card>
						<Card>
							<CardHeader>
								<CardLabel icon='LocalPolice' iconColor='primary'>
									<CardTitle tag='div' className='h5'>
										Password
									</CardTitle>
									<CardSubTitle tag='div' className='h6'>
										Password change operations
									</CardSubTitle>
								</CardLabel>
								<CardActions>
									{passwordChangeCTA ? (
										<Button
											color='danger'
											isLight
											icon='Cancel'
											onClick={() => setPasswordChangeCTA(false)}>
											Cancel
										</Button>
									) : (
										<>
											<span>Do you want to change?</span>
											<Button
												color='primary'
												isLight
												icon='PublishedWithChanges'
												onClick={() => setPasswordChangeCTA(true)}>
												Yes
											</Button>
										</>
									)}
								</CardActions>
							</CardHeader>
							{passwordChangeCTA && (
								<CardBody>
									<div className='row g-4'>
										<div className='col-12'>
											<FormGroup
												id='currentPassword'
												label='Current password'
												isFloating>
												<Input
													type='password'
													placeholder='Current password'
													autoComplete='current-password'
													onChange={formik.handleChange}
													value={formik.values.currentPassword}
												/>
											</FormGroup>
										</div>
										<div className='col-12'>
											<FormGroup
												id='newPassword'
												label='New password'
												isFloating>
												<Input
													type='password'
													placeholder='New password'
													autoComplete='new-password'
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.newPassword}
													isValid={formik.isValid}
													// isTouched={formik.touched.newPassword}
													// invalidFeedback={formik.errors.newPassword}
													validFeedback='Looks good!'
												/>
											</FormGroup>
										</div>
										<div className='col-12'>
											<FormGroup
												id='confirmPassword'
												label='Confirm new password'
												isFloating>
												<Input
													type='password'
													placeholder='Confirm new password'
													autoComplete='new-password'
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.confirmPassword}
													isValid={formik.isValid}
													isTouched={formik.touched.confirmPassword}
													invalidFeedback={formik.errors.confirmPassword}
													validFeedback='Looks good!'
												/>
											</FormGroup>
										</div>
									</div>{' '}
								</CardBody>
							)}
							<CardFooter>
								<CommonDesc>
									For your security, we recommend that you change your password
									every 3 months at most.
								</CommonDesc>
							</CardFooter>
						</Card>
					</div>
					<div className='col-md-4'>
						<Card className='position-sticky sticky-top-size'>
							<CardHeader>
								<CardLabel icon='MarkEmailUnread'>
									<CardTitle tag='div' className='h5'>
										Email notification
									</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<h3>Tasks</h3>
								<Todo list={list} setList={setList} />
							</CardBody>
						</Card>
					</div>
				</div>
				<CardFooter>
					<Button
						className='me-3'
						color='success'
						icon='save'
						isLight
						onClick={formik.handleSubmit}>
						Save
					</Button>
				</CardFooter>
			</Page>
		</PageWrapper>
	);
};

export default Profile;
