import React, { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import USERS, { getUserDataWithId } from '../../../common/data/userDummyData';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import UserImage from '../../../assets/img/wanna/wanna1.png';
import UserImageWebp from '../../../assets/img/wanna/wanna1.webp';
import useTourStep from '../../../hooks/useTourStep';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import validate from '../demo-pages/helper/editPagesValidate';
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';
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
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import useDarkMode from '../../../hooks/useDarkMode';
import Spinner from '../../../components/bootstrap/Spinner';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import Avatar from '../../../components/Avatar';
import CommonDesc from '../../../common/other/CommonDesc';
import Label from '../../../components/bootstrap/forms/Label';
import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
import { useFormik } from 'formik';
import { RootState } from '../../../store/store';

const EmployeePage = () => {
	useTourStep(19);

	const { id } = useParams();
	const { user } = useSelector((state: RootState) => state.auth);

	const userobj = {
		src: UserImage,
		srcSet: UserImageWebp,
		isOnline: true,
	};

	const [passwordChangeCTA, setPasswordChangeCTA] = useState<boolean>(false);
	const formik = useFormik({
		initialValues: {
			firstName: user.name,
			lastName: user.surname,
			displayName: user.name,
			emailAddress: user.email,
			phone: '',
			currentPassword: '',
			newPassword: '',
			confirmPassword: '',
			checkOne: '',
			checkTwo: '',
			checkThree: '',
		},
		onSubmit: (values) => {
			// console.log(values.checkThree);
		},
	});

	return (
		<PageWrapper title={`${user.name} ${user.surname}`}>
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
											<Avatar
												src={userobj.src}
												srcSet={userobj.srcSet}
												color='storybook'
											/>
										</div>
										<div className='col-lg'>
											<div className='row g-4'>
												<div className='col-auto'>
													<Input
														type='file'
														autoComplete='photo'
														ariaLabel='Upload image file'
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
									<div className='col-12'>
										<FormGroup
											id='displayName'
											label='Display Name'
											isFloating
											formText='This will be how your name will be displayed in the account section and in reviews'>
											<Input
												placeholder='Display Name'
												autoComplete='username'
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.displayName}
												isValid={formik.isValid}
												// isTouched={formik.touched.displayName}
												// invalidFeedback={formik.errors.displayName}
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
								<div className='row'>
									<div className='col-12'>
										<FormGroup>
											{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
											<Label>
												Choose what messages you’d like to receive for each
												of your accounts.
											</Label>
											<ChecksGroup>
												<Checks
													type='switch'
													id='inlineCheckOne'
													label='Successful Payments'
													name='checkOne'
													onChange={formik.handleChange}
													checked={formik.values.checkOne}
												/>
												<Checks
													type='switch'
													id='inlineCheckTwo'
													label='Payouts'
													name='checkTwo'
													onChange={formik.handleChange}
													checked={formik.values.checkTwo}
												/>
												<Checks
													type='switch'
													id='inlineCheckThree'
													label='Application fees'
													name='checkThree'
													onChange={formik.handleChange}
													checked={formik.values.checkThree}
												/>
											</ChecksGroup>
										</FormGroup>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
				</div>
				<CardFooter>
					<Button
						className='me-3'
						color='primary'
						icon='Save'
						isLight
						// isDisable={isLoading}
						onClick={formik.handleSubmit}>
						Save
					</Button>
				</CardFooter>
			</Page>
		</PageWrapper>
	);
};

export default EmployeePage;
