import React, { useState } from 'react';
import { adminDashboardPagesMenu, demoPagesMenu } from '../../../menu';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Icon from '../../../components/icon/Icon';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Carousel from '../../../components/bootstrap/Carousel';
import CarouselSlide from '../../../components/bootstrap/CarouselSlide';
import Button from '../../../components/bootstrap/Button';
import useDarkMode from '../../../hooks/useDarkMode';
import { useNavigate } from 'react-router-dom';
import useMeasure from 'react-use/lib/useMeasure';
import dayjs from 'dayjs';
import classNames from 'classnames';
import showNotification from '../../../components/extras/showNotification';
import Pic from '../../../assets/img/wanna/richie/richie.png';
import Pic2 from '../../../assets/img/wanna/richie/richie2.png';
import Pic3 from '../../../assets/img/wanna/richie/richie3.png';
import Pic4 from '../../../assets/img/wanna/richie/richie4.png';
import Pic5 from '../../../assets/img/wanna/richie/richie5.png';
import Pic6 from '../../../assets/img/wanna/richie/richie6.png';
import Pic7 from '../../../assets/img/wanna/richie/richie7.png';
import Pic8 from '../../../assets/img/wanna/richie/richie8.png';
import WannaImg1 from '../../../assets/img/wanna/slide/scene-1.png';
import WannaImg2 from '../../../assets/img/wanna/slide/scene-2.png';
import WannaImg6 from '../../../assets/img/wanna/slide/scene-6.png';
import { useFormik } from 'formik';
import { dataPagination, PER_COUNT } from '../../../components/PaginationButtons';
import Badge from '../../../components/bootstrap/Badge';
import subsdata from '../../../common/data/dummySubscriptionData';

