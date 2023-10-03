import React, { useEffect, useState } from 'react';
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
import { update, AuthState } from '../../../features/auth/authSlice';
import { useGetProfileQuery, useUpdateProfileMutation } from '../../../features/auth/authApiSlice';
import { useParams } from 'react-router-dom';

const Profile = () => {
	// const { id } = useParams();
	const id = 101;
	const {
		data: profileData,
		error,
		isLoading,
		isSuccess,
		isFetching,
		refetch,
	} = useGetProfileQuery(id);


	// let profileData: any;
	// if (data) {
	// 	profileData = data.id === id ? data : null;
	// }
	useTourStep(19);
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	// const userdata = JSON.parse(localStorage.getItem('user')!);
	const [src, setSrc] = useState(profileData ? profileData.avatar : UserImage);
	const [passwordChangeCTA, setPasswordChangeCTA] = useState<boolean>(false);
	const dispatch = useDispatch();
	const [UpdateProfileMutation] = useUpdateProfileMutation();

	const formik = useFormik({
		// initialValues: {
		// 	firstName: userdata.name,
		// 	lastName: userdata.surname,
		// 	emailAddress: userdata.email,
		// 	phone: userdata.phoneNo,
		// 	currentPassword: '',
		// 	confirmPassword: '',
		// 	newPassword: '',
		// 	image: src,
		// },

		initialValues: {
			firstName: profileData ? profileData?.first_name : ' ',
			lastName: profileData ? profileData?.last_name : '',
			emailAddress: profileData ? profileData?.email : '',
			phone: profileData ? profileData?.phone_number : '',
			gender: profileData ? profileData?.gender : '',
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
		onSubmit: async (values) => {
			// console.log(values);
			const userdetails = {
				id: profileData.id,
				first_name: values.firstName,
				last_name: values.lastName,
				email: values.emailAddress,
				src,
				role: profileData.role,
				// teamMember: profileData.teamMember,
				country: profileData.country,
				company: profileData.company,
				state: profileData.state,
				phone_number: values.phone,
				gender: profileData.gender,
			};
			// console.log(values);
			const value = JSON.stringify(userdetails);
			localStorage.setItem('user', value);
			// const user = { user: userdetails };
			// dispatch(update(user));
			await UpdateProfileMutation(userdetails);
			refetch();
		},
	});

	if (isLoading) {
		return <h2>Loading ...</h2>;
	}
	if (isFetching) {
		return <h2>...isFetching</h2>;
	}

	if (error) {
		return <h2>Something went wrong</h2>;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleImageChange = (event: any) => {
		const file = event.target.files[0];
		// console.log('file >>', file);
		if (file) {
			const imageURL = URL.createObjectURL(file);
			// console.log(imageURL);

			setSrc(imageURL);
			formik.setFieldValue('image', imageURL);
		}
	};

	return (
		<PageWrapper
			title={`${profileData && profileData?.first_name} ${
				profileData && profileData?.last_name
			}`}>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Profile', to: '/' },
							// { title: 'Edit User', to: '/' },
						]}
					/>
				</SubHeaderLeft>
			</SubHeader>

			<Page container='fluid'>
				<div className='row'>
					<div className='col-12'>
						<div className='display-4 fw-bold py-3'>Profile</div>
					</div>
				</div>
				<div className='row h-100 align-content-start'>
					<div className='col-md-12'>
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
												name='firstName'
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
												name='lastName'
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
								<div className='row g-4 mt-2'>
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
												name='phone'
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
								<div className='row g-4 mt-2'>
									<div className='col-md-6'>
										<FormGroup id='gender' label='Gender' isFloating>
											<Input
												type='text'
												name='gender'
												placeholder='Gender'
												autoComplete='gender'
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.gender}
												isValid={formik.isValid}
												// isTouched={formik.touched.emailAddress}
												// invalidFeedback={formik.errors.emailAddress}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
									{/* <div className='col-md-6'>
										<FormGroup id='dob' label='Date of Birth' isFloating>
											<Input
												type='date'
												name='phone'
												placeholder='Date of Birth'
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.date}
												isValid={formik.isValid}
												// isTouched={formik.touched.phone}
												// invalidFeedback={formik.errors.phone}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div> */}
								</div>
							</CardBody>
						</Card>
						<Card>
							<CardHeader>
								<CardLabel icon='LocalPolice' iconColor='primary'>
									<CardTitle tag='div' className='h5'>
										Password
									</CardTitle>
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
