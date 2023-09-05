import React, { useState } from 'react';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { useMeasure } from 'react-use';
import Button from '../../../../components/bootstrap/Button';
import Page from '../../../../layout/Page/Page';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTabItem,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import UserImageWebp from '../../../../assets/img/wanna/wanna1.webp';
import UserImage from '../../../../assets/img/wanna/wanna1.png';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import showNotification from '../../../../components/extras/showNotification';
import Icon from '../../../../components/icon/Icon';
import Alert from '../../../../components/bootstrap/Alert';
import { Facebook } from '../../../../components/icon/material-icons';
import Avatar from '../../../../components/Avatar';
import Progress from '../../../../components/bootstrap/Progress';
import data from '../../../../common/data/dummyProductData';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../../../../components/bootstrap/Modal';
import CommonDashboardRecentActivities from '../common/CommonDashboardRecentActivities';
import CommonDashboardUserIssue from '../common/CommonDashboardUserIssue';
import RecentTransfer from './RecentTransfer';
import { demoPagesMenu } from '../../../../menu';
import useDarkMode from '../../../../hooks/useDarkMode';
import Badge from '../../../../components/bootstrap/Badge';
import DashboardMarketingList from './DashboardMarketingList';
import SubHeader, { SubHeaderLeft } from '../../../../layout/SubHeader/SubHeader';

import Breadcrumb from '../../../../components/bootstrap/Breadcrumb';

