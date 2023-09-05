import React, { FC, useState } from 'react';
import classNames from 'classnames';
import { useFormik } from 'formik';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import Input from '../../../components/bootstrap/forms/Input';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import Popovers from '../../../components/bootstrap/Popovers';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import InputGroup, { InputGroupText } from '../../../components/bootstrap/forms/InputGroup';
import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
import useSortableData from '../../../hooks/useSortableData';
import useDarkMode from '../../../hooks/useDarkMode';
import PAYMENTS from '../../../common/data/enumPaymentMethod';
import PaginationButtons, {
	PER_COUNT,
	dataPagination,
} from '../../../components/PaginationButtons';
import data from '../../../common/data/dummyCustomerData';
import CustomerEditModal from './CustomerEditModal';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import { dashboardPagesMenu, demoPagesMenu } from '../../../menu';
import Page from '../../../layout/Page/Page';
import CUSTOMER from '../../../common/data/customerDummyData';
import Badge from '../../../components/bootstrap/Badge';

const CustomersGridView: FC = () => {
	const { darkModeStatus } = useDarkMode();
	const [filterMenu, setFilterMenu] = useState(false);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
	const [viewState, setViewState] = useState<boolean>(true);

	const formik = useFormik({
		initialValues: {
			available: false,
			searchInput: '',
			payment: Object.keys(PAYMENTS).map((i) => PAYMENTS[i].name),
			minPrice: '',
			maxPrice: '',
			services: [],
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
			setFilterMenu(false);
			// alert(JSON.stringify(values, null, 2));
		},
	});

	const filteredData = data.filter((f) =>
		// Name
		f.name.toLowerCase().includes(formik.values.searchInput.toLowerCase()),
	);

	const { items, requestSort, getClassNamesFor } = useSortableData(filteredData);

	const [editModalStatus, setEditModalStatus] = useState<boolean>(false);

	const searchUsers = Object.keys(CUSTOMER)
		.filter(
			(key) =>
				CUSTOMER[key].name
					.toLowerCase()
					.includes(formik.values.searchInput.toLowerCase()) ||
				CUSTOMER[key].name
					.toLowerCase()
					.includes(formik.values.searchInput.toLowerCase()) ||
				CUSTOMER[key].email
					.toLowerCase()
					.includes(formik.values.searchInput.toLowerCase()) ||
				CUSTOMER[key].location
					.toLowerCase()
					.includes(formik.values.searchInput.toLowerCase()),
		)
		.filter((key2) => (formik.values.available ? CUSTOMER[key2].isOnline : key2))
		.map((i) => CUSTOMER[i]);
	return (
		<PageWrapper title={dashboardPagesMenu.Customers.text}>
			<SubHeader>
				<SubHeaderLeft>
					<label
						className='border-0 bg-transparent cursor-pointer me-0'
						htmlFor='searchInput'>
						<Icon icon='Search' size='2x' color='primary' />
					</label>
					<Input
						id='searchInput'
						type='search'
						className='border-0 shadow-none bg-transparent'
						placeholder='Search customer...'
						onChange={formik.handleChange}
						value={formik.values.searchInput}
					/>
				</SubHeaderLeft>
				<SubHeaderRight className='d-flex gap-3'>
					<Button
						color={darkModeStatus ? 'light' : 'dark'}
						isLight
						type='button'
						className={`${viewState == true ? 'me-0 active' : 'me-0'}`}
						onClick={() => setViewState(true)}>
						List View
					</Button>
					<Button
						color={darkModeStatus ? 'light' : 'dark'}
						isLight
						type='button'
						className={`${viewState == false ? 'active' : ''}`}
						onClick={() => setViewState(false)}>
						Grid View
					</Button>

					<SubheaderSeparator />
					<Button
						icon='PersonAdd'
						color='info'
						isLight
						tag='a'
						onClick={() => setEditModalStatus(true)}>
						New Customer
					</Button>
				</SubHeaderRight>
			</SubHeader>
			<Page container='fluid'>
				{viewState ? (
					<div className='listview'>
						<div className='display-4 fw-bold py-3'>Customers</div>
						<div className='row h-100'>
							<div className='row-12'>
								<Card>
									<CardBody className='table-responsive'>
										<table className='table table-modern table-hover'>
											<thead>
												<tr>
													<th
														onClick={() => requestSort('name')}
														className='cursor-pointer text-decoration-underline'>
														Customer{' '}
														<Icon
															size='lg'
															className={getClassNamesFor('name')}
															icon='FilterList'
														/>
													</th>
													<th>Name/Email</th>
													<th>Location</th>
													<th>Connection</th>
													<th>Services</th>
													<th
														onClick={() => requestSort('balance')}
														className='cursor-pointer text-decoration-underline'>
														Detail
														<Icon
															size='lg'
															className={getClassNamesFor('balance')}
															icon='FilterList'
														/>
													</th>
												</tr>
											</thead>
											{searchUsers.map((user) => (
												<tbody key={user.name}>
													<tr>
														<td className='col d-flex'>
															<div className='flex-shrink-0 '>
																<div className='position-relative'>
																	<div
																		className='ratio ratio-1x1'
																		style={{
																			width: 50,
																		}}>
																		<div
																			className={classNames(
																				`bg-l25-${user.color}`,
																				'rounded-2',
																				'd-flex align-items-center justify-content-center',
																				'overflow-hidden',
																				'shadow',
																			)}>
																			<img
																				src={user.src}
																				alt={user.name}
																				width={50}
																			/>
																		</div>
																	</div>
																</div>
															</div>
														</td>
														<td>
															<div className='flex-grow-1 ms-3 d-flex justify-content-between'>
																<div className='w-100'>
																	<div className='row'>
																		<div className='col'>
																			<div className='d-flex align-items-center'>
																				<div className='fw-bold fs-5 me-2'>
																					{`${user.name}`}
																				</div>
																			</div>

																			<div className='text-muted'>
																				{user.email}
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</td>
														<td className='text-success fw-bold'>
															{user.location}
														</td>
														<td className='fw-bold'>
															{user.connection}
														</td>
														<td>
															{!!user?.services && (
																<div className='row g-2 mt-3'>
																	{user?.services.map(
																		(service) => (
																			<div
																				key={service}
																				className='col-auto'>
																				<Badge
																					isLight
																					color={
																						user.color
																					}
																					className='px-3 py-2'>
																					<p className='h6 mb-0'>
																						{service}
																					</p>
																				</Badge>
																			</div>
																		),
																	)}
																</div>
															)}
														</td>
														<td>
															<div className='col-auto'>
																<Button
																	icon='visibility'
																	color='dark'
																	isLight
																	hoverShadow='sm'
																	tag='a'
																	to={`../${demoPagesMenu.crm.subMenu.customerID.path}/${user.id}`}
																	data-tour={user.name}
																	aria-label='More info'
																/>
															</div>
														</td>
													</tr>
												</tbody>
											))}
										</table>
									</CardBody>
									<PaginationButtons
										data={filteredData}
										label='customers'
										setCurrentPage={setCurrentPage}
										currentPage={currentPage}
										perPage={perPage}
										setPerPage={setPerPage}
									/>
								</Card>
							</div>
						</div>
					</div>
				) : (
					<div className='grid-view'>
						<div className='display-4 fw-bold py-3'>Customers</div>
						<div className='row row-cols-xxl-3 row-cols-lg-3 row-cols-md-2'>
							{searchUsers.map((user) => (
								<div key={user.name} className='col'>
									<Card>
										<CardBody>
											<div className='row g-3'>
												<div className='col d-flex'>
													<div className='flex-shrink-0'>
														<div className='position-relative'>
															<div
																className='ratio ratio-1x1'
																style={{ width: 50 }}>
																<div
																	className={classNames(
																		`bg-l25-${user.color}`,
																		'rounded-2',
																		'd-flex align-items-center justify-content-center',
																		'overflow-hidden',
																		'shadow',
																	)}>
																	<img
																		src={user.src}
																		alt={user.name}
																		width={50}
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
																			{`${user.name}`}
																		</div>
																		<small className='border border-success border-2 text-success fw-bold px-2 py-1 rounded-1'>
																			{user.location}
																		</small>
																	</div>

																	<div className='text-muted'>
																		{user.email}
																	</div>
																</div>
																<div className='col-auto'>
																	<Button
																		icon='info'
																		color='dark'
																		isLight
																		hoverShadow='sm'
																		tag='a'
																		to={`../${demoPagesMenu.crm.subMenu.customerID.path}/${user.id}`}
																		data-tour={user.name}
																		aria-label='More info'
																	/>
																</div>
															</div>
															{!!user?.services && (
																<div className='row g-2 mt-3'>
																	{user?.services.map(
																		(service) => (
																			<div
																				key={service}
																				className='col-auto'>
																				<Badge
																					isLight
																					color={
																						user.color
																					}
																					className='px-3 py-2'>
																					<p className='h6 mb-0'>
																						{service}
																					</p>
																				</Badge>
																			</div>
																		),
																	)}
																</div>
															)}
														</div>
													</div>
												</div>
											</div>
										</CardBody>
									</Card>
								</div>
							))}
						</div>
					</div>
				)}
			</Page>
			<CustomerEditModal setIsOpen={setEditModalStatus} isOpen={editModalStatus} id='0' />
		</PageWrapper>
	);
};

export default CustomersGridView;
