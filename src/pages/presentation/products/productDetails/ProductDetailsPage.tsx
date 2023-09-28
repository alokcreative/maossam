import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { ApexOptions } from 'apexcharts';
import Page from '../../../../layout/Page/Page';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../../layout/SubHeader/SubHeader';
import Button from '../../../../components/bootstrap/Button';
import { pagesMenu } from '../../../../menu';
import tableData from '../../../../common/data/dummyProductData';
import Avatar from '../../../../components/Avatar';
import USERS from '../../../../common/data/userDummyData';
import Card, {
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import Icon from '../../../../components/icon/Icon';
import { priceFormat } from '../../../../helpers/helpers';
import Chart from '../../../../components/extras/Chart';
import Accordion, { AccordionItem } from '../../../../components/bootstrap/Accordion';
import PlaceholderImage from '../../../../components/extras/PlaceholderImage';
import Input from '../../../../components/bootstrap/forms/Input';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import showNotification from '../../../../components/extras/showNotification';
import useDarkMode from '../../../../hooks/useDarkMode';
import Select from '../../../../components/bootstrap/forms/Select';
import Alert from '../../../../components/bootstrap/Alert';

interface IValues {
	name: string;
	price: number;
	sale: number;
	category: string;
	image?: string;
	desc?: string;
	description?: string;
}
const validate = (values: IValues) => {
	const errors = {
		name: '',
		price: '',
		sale: '',
		category: '',
		desc: '',
		description: '',
	};

	if (!values.name) {
		errors.name = 'Required';
	} else if (values.name.length < 3) {
		errors.name = 'Must be 3 characters or more';
	} else if (values.name.length > 20) {
		errors.name = 'Must be 20 characters or less';
	}

	if (!values.price) {
		errors.price = 'Required';
	} else if (values.price < 0) {
		errors.price = 'Price should not be 0';
	}

	if (!values.sale) {
		errors.sale = 'Required';
	}
	if (!values.description) {
		errors.description = 'Required';
	}

	if (!values.category) {
		errors.category = 'Required';
	} else if (values.category.length < 3) {
		errors.category = 'Must be 3 characters or more';
	} else if (values.category.length > 20) {
		errors.category = 'Must be 20 characters or less';
	}

	return errors;
};

type TTabs = 'Summary' | 'Comments' | 'Edit';
interface ITabs {
	[key: string]: TTabs;
}

const ProductDetailsPage = () => {
	const { darkModeStatus } = useDarkMode();

	const { id } = useParams();
	const navigate = useNavigate();

	// @ts-ignore
	const itemData = tableData.filter((item) => item.id.toString() === id.toString());
	const data = itemData[0];

	const formikSelect = useFormik({
		initialValues: {
			itemCat: '',
			isSell: '',
			isSellInOtherCoun: '',
			soldWithCompProducts: '',
			customerValue: '',
			competitorsList: '',
			averageSelling: '',
			averageSellingMarket: '',
		},
		onSubmit: () => {},
	});
	const TABS: ITabs = {
		SUMMARY: 'Summary',
		COMMENTS: 'Comments',
		EDIT: 'Edit',
	};
	const [activeTab, setActiveTab] = useState(TABS.SUMMARY);

	// const [editItem, setEditItem] = useState<IValues>(data);
	const formik = useFormik({
		initialValues: {
			name: '',
			price: 0,
			sale: 0,
			category: '',
			desc: '',
			description: '',
		},
		validate,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
			showNotification(
				<span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>Updated Successfully</span>
				</span>,
				'Product has been updated successfully',
			);
		},
	});
	// useEffect(() => {
	// 	if (editItem) {
	// 		formik.setValues({
	// 			name: editItem.name,
	// 			price: editItem.price,
	// 			stock: editItem.stock,
	// 			category: editItem.category,
	// 		});
	// 	}
	// 	return () => {
	// 		formik.setValues({
	// 			name: '',
	// 			price: 0,
	// 			stock: 0,
	// 			category: '',
	// 		});
	// 	};
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [editItem]);

	return (
		<PageWrapper title={pagesMenu.sales.subMenu.product.text}>
			<SubHeader>
				<SubHeaderLeft>
					<Button color='info' isLink icon='ArrowBack' onClick={() => navigate(-1)}>
						Back to List
					</Button>
				</SubHeaderLeft>
			</SubHeader>
			<Page>
				<div className='display-4 fw-bold py-3'>{data.name}</div>
				<div className='row h-100'>
					<div className='col-lg-4'>
						<Card stretch>
							<CardBody isScrollable>
								<div className='row g-3'>
									<div className='col-12'>
										<img src={data.image} alt='' width='100%' className='p-5' />
									</div>
									<div className='col-12'>
										<Button
											icon='Summarize'
											color='info'
											className='w-100 p-3'
											isLight={activeTab !== TABS.SUMMARY}
											onClick={() => setActiveTab(TABS.SUMMARY)}>
											{TABS.SUMMARY}
										</Button>
									</div>
									<div className='col-12'>
										<Button
											icon='Chat'
											color='info'
											className='w-100 p-3'
											isLight={activeTab !== TABS.COMMENTS}
											onClick={() => setActiveTab(TABS.COMMENTS)}>
											{TABS.COMMENTS}
										</Button>
									</div>
									<div className='col-12'>
										<Button
											icon='Edit'
											color='success'
											className='w-100 p-3'
											isLight={activeTab !== TABS.EDIT}
											onClick={() => setActiveTab(TABS.EDIT)}>
											{TABS.EDIT}
										</Button>
									</div>
								</div>
							</CardBody>
							<CardFooter>
								<CardFooterLeft className='w-100'>
									<Button
										icon='Delete'
										color='danger'
										isLight
										className='w-100 p-3'>
										Delete
									</Button>
								</CardFooterLeft>
							</CardFooter>
						</Card>
					</div>
					<div className='col-lg-8'>
						<Card
							stretch
							className='overflow-hidden'
							tag='form'
							noValidate
							onSubmit={formik.handleSubmit}>
							{activeTab === TABS.SUMMARY && (
								<>
									<CardHeader>
										<CardLabel icon='Summarize' iconColor='info'>
											<CardTitle tag='div' className='h5'>
												Summary
											</CardTitle>
											<CardSubTitle tag='div' className='h6'>
												Product Information
											</CardSubTitle>
										</CardLabel>
									</CardHeader>
									<CardBody isScrollable>
										<div className='row'>
											<div className='col-lg-6'>
												<Card
													stretch
													shadow='sm'
													className={`bg-l${
														darkModeStatus ? 'o25' : '25'
													}-primary rounded-2`}>
													<CardHeader className='bg-transparent'>
														<CardLabel>
															<CardTitle>Price</CardTitle>
														</CardLabel>
													</CardHeader>
													<CardBody>
														<div className='d-flex align-items-center pb-3'>
															<div className='flex-shrink-0'>
																<Icon
																	icon='ConfirmationNumber'
																	size='4x'
																	color='primary'
																/>
															</div>
															<div className='flex-grow-1 ms-3'>
																<div className='fw-bold fs-3 mb-0'>
																	{priceFormat(data.price)}
																</div>
																<div className='text-muted'>
																	{/* <b>Quantity: </b> {data.stock} */}
																</div>
															</div>
														</div>
													</CardBody>
												</Card>
											</div>
											<div className='col-lg-6'>
												<Card
													stretch
													shadow='sm'
													className={`bg-l${
														darkModeStatus ? 'o25' : '25'
													}-warning bg-l${
														darkModeStatus ? 'o50' : '10'
													}-warning-hover transition-base rounded-2`}>
													<CardHeader className='bg-transparent'>
														<CardLabel>
															<CardTitle tag='h4' className='h5'>
																Sales
															</CardTitle>
														</CardLabel>
													</CardHeader>
													<CardBody className='py-0'>
														<div className='d-flex align-items-center pb-3'>
															<div className='flex-shrink-0'>
																<Icon
																	icon='Sale'
																	size='4x'
																	color='success'
																/>
															</div>
															<div className='flex-grow-1 ms-3'>
																<p className='mb-0'>
																	{data.description}
																</p>
															</div>
														</div>
													</CardBody>
												</Card>
											</div>
											<div className='col-lg-6'>
												<Card
													stretch
													shadow='sm'
													className={`bg-l${
														darkModeStatus ? 'o25' : '25'
													}-success rounded-2`}>
													<CardHeader className='bg-transparent'>
														<CardLabel>
															<CardTitle>Category</CardTitle>
														</CardLabel>
													</CardHeader>
													<CardBody>
														<div className='d-flex align-items-center pb-3'>
															<div className='flex-shrink-0'>
																<Icon
																	icon='Category'
																	size='4x'
																	color='success'
																/>
															</div>
															<div className='flex-grow-1 ms-3'>
																<div className='fw-bold fs-3 mb-0'>
																	{data.category}
																</div>
															</div>
														</div>
													</CardBody>
												</Card>
											</div>
										</div>
										<div className='col-lg-12'>
											<Card
												stretch
												shadow='sm'
												className={`bg-l${
													darkModeStatus ? 'o25' : '25'
												}-success rounded-2`}>
												<CardHeader className='bg-transparent'>
													<CardLabel>
														<CardTitle>Description</CardTitle>
													</CardLabel>
												</CardHeader>
												<CardBody>
													<div className='d-flex align-items-center pb-3'>
														<div className='flex-shrink-0'>
															<Icon
																icon='Description'
																size='4x'
																color='success'
															/>
														</div>
														<div className='flex-grow-1 ms-3'>
															<p className='mb-0'>
																{data.description}
															</p>
														</div>
													</div>
												</CardBody>
											</Card>
										</div>
									</CardBody>
								</>
							)}
							{activeTab === TABS.COMMENTS && (
								<>
									<CardHeader>
										<CardLabel icon='Chat' iconColor='info'>
											<CardTitle tag='div' className='h5'>
												Comments
											</CardTitle>
											<CardSubTitle tag='div' className='h6'>
												Product Reviews
											</CardSubTitle>
										</CardLabel>
									</CardHeader>
									<CardBody isScrollable>
										<div className='row g-4'>
											<div className='col-12 d-flex align-items-center'>
												<div className='flex-shrink-0'>
													{/* <Avatar
														src={USERS.GRACE.src}
														srcSet={USERS.GRACE.srcSet}
														color='info'
														size={64}
													/> */}
												</div>
												<div className='flex-grow-1 ms-3 d-flex justify-content-between align-items-center'>
													<figure className='mb-0'>
														<blockquote className='blockquote'>
															<p>
																We made a very logical decision to
																use it in our project. Design
																quality is very nice.
															</p>
														</blockquote>
														<figcaption className='blockquote-footer mb-0'>
															{USERS.GRACE.name} in{' '}
															<cite title='Company'>Company</cite>
														</figcaption>
													</figure>
												</div>
											</div>
											<div className='col-12 d-flex align-items-center'>
												<div className='flex-shrink-0'>
													{/* <Avatar
														src={USERS.SAM.src}
														srcSet={USERS.SAM.srcSet}
														color='info'
														size={64}
													/> */}
												</div>
												<div className='flex-grow-1 ms-3 d-flex justify-content-between align-items-center'>
													<figure className='mb-0'>
														<blockquote className='blockquote'>
															<p>
																We have used another product of the
																same author before. It was very easy
																to integrate it into our project.
															</p>
														</blockquote>
														<figcaption className='blockquote-footer mb-0'>
															{USERS.SAM.name} in{' '}
															<cite title='Company'>Company</cite>
														</figcaption>
													</figure>
												</div>
											</div>
											<div className='col-12 d-flex align-items-center'>
												{/* <div className='flex-shrink-0'>
													<Avatar
														src={USERS.CHLOE.src}
														srcSet={USERS.CHLOE.srcSet}
														color='info'
														size={64}
													/>
												</div> */}
												<div className='flex-grow-1 ms-3 d-flex justify-content-between align-items-center'>
													<figure className='mb-0'>
														<blockquote className='blockquote'>
															<p>
																Just the design I was looking
																for.🎉🎉
															</p>
														</blockquote>
														<figcaption className='blockquote-footer mb-0'>
															{USERS.CHLOE.name} in{' '}
															<cite title='Company'>Company</cite>
														</figcaption>
													</figure>
												</div>
											</div>
										</div>
									</CardBody>
								</>
							)}
							{activeTab === TABS.EDIT && (
								<>
									<CardHeader>
										<CardLabel icon='Edit' iconColor='success'>
											<CardTitle tag='div' className='h5'>
												Edit
											</CardTitle>
											<CardSubTitle tag='div' className='h6'>
												Product Details
											</CardSubTitle>
										</CardLabel>
									</CardHeader>
									<CardBody isScrollable>
										<Card>
											<CardHeader>
												<CardLabel icon='Photo' iconColor='info'>
													<CardTitle>Product Image</CardTitle>
												</CardLabel>
											</CardHeader>
											<CardBody>
												<div className='row'>
													<div className='col-lg-8'>
														<div className='row g-4'>
															<div className='col-12'>
																<Input
																	type='file'
																	autoComplete='photo'
																/>
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
												<FormGroup id='name' label='Name' isFloating>
														<Input
															className='pl-5'
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
													<FormGroup id='itemCat' label=''>
														<Select
														className='p-3'
															ariaLabel='Item Category'
															placeholder='Select Category...'
															list={[
																{
																	value: 'Digital Marketing Services',
																	text: 'Digital Marketing Services',
																},
																{
																	value: 'Graphic Design',
																	text: 'Graphic Design',
																},
																{
																	value: 'Content Creation',
																	text: 'Content Creation',
																},
																{
																	value: 'Website Development',
																	text: 'Website Development',
																},
															]}
															onChange={formikSelect.handleChange}
															value={formikSelect.values.itemCat}
														/>
													</FormGroup>
													<FormGroup id='price' label='price' isFloating>
														<Input
															className='pl-5'
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
													<FormGroup id='sale' label='Sale' isFloating>
														<Input
															className='pl-5'
															placeholder='Sale'
															onChange={formik.handleChange}
															onBlur={formik.handleBlur}
															value={formik.values.sale}
															isValid={formik.isValid}
															isTouched={formik.touched.sale}
															invalidFeedback={formik.errors.sale}
															validFeedback='Looks good!'
														/>
													</FormGroup>
													<FormGroup id='description' label='Description' isFloating>
														<Input
															className='pl-5'
															placeholder='Description'
															onChange={formik.handleChange}
															onBlur={formik.handleBlur}
															value={formik.values.description}
															isValid={formik.isValid}
															isTouched={formik.touched.description}
															invalidFeedback={formik.errors.description}
															validFeedback='Looks good!'
														/>
													</FormGroup>
												</div>
											</CardBody>
										</Card>
									</CardBody>
									<CardFooter>
										<CardFooterRight>
											<Button
												color='info'
												icon='Save'
												type='submit'
												// isDisable={
												// 	!formik.isValid && !!formik.handleSubmit
												// }
											>
												Update
											</Button>
										</CardFooterRight>
									</CardFooter>
								</>
							)}
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default ProductDetailsPage;
