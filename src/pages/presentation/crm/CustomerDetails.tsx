import React, { FC, useState } from 'react';
import classNames from 'classnames';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubheaderSeparator } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { dashboardPagesMenu, demoPagesMenu } from '../../../menu';
// import data from '../../../common/data/dummyCustomerData';
import tableData from '../../../common/data/dummyProductData';
import Button from '../../../components/bootstrap/Button';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Icon from '../../../components/icon/Icon';
import latestSalesData from '../../../common/data/dummySalesData';
import useSortableData from '../../../hooks/useSortableData';
import { PER_COUNT } from '../../../components/PaginationButtons';
import useDarkMode from '../../../hooks/useDarkMode';
import showNotification from '../../../components/extras/showNotification';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Select from '../../../components/bootstrap/forms/Select';
import Label from '../../../components/bootstrap/forms/Label';
import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
import PAYMENTS from '../../../common/data/enumPaymentMethod';
import CUSTOMER, { getCusDataWithId } from '../../../common/data/customerDummyData';
import UserImage from '../../../assets/img/wanna/wanna1.png';
import BusinessLogo from '../../../assets/logos/business.png';
// import FacebookImg from '../../../assets/logos/facebook.png';
import InstagramImg from '../../../assets/logos/instagram.png';
import LinkedinImg from '../../../assets/logos/linkedin.png';
import CommonGridProductItem from '../../_common/CommonGridProductItem';
import { success } from '../../../stories/components/bootstrap/Alert/AlertUseColor.stories';
import OffCanvas, {
	OffCanvasBody,
	OffCanvasHeader,
	OffCanvasTitle,
} from '../../../components/bootstrap/OffCanvas';
import PlaceholderImage from '../../../components/extras/PlaceholderImage';

import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import Badge from '../../../components/bootstrap/Badge';
// import User from '../../../layout/User/User';
// import PinterestImg from '../../../assets/logos/pinterest.png';
// import TicktokImg from '../../../assets/logos/tiktok.png';
// import TwitterImg from '../../../assets/logos/twitter.png';
// import WhatsappImg from '../../../assets/logos/whatsapp.png';
// import TelegramImg from '../../../assets/logos/telegram.png';

