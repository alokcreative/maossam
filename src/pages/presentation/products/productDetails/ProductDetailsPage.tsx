import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { ApexOptions } from 'apexcharts'
import Page from '../../../../layout/Page/Page'
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper'
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../../layout/SubHeader/SubHeader'
import Button from '../../../../components/bootstrap/Button'
import { adminDashboardPagesMenu, pagesMenu } from '../../../../menu'
import tableData from '../../../../common/data/dummyProductData'
import Avatar from '../../../../components/Avatar'
import USERS, { Role } from '../../../../common/data/userDummyData'
import Card, {
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../../components/bootstrap/Card'
import Icon from '../../../../components/icon/Icon'
import { priceFormat } from '../../../../helpers/helpers'
import Chart from '../../../../components/extras/Chart'
import Accordion, { AccordionItem } from '../../../../components/bootstrap/Accordion'
import PlaceholderImage from '../../../../components/extras/PlaceholderImage'
import Input from '../../../../components/bootstrap/forms/Input'
import FormGroup from '../../../../components/bootstrap/forms/FormGroup'
import showNotification from '../../../../components/extras/showNotification'
import useDarkMode from '../../../../hooks/useDarkMode'
import Select from '../../../../components/bootstrap/forms/Select'
import Alert from '../../../../components/bootstrap/Alert'
import { RootState } from '../../../../store/store'
import { useSelector } from 'react-redux'

interface IValues {
	name: string
	image: string
	description: string
	category: string
	price: number
	stock: number
}
const validate = (values: IValues) => {
	const errors = {
		name: '',
		image: '',
		description: '',
		category: '',
		price: 0,
		stock: 0,
	}

	if (!values.name) {
		errors.name = 'Required'
	} else if (values.name.length < 3) {
		errors.name = 'Must be 3 characters or more'
	} else if (values.name.length > 20) {
		errors.name = 'Must be 20 characters or less'
	}

	if (!values.category) {
		errors.category = 'Required'
	} else if (values.category.length < 3) {
		errors.category = 'Must be 3 characters or more'
	} else if (values.category.length > 20) {
		errors.category = 'Must be 20 characters or less'
	}

	return errors
}

type TTabs = 'Summary' | 'Comments' | 'Edit'
interface ITabs {
	[key: string]: TTabs
}

const ProductDetailsPage = () => {
	const { user } = useSelector((state: RootState) => state.auth)
	// const savedValue = localStorage?.getItem('user');
	// const localUser = savedValue ? JSON.parse(savedValue) : null;
	// const role = user.role || localUser?.role;
	const role = localStorage?.getItem('role')
	const { darkModeStatus } = useDarkMode()

	const { id } = useParams()
	const navigate = useNavigate()

	// @ts-ignore
	const itemData = tableData.filter((item) => item.id.toString() === id.toString())
	const data = itemData[0]

	const chartOptions: ApexOptions = {
		colors: [process.env.REACT_APP_WARNING_COLOR],
		chart: {
			type: 'line',
			width: '100%',
			height: 105,
			sparkline: {
				enabled: true,
			},
		},
		tooltip: {
			theme: 'dark',
			fixed: {
				enabled: false,
			},
			x: {
				show: false,
			},
			y: {
				title: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					formatter (seriesName: string) {
						return ''
					},
				},
			},
		},
		stroke: {
			curve: 'smooth',
			width: 2,
		},
	}
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
	})
	const TABS: ITabs = {
		SUMMARY: 'Summary',
		COMMENTS: 'Comments',
		EDIT: 'Edit',
	}
	const [activeTab, setActiveTab] = useState(TABS.SUMMARY)

	const [editItem, setEditItem] = useState<IValues>(data)
	const formik = useFormik({
		initialValues: {
			name: '',
			price: 0,
			category: '',
			image: '',
			description: '',
			stock: 0,
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
			)
		},
	})
	useEffect(() => {
		if (editItem) {
			formik.setValues({
				name: data.name,
				image: data.image,
				description: data.description,
				category: data.category,
				price: data.price,
				stock: data.stock,
			})
		}
		return () => {
			formik.setValues({
				name: '',
				image: '',
				description: '',
				category: '',
				price: 0,
				stock: 0,
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [editItem])

	return (
		<PageWrapper title={adminDashboardPagesMenu.product.text}>
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
							<CardBody>
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

									{/* <div className='col-12'>
										<Button
											icon='Chat'
											color='info'
											className='w-100 p-3'
											isLight={activeTab !== TABS.COMMENTS}
											onClick={() => setActiveTab(TABS.COMMENTS)}>
											{TABS.COMMENTS}
										</Button>
									</div> */}
									{role === 'user' && (
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
									)}
									{role === 'user' && (
										<div className='col-12'>
											<Button
												icon='Delete'
												color='danger'
												isLight
												className='w-100 p-3'>
												Delete
											</Button>
										</div>
									)}
								</div>
							</CardBody>
							{/* {role === 'user' && (
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
							)} */}
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
											{/* <CardSubTitle tag='div' className='h6'>
												Product Information
											</CardSubTitle> */}
										</CardLabel>
									</CardHeader>
									<CardBody>
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
																{/* <div className='text-muted'>
																	<b>Quantity: </b> {data.sales}
																</div> */}
															</div>
														</div>
													</CardBody>
												</Card>
											</div>
											{/* <div className='col-lg-6'>
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
																Stocks
															</CardTitle>
														</CardLabel>
													</CardHeader>
													<CardBody className='py-0'>
														<Chart
															className='mx-n4'
															series={data.series}
															options={chartOptions}
															type={chartOptions.chart?.type}
															height={chartOptions.chart?.height}
															width={chartOptions.chart?.width}
														/>
													</CardBody>
												</Card>
											</div> */}
											<div className='col-lg-6'>
												<Card
													stretch
													shadow='sm'
													className={`bg-l${
														darkModeStatus ? 'o25' : '25'
													}-info rounded-2`}>
													<CardHeader className='bg-transparent'>
														<CardLabel>
															<CardTitle>Stock</CardTitle>
														</CardLabel>
													</CardHeader>
													<CardBody>
														<div className='d-flex align-items-center pb-3'>
															<div className='flex-shrink-0'>
																<Icon
																	icon='Extension'
																	size='4x'
																	color='info'
																/>
															</div>
															<div className='flex-grow-1 ms-3'>
																<div className='fw-bold fs-3 mb-0'>
																	{data.stock}
																</div>
															</div>
														</div>
													</CardBody>
												</Card>
											</div>
											{/* <div className='col-lg-6'>
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
											</div> */}
											{/* <div className='col-lg-6'>
												<Card
													stretch
													shadow='sm'
													className={`bg-l${
														darkModeStatus ? 'o25' : '25'
													}-info rounded-2`}>
													<CardHeader className='bg-transparent'>
														<CardLabel>
															<CardTitle>Name</CardTitle>
														</CardLabel>
													</CardHeader>
													<CardBody>
														<div className='d-flex align-items-center pb-3'>
															<div className='flex-shrink-0'>
																<Icon
																	icon='Extension'
																	size='4x'
																	color='info'
																/>
															</div>
															<div className='flex-grow-1 ms-3'>
																<div className='fw-bold fs-3 mb-0'>
																	{data.name}
																</div>
															</div>
														</div>
													</CardBody>
												</Card>
											</div> */}
											{/* <div className='col-12 shadow-3d-container'>
												<Accordion id='faq' shadow='sm'>
													<AccordionItem
														id='faq1'
														title='Can I change the colors?'>
														In at urna nec risus aliquam accumsan.
														Vivamus rutrum rhoncus massa, sed facilisis
														justo sodales vitae. Pellentesque mattis
														felis ac enim viverra faucibus. Curabitur
														maximus nibh massa, ut dictum quam
														scelerisque eget. Maecenas scelerisque
														egestas diam a posuere. Sed non vehicula
														nunc. Proin feugiat nisi ut mi mattis
														bibendum. Suspendisse lobortis libero ut
														libero semper, sed fermentum lectus commodo.
														Nam pretium mi sit amet purus imperdiet
														tempus. Aliquam congue ligula quis vulputate
														viverra. Morbi dapibus vitae odio vel
														luctus. Vivamus tellus tortor, aliquet id
														ultricies a, hendrerit non massa. Ut feugiat
														quam non sollicitudin molestie. Praesent ut
														ante mattis, efficitur est ac, scelerisque
														magna. Donec congue erat a suscipit
														condimentum. Curabitur purus nunc,
														ullamcorper vitae lectus quis, aliquam
														lacinia arcu.
													</AccordionItem>
													<AccordionItem
														id='faq2'
														title='Can I use these for presentations?'>
														Nunc ex odio, fermentum dignissim urna eu,
														suscipit vehicula magna. Vestibulum vel
														risus sed metus pellentesque gravida. Etiam
														hendrerit lorem vitae elit tempor bibendum.
														Vivamus tincidunt consectetur erat at
														venenatis. Nam elementum varius massa non
														congue. Class aptent taciti sociosqu ad
														litora torquent per conubia nostra, per
														inceptos himenaeos. Vivamus fermentum
														scelerisque ligula, quis bibendum felis
														luctus quis. Donec magna sem, ullamcorper id
														tempus ut, pharetra sed felis. Ut quis ante
														tristique, condimentum lacus eget, mollis
														magna. Phasellus fringilla diam ac erat
														consequat feugiat. Vestibulum eu ex eget
														ligula placerat finibus. Quisque vitae velit
														feugiat, mattis lectus nec, molestie justo.
														Vivamus nec tincidunt augue. Pellentesque
														nec mattis ipsum, non malesuada libero.
														Proin aliquam est turpis, sit amet efficitur
														ex gravida ac. Nunc in molestie augue.
													</AccordionItem>
													<AccordionItem
														id='faq3'
														title='an I use these for commercial projects?'>
														Cras rutrum turpis in nisl rhoncus volutpat.
														In vel augue commodo, aliquet dolor sit
														amet, pellentesque diam. Donec in dolor eu
														metus venenatis rutrum. Nam eu venenatis
														diam. Praesent vel tortor ornare, aliquet
														risus eget, elementum nisi. Morbi at
														faucibus neque, at luctus massa. Morbi
														convallis urna lacus, id suscipit nibh
														viverra at. Suspendisse molestie lorem nec
														nulla tempor pulvinar. Praesent interdum
														felis et lorem ullamcorper, sit amet mattis
														sapien imperdiet.
													</AccordionItem>
												</Accordion>
											</div> */}
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
												<div className='flex-grow-1 ms-3 d-flex justify-content-between align-items-center'>
													<figure className='mb-0'>
														<blockquote className='blockquote'>
															<p>
																We made a very logical decision to
																use it in our project. Design
																quality is very nice. We made a very
																logical decision to use it in our
																project. Design quality is very
																nice. We made a very logical
																decision to use it in our project.
																Design quality is very nice. We made
																a very logical decision to use it in
																our project. Design quality is very
																nice. We made a very logical
																decision to use it in our project.
																Design quality is very nice. We made
																a very logical decision to use it in
																our project. Design quality is very
																nice. We made a very logical
																decision to use it in our project.
																Design quality is very nice. We made
																a very logical decision to use it in
																our project. Design quality is very
																nice. We made a very logical
																decision to use it in our project.
																Design quality is very nice. We made
																a very logical decision to use it in
																our project. Design quality is very
																nice. We made a very logical
																decision to use it in our project.
																Design quality is very nice. We made
																a very logical decision to use it in
																our project. Design quality is very
																nice. We made a very logical
																decision to use it in our project.
																Design quality is very nice. We made
																a very logical decision to use it in
																our project. Design quality is very
																nice. We made a very logical
																decision to use it in our project.
																Design quality is very nice. We made
																a very logical decision to use it in
																our project. Design quality is very
																nice. We made a very logical
																decision to use it in our project.
																Design quality is very nice.
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
									<CardBody>
										<Card>
											<CardHeader>
												<CardLabel icon='Photo' iconColor='info'>
													<CardTitle>Product Image</CardTitle>
												</CardLabel>
											</CardHeader>
											<CardBody>
												<div className='row'>
													<div className='col-lg-4'>
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
													<div className='col-lg-8'>
														<div className='row g-4'>
															<div className='col-12'>
																<Input
																	type='file'
																	autoComplete='photo'
																/>
															</div>
															<div className='col-12'>
																<Button
																	color='dark'
																	isLight
																	icon='Delete'
																	onClick={() => {
																		setEditItem({
																			...editItem,
																			image: '',
																		})
																	}}>
																	Delete Image
																</Button>
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
													<FormGroup id='itemCat' label=' '>
														<Select
															ariaLabel='Item Category'
															placeholder='SELECT ONE OPTION...'
															list={[
																{
																	value: 'Service',
																	text: 'Service',
																},
																{
																	value: 'Product',
																	text: 'Product',
																},
															]}
															onChange={formikSelect.handleChange}
															value={formikSelect.values.itemCat}
														/>
													</FormGroup>
													{formikSelect.values.itemCat === 'Service' ? (
														<>
															<div className='col-12'>
																<FormGroup
																	id='name'
																	label='Name'
																	isFloating>
																	<Input
																		placeholder='Name'
																		onChange={
																			formik.handleChange
																		}
																		onBlur={formik.handleBlur}
																		value={formik.values.name}
																		isValid={formik.isValid}
																		isTouched={
																			formik.touched.name
																		}
																		invalidFeedback={
																			formik.errors.name
																		}
																		validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
															<div className='col-12'>
																<FormGroup
																	id='desc'
																	label=' Please describe your Service'
																	isFloating>
																	<Input
																		placeholder='Please describe your Service'
																		type='text'
																		onChange={
																			formik.handleChange
																		}
																		onBlur={formik.handleBlur}
																		value={
																			formik.values
																				.description
																		}
																		isValid={formik.isValid}
																		isTouched={
																			formik.touched
																				.description
																		}
																		invalidFeedback={
																			formik.errors
																				.description
																		}
																		validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
															{/* <div className='col-12'>
																<FormGroup
																	id='price'
																	label='Price'
																	isFloating>
																	<Input
																		placeholder='Price'
																		onChange={
																			formik.handleChange
																		}
																		onBlur={formik.handleBlur}
																		value={formik.values.price}
																		isValid={formik.isValid}
																		isTouched={
																			formik.touched.price
																		}
																		invalidFeedback={
																			formik.errors.price
																		}
																		validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
															<div className='col-12'>
																<FormGroup
																	id='stock'
																	label='Stock'
																	isFloating>
																	<Input
																		placeholder='Stock'
																		onChange={
																			formik.handleChange
																		}
																		onBlur={formik.handleBlur}
																		value={formik.values.stock}
																		isValid={formik.isValid}
																		isTouched={
																			formik.touched.stock
																		}
																		invalidFeedback={
																			formik.errors.stock
																		}
																		validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
															<div className='col-12'>
																<FormGroup
																	id='category'
																	label='Category'
																	isFloating>
																	<Input
																		placeholder='Category'
																		onChange={
																			formik.handleChange
																		}
																		onBlur={formik.handleBlur}
																		value={
																			formik.values.category
																		}
																		isValid={formik.isValid}
																		isTouched={
																			formik.touched.category
																		}
																		invalidFeedback={
																			formik.errors.category
																		}
																		validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div> */}
														</>
													) : (
														<>
															<div className='col-12'>
																<FormGroup
																	id='name'
																	label='Name'
																	isFloating>
																	<Input
																		placeholder='Name'
																		onChange={
																			formik.handleChange
																		}
																		onBlur={formik.handleBlur}
																		value={formik.values.name}
																		isValid={formik.isValid}
																		isTouched={
																			formik.touched.name
																		}
																		invalidFeedback={
																			formik.errors.name
																		}
																		validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
															<div className='col-12'>
																<FormGroup
																	id='desc'
																	label=' Please describe your product'
																	isFloating>
																	<Input
																		placeholder='Please describe your product'
																		type='text'
																		onChange={
																			formik.handleChange
																		}
																		onBlur={formik.handleBlur}
																		value={
																			formik.values
																				.description
																		}
																		isValid={formik.isValid}
																		isTouched={
																			formik.touched
																				.description
																		}
																		invalidFeedback={
																			formik.errors
																				.description
																		}
																		validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
															<div className='col-12'>
																<FormGroup
																	id='isSell'
																	label='Do you sell or would you like to sell this product in 
																		your local market?'>
																	<Select
																		ariaLabel='isSell'
																		placeholder=' '
																		list={[
																			{
																				value: 'yes',
																				text: 'Yes',
																			},
																			{
																				value: 'no',
																				text: 'No',
																			},
																		]}
																		onChange={
																			formikSelect.handleChange
																		}
																		value={
																			formikSelect.values
																				.isSell
																		}
																	/>
																</FormGroup>
															</div>
															<div className='col-12'>
																<FormGroup
																	id='isSellInOtherCoun'
																	label='Do you sell or would you like to sell this product in 
																		other countries?'>
																	<Select
																		ariaLabel='isSellInOtherCoun'
																		placeholder=' '
																		list={[
																			{
																				value: 'yes',
																				text: 'Yes',
																			},
																			{
																				value: 'no',
																				text: 'No',
																			},
																		]}
																		onChange={
																			formikSelect.handleChange
																		}
																		value={
																			formikSelect.values
																				.isSellInOtherCoun
																		}
																	/>
																</FormGroup>
															</div>
															{/* {formikSelect.values
																.isSellInOtherCoun === 'no' ? (
																<Alert
																	color='warning'
																	isLight
																	isOutline={false}
																	borderWidth={null}
																	isDismissible={false}
																	icon='info'>
																	Great let’s focus on your local
																	market, we have a lot of work
																	there
																</Alert>
															) : (
																<Alert
																	color='warning'
																	isLight
																	isOutline={false}
																	borderWidth={null}
																	isDismissible={false}
																	icon='info'>
																	{' '}
																	Great challenge! Let’s focus on
																	your local market first, you can
																	answer this product quiz for
																	each new country later on – just
																	duplicate the product card and
																	update it for promotion in the
																	new country
																</Alert>
															)} */}
															<div className='col-12'>
																<FormGroup
																	id='isSellInOtherCoun'
																	label='Is this your main product to promote?'>
																	<Select
																		ariaLabel='ProductPriority'
																		placeholder=' '
																		list={[
																			{
																				value: 'yes',
																				text: 'Yes',
																			},
																			{
																				value: 'no',
																				text: 'No',
																			},
																		]}
																		onChange={
																			formikSelect.handleChange
																		}
																		value={
																			formikSelect.values
																				.isSellInOtherCoun
																		}
																	/>
																</FormGroup>
															</div>
															<div className='col-12'>
																<FormGroup
																	id='soldWithCompProducts'
																	label='Can this product be sold with complimentary 
products?'>
																	<Select
																		ariaLabel='ProductPriority'
																		placeholder=' '
																		list={[
																			{
																				value: 'yes',
																				text: 'Yes',
																			},
																			{
																				value: 'no',
																				text: 'No',
																			},
																		]}
																		onChange={
																			formikSelect.handleChange
																		}
																		value={
																			formikSelect.values
																				.soldWithCompProducts
																		}
																	/>
																</FormGroup>
															</div>
															{/* <div className='col-12'>
																<FormGroup
																	id='competitorsList'
																	label='Please name direct competitors (make sure to write 
																		the exact name without spelling mistakes)'
																	isFloating>
																	<Input
																		placeholder='Please name direct competitors (make sure to write 
																			the exact name without spelling mistakes)'
																		type='text'
																		onChange={
																			formikSelect.handleChange
																		}
																		onBlur={
																			formikSelect.handleBlur
																		}
																		value={
																			formikSelect.values
																				.competitorsList
																		}
																		isValid={
																			formikSelect.isValid
																		}
																		isTouched={
																			formikSelect.touched
																				.competitorsList
																		}
																		invalidFeedback={
																			formikSelect.errors
																				.competitorsList
																		}
																		validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div> */}
															<div className='col-12'>
																<FormGroup
																	id='averageSelling'
																	label=' What is your average selling price?'
																	isFloating>
																	<Input
																		placeholder=' What is your average selling price? '
																		type='text'
																		onChange={
																			formikSelect.handleChange
																		}
																		onBlur={
																			formikSelect.handleBlur
																		}
																		value={
																			formikSelect.values
																				.averageSelling
																		}
																		isValid={
																			formikSelect.isValid
																		}
																		isTouched={
																			formikSelect.touched
																				.averageSelling
																		}
																		invalidFeedback={
																			formikSelect.errors
																				.averageSelling
																		}
																		validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
															{/* <div className='col-12'>
																<FormGroup
																	id='averageSellingMarket'
																	label=' What is the average selling price on the market? '
																	isFloating>
																	<Input
																		placeholder=' What is the average selling price on the market? '
																		type='text'
																		onChange={
																			formikSelect.handleChange
																		}
																		onBlur={
																			formikSelect.handleBlur
																		}
																		value={
																			formikSelect.values
																				.averageSellingMarket
																		}
																		isValid={
																			formikSelect.isValid
																		}
																		isTouched={
																			formikSelect.touched
																				.averageSellingMarket
																		}
																		invalidFeedback={
																			formikSelect.errors
																				.averageSellingMarket
																		}
																		validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div> */}
														</>
													)}
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
												Save
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
	)
}

export default ProductDetailsPage