const Subscriptions = () => {
	const { darkModeStatus } = useDarkMode();
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['10']);
	const navigate = useNavigate();
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

	const images: { id: string; img: string }[] = [
		{ id: 'Pic', img: Pic },
		{ id: 'Pic2', img: Pic2 },
		{ id: 'Pic3', img: Pic3 },
		{ id: 'Pic4', img: Pic4 },
		{ id: 'Pic5', img: Pic5 },
		{ id: 'Pic6', img: Pic6 },
		{ id: 'Pic7', img: Pic7 },
		{ id: 'Pic8', img: Pic8 },
	];

	const GALLERY = (
		<div className='row g-4'>
			{images.map((item, index) => (
				<div key={item.id} className='col-xxl-2 col-lg-3 col-md-6'>
					<button
						type='button'
						onClick={() => setSelectedImage(item.img)}
						className={classNames(
							'ratio ratio-1x1',
							'rounded-2',
							'border-0',
							`bg-l${darkModeStatus ? 'o25' : '25'}-${colors[index % 7]}`,
							`bg-l${darkModeStatus ? 'o50' : '10'}-${colors[index % 7]}-hover`,
						)}>
						<img
							src={item.img}
							alt={item.id}
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
		<PageWrapper title={adminDashboardPagesMenu.subscription.text}>
			<Page container='fluid'>
				<div className='row'>
				<div id='first' className='row scroll-margin'>
						<div className='col-12 mb-3'>
							<div className='display-6 fw-bold py-3'>
								Subscription Plan
							</div>
						</div>
						<div className='col-md-3'>
							<Card stretch className='bg-transparent'>
								<CardBody>
									<div className='h-100 d-flex align-items-center justify-content-center'>
										<div className='row text-center'>
											<div className='col-12 text-uppercase fw-light'>
												Per Month
											</div>
											<div className='col-12 text-uppercase h2 fw-bold mb-2'>
												Select Your Perfect Plan
											</div>
											<div className='col-12 mb-2'>
												Vivamus ut magna pharetra, ultricies nunc eu,
												dignissim lorem. Proin et est nec ante ultricies
												dignissim sit amet eget libero.
											</div>
											<Icon icon='Verified' size='5x' color='info' />
										</div>
									</div>
								</CardBody>
							</Card>
						</div>
						<div className='col-md-3'>
							<Card>
								<CardBody>
									<div className='row pt-5 g-4 text-center'>
										<div className='col-12'>
											<Icon
												icon='CustomRocketLaunch'
												size='7x'
												color='info'
											/>
										</div>
										<div className='col-12'>
											<h2>Startup Company</h2>
										</div>
										<div className='col-12'>
											<h3 className='display-1 fw-bold'>
												<span className='display-4 fw-bold'>$</span>219
												<span className='display-6'>/mo</span>
											</h3>
										</div>
										<div className='col-12'>
											<div className='lead'>
												<Icon icon='Done Outline' color='success' />{' '}
												Exclusive Workspace
											</div>
											<div className='lead'>
												<Icon icon='Done Outline' color='success' />{' '}
												Internet Connection
											</div>
											<div className='lead text-muted'>
												<Icon icon='Close' color='danger' /> Meeting Room
											</div>
											<div className='lead text-muted'>
												<Icon icon='Close' color='danger' /> Small Rest Room
											</div>
										</div>
										<div className='col-12'>
											<p>Lorem ipsum dolor sit amet.</p>
										</div>
										<div className='col-12'>
											<Button
												color='info'
												isLight
												className='w-100 py-3 text-uppercase'
												size='lg'>
												Select Plan
											</Button>
										</div>
									</div>
								</CardBody>
							</Card>
						</div>
						<div className='col-md-3'>
							<Card>
								<CardBody>
									<div className='row pt-5 g-4 text-center'>
										<div className='col-12'>
											<Icon icon='Maps Home Work' size='7x' color='success' />
										</div>
										<div className='col-12'>
											<h2>Mid-Size Company</h2>
										</div>
										<div className='col-12'>
											<h3 className='display-1 fw-bold'>
												<span className='display-4 fw-bold'>$</span>339
												<span className='display-6'>/mo</span>
											</h3>
										</div>
										<div className='col-12'>
											<div className='lead'>
												<Icon icon='Done Outline' color='success' />{' '}
												Exclusive Workspace
											</div>
											<div className='lead'>
												<Icon icon='Done Outline' color='success' />{' '}
												Internet Connection
											</div>
											<div className='lead'>
												<Icon icon='Done Outline' color='success' /> Five
												Meeting Room
											</div>
											<div className='lead'>
												<Icon icon='Done Outline' color='success' /> Small
												Rest Room
											</div>
										</div>
										<div className='col-12'>
											<p>Lorem ipsum dolor sit amet.</p>
										</div>
										<div className='col-12'>
											<Button
												color='success'
												className='w-100 py-3 text-uppercase'
												size='lg'>
												Select Plan
											</Button>
										</div>
									</div>
								</CardBody>
							</Card>
						</div>
						<div className='col-md-3'>
							<Card>
								<CardBody>
									<div className='row pt-5 g-4 text-center'>
										<div className='col-12'>
											<Icon icon='CustomFactory' size='7x' color='info' />
										</div>
										<div className='col-12'>
											<h2>Large Company</h2>
										</div>
										<div className='col-12'>
											<h3 className='display-1 fw-bold'>
												<span className='display-4 fw-bold'>$</span>339
												<span className='display-6'>/day</span>
											</h3>
										</div>
										<div className='col-12'>
											<div className='lead'>
												<Icon icon='Done Outline' color='success' />{' '}
												Exclusive Workspace
											</div>
											<div className='lead'>
												<Icon icon='Done Outline' color='success' />{' '}
												Internet Connection
											</div>
											<div className='lead'>
												<Icon icon='Done Outline' color='success' /> Five
												Meeting Room
											</div>
											<div className='lead'>
												<Icon icon='Done Outline' color='success' /> Large
												Rest Room
											</div>
										</div>
										<div className='col-12'>
											<p>Lorem ipsum dolor sit amet.</p>
										</div>
										<div className='col-12'>
											<Button
												color='info'
												isLight
												className='w-100 py-3 text-uppercase'
												size='lg'>
												Select Plan
											</Button>
										</div>
									</div>
								</CardBody>
							</Card>
						</div>
					</div>
					<div>
						<Card>
							<CardHeader>
								<CardLabel icon='Subscriptions' iconColor='info'>
									<CardTitle>Subscription Tracking</CardTitle>
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
							<CardBody className='table-responsive'>
								<table className='table table-modern table-hover'>
									<thead>
										<tr>
											<th scope='col' className='cursor-pointer'>
												#
											</th>
											<th scope='col'>Name</th>
											<th scope='col'>Subscription</th>
											<th scope='col' className='cursor-pointer'>
												dueDate
											</th>
											<th scope='col'>category</th>
											<th scope='col' className='cursor-pointer'>
												expectedTime
											</th>
											<th scope='col' className='cursor-pointer'>
												status
											</th>
											<th scope='col' className='cursor-pointer'>
												Action
											</th>
										</tr>
									</thead>
									<tbody>
										{dataPagination(subsdata, currentPage, perPage).map((i) => (
											<tr>
												<th scope='row'>{i.id}</th>
												<td>John</td>
												<td>{i.name}</td>
												<td>{i.expiresIn}</td>
												<td>{i.category}</td>
												<td>{i.type}</td>
												<td>
													<Badge
														color={
															(i.status === 'Inactive' && 'danger') ||
															(i.status === 'Active' && 'success') ||
															'info'
														}>
														<p className='h6 mb-0'>{i.status}</p>
													</Badge>
												</td>

												<td>
													<Button
														color='info'
														icon='Visibility'
														className='me-2'
														isLight
														isDisable
													/>
													<Button
														icon='Delete'
														className='me-1'
														color='danger'
														isLight
														isDisable
													/>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</CardBody>
						</Card>
					</div>
					<div className='col-xxl-4 col-xl-6'>
						<Card>
							<CardHeader>
								<CardLabel icon='ShowChart' iconColor='secondary'>
									<CardTitle>Statics</CardTitle>
								</CardLabel>
								<CardActions>
									Only in <strong>{dayjs().format('MMM')}</strong>.
								</CardActions>
							</CardHeader>
							<CardBody>
								<div className='row g-4 align-items-center'>
									<div className='col-xl-6'>
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
												<div className='text-muted mt-n2'>Sales</div>
											</div>
										</div>
									</div>
									<div className='col-xl-6'>
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
												<div className='text-muted mt-n2'>Customers</div>
											</div>
										</div>
									</div>
									<div className='col-xl-6'>
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
												<div className='text-muted mt-n2'>Products</div>
											</div>
										</div>
									</div>
									<div className='col-xl-6'>
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
												<div className='text-muted mt-n2'>Profits</div>
											</div>
										</div>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
					<div className='col-xxl-8 col-xl-6'>
						<Card
							className={classNames('shadow-3d-info', 'mb-5', {
								'bg-lo10-info': darkModeStatus,
								'bg-l25-info': !darkModeStatus,
							})}>
							<Carousel
								isHoverPause
								isRide
								height={height || 305}
								isDark={darkModeStatus}>
								<CarouselSlide>
									<div className='row align-items-center h-100'>
										<div
											className='col-6 carousel-slide-bg'
											style={{ backgroundImage: `url(${WannaImg1})` }}
										/>
										<div className='col-6'>
											<h2>Our Products</h2>
											<p className='lead'>Basic Plan Pricing: $9.99/month </p>
											<p>Duration: Monthly</p>
											<p>
												Billing Cycle: Automatic renewal Features and
												Benefits: Access to the freelancer marketplace
												Profile listing with limited visibility Ability to
												submit proposals for projects Standard customer
												support
											</p>
											<Button
												color={darkModeStatus ? 'light' : 'dark'}
												onClick={() =>
													navigate(
														`../${demoPagesMenu.sales.subMenu.productsGrid.path}`,
													)
												}>
												Click
											</Button>
										</div>
									</div>
								</CarouselSlide>
								<CarouselSlide>
									<div className='row align-items-center h-100'>
										<div className='col-6 p-5'>
											<h2>Our Products</h2>
											<p className='lead'>Pro Plan Pricing: $19.99/month</p>
											<p>Duration: Monthly</p>
											<p>
												Billing Cycle: Automatic renewal Features and
												Benefits: Enhanced profile visibility Featured
												listings in the freelancer marketplace Access to
												advanced project filtering options Priority customer
												support Monthly performance reports
											</p>
											<Button color={darkModeStatus ? 'light' : 'dark'}>
												Click
											</Button>
										</div>
										<div
											className='col-6 carousel-slide-bg'
											style={{ backgroundImage: `url(${WannaImg2})` }}
										/>
									</div>
								</CarouselSlide>
								<CarouselSlide background={WannaImg6} />
							</Carousel>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default Subscriptions;
