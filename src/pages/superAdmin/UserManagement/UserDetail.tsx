import React, { FC, useState } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { demoPagesMenu } from '../../../menu';
import useDarkMode from '../../../hooks/useDarkMode';
import Button from '../../../components/bootstrap/Button';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getUserDataWithId } from '../../../common/data/userDummyData';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Badge from '../../../components/bootstrap/Badge';
import Avatar from '../../../components/Avatar';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import { useFormik } from 'formik';
import data from '../../../common/data/dummyTaskHoldData';
import subsdata from '../../../common/data/dummySubscriptionData';

const UserDetail: FC = () => {
	const { themeStatus, darkModeStatus } = useDarkMode();
	const { id } = useParams();
	const navigate = useNavigate();
	console.log(id);
	const [userData, setUserData] = useState(getUserDataWithId(id));
	const [taskData, setTaskData] = useState(data);
	console.log(userData);
	const formik = useFormik({
		initialValues: {
			firstName: userData.name,
			lastName: userData.surname,
			phone: '',
			emailAddress: userData.email,
		},
		onSubmit: () => {},
	});
	console.log(data);
	const onBack = () => {
		navigate(-1);
	};
	return (
		<PageWrapper title={demoPagesMenu.crm.subMenu.dashboard.text}>
			<SubHeader>
				<SubHeaderLeft>
					<Button color='info' isLight icon='ChevronLeft' onClick={() => navigate(-1)}>
						Back to List
					</Button>
				</SubHeaderLeft>
			</SubHeader>
			<Page>
				<div className='row h-100 align-content-start'>
					<div className='col-md-7'>
						<Card>
							<CardBody>
								<div className='col-12'>
									<div className='row g-4 align-items-center'>
										<div className='col-lg-auto'>
											<Avatar
												src={userData.src}
												srcSet={userData.srcSet}
												color='info'
											/>
										</div>
										<div className='col-lg'>
											<div className='row g-4'>
												<div className='col-12'>
													<p className='lead text-muted'>
														<CardTitle tag='div' className='h5'>
															{`${userData.name} ${userData.surname}`}
														</CardTitle>
														<CardSubTitle tag='div' className='h6'>
															{userData.email}
														</CardSubTitle>
													</p>
												</div>
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
								<CardLabel icon='Design Services' iconColor='secondary'>
									<CardTitle tag='div' className='h5'>
										Services
									</CardTitle>
								</CardLabel>
							</CardHeader>
							{/* <CardBody>
								<div className='row g-4'>
									<div className='col-md-auto'>
										{' '}
										{userData.services &&
											Object.values(userData.services).map((service) => (
												<Badge color={userData.color} className='me-2'>
													{service.name}
												</Badge>
											))}
									</div>
								</div>
							</CardBody> */}
						</Card>
					</div>
					<div className='col-md-5 position-relative'>
						<Card stretch>
							<CardHeader>
								<CardLabel icon='Task'>
									<CardTitle tag='div' className='h5'>
										Task
									</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody isScrollable>
								<div className='row'>
									<div className='col-12'>
										<table className='table'>
											<thead>
												<tr>
													<th scope='col' className='me-5'>
														Id
													</th>
													<th scope='col' className='me-5'>
														Name
													</th>
													<th scope='col' className='me-5'>
														Status
													</th>
												</tr>
											</thead>
											<tbody>
												{taskData.map((task) => (
													<tr>
														<th scope='row'>{task.id}</th>
														<td>
															<div>
																{task.name}
																<div className='text-muted'>
																	<small>{task.category}</small>
																</div>
															</div>
														</td>

														<td>
															<Badge
																color={
																	(task.status === 'Rejected' &&
																		'danger') ||
																	(task.status === 'Cancelled' &&
																		'warning') ||
																	(task.status === 'Approved' &&
																		'success') ||
																	'info'
																}>
																{task.status}
															</Badge>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
				</div>
				<div className='row'>
					<div className='col-12'>
						<Card>
							<CardHeader>
								<CardLabel icon='Subscriptions' iconColor='secondary'>
									<CardTitle tag='div' className='h5'>
										Subscriptions
									</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='row'>
									<div className='col-12'>
										<table className='table'>
											<thead>
												<tr>
													<th scope='col' className='me-5'>
														Id
													</th>
													<th scope='col' className='me-5'>
														Name
													</th>
													<th scope='col' className='me-5'>
														Expires In
													</th>
													<th scope='col' className='me-5'>
														Status
													</th>
												</tr>
											</thead>
											<tbody>
												{subsdata.map((subs) => (
													<tr>
														<th scope='row'>{subs.id}</th>
														<td>
															<div>
																{subs.name}
																<div className='text-muted'>
																	<small>{subs.category}</small>
																</div>
															</div>
														</td>
														<td scope='row'>{subs.expiresIn}</td>
														<td>
															<Badge
																color={
																	(subs.status === 'Inactive' &&
																		'danger') ||
																	(subs.status === 'Active' &&
																		'success') ||
																	'info'
																}>
																{subs.status}
															</Badge>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default UserDetail;
