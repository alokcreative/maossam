import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Page from '../../../layout/Page/Page';
import classNames from 'classnames';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Button from '../../../components/bootstrap/Button';
import CommonGridProductItem from '../../_common/CommonGridProductItem';
import tableData from '../../../common/data/dummyProductData';
import OffCanvas, {
	OffCanvasBody,
	OffCanvasHeader,
	OffCanvasTitle,
} from '../../../components/bootstrap/OffCanvas';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Badge from '../../../components/bootstrap/Badge';
import Input from '../../../components/bootstrap/forms/Input';
import PlaceholderImage from '../../../components/extras/PlaceholderImage';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import { pagesMenu } from '../../../menu';
import useDarkMode from '../../../hooks/useDarkMode';
import ProductListView from './ProductListView';
import Select from '../../../components/bootstrap/forms/Select';
import { useNavigate } from 'react-router-dom';
import { string } from 'yargs';

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

const ProductPage = () => {
	const { darkModeStatus } = useDarkMode();
	const [data, setData] = useState(tableData);
	const [editItem, setEditItem] = useState<IValues | null>(null);
	const [editPanel, setEditPanel] = useState<boolean>(false);
	const [productView, setproductView] = useState<boolean>(false);
	const [filterableData, setFilterableData] = useState(data);

	const searchAndFilterData = (searchValue: string) => {
		const tempData = data;

		return tempData.filter((item) => {
			return item.name.toLowerCase().includes(searchValue);
		});
	};
	function handleRemove(id: number) {
		const newData = data.filter((item) => item.id !== id);
		setData(newData);
	}

	const setProductView = (status: boolean) => {
		setproductView(status);
	};
	const navigate = useNavigate();
	function handleEdit(id: number) {
		const newData = data.filter((item) => item.id === id);
		// setEditItem(newData[0]);
	}

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

	const formikSelect = useFormik({
		initialValues: {
			itemCat: '',
		},
		onSubmit: () => {},
	});
	const LIST = [
		{ value: 'Service', text: 'Service' },
		{ value: 'Product', text: 'Product' },
	];
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

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const debounce = (func: any, wait: number | undefined) => {
		let timeout: string | number | NodeJS.Timeout | undefined;

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return function executedFunction(...args: any[]) {
			const later = () => {
				clearTimeout(timeout);
				func(...args);
			};

			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
		};
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onFormSubmit = (values: { search: any }) => {
		const searchValue = values.search.toString().toLowerCase();
		const newData = searchAndFilterData(searchValue);

		if (!values.search) {
			setFilterableData(data);
		} else {
			setFilterableData(newData);
		}
	};
	const formikSearch = useFormik({
		initialValues: {
			search: '',
		},

		onSubmit: onFormSubmit,
	});
	return (
		<PageWrapper title={pagesMenu.gridPages.subMenu.gridBoxed.text}>
			<SubHeader>
				<SubHeaderLeft>
					<div className='col-md-5'>
						<Input
							id='search'
							size='lg'
							placeholder='Search...'
							className={classNames('rounded-1', {
								'bg-white': !darkModeStatus,
							})}
							onChange={(e: { target: { value: string | any[] } }) => {
								formikSearch.handleChange(e);

								if (e.target.value.length > 2)
									debounce(
										() =>
											onFormSubmit({
												...formikSearch.values,
												search: e.target.value,
											}),
										1000,
									)();

								if (e.target.value.length === 0) formikSearch.resetForm();
							}}
							value={formikSearch.values.search}
						/>
					</div>
				</SubHeaderLeft>
				<SubHeaderRight className='d-flex gap-3'>
					<Button
						color={darkModeStatus ? 'light' : 'dark'}
						isLight
						type='button'
						className={`${productView == false ? 'me-0 active' : 'me-0'}`}
						onClick={() => setProductView(false)}>
						Grid View
					</Button>
					<Button
						color={darkModeStatus ? 'light' : 'dark'}
						isLight
						type='button'
						className={`${productView == true ? 'active' : ''}`}
						onClick={() => setProductView(true)}>
						List View
					</Button>
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
				<div className='display-4 fw-bold py-3'>Products</div>
				{productView === false ? (
					<div className='row'>
						{filterableData.map((item) => (
							<div key={item.id} className='col-xxl-3 col-xl-4 col-md-6'>
								<CommonGridProductItem
									id={item.id}
									name={item.name}
									category={item.category}
									img={item.image}
									price={item.price}
									editAction={`../${pagesMenu.sales.subMenu.productID.path}/${item.id}`}
									deleteAction={() => handleRemove(item.id)}
								/>
							</div>
						))}
					</div>
				) : (
					<ProductListView />
				)}
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
									<FormGroup id='itemCat' label='Item Category'>
										<Select
											ariaLabel='Item Category'
											placeholder='Choose...'
											list={LIST}
											onChange={formikSelect.handleChange}
											value={formikSelect.values.itemCat}
										/>
									</FormGroup>
								</div>
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

export default ProductPage;
