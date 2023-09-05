import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Page from '../../../../layout/Page/Page';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../../layout/SubHeader/SubHeader';
import Button from '../../../../components/bootstrap/Button';
import Company1 from '../../../../assets/logos/company1.png';
import tableData from '../../../../common/data/dummyProductData';
import OffCanvas, {
	OffCanvasBody,
	OffCanvasHeader,
	OffCanvasTitle,
} from '../../../../components/bootstrap/OffCanvas';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import Badge from '../../../../components/bootstrap/Badge';
import Input from '../../../../components/bootstrap/forms/Input';
import PlaceholderImage from '../../../../components/extras/PlaceholderImage';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import { dashboardPagesMenu } from '../../../../menu';
import useDarkMode from '../../../../hooks/useDarkMode';
import Dropdown, { DropdownMenu, DropdownToggle } from '../../../../components/bootstrap/Dropdown';
import Checks, { ChecksGroup } from '../../../../components/bootstrap/forms/Checks';
import useSortableData from '../../../../hooks/useSortableData';
import toolsData from '../../../../common/data/dummyMarketingTools';
import CommonGridMarketingToolItem from '../../../_common/CommonGridMarketingToolItem';

interface IValues {
	name: string;
	price: number;
	stock: number;
	category: string;
	image?: string | null;
}
const validate = (values: IValues) => {
	const errors = {
		name: '',
		price: '',
		stock: '',
		category: '',
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

	if (!values.stock) {
		errors.stock = 'Required';
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

const MarketingTools = () => {
	const { darkModeStatus } = useDarkMode();
	const [data, setData] = useState(tableData);
	const [editItem, setEditItem] = useState<IValues | null>(null);
	const [editPanel, setEditPanel] = useState<boolean>(false);

	function handleRemove(id: number) {
		const newData = data.filter((item) => item.id !== id);
		setData(newData);
	}

	function handleEdit(id: number) {
		const newData = data.filter((item) => item.id === id);
		setEditItem(newData[0]);
	}
	// console.log('Data >>> ', data);

	const formik = useFormik({
		initialValues: {
			name: '',
			price: 0,
			stock: 0,
			category: '',
		},
		validate,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
			setEditPanel(false);
		},
	});

	useEffect(() => {
		if (editItem) {
			formik.setValues({
				name: editItem.name,
				price: editItem.price,
				stock: editItem.stock,
				category: editItem.category,
			});
		}
		return () => {
			formik.setValues({
				name: '',
				price: 0,
				stock: 0,
				category: '',
			});
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [editItem]);

	const formikChecks = useFormik({
		initialValues: {
			store: ['Company A', 'Company B', 'Company C', 'Company D'],
		},
		onSubmit: () => {},
	});
	// console.log(formik.values.store);
	const filteredData = data.filter((f) => formikChecks.values.store.includes(f.store));

	const { items, requestSort, getClassNamesFor } = useSortableData(filteredData);

	// console.log(formik.values.store);
	return (
		<PageWrapper title={dashboardPagesMenu.marketingtools.text}>
			<SubHeader>
				<SubHeaderLeft>
					<img src={Company1} alt='Company' height={24} />
					<span>Products</span>
					<SubheaderSeparator />
					<span className='text-muted'>{data.length} items</span>
				</SubHeaderLeft>
				<SubHeaderRight>
					<Dropdown>
						<DropdownToggle hasIcon={false}>
							<Button
								icon='FilterAlt'
								color='dark'
								isLight
								className='btn-only-icon position-relative'
								aria-label='Filter'>
								{/* {data.length !== filteredData.length && (
									<Popovers desc='Filtering applied' trigger='hover'>
										<span className='position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2'>
											<span className='visually-hidden'>
												there is filtering
											</span>
										</span>
									</Popovers>
								)} */}
							</Button>
						</DropdownToggle>
						<DropdownMenu isAlignmentEnd size='lg'>
							<div className='container py-2'>
								<div className='row g-3'>
									<FormGroup label='Stores' className='col-12'>
										<ChecksGroup>
											<Checks
												key='Company A'
												id='Company A'
												label='Company A'
												name='store'
												value='Company A'
												onChange={formikChecks.handleChange}
												checked={formikChecks.values.store.includes(
													'Company A',
												)}
											/>
											<Checks
												key='Company B'
												id='Company B'
												label='Company B'
												name='store'
												value='Company B'
												onChange={formikChecks.handleChange}
												checked={formikChecks.values.store.includes(
													'Company B',
												)}
											/>
											<Checks
												key='Company C'
												id='Company C'
												label='Company C'
												name='store'
												value='Company C'
												onChange={formikChecks.handleChange}
												checked={formikChecks.values.store.includes(
													'Company C',
												)}
											/>
											<Checks
												key='Company D'
												id='Company D'
												label='Company D'
												name='store'
												value='Company D'
												onChange={formikChecks.handleChange}
												checked={formikChecks.values.store.includes(
													'Company D',
												)}
											/>
										</ChecksGroup>
									</FormGroup>
								</div>
							</div>
						</DropdownMenu>
					</Dropdown>
					<SubheaderSeparator />
					<Button
						color={darkModeStatus ? 'light' : 'dark'}
						isLight
						icon='Add'
						onClick={() => {
							setEditItem(null);
							setEditPanel(true);
						}}>
						Add New
					</Button>
				</SubHeaderRight>
			</SubHeader>
			<Page container='fluid'>
				<div className='display-4 fw-bold py-3 mb-2'>
					Digital tools for marketing and promoting your business
				</div>
				<div className='row'>
					{Object.keys(toolsData).map((category) => (
						<div key={category}>
							<p className='mb-3 h3 mt-3'>{category}</p>
							<div className='row'>
								{toolsData[category].map((tool) => (
									<div key={tool.name} className='col-xxl-3 col-xl-4 col-md-6'>
										<CommonGridMarketingToolItem
											id={tool.id}
											name={tool.name}
											description={tool.description}
											link={tool.link}
											logoLink={tool.logoLink}
										/>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</Page>

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
							<Badge color='primary' isLight>
								Edit
							</Badge>
						) : (
							<Badge color='success' isLight>
								New
							</Badge>
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

export default MarketingTools;
