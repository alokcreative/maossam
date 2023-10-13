import React, { useEffect, useState } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import UserImage from '../../../assets/img/wanna/wanna1.png';
import useTourStep from '../../../hooks/useTourStep';
import SubHeader, { SubHeaderLeft } from '../../../layout/SubHeader/SubHeader';
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
import {
	useChangePasswordMutation,
	useGetProfileQuery,
	useGetUsersMutation,
	useUpdateProfileMutation,
} from '../../../features/auth/authApiSlice';
import { useParams } from 'react-router-dom';
import Spinner from '../../../components/bootstrap/Spinner';
import Page404 from '../auth/Page404';
import Select from '../../../components/bootstrap/forms/Select';
import { toast } from 'react-toastify';

const Profile = () => {
	const { id } = useParams();
	useTourStep(19);
	const { data, isLoading, isSuccess, refetch } = useGetProfileQuery(id);
	const [src, setSrc] = useState(data ? data.avatar : UserImage);
	const [avatar, setAvatar] = useState(data ? data.avatar : UserImage);
	const [passwordChangeCTA, setPasswordChangeCTA] = useState<boolean>(false);
	const [UpdateProfileMutation] = useUpdateProfileMutation();
	const [ChangePasswordMutation] = useChangePasswordMutation();
	const token = localStorage?.getItem('access_token');
	const [GetUsersMutation] = useGetUsersMutation();

	const formik = useFormik({
		initialValues: {
			first_name: data ? String(data?.first_name) : ' ',
			last_name: data ? String(data?.last_name) : '',
			email: data ? String(data?.email) : '',
			phone_number: data ? String(data?.phone_number) : '',
			gender: data ? String(data?.gender) : '',
		},
		validate: (values) => {
			const errors: {
				first_name?: string;
				last_name?: string;
				email?: string;
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
			if (!values.phone_number) {
				errors.phone_number = 'Required';
			}
			if (values.phone_number && values.phone_number.length !== 10) {
				errors.phone_number = 'Must be 10 digit';
			}
			if (!values.gender) {
				errors.gender = 'Required';
			}

			return errors;
		},
		onSubmit: async (values) => {
			const userData = new FormData();
			userData.append('first_name', values.first_name);
			userData.append('last_name', values.last_name);
			userData.append('email', values.email);
			userData.append('gender', values.gender);
			userData.append('phone_number', values.phone_number);
			if (avatar instanceof File) {
				userData.append('avatar', avatar, avatar.name);
			}
			UpdateProfileMutation({ id: data.id, userData })
				.unwrap()
				.then((res) => {
					console.log('res>>', res);
					
					if (token) {
						GetUsersMutation(token)
							.unwrap()
							.then(() => {
								console.log('called');
								refetch();
							});
					}
					toast('Profile Updated Successfully');
				});
		},
	});

	const formikChangepassword = useFormik({
		initialValues: {
			currentPassword: '',
			newPassword: '',
			confirmNewPassword: '',
		},
		validate: (values) => {
			const errors: {
				newPassword?: string;
				confirmNewPassword?: string;
				currentPassword?: string;
			} = {};
			if (!values.newPassword) {
				errors.newPassword = 'Required';
			}

			if (!values.confirmNewPassword) {
				errors.confirmNewPassword = 'Required';
			}
			if (!values.currentPassword) {
				errors.currentPassword = 'Required';
			}
			if (values.newPassword !== values.confirmNewPassword) {
				errors.confirmNewPassword = 'Must be Same';
			}
			if (values.newPassword.length < 8) {
				errors.newPassword = 'Ensure this field has at least 8 characters';
			}
			if (values.confirmNewPassword.length < 8) {
				errors.confirmNewPassword = 'Ensure this field has at least 8 characters';
			}
			return errors;
		},
		validateOnChange: false,
		onSubmit: async (values, { resetForm }) => {
			const payload = JSON.stringify({
				current_password: values.currentPassword,
				new_password: values.newPassword,
				confirm_password: values.confirmNewPassword,
			});

			ChangePasswordMutation(payload)
				.unwrap()
				.then((res) => {
					if (res?.detail[0]) toast(res?.detail[0]);
				})
				.catch((res) => {
					// console.log("res>>",res);
					toast(res.data?.detail[0]);
				});
			resetForm();
		},
	});
	useEffect(() => {
		refetch();
		formik.setFieldValue('first_name', data ? data?.first_name : ' ');
		formik.setFieldValue('last_name', data ? data?.last_name : '');
		formik.setFieldValue('email', data ? data?.email : '');
		formik.setFieldValue('phone_number', data ? data?.phone_number : '');
		formik.setFieldValue('gender', data ? data?.gender : '');
		formik.setFieldValue('currentPassword', '');
		formik.setFieldValue('confirmPassword', '');
		formik.setFieldValue('newPassword', '');
		setSrc(data ? data?.avatar : '');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, isSuccess, data]);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleImageChange = (event: any) => {
		event.preventDefault();
		const file = event.target.files[0];
		if (file.type.includes('png') || file.type.includes('jpeg')) {
			setAvatar(file);
			const imageURL = URL.createObjectURL(file);
			setSrc(imageURL);
		} else {
			toast('Only PNG and JPEG Allowed');
			event.target.value = '';
		}
	};

	return (
		<PageWrapper title={`${data && data?.first_name} ${data && data?.last_name}`}>
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
			{isLoading ? (
				<Spinner />
			) : isSuccess ? (
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
															name='avatar'
															aria-label='Upload image file'
															onChange={handleImageChange}
															// onBlur={formik.handleBlur}
														/>
													</div>
													<div className='col-auto'>
														<Button
															color='dark'
															isLight
															icon='Delete'
														/>
													</div>
													{/* <div className='col-12'>
														<p className='lead text-muted'>
															Avatar helps your teammates get to know
															you.
														</p>
													</div> */}
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
											<FormGroup
												id='first_name'
												label='First Name'
												isFloating>
												<Input
													name='first_name'
													placeholder='First Name'
													autoComplete='additional-name'
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.first_name}
													isValid={formik.isValid}
													isTouched={formik.touched.first_name}
													invalidFeedback={formik.errors.first_name}
													validFeedback='Looks good!'
												/>
											</FormGroup>
										</div>
										<div className='col-md-6'>
											<FormGroup id='last_name' label='Last Name' isFloating>
												<Input
													name='last_name'
													placeholder='Last Name'
													autoComplete='family-name'
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.last_name}
													isValid={formik.isValid}
													isTouched={formik.touched.last_name}
													invalidFeedback={formik.errors.last_name}
													validFeedback='Looks good!'
												/>
											</FormGroup>
										</div>
									</div>
									<div className='row g-4 mt-2'>
										<div className='col-md-6'>
											<FormGroup id='email' label='Email address' isFloating>
												<Input
													type='email'
													placeholder='Email address'
													autoComplete='email'
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.email}
													isValid={formik.isValid}
													isTouched={formik.touched.email}
													invalidFeedback={formik.errors.email}
													validFeedback='Looks good!'
												/>
											</FormGroup>
										</div>
										<div className='col-md-6'>
											<FormGroup
												id='phone_number'
												label='Phone Number'
												isFloating>
												<Input
													type='tel'
													name='phone_number'
													placeholder='Phone Number'
													autoComplete='tel'
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.phone_number}
													isValid={formik.isValid}
													isTouched={formik.touched.phone_number}
													invalidFeedback={formik.errors.phone_number}
													validFeedback='Looks good!'
												/>
											</FormGroup>
										</div>
									</div>
									<div className='row g-4 mt-2'>
										<div className='col-md-6'>
											<FormGroup id='gender' label='Gender' isFloating>
												<Select
													ariaLabel='Gender'
													placeholder='Choose from list of State'
													required
													list={[
														{
															value: 'male',
															text: 'Male',
														},
														{
															value: 'female',
															text: 'Female',
														},
														{
															value: 'other',
															text: 'Other',
														},
													]}
													onChange={formik.handleChange}
													value={formik.values.gender}
													isValid={formik.isValid}
													isTouched={formik.touched.gender}
													invalidFeedback={formik.errors.gender}
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
														onChange={formikChangepassword.handleChange}
														value={
															formikChangepassword.values
																.currentPassword
														}
														isValid={formikChangepassword.isValid}
														isTouched={
															formikChangepassword.touched
																.currentPassword
														}
														invalidFeedback={
															formikChangepassword.errors
																.currentPassword
														}
														validFeedback='Looks good!'
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
														onChange={formikChangepassword.handleChange}
														onBlur={formikChangepassword.handleBlur}
														value={
															formikChangepassword.values.newPassword
														}
														isValid={formikChangepassword.isValid}
														isTouched={
															formikChangepassword.touched.newPassword
														}
														invalidFeedback={
															formikChangepassword.errors.newPassword
														}
														validFeedback='Looks good!'
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
												<FormGroup
													id='confirmNewPassword'
													label='Confirm new password'
													isFloating>
													<Input
														type='password'
														placeholder='Confirm new password'
														autoComplete='new-password'
														onChange={formikChangepassword.handleChange}
														onBlur={formikChangepassword.handleBlur}
														value={
															formikChangepassword.values
																.confirmNewPassword
														}
														isValid={formikChangepassword.isValid}
														isTouched={
															formikChangepassword.touched
																.confirmNewPassword
														}
														invalidFeedback={
															formikChangepassword.errors
																.confirmNewPassword
														}
														validFeedback='Looks good!'
													/>
												</FormGroup>
											</div>
										</div>{' '}
									</CardBody>
								)}
								<CardFooter>
									<CommonDesc>
										For your security, we recommend that you change your
										password every 3 months at most.
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
							onClick={
								passwordChangeCTA
									? formikChangepassword.handleSubmit
									: formik.handleSubmit
							}>
							Save
						</Button>
					</CardFooter>
				</Page>
			) : (
				<Page404 />
			)}
		</PageWrapper>
	);
};

export default Profile;