const DashboardProductPage = () => {
	const { darkModeStatus } = useDarkMode();

	const formik = useFormik({
		initialValues: {
			formPrefix: 'Prof.',
			formName: 'Timothy',
			formMiddleName: 'John',
			formSurName: 'Doe',
			formEmailAddress: 'tjohndoe@site.com',
			formPhone: '2575637401',
			formAddressLine: '711-2880 Nulla St.',
			formAddressLine2: 'Mankato',
			formCity: 'Mississippi',
			formState: 'USA',
			formZIP: '96522',
			formCurrentPassword: '',
			formNewPassword: '',
			formConfirmNewPassword: '',
		},
		onSubmit: (values) => {
			// eslint-disable-next-line no-console
			showNotification(
				<span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>Updated Information</span>
				</span>,
				JSON.stringify(values, null, 2),
			);
		},
	});
	const [ref, { height }] = useMeasure<HTMLDivElement>();

	const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'dark'];
	const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
	const [gallerySeeAll, setGallerySeeAll] = useState(false);

	const GALLERY = (
		<div className='row g-4'>
			{data.slice(0, 8).map((item, index) => (
				<div key={item.id} className='col-xxl-3 col-lg-3 col-md-6'>
					<button
						type='button'
						onClick={() => setSelectedImage(item.image)}
						className={classNames(
							'ratio ratio-1x1',
							'rounded-2',
							'border-0',
							`bg-l${darkModeStatus ? 'o25' : '25'}-${colors[index % 7]}`,
							`bg-l${darkModeStatus ? 'o50' : '10'}-${colors[index % 7]}-hover`,
						)}>
						<img
							src={item.image}
							alt={item.name}
							width='100%'
							height='auto'
							className='object-fit-contain p-4'
						/>
					</button>
				</div>
			))}
		</div>
	);

	return (
		<PageWrapper title={demoPagesMenu.singlePages.subMenu.fluidSingle.text}>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Dashboard Products', to: '/' },
							// { title: 'Edit User', to: '/' },
						]}
					/>
				</SubHeaderLeft>
			</SubHeader>
			<Page container='fluid'>
			<div className='display-4 fw-bold py-3'>Dashboard Products</div>
				<div className='row'>
					<div className='col-xxl-4 col-xl-4 col-lg-12'>
						<Card ref={ref} className='shadow-3d-primary'>
							<CardBody>
								<div className='row g-5'>
									<div className='col-12'>
										<div className='d-flex align-items-center'>
											<div className='flex-shrink-0 me-4'>
												<Avatar
													srcSet={data[0].image}
													src={data[0].image}
													rounded={1}
												/>
											</div>
											<div className='flex-grow-2 '>
												<div className='h2 fw-bold'>Bendy Rectangle</div>
												<div className='h3 fw-bold mt-2 mb-4'>
													<Badge color='success' isLight>
														$14.50
													</Badge>
												</div>
												<div className='h5 text-muted'>
													Product Range: <strong>10</strong>
												</div>
											</div>
										</div>
									</div>
								</div>
							</CardBody>
						</Card>

						<Card>
							<CardBody>
								<div className='d-flex justify-content-between'>
									<p>Complete Your Tasks</p>
									<p className='fw-bold'>90%</p>
								</div>
								<Progress value={90} />
							</CardBody>
						</Card>
					</div>
					<div className='col-xxl-4 col-xl-4 col-lg-12'>
						<CommonDashboardRecentActivities />
					</div>
					<div className='col-xxl-4 col-xl-4 col-lg-12'>
						<CommonDashboardUserIssue />
					</div>

					<div className='col-xxl-12 col-xl-12 col-lg-12'>
						<Card>
							<CardHeader>
								<CardLabel icon='ShowChart' iconColor='secondary'>
									<CardTitle>Products's Goals</CardTitle>
								</CardLabel>
								<CardActions>
									Only in <strong>{dayjs().format('MMM')}</strong>.
								</CardActions>
							</CardHeader>
							<CardBody>
								<div className='row g-4 align-items-center'>
									<div className='col-xl-3'>
										<div
											className={classNames(
												'd-flex align-items-center rounded-2 p-3',
												{
													'bg-l10-warning': !darkModeStatus,
													'bg-lo25-warning': darkModeStatus,
												},
											)}>
											<div className='flex-shrink-0'>
												<Icon
													icon='MonetizationOn'
													size='3x'
													color='warning'
												/>
											</div>
											<div className='flex-grow-1 ms-3'>
												<div className='fw-bold fs-3 mb-0'>183K</div>
												<div className='text-muted mt-n2'>
													Sales - 12-Dec-2023
												</div>
											</div>
										</div>
									</div>
									<div className='col-xl-3'>
										<div
											className={classNames(
												'd-flex align-items-center rounded-2 p-3',
												{
													'bg-l10-info': !darkModeStatus,
													'bg-lo25-info': darkModeStatus,
												},
											)}>
											<div className='flex-shrink-0'>
												<Icon icon='Person' size='3x' color='info' />
											</div>
											<div className='flex-grow-1 ms-3'>
												<div className='fw-bold fs-3 mb-0'>1247</div>
												<div className='text-muted mt-n2'>
													Customers - 12-Dec-2023
												</div>
											</div>
										</div>
									</div>
									<div className='col-xl-3'>
										<div
											className={classNames(
												'd-flex align-items-center rounded-2 p-3',
												{
													'bg-l10-primary': !darkModeStatus,
													'bg-lo25-primary': darkModeStatus,
												},
											)}>
											<div className='flex-shrink-0'>
												<Icon icon='Inventory2' size='3x' color='primary' />
											</div>
											<div className='flex-grow-1 ms-3'>
												<div className='fw-bold fs-3 mb-0'>500+</div>
												<div className='text-muted mt-n2'>
													Products - 12-Dec-2023
												</div>
											</div>
										</div>
									</div>
									<div className='col-xl-3'>
										<div
											className={classNames(
												'd-flex align-items-center rounded-2 p-3',
												{
													'bg-l10-success': !darkModeStatus,
													'bg-lo25-success': darkModeStatus,
												},
											)}>
											<div className='flex-shrink-0'>
												<Icon icon='Money' size='3x' color='success' />
											</div>
											<div className='flex-grow-1 ms-3'>
												<div className='fw-bold fs-3 mb-0'>112,458</div>
												<div className='text-muted mt-n2'>
													Profits - 12-Dec-2023
												</div>
											</div>
										</div>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>

					<div className='col-xxl-12 col-xl-12 col-lg-12'>
						<DashboardMarketingList />
					</div>

					<div className='col-xxl-4 col-xl-4 col-lg-12'>
						<Card>
							<CardHeader>
								<CardLabel>
									<CardTitle>Product Description</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
									vitae velit efficitur nulla dignissim commodo nec vitae odio.
									Proin ut risus metus. Aenean dui lectus, laoreet at ornare et,
									pellentesque id mauris. Morbi a molestie elit. Nunc eget mi in
									lectus rutrum venenatis. Duis dapibus porta justo, nec dapibus
									tellus condimentum ultrices. In hac habitasse platea dictumst.
									Nulla facilisi. Aenean consequat gravida felis vitae vestibulum.
									Suspendisse lacinia ex sed tellus imperdiet, ut lacinia odio
									rutrum.
								</p>
								<p>
									Pellentesque vel sem bibendum, tristique urna a, lacinia tortor.
									Suspendisse dapibus lectus id venenatis tincidunt. Proin tempor
									lorem non arcu rutrum interdum. Cras sit amet ultricies lacus,
									vitae luctus nunc. Sed commodo hendrerit augue, et aliquet sem
									commodo in. Pellentesque in diam eros. Sed quis sapien eros. Sed
									eleifend at arcu vitae sagittis.
								</p>
								<p>
									Morbi at fringilla lorem. Nulla eu odio a ante vulputate
									finibus. Duis congue finibus nibh fermentum egestas. Maecenas
									risus neque, dapibus vitae porttitor vel, efficitur ac dolor.
									Sed nec ante ac orci dictum laoreet vitae eget odio. Proin at
									consequat ipsum.
								</p>
							</CardBody>
						</Card>
					</div>

					<div className='col-xxl-8 col-xl-8 col-lg-12'>
						<Card hasTab>
							<CardTabItem id='profile' title='Profile' icon='Contacts'>
								<Alert isLight className='border-0' shadow='md' icon='LocalPolice'>
									The information is not shared with third parties.
								</Alert>

								<Card
									className='rounded-2'
									tag='form'
									onSubmit={formik.handleSubmit}>
									<CardHeader>
										<CardLabel icon='Person'>
											<CardTitle>Customer Profile</CardTitle>
										</CardLabel>
									</CardHeader>
									<CardBody>
										<div className='row g-4'>
											<FormGroup
												className='col-md-2'
												id='formPrefix'
												label='Prefix'>
												<Input
													placeholder='Dr.'
													autoComplete='honorific-prefix'
													onChange={formik.handleChange}
													value={formik.values.formPrefix}
												/>
											</FormGroup>
											<FormGroup
												className='col-md-3'
												id='formName'
												label='Name'>
												<Input
													placeholder='Timothy'
													autoComplete='given-name'
													onChange={formik.handleChange}
													value={formik.values.formName}
												/>
											</FormGroup>
											<FormGroup
												className='col-md-3'
												id='formMiddleName'
												label='Middle Name'>
												<Input
													placeholder='John'
													autoComplete='additional-name'
													onChange={formik.handleChange}
													value={formik.values.formMiddleName}
												/>
											</FormGroup>
											<FormGroup
												className='col-md-4'
												id='formSurName'
												label='Sur Name'>
												<Input
													placeholder='Doe'
													autoComplete='family-name'
													onChange={formik.handleChange}
													value={formik.values.formSurName}
												/>
											</FormGroup>
											<FormGroup
												className='col-lg-6'
												id='formEmailAddress'
												label='Email Address'>
												<Input
													type='email'
													placeholder='john@domain.com'
													autoComplete='email'
													onChange={formik.handleChange}
													value={formik.values.formEmailAddress}
												/>
											</FormGroup>
											<FormGroup
												className='col-lg-6'
												id='formPhone'
												label='Phone'>
												<Input
													type='tel'
													placeholder='+1 (999) 999-9999'
													autoComplete='tel'
													mask='+1 (999) 999-9999'
													onChange={formik.handleChange}
													value={formik.values.formPhone}
												/>
											</FormGroup>
										</div>
									</CardBody>
									<CardFooter>
										<CardFooterRight>
											<Button type='submit' color='primary' icon='Save'>
												Save
											</Button>
										</CardFooterRight>
									</CardFooter>
								</Card>
							</CardTabItem>
							<CardTabItem id='address' title='Address' icon='HolidayVillage'>
								<Card
									className='rounded-2'
									tag='form'
									onSubmit={formik.handleSubmit}>
									<CardHeader>
										<CardLabel icon='HolidayVillage'>
											<CardTitle>Address Information</CardTitle>
										</CardLabel>
									</CardHeader>
									<CardBody>
										<div className='row g-4'>
											<FormGroup
												className='col-12'
												id='formAddressLine'
												label='Address Line'>
												<Input
													placeholder='Address Line'
													autoComplete='address-line1'
													onChange={formik.handleChange}
													value={formik.values.formAddressLine}
												/>
											</FormGroup>
											<FormGroup
												className='col-12'
												id='formAddressLine2'
												label='Address Line 2'>
												<Input
													placeholder='Address Line 2'
													autoComplete='address-line2'
													onChange={formik.handleChange}
													value={formik.values.formAddressLine2}
												/>
											</FormGroup>
											<FormGroup
												className='col-md-6'
												id='formCity'
												label='City'>
												<Input
													placeholder='City'
													autoComplete='address-level2'
													onChange={formik.handleChange}
													value={formik.values.formCity}
												/>
											</FormGroup>
											<FormGroup
												className='col-md-4'
												id='formState'
												label='State'>
												<Input
													placeholder='State'
													autoComplete='country-name'
													onChange={formik.handleChange}
													value={formik.values.formState}
												/>
											</FormGroup>
											<FormGroup
												className='col-md-2'
												id='formZIP'
												label='ZIP Code'>
												<Input
													placeholder='ZIP'
													autoComplete='postal-code'
													onChange={formik.handleChange}
													value={formik.values.formZIP}
												/>
											</FormGroup>
										</div>
									</CardBody>
									<CardFooter>
										<CardFooterRight>
											<Button type='submit' color='info' icon='Save'>
												Save
											</Button>
										</CardFooterRight>
									</CardFooter>
								</Card>
							</CardTabItem>
							<CardTabItem id='profile2' title='Password' icon='Lock'>
								<Card
									className='rounded-2'
									tag='form'
									onSubmit={formik.handleSubmit}>
									<CardHeader>
										<CardLabel icon='Lock'>
											<CardTitle>Change Password</CardTitle>
										</CardLabel>
									</CardHeader>
									<CardBody>
										<div className='row g-4'>
											<FormGroup
												className='col-lg-4'
												id='formCurrentPassword'
												label='Current Password'>
												<Input
													type='password'
													placeholder='Current Password'
													autoComplete='current-password'
													onChange={formik.handleChange}
													value={formik.values.formCurrentPassword}
												/>
											</FormGroup>
											<div className='w-100 m-0' />
											<FormGroup
												className='col-lg-4'
												id='formNewPassword'
												label='New Password'>
												<Input
													type='password'
													placeholder='New Password'
													autoComplete='new-password'
													onChange={formik.handleChange}
													value={formik.values.formNewPassword}
												/>
											</FormGroup>
											<div className='w-100 m-0' />
											<FormGroup
												className='col-lg-4'
												id='formConfirmNewPassword'
												label='Confirm New Password'>
												<Input
													type='password'
													placeholder='Confirm New Password'
													autoComplete='new-password'
													onChange={formik.handleChange}
													value={formik.values.formConfirmNewPassword}
												/>
											</FormGroup>
										</div>
									</CardBody>
									<CardFooter>
										<CardFooterRight>
											<Button type='submit' color='info' icon='Save'>
												Change Password
											</Button>
										</CardFooterRight>
									</CardFooter>
								</Card>
							</CardTabItem>
						</Card>
					</div>

					<div className='col-xxl-6 col-xl-6 col-lg-12'>
						<Card>
							<CardHeader>
								<CardLabel icon='PhotoSizeSelectActual' iconColor='info'>
									<CardTitle>Complementary Products</CardTitle>
								</CardLabel>
								<CardActions>
									<Button
										color='info'
										isLight
										onClick={() => setGallerySeeAll(true)}>
										See All
									</Button>
								</CardActions>
							</CardHeader>
							<CardBody>{GALLERY}</CardBody>
						</Card>
					</div>

					<div className='col-xxl-6 col-xl-6 col-lg-12'>
						<RecentTransfer />
					</div>
				</div>

				<Modal setIsOpen={setSelectedImage} isOpen={!!selectedImage}>
					<ModalHeader setIsOpen={setSelectedImage}>
						<ModalTitle id='preview'>Preview</ModalTitle>
					</ModalHeader>
					<ModalBody className='w-auto d-flex justify-content-center'>
						<img src={selectedImage} alt='eneme' className='w-75' />
					</ModalBody>
				</Modal>

				<Modal
					setIsOpen={setGallerySeeAll}
					isOpen={gallerySeeAll}
					fullScreen
					titleId='gallery-full'>
					<ModalHeader setIsOpen={setGallerySeeAll}>
						<ModalTitle id='gallery-full'>Gallery</ModalTitle>
					</ModalHeader>
					<ModalBody>{GALLERY}</ModalBody>
				</Modal>
			</Page>
		</PageWrapper>
	);
};

export default DashboardProductPage;
