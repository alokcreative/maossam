import React, { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import Card, {
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Wizard, { WizardItem } from '../../../components/Wizard';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Select from '../../../components/bootstrap/forms/Select';
import Label from '../../../components/bootstrap/forms/Label';
import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Avatar from '../../../components/Avatar';
import User1Webp from '../../../assets/img/wanna/wanna2.webp';
import User1Img from '../../../assets/img/wanna/wanna2.png';
import CommonMyWallet from '../../_common/CommonMyWallet';
import editPasswordValidate from '../../presentation/demo-pages/helper/editPasswordValidate';
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';
import { pagesMenu } from '../../../menu';
import {
	useGetProfileQuery,
	useUpdateProfileMutation,
	useDeleteProfileMutation,
	useGetAllUserQuery,
} from '../../../features/auth/authApiSlice';
import { IUser } from './userList';
import UserImage from '../../../assets/img/wanna/wanna1.png';
import { Country, State, City } from 'country-state-city';
import { useEffectOnce } from 'react-use';
import ConfirmationModal from '../../documentation/components/ConfirmationModal';

interface IOptionsProps {
	value?: string | number;
	text?: string | number;
}
interface IPreviewItemProps {
	title: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	value: any | any[];
}
const PreviewItem: FC<IPreviewItemProps> = ({ title, value }) => {
	return (
		<>
			<div className='col-3 text-end'>{title}</div>
			<div className='col-9 fw-bold'>{value || '-'}</div>
		</>
	);
};

interface IValues {
	firstName: string;
	lastName: string;
	displayName: string;
	emailAddress: string;
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
const EditUser = () => {
	const navigate = useNavigate();
	const { id } = useParams();

	const { isSuccess, refetch: reloadData } = useGetAllUserQuery({ fixedCacheKey: 'user-data' });
	const { data, refetch } = useGetProfileQuery(id);
	const [avatar, setAvatar] = useState(data ? data.avatar : UserImage);
	const [src, setSrc] = useState(data ? data.avatar : UserImage);
	const [showConfirmation, setShowConfirmation] = useState(false);

	const [countryList, setcountryList] = useState<IOptionsProps[]>([
		{
			value: data?.country,
			text: data?.country,
		},
	]);
	const [stateList, setStateList] = useState<IOptionsProps[]>([
		{
			value: data?.state,
			text: data?.state,
		},
	]);
	const [deleteProfile] = useDeleteProfileMutation();
	const [updateProfile] = useUpdateProfileMutation();
	useEffectOnce(() => {
		const countryListDetails = Country.getAllCountries();
		const LIST = countryListDetails.map(({ name, isoCode }) => ({
			value: isoCode,
			text: name,
		}));
		setcountryList(LIST);
	});
	const TABS = {
		ACCOUNT_DETAIL: 'Account Details',
		PASSWORD: 'Password',
		MY_WALLET: 'My Wallet',
	};
	const [activeTab, setActiveTab] = useState(TABS.ACCOUNT_DETAIL);
	const updateUserForm = useFormik({
		initialValues: {
			id: data?.id || '',
			first_name: data?.first_name || '',
			last_name: data?.last_name || '',
			email: data?.email || '',
			// password: '',
			phone_number: data?.phone_number || '',
			company_name: data?.company_name || '',
			country: data?.country || '',
			state: data?.state || '',
			gender: data?.gender || '',
			avatar: FormData || '',
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

			// 	if (!values.first_name) {
			// 		errors.first_name = 'Required';
			// 	}

			// 	if (!values.last_name) {
			// 		errors.last_name = 'Required';
			// 	}
			// 	if (!values.email) {
			// 		errors.email = 'Required';
			// 	}

			// 	if (!values.country) {
			// 		errors.country = 'Required';
			// 	}
			// 	// if (!values.state) {
			// 	// 	errors.state = 'Required';
			// 	// }

			// 	if (!values.gender) {
			// 		errors.gender = 'Required';
			// 	}
			// 	if (!values.phone_number) {
			// 		errors.phone_number = 'Required';
			// 	}
			// 	if (values?.phone_number?.length !== 10) {
			// 		errors.phone_number = 'Must be 10 digit';
			// 	}

			// 	if (!values.company_name) {
			// 		errors.company_name = 'Required';
			// 	}

			return errors;
		},
		onSubmit: (values, { resetForm }) => {
			const userData = new FormData();
			userData.append('first_name', values.first_name);
			userData.append('last_name', values.last_name);
			userData.append('email', values.email);
			userData.append('country', values.country);
			userData.append('state', values.state);
			setStateList([
				{
					value: values.state,
					text: values.state,
				},
			]);
			userData.append('gender', values.gender);
			userData.append('phone_number', values.phone_number);
			userData.append('company_name', values.company_name);
			if (avatar instanceof File) {
				userData.append('avatar', avatar, avatar.name);
			}
			updateProfile({ id: updateUserForm.values.id, userData }).then((res) => {
				refetch();
				reloadData();
				showNotification(
					<span className='d-flex align-items-center'>
						<Icon icon='Info' size='lg' className='me-1' />
						<span>User Updated Sucessfully</span>
					</span>,
					``,
				);
				// refetch();
			});
		},
	});
	const handleData = (uid: string) => {
		// console.log('id>>>>', id);
		// const updatedData = data.filter((user: IUserProps) => user.id !== id);
		// setUserData(updatedData);
		setShowConfirmation(true);
		// setDeletingID(uid);
	};
	const handleDeleteConfirmation = () => {
		setShowConfirmation(false);
		deleteProfile(data?.id || id)
			.unwrap()
			.then((res) => {
				console.log("response>>",res);

				// refetch().then((res) => {
				// 	// setUserList(res.data);
				// });
				showNotification(
					<span className='d-flex align-items-center'>
						<Icon icon='Info' size='lg' className='me-1' />
						<span>User Deleted Sucessfully</span>
					</span>,
					``,
				);
				navigate(-1);
			})
			.catch(() => {
				showNotification(
					<span className='d-flex align-items-center'>
						<Icon icon='Info' size='lg' className='me-1' />
						<span>Error!!</span>
					</span>,
					``,
				);
			});
	};
	useEffect(() => {
		setSrc(data && data.avatar);
	}, [data]);
	useEffect(() => {
		const stateListupdated = State.getStatesOfCountry(updateUserForm.values.country);
		const LIST = stateListupdated.map(({ name }) => ({
			value: name,
			text: name,
		}));
		setStateList(LIST);
	}, [updateUserForm.values.country]);
	const notificationTypes = [
		{ id: 1, name: 'New Order' },
		{ id: 2, name: 'New Customer' },
		{ id: 3, name: 'Order Status' },
	];

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

	return (
		<PageWrapper title={data?.first_name}>
			<SubHeader>
				<SubHeaderLeft>
					<Button color='info' isLink icon='ArrowBack' onClick={() => navigate(-1)}>
						Back to List
					</Button>
					<SubheaderSeparator />
					<Avatar srcSet={src || User1Webp} src={src || User1Img} size={32} />
					<span>
						<strong>{data?.first_name}</strong>
					</span>
					<span className='text-muted'>Edit User</span>
				</SubHeaderLeft>
				{/* <SubHeaderRight>
					<Button
						color='dark'
						isLight
						icon='Add'
						onClick={() => {
							setActiveTab(TABS.ACCOUNT_DETAIL);
							formik.setValues({
								firstName: '',
								lastName: '',
								displayName: '',
								emailAddress: '',
								phoneNumber: '',
								addressLine: '',
								addressLine2: '',
								city: '',
								state: '',
								zip: '',
								emailNotification: [''],
								pushNotification: [''],
							});
						}}>
						Add New
					</Button>
				</SubHeaderRight> */}
			</SubHeader>
			<Page>
				<div className='row h-100 pb-3'>
					<div className='col-lg-4 col-md-6'>
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
									{/* <div className='col-12'>
										<Button
											icon='LocalPolice'
											color='info'
											className='w-100 p-3'
											isLight={TABS.PASSWORD !== activeTab}
											onClick={() => setActiveTab(TABS.PASSWORD)}>
											{TABS.PASSWORD}
										</Button>
									</div>
									<div className='col-12'>
										<Button
											icon='Style'
											color='info'
											className='w-100 p-3'
											isLight={TABS.MY_WALLET !== activeTab}
											onClick={() => setActiveTab(TABS.MY_WALLET)}>
											{TABS.MY_WALLET}
										</Button>
									</div> */}
								</div>
							</CardBody>
							<CardFooter>
								<CardFooterLeft className='w-100'>
									<Button
										icon='Delete'
										color='danger'
										isLight
										onClick={handleData}
										className='w-100 p-3'>
										Delete User
									</Button>
								</CardFooterLeft>
							</CardFooter>
						</Card>
					</div>
					<div className='col-lg-8 col-md-6'>
						{TABS.ACCOUNT_DETAIL === activeTab && (
							<Wizard
								isHeader
								stretch
								color='info'
								noValidate
								onSubmit={updateUserForm.handleSubmit}
								className='shadow-3d-info'>
								<WizardItem id='step1' title='Account Detail'>
									<Card>
										<CardBody>
											<div className='row g-4 align-items-center'>
												<div className='col-xl-auto'>
													<Avatar
														srcSet={src || User1Webp}
														src={src || User1Img}
													/>
												</div>
												<div className='col-xl'>
													<div className='row g-4'>
														<div className='col-auto'>
															<Input
																type='file'
																id='avatar'
																name='avatar'
																accept='image/*'
																onChange={handleImageChange}
																// invalidFeedback={
																// 	updateUserForm.errors.avatar
																// }
																// isValid={formik.isValid}
																// isTouched={
																// 	updateUserForm.touched.avatar
																// }
															/>
														</div>
														<div className='col-auto'>
															<Button
																color='dark'
																isLight
																icon='Delete'>
																Delete Avatar
															</Button>
														</div>
														<div className='col-12'>
															<p className='lead text-muted'>
																Avatar helps your teammates get to
																know you.
															</p>
														</div>
													</div>
												</div>
											</div>
										</CardBody>
									</Card>

									<Card>
										<CardHeader>
											<CardLabel icon='Edit' iconColor='warning'>
												<CardTitle>Personal Information</CardTitle>
											</CardLabel>
										</CardHeader>
										<CardBody className='pt-0'>
											<div className='row g-4'>
												<div className='col-md-6'>
													<FormGroup
														id='firstName'
														label='First Name'
														isFloating>
														<Input
															name='first_name'
															onChange={updateUserForm.handleChange}
															value={updateUserForm.values.first_name}
															// invalidFeedback={
															// 	updateUserForm.errors.first_name
															// }
															isValid={updateUserForm.isValid}
															// isTouched={
															// 	updateUserForm.touched.first_name
															// }
														/>
													</FormGroup>
												</div>
												<div className='col-md-6'>
													<FormGroup
														id='lastName'
														label='Last Name'
														isFloating>
														<Input
															name='last_name'
															type='text'
															onChange={updateUserForm.handleChange}
															value={updateUserForm.values.last_name}
															// invalidFeedback={
															// 	updateUserForm.errors.last_name
															// }
															isValid={updateUserForm.isValid}
															// isTouched={
															// 	updateUserForm.touched.last_name
															// }
														/>
													</FormGroup>
												</div>
												{/* <div className='col-12'>
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
															isTouched={formik.touched.displayName}
															invalidFeedback={
																formik.errors.displayName
															}
															validFeedback='Looks good!'
														/>
													</FormGroup>
												</div> */}
												<div className='col-12'>
													<FormGroup
														id='gender'
														label='Gender'
														className='col-lg-6'>
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
															onChange={updateUserForm.handleChange}
															value={updateUserForm.values.gender}
															// invalidFeedback={
															// 	updateUserForm.errors.gender
															// }
															isValid={updateUserForm.isValid}
															// isTouched={
															// 	updateUserForm.touched.gender
															// }
														/>
													</FormGroup>
												</div>
												<div className='col-12'>
													<FormGroup
														id='company_name'
														label='Company Name'
														className='col-lg-6'>
														<Input
															type='text'
															name='company_name'
															onChange={updateUserForm.handleChange}
															value={
																updateUserForm.values.company_name
															}
															// invalidFeedback={
															// 	updateUserForm.errors.company_name
															// }
															isValid={updateUserForm.isValid}
															// isTouched={
															// 	updateUserForm.touched.company_name
															// }
														/>
													</FormGroup>
												</div>
											</div>
										</CardBody>
									</Card>

									<Card className='mb-0'>
										<CardHeader>
											<CardLabel icon='MarkunreadMailbox' iconColor='success'>
												<CardTitle>Contact Information</CardTitle>
											</CardLabel>
										</CardHeader>
										<CardBody className='pt-0'>
											<div className='g-4'>
												<div className='col-auto mb-2'>
													<FormGroup
														id='phone_number'
														label='Phone Number'
														isFloating>
														<Input
															type='text'
															name='phone_number'
															onChange={updateUserForm.handleChange}
															value={
																updateUserForm.values.phone_number
															}
															// invalidFeedback={
															// 	updateUserForm.errors.phone_number
															// }
															isValid={updateUserForm.isValid}
															// isTouched={
															// 	updateUserForm.touched.phone_number
															// }
														/>
													</FormGroup>
												</div>
												<div className='col-12'>
													<FormGroup
														id='email'
														label='Email address'
														isFloating>
														<Input
															type='email'
															name='email'
															onChange={updateUserForm.handleChange}
															value={updateUserForm.values.email}
															// invalidFeedback={
															// 	updateUserForm.errors.email
															// }
															isValid={updateUserForm.isValid}
															// isTouched={updateUserForm.touched.email}
														/>
													</FormGroup>
												</div>
											</div>
										</CardBody>
									</Card>
								</WizardItem>
								<WizardItem id='step2' title='Address'>
									<div className='row g-4 col-lg-12'>
										{/* <div className='col-lg-12'>
											<FormGroup
												id='addressLine'
												label='Address Line'
												isFloating>
												<Input
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.addressLine}
													isValid={formik.isValid}
													isTouched={formik.touched.addressLine}
													invalidFeedback={formik.errors.addressLine}
													validFeedback='Looks good!'
												/>
											</FormGroup>
										</div>
										<div className='col-lg-12'>
											<FormGroup
												id='addressLine2'
												label='Address Line 2'
												isFloating>
												<Input
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.addressLine2}
													isValid={formik.isValid}
													isTouched={formik.touched.addressLine2}
													invalidFeedback={formik.errors.addressLine2}
													validFeedback='Looks good!'
												/>
											</FormGroup>
										</div> */}

										<div className='col-lg-12'>
											<FormGroup
												id='country'
												label='Country'
												className='col-lg-6'>
												<Select
													ariaLabel='Country'
													placeholder='Choose from list of countries'
													required
													list={countryList}
													name='country'
													onChange={updateUserForm.handleChange}
													value={updateUserForm.values.country}
													// invalidFeedback={updateUserForm.errors.country}
													isValid={updateUserForm.isValid}
													// isTouched={updateUserForm.touched.country}
												/>
											</FormGroup>
										</div>
										<div className='col-lg-12'>
											<FormGroup
												id='state'
												label='State'
												className='col-lg-6'>
												<Select
													ariaLabel='State'
													placeholder='Choose from list of State'
													required
													name='state'
													list={stateList}
													onChange={updateUserForm.handleChange}
													value={updateUserForm.values.state}
													// invalidFeedback={updateUserForm.errors.state}
													isValid={updateUserForm.isValid}
													// isTouched={updateUserForm.touched.state}
												/>
											</FormGroup>
										</div>
										{/* <div className='col-md-3'>
											<FormGroup id='zip' label='Zip' isFloating>
												<Input
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.zip}
													isValid={formik.isValid}
													isTouched={formik.touched.zip}
													invalidFeedback={formik.errors.zip}
												/>
											</FormGroup>
										</div> */}
									</div>
								</WizardItem>
								{/* <WizardItem id='step3' title='Notifications'>
									<div className='row g-4'>
										<div className='col-12'>
											<FormGroup>
												<Label htmlFor='emailNotification'>
													Email Notifications
												</Label>
												<ChecksGroup>
													{notificationTypes.map((cat) => (
														<Checks
															type='switch'
															key={cat.id}
															id={`emailNotification-${cat.id.toString()}`}
															name='emailNotification'
															label={cat.name}
															value={cat.id}
															onChange={formik.handleChange}
															checked={formik.values.emailNotification.includes(
																cat.id.toString(),
															)}
														/>
													))}
												</ChecksGroup>
											</FormGroup>
										</div>
										<div className='col-12'>
											<FormGroup>
												<Label htmlFor='pushNotification'>
													Push Notifications
												</Label>
												<ChecksGroup>
													{notificationTypes.map((cat) => (
														<Checks
															type='switch'
															key={cat.id}
															id={cat.id.toString()}
															name='pushNotification'
															label={cat.name}
															value={cat.id}
															onChange={formik.handleChange}
															checked={formik.values.pushNotification.includes(
																cat.id.toString(),
															)}
														/>
													))}
												</ChecksGroup>
											</FormGroup>
										</div>
									</div>
								</WizardItem> */}
								<WizardItem id='step3' title='Preview'>
									<div className='row g-3'>
										<div className='col-9 offset-3'>
											<h3 className='mt-4'>Account Detail</h3>
											<h4 className='mt-4'>Personal Information</h4>
										</div>
										<PreviewItem
											title='First Name'
											value={updateUserForm.values.first_name}
										/>
										<PreviewItem
											title='Last Name'
											value={updateUserForm.values.last_name}
										/>
										<PreviewItem
											title='Display Name'
											value={updateUserForm.values.first_name}
										/>
										<div className='col-9 offset-3'>
											<h4 className='mt-4'>Contact Information</h4>
										</div>
										<PreviewItem
											title='Phone Number'
											value={updateUserForm.values.phone_number}
										/>
										<PreviewItem
											title='Email Address'
											value={updateUserForm.values.email}
										/>
										<div className='col-9 offset-3'>
											<h3 className='mt-4'>Address</h3>
										</div>
										{/* <PreviewItem
											title='Address Line'
											value={updateUserForm.values.state}
										/> */}
										{/* <PreviewItem
											title='Address Line 2'
											value={updateUserForm.values.addressLine2}
										/> */}
										{/* <PreviewItem title='City' value={formik.values.city} /> */}
										<PreviewItem
											title='State'
											value={updateUserForm.values.state}
										/>
										<PreviewItem
											title='Country'
											value={updateUserForm.values.country}
										/>
										{/* <div className='col-9 offset-3'>
											<h4 className='mt-4'>Notification</h4>
										</div> */}
										{/* <PreviewItem
											title='Email Notifications'
											value={notificationTypes.map(
												(cat) =>
													formik.values.emailNotification.includes(
														cat.id.toString(),
													) && `${cat.name}, `,
											)}
										/> */}
										{/* <PreviewItem
											title='Push Notifications'
											value={notificationTypes.map(
												(cat) =>
													formik.values.pushNotification.includes(
														cat.id.toString(),
													) && `${cat.name}, `,
											)}
										/> */}
									</div>
								</WizardItem>
							</Wizard>
						)}
						{/* {TABS.PASSWORD === activeTab && (
							<Card
								stretch
								tag='form'
								noValidate
								onSubmit={formikPassword.handleSubmit}>
								<CardHeader>
									<CardLabel icon='LocalPolice' iconColor='info'>
										<CardTitle>{TABS.PASSWORD}</CardTitle>
									</CardLabel>
								</CardHeader>
								<CardBody className='pb-0' isScrollable>
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
													onChange={formikPassword.handleChange}
													value={formikPassword.values.currentPassword}
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
													onChange={formikPassword.handleChange}
													onBlur={formikPassword.handleBlur}
													value={formikPassword.values.newPassword}
													isValid={formikPassword.isValid}
													isTouched={formikPassword.touched.newPassword}
													invalidFeedback={
														formikPassword.errors.newPassword
													}
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
													onChange={formikPassword.handleChange}
													onBlur={formikPassword.handleBlur}
													value={formikPassword.values.confirmPassword}
													isValid={formikPassword.isValid}
													isTouched={
														formikPassword.touched.confirmPassword
													}
													invalidFeedback={
														formikPassword.errors.confirmPassword
													}
													validFeedback='Looks good!'
												/>
											</FormGroup>
										</div>
									</div>
								</CardBody>
								<CardFooter>
									<CardFooterLeft>
										<Button
											color='info'
											isLink
											type='reset'
											onClick={formikPassword.resetForm}>
											Reset
										</Button>
									</CardFooterLeft>
									<CardFooterRight>
										<Button
											type='submit'
											icon='Save'
											color='info'
											isOutline
											onClick={updateUserForm.handleSubmit}>
											Save
										</Button>
									</CardFooterRight>
								</CardFooter>
							</Card>
						)}
						{TABS.MY_WALLET === activeTab && <CommonMyWallet />} */}
					</div>
				</div>
			</Page>
			<ConfirmationModal
				isOpen={showConfirmation}
				setIsOpen={() => setShowConfirmation(false)}
				onConfirm={handleDeleteConfirmation}
			/>
		</PageWrapper>
	);
};

export default EditUser;