interface IPreviewItemProps {
	title: string;
	value: string;
}
interface IValues {
	name: string;
	price: number;
	stock: number;
	category: string;
	image?: string | null;
}
const PreviewItem: FC<IPreviewItemProps> = ({ title, value }) => {
	return (
		<>
			<div className='col-3 text-end'>{title}</div>
			<div className='col-9 fw-bold'>{value || '-'}</div>
		</>
	);
};
const Customer = () => {
	const { themeStatus, darkModeStatus } = useDarkMode();
	const [data, setData] = useState(tableData);
	const [editItem, setEditItem] = useState<IValues | null>(null);
	const [editPanel, setEditPanel] = useState<boolean>(false);
	const [productView, setproductView] = useState<boolean>(false);

	const { id } = useParams();
	const item = getCusDataWithId(id);
	// const itemData = CUSTOMER.filter((item) => item.id.toString() === id?.toString());
	// const item = itemData[0];
	// console.log((item));

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['3']);

	const { items, requestSort, getClassNamesFor } = useSortableData(latestSalesData);

	const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
	const handleClickEdit = () => {
		setEditModalStatus(true);
	};

	const [newTransferModal, setNewTransferModal] = useState<boolean>(false);

	// const bankTypes: { id: number; name: string }[] = [
	// 	{ id: 1, name: 'Fast Bank' },
	// 	{ id: 2, name: 'Bank of World' },
	// 	{ id: 3, name: 'OS Bank' },
	// ];

	const formik = useFormik({
		initialValues: {
			name: '',
			price: 0,
			stock: 0,
			category: '',
			firstName: 'John',
			lastName: 'Doe',
			emailAddress: 'johndoe@site.com',
			phoneNumber: '',
			addressLine: '',
			addressLine2: '',
			city: '',
			state: '',
			zip: '',
			selectedBank: '',
			youSend: '',
			iban: '',
			available: false,
			searchInput: '',
			payment: Object.keys(PAYMENTS).map((i) => PAYMENTS[i].name),
			minPrice: '',
			maxPrice: '',
			services: [],
			color: 'primary',
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
			setEditPanel(false);
			setNewTransferModal(false);
			showNotification(
				<span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>Transaction queued</span>
				</span>,
				'The operation is queued, when it is successful, a notification will come again.',
			);
		},
	});

	const searchUsers = Object.keys(CUSTOMER)
		.filter(
			(key) =>
				CUSTOMER[key].name
					.toLowerCase()
					.includes(formik.values.searchInput.toLowerCase()) ||
				CUSTOMER[key].name
					.toLowerCase()
					.includes(formik.values.searchInput.toLowerCase()) ||
				CUSTOMER[key].name
					.toLowerCase()
					.includes(formik.values.searchInput.toLowerCase()) ||
				CUSTOMER[key].location
					.toLowerCase()
					.includes(formik.values.searchInput.toLowerCase()),
		)
		.filter((key2) => (formik.values.available ? CUSTOMER[key2].isOnline : key2))
		.map((i) => CUSTOMER[i]);

	function handleRemove(uid: number) {
		const newData = data.filter((it) => it.id !== uid);
		setData(newData);
	}

	const setProductView = (status: boolean) => {
		setproductView(status);
	};

	function handleEdit(uid: number) {
		const newData = data.filter((it) => it.id === uid);
		setEditItem(newData[0]);
	}
	const [showAllItem, setShowAllItem] = useState(false);

	const toggleItem = () => {
		setShowAllItem(!showAllItem);
	};
	return (
		<PageWrapper title={demoPagesMenu.projectManagement.subMenu.item.text}>
			<SubHeader>
				<SubHeaderLeft>
					<Button
						color='primary'
						isLink
						icon='ArrowBack'
						tag='a'
						to={`../${dashboardPagesMenu.Customers.path}`}>
						Back to List
					</Button>
					<SubheaderSeparator />
					<span className='text-muted fst-italic me-2'>Last update:</span>
					<span className='fw-bold'>13 hours ago</span>
				</SubHeaderLeft>
				{/* <SubHeaderRight>
					<Button icon='Edit' color='primary' isLight onClick={handleClickEdit}>
						Edit
					</Button>
				</SubHeaderRight> */}
			</SubHeader>
			<Page container='fluid'>
				<div className='display-4 fw-bold py-3'>Customer Profile</div>
				<div className='row mt-4'>
					<div className='col-lg-4'>
						<div className='row mb-4'>
							<div className='col-xl-12 col-md-12'>
								<CardTitle tag='div' className='h4'>
									Customer
								</CardTitle>
							</div>
						</div>
						<Card className='shadow-3d-primary'>
							<CardBody>
								<div className='row g-3'>
									<div className='col d-flex'>
										<div className='flex-shrink-0'>
											<div className='position-relative'>
												<div
													className='ratio ratio-1x1'
													style={{ width: 100 }}>
													<div
														className={classNames(
															`bg-l25-${success}`,
															'rounded-2',
															'd-flex align-items-center justify-content-center',
															'overflow-hidden',
															'shadow',
														)}>
														<img
															src={UserImage}
															alt={item.name}
															width={100}
														/>
													</div>
												</div>
											</div>
										</div>
										<div className='flex-grow-1 ms-3 d-flex justify-content-between'>
											<div className='w-100'>
												<div className='row'>
													<div className='col'>
														<div className='d-flex align-items-center'>
															<div className='fw-bold fs-5 me-2'>
																{item.name}
															</div>
															<small className='border border-success border-2 text-success fw-bold px-2 py-1 rounded-1'>
																{item.location}
															</small>
														</div>
														<div className='text-muted mt-3'>
															{item.email}
														</div>
														<div className='d-flex align-items-center justify-content-between'>
															<div className='mt-3 mt-lg-4'>
																<Badge
																	isLight
																	color={item.color}
																	className='px-3 py-2'>
																	{item.services}
																</Badge>
															</div>

															<div className='mt-3 mt-lg-4'>
																Connection: <b>{item.connection}</b>
															</div>
														</div>
													</div>
													<div className='col-auto'>
														<Button
															icon='Edit'
															color='dark'
															isLight
															hoverShadow='sm'
															tag='a'
															to={`../${demoPagesMenu.crm.subMenu.customerProfile.path}`}
															aria-label='More info'
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
					{/* <div className='col-lg-8'>
						<div className='row mb-4'>
							<div className='col-xl-12 col-md-12'>
								<CardTitle tag='div' className='h4'>
									Media
								</CardTitle>
							</div>
						</div>
						<div className='row g-3'>
							<div className='col'>
								<Card className='shadow-3d-primary'>
									<CardBody>
										<div className='d-flex align-items-center'>
											<div className='flex-shrink-0'>
												<div className='position-relative'>
													<div
														className='ratio ratio-1x1'
														style={{ width: 100 }}>
														<div
															className={classNames(
																`bg-l25-${success}`,
																'rounded-2',
																'd-flex align-items-center justify-content-center',
																'overflow-hidden',
																'shadow',
															)}>
															<img
																src={BusinessLogo}
																alt='BusinessLogo'
																width={100}
															/>
														</div>
													</div>
												</div>
											</div>
											<div className='flex-grow-1 ms-5 d-flex justify-content-between'>
												<div className='w-100'>
													<div className='row'>
														<div className='col'>
															<div className='d-flex align-items-center'>
																<div className='fw-bold fs-4 me-2'>
																	Google
																</div>
															</div>
														</div>
														<div className='col-auto'>
															<Button
																icon='Edit'
																color='dark'
																isLight
																hoverShadow='sm'
																tag='a'
																to={`../${demoPagesMenu.crm.subMenu.customerProfile.path}`}
																aria-label='More info'
															/>
														</div>
													</div>
												</div>
											</div>
										</div>
									</CardBody>
								</Card>
							</div>
							<div className='col'>
								<Card className='shadow-3d-primary'>
									<CardBody>
										<div className='d-flex align-items-center'>
											<div className='flex-shrink-0'>
												<div className='position-relative'>
													<div
														className='ratio ratio-1x1'
														style={{ width: 100 }}>
														<div
															className={classNames(
																`bg-l25-${success}`,
																'rounded-2',
																'd-flex align-items-center justify-content-center',
																'overflow-hidden',
																'shadow',
															)}>
															<img
																src={InstagramImg}
																alt='BusinessLogo'
																width={100}
															/>
														</div>
													</div>
												</div>
											</div>
											<div className='flex-grow-1 ms-5 d-flex justify-content-between'>
												<div className='w-100'>
													<div className='row'>
														<div className='col'>
															<div className='d-flex align-items-center'>
																<div className='fw-bold fs-4 me-2'>
																	Instagram
																</div>
															</div>
														</div>
														<div className='col-auto'>
															<Button
																icon='Edit'
																color='dark'
																isLight
																hoverShadow='sm'
																tag='a'
																to={`../${demoPagesMenu.crm.subMenu.customerProfile.path}`}
																aria-label='More info'
															/>
														</div>
													</div>
												</div>
											</div>
										</div>
									</CardBody>
								</Card>
							</div>
							<div className='col'>
								<Card className='shadow-3d-primary'>
									<CardBody>
										<div className='d-flex align-items-center'>
											<div className='flex-shrink-0'>
												<div className='position-relative'>
													<div
														className='ratio ratio-1x1'
														style={{ width: 100 }}>
														<div
															className={classNames(
																`bg-l25-${success}`,
																'rounded-2',
																'd-flex align-items-center justify-content-center',
																'overflow-hidden',
																'shadow',
															)}>
															<img
																src={LinkedinImg}
																alt='BusinessLogo'
																width={100}
															/>
														</div>
													</div>
												</div>
											</div>
											<div className='flex-grow-1 ms-5 d-flex justify-content-between'>
												<div className='w-100'>
													<div className='row'>
														<div className='col'>
															<div className='d-flex align-items-center'>
																<div className='fw-bold fs-4 me-2'>
																	Linkedin
																</div>
															</div>
														</div>
														<div className='col-auto'>
															<Button
																icon='Edit'
																color='dark'
																isLight
																hoverShadow='sm'
																tag='a'
																to={`../${demoPagesMenu.crm.subMenu.customerProfile.path}`}
																aria-label='More info'
															/>
														</div>
													</div>
												</div>
											</div>
										</div>
									</CardBody>
								</Card>
							</div>
						</div>
					</div> */}
				</div>
				<div className='row mb-4'>
					<div className='col-xl-12 col-md-12'>
						<CardTitle tag='div' className='h4'>
							Associated Products
						</CardTitle>
					</div>
				</div>
				<div className='row'>
					{!showAllItem
						? data.slice(0, 4).map((it) => (
								<div key={it.id} className='col-xxl-3 col-xl-4 col-md-6'>
									<CommonGridProductItem
										id={it.id}
										name={it.name}
										category={it.category}
										img={it.image}
										color={it.color}
										series={it.series}
										price={it.price}
										editAction={() => {
											setEditPanel(true);
											handleEdit(it.id);
										}}
										deleteAction={() => handleRemove(it.id)}
									/>
								</div>
						  ))
						: data.map((it) => (
								<div key={it.id} className='col-xxl-3 col-xl-4 col-md-6'>
									<CommonGridProductItem
										id={it.id}
										name={it.name}
										category={it.category}
										img={it.image}
										color={it.color}
										series={it.series}
										price={it.price}
										editAction={() => {
											setEditPanel(true);
											handleEdit(it.id);
										}}
										deleteAction={() => handleRemove(it.id)}
									/>
								</div>
						  ))}
					{data.length > 4 && (
						<Button className='btn btn-link p-0 inline' onClick={toggleItem}>
							{showAllItem ? 'See less' : 'See more'}
						</Button>
					)}
				</div>
			</Page>
			{/* <CustomerEditModal
				setIsOpen={setEditModalStatus}
				isOpen={editModalStatus}
				id={id || 'loading'}
			/> */}
			<OffCanvas
				setOpen={setEditPanel}
				isOpen={editPanel}
				isRightPanel
				tag='form'
				noValidate
				onSubmit={formik.handleSubmit}>
				<OffCanvasHeader setOpen={setEditPanel}>
					<OffCanvasTitle id='edit-panel'>
						{editItem?.name || 'New Product'}{' '}
						{editItem?.name ? (
							<Badge color='primary'>Edit</Badge>
						) : (
							<Badge color='success'>New</Badge>
						)}
					</OffCanvasTitle>
				</OffCanvasHeader>
				<OffCanvasBody>
					<Card>
						<CardHeader>
							<CardLabel icon='Photo' iconColor='info'>
								<CardTitle>Product Image</CardTitle>
							</CardLabel>
						</CardHeader>
						<CardBody>
							<div className='row'>
								<div className='col-12'>
									{editItem?.image ? (
										<img
											src={editItem.image}
											alt=''
											width={128}
											height={128}
											className='mx-auto d-block img-fluid mb-3'
										/>
									) : (
										<PlaceholderImage
											width={128}
											height={128}
											className='mx-auto d-block img-fluid mb-3 rounded'
										/>
									)}
								</div>
								<div className='col-12'>
									<div className='row g-4'>
										<div className='col-12'>
											<Input type='file' autoComplete='photo' />
										</div>
										<div className='col-12'>
											{editItem && (
												<Button
													color='dark'
													isLight
													icon='Delete'
													className='w-100'
													onClick={() => {
														setEditItem({ ...editItem, image: null });
													}}>
													Delete Image
												</Button>
											)}
										</div>
									</div>
								</div>
							</div>
						</CardBody>
					</Card>

					<Card>
						<CardHeader>
							<CardLabel icon='Description' iconColor='success'>
								<CardTitle>Product Details</CardTitle>
							</CardLabel>
						</CardHeader>
						<CardBody>
							<div className='row g-4'>
								<div className='col-12'>
									<FormGroup id='name' label='Name' isFloating>
										<Input
											placeholder='Name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.name}
											isValid={formik.isValid}
											isTouched={formik.touched.name}
											invalidFeedback={formik.errors.name}
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
								<div className='col-12'>
									<FormGroup id='price' label='Price' isFloating>
										<Input
											placeholder='Price'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.price}
											isValid={formik.isValid}
											isTouched={formik.touched.price}
											invalidFeedback={formik.errors.price}
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
								<div className='col-12'>
									<FormGroup id='stock' label='Stock' isFloating>
										<Input
											placeholder='Stock'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.stock}
											isValid={formik.isValid}
											isTouched={formik.touched.stock}
											invalidFeedback={formik.errors.stock}
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
								<div className='col-12'>
									<FormGroup id='category' label='Category' isFloating>
										<Input
											placeholder='Category'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.category}
											isValid={formik.isValid}
											isTouched={formik.touched.category}
											invalidFeedback={formik.errors.category}
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
							</div>
						</CardBody>
					</Card>
				</OffCanvasBody>
				<div className='p-3'>
					<Button
						color='info'
						icon='Save'
						type='submit'
						isDisable={!formik.isValid && !!formik.submitCount}>
						Save
					</Button>
				</div>
			</OffCanvas>
		</PageWrapper>
	);
};

export default Customer;
