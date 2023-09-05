import React, { FC, useState } from 'react';
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
import CustomerEditModal from '../crm/CustomerEditModal';
import Card, {
	CardBody,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import { dashboardPagesMenu, demoPagesMenu } from '../../../menu';
import { getFirstLetter, priceFormat } from '../../../helpers/helpers';
import { getColorNameWithIndex } from '../../../common/data/enumColors';
import Page from '../../../layout/Page/Page';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal';
import Select from '../../../components/bootstrap/forms/Select';
import Accordion, { AccordionItem } from '../../../components/bootstrap/Accordion';

const Partners: FC = () => {
	const { darkModeStatus } = useDarkMode();

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
	const [isOpen, setIsOpen] = useState(false);
	const formik = useFormik({
		initialValues: {
			searchInput: '',
			payment: Object.keys(PAYMENTS).map((i) => PAYMENTS[i].name),
			minPrice: '',
			maxPrice: '',
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
			// alert(JSON.stringify(values, null, 2));
			console.log(typeof values.payment);
		},
	});
	// console.log(data);
	// console.log(formik.values.payment);

	const filteredData = data.filter((f) =>
		// Name
		f.name.toLowerCase().includes(formik.values.searchInput.toLowerCase()),
	);

	const { items, requestSort, getClassNamesFor } = useSortableData(filteredData);

	// const [editModalStatus, setEditModalStatus] = useState<boolean>(false);

	const SELECT_OPTIONS = [
		{ value: 'Social Media Marketing', text: 'Social Media Marketing' },
		{ value: 'Search Engine Optimization', text: 'Search Engine Optimization' },
		{ value: 'Pay-Per-Click', text: 'Pay-Per-Click' },
		{ value: 'Website Development', text: 'Website Development' },
		{ value: 'E-commerce Solutions', text: 'E-commerce Solutions' },
	];
	const SELECT_OPTIONS_SOCIAL_SHARE = [
		{ value: 'Facebook', text: 'Facebook' },
		{ value: 'Instagram', text: 'Instagram' },
		{ value: 'LinkedIn', text: 'LinkedIn' },
	];
	const SELECT_OPTIONS_CONNECTION = [
		{ value: 'Friend', text: 'Friend' },
		{ value: 'Colleague', text: 'Colleague' },
		{ value: 'Other ', text: 'Other' },
	];

	const formikNewPartner = useFormik({
		initialValues: {
			name: '',
			email: '',
			contact: '',
			streetAddress: '',
			streetAddress2: '',
			city: '',
			stateFull: '',
			zip: '',
		},
		onSubmit: (values) => {
			// console.log(values);
			setIsOpen(false);
		},
	});
	return (
		<PageWrapper title={dashboardPagesMenu.partners.text}>
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
						placeholder='Search partner...'
						onChange={formik.handleChange}
						value={formik.values.searchInput}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					<Button
						icon='PersonAdd'
						color='primary'
						isLight
						onClick={() => setIsOpen(true)}>
						Add Partner
					</Button>
				</SubHeaderRight>
			</SubHeader>
			<Page container='fluid'>
				<div className='display-4 fw-bold py-3'>Partners</div>
				<div className='row h-100'>
					<div className='row-12'>
						<Card stretch>
							<CardBody isScrollable className='table-responsive'>
								<table className='table table-modern table-hover'>
									<thead>
										<tr>
											<th
												onClick={() => requestSort('name')}
												className='cursor-pointer text-decoration-underline'>
												Partner{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('name')}
													icon='FilterList'
												/>
											</th>
											<th>Email</th>
											<th>Metting on</th>
											<th>View</th>
										</tr>
									</thead>
									<tbody>
										{dataPagination(items, currentPage, perPage).map((i) => (
											<tr key={i.id}>
												<td>
													<div className='d-flex align-items-center'>
														<div className='flex-shrink-0'>
															<div
																className='ratio ratio-1x1 me-3'
																style={{ width: 48 }}>
																<div
																	className={`bg-l${
																		darkModeStatus
																			? 'o25'
																			: '25'
																	}-${getColorNameWithIndex(
																		i.id,
																	)} text-${getColorNameWithIndex(
																		i.id,
																	)} rounded-2 d-flex align-items-center justify-content-center`}>
																	<span className='fw-bold'>
																		{getFirstLetter(i.name)}
																	</span>
																</div>
															</div>
														</div>
														<div className='flex-grow-1'>
															<div className='fs-6 fw-bold'>
																{i.name}
															</div>
															<div className='text-muted'>
																<Icon icon='Label' />{' '}
																<small>{i.type}</small>
															</div>
														</div>
													</div>
												</td>
												<td>
													<Button
														isLink
														color='light'
														icon='Email'
														className='text-lowercase'
														tag='a'
														href={`mailto:${i.email}`}>
														{i.email}
													</Button>
												</td>
												<td>
													<div>{i.membershipDate.format('ll')}</div>
													<div>
														<small className='text-muted'>
															{i.membershipDate.fromNow()}
														</small>
													</div>
												</td>
												<td>
													<Button
														icon='info'
														tag='a'
														to={`../${demoPagesMenu.partnerID.path}/${i.id}`}>
														View
													</Button>
												</td>
											</tr>
										))}
									</tbody>
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
			</Page>
			<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='lg'>
				<ModalHeader setIsOpen={setIsOpen} className='p-4'>
					<ModalTitle id='new_partner'>New Partners</ModalTitle>
				</ModalHeader>
				<ModalBody className='px-4'>
					<div className='row g-4'>
						<FormGroup id='name' label='Name' className='col-lg-6'>
							<Input
								onChange={formikNewPartner.handleChange}
								value={formikNewPartner.values.name}
							/>
						</FormGroup>
						<FormGroup id='email' label='Email' className='col-lg-6'>
							<Input
								type='email'
								onChange={formikNewPartner.handleChange}
								value={formikNewPartner.values.email}
							/>
						</FormGroup>
						<FormGroup id='exampleSelectOneWay' label='Connection' className='col-lg-6'>
							<Select
								ariaLabel='Default select example'
								placeholder='Open this select menu'
								// onChange={handleChange}
								// value={values.exampleSelectOneWay}
								list={SELECT_OPTIONS_CONNECTION}
							/>
						</FormGroup>
						<FormGroup
							id='exampleSelectOneWay'
							label='Share on Social media'
							className='col-lg-6'>
							<Select
								ariaLabel='Default select example'
								placeholder='Open this select menu'
								// onChange={handleChange}
								// value={values.exampleSelectOneWay}
								list={SELECT_OPTIONS_SOCIAL_SHARE}
							/>
						</FormGroup>
						<FormGroup
							id='exampleSelectOneWay'
							label='Product/Service'
							className='col-lg-6'>
							<Select
								ariaLabel='Default select example'
								placeholder='Open this select menu'
								// onChange={handleChange}
								// value={values.exampleSelectOneWay}
								list={SELECT_OPTIONS}
							/>
						</FormGroup>
						<FormGroup id='contact' label='Tel' className='col-lg-6'>
							<Input
								onChange={formikNewPartner.handleChange}
								value={formikNewPartner.values.contact}
							/>
						</FormGroup>
						<div className='col-md-12'>
							<Card className='rounded-1 mb-0'>
								<CardHeader>
									<CardLabel icon='ReceiptLong'>
										<CardTitle>Address</CardTitle>
									</CardLabel>
								</CardHeader>
								<CardBody>
									<div className='row g-3'>
										<FormGroup
											id='streetAddress'
											label='Address Line'
											className='col-12'>
											<Input
												type='text'
												onChange={formikNewPartner.handleChange}
												value={formikNewPartner.values.streetAddress}
											/>
										</FormGroup>
										<FormGroup
											id='streetAddress2'
											label='Address Line 2'
											className='col-12'>
											<Input
												onChange={formikNewPartner.handleChange}
												value={formikNewPartner.values.streetAddress2}
											/>
										</FormGroup>
										<FormGroup id='city' label='City' className='col-md-4'>
											<Input
												onChange={formikNewPartner.handleChange}
												value={formikNewPartner.values.city}
											/>
										</FormGroup>
										<FormGroup
											id='stateFull'
											label='State'
											className='col-md-4'>
											<Input
												onChange={formikNewPartner.handleChange}
												value={formikNewPartner.values.stateFull}
											/>
										</FormGroup>
										<FormGroup id='zip' label='Zip' className='col-md-4'>
											<Input
												onChange={formikNewPartner.handleChange}
												value={formikNewPartner.values.zip}
											/>
										</FormGroup>
									</div>
								</CardBody>
								<CardBody>
									<div className='row g-3'>
										<div className='col-12'>
											<Accordion id='faq' shadow='sm'>
												<AccordionItem
													id='faq1'
													title='More info about find the right partner'>
													In at urna nec risus aliquam accumsan. Vivamus
													rutrum rhoncus massa, sed facilisis justo
													sodales vitae. Pellentesque mattis felis ac enim
													viverra faucibus. Curabitur maximus nibh massa,
													ut dictum quam scelerisque eget. Maecenas
													scelerisque egestas diam a posuere. Sed non
													vehicula nunc. Proin feugiat nisi ut mi mattis
													bibendum. Suspendisse lobortis libero ut libero
													semper, sed fermentum lectus commodo. Nam
													pretium mi sit amet purus imperdiet tempus.
													Aliquam congue ligula quis vulputate viverra.
													Morbi dapibus vitae odio vel luctus. Vivamus
													tellus tortor, aliquet id ultricies a, hendrerit
													non massa. Ut feugiat quam non sollicitudin
													molestie. Praesent ut ante mattis, efficitur est
													ac, scelerisque magna. Donec congue erat a
													suscipit condimentum. Curabitur purus nunc,
													ullamcorper vitae lectus quis, aliquam lacinia
													arcu.
												</AccordionItem>
												<AccordionItem
													id='faq2'
													title='More info about what is a good partnership'>
													Nunc ex odio, fermentum dignissim urna eu,
													suscipit vehicula magna. Vestibulum vel risus
													sed metus pellentesque gravida. Etiam hendrerit
													lorem vitae elit tempor bibendum. Vivamus
													tincidunt consectetur erat at venenatis. Nam
													elementum varius massa non congue. Class aptent
													taciti sociosqu ad litora torquent per conubia
													nostra, per inceptos himenaeos. Vivamus
													fermentum scelerisque ligula, quis bibendum
													felis luctus quis. Donec magna sem, ullamcorper
													id tempus ut, pharetra sed felis. Ut quis ante
													tristique, condimentum lacus eget, mollis magna.
													Phasellus fringilla diam ac erat consequat
													feugiat. Vestibulum eu ex eget ligula placerat
													finibus. Quisque vitae velit feugiat, mattis
													lectus nec, molestie justo. Vivamus nec
													tincidunt augue. Pellentesque nec mattis ipsum,
													non malesuada libero. Proin aliquam est turpis,
													sit amet efficitur ex gravida ac. Nunc in
													molestie augue.
												</AccordionItem>
											</Accordion>
										</div>
									</div>
								</CardBody>
							</Card>
						</div>
					</div>
				</ModalBody>
				<ModalFooter className='px-4 pb-4'>
					<CardFooterLeft>
						<Button
							color='danger'
							onClick={() => {
								setIsOpen(false);
							}}>
							Cancel
						</Button>
					</CardFooterLeft>
					<CardFooterRight>
						<Button color='info' onClick={formikNewPartner.handleSubmit}>
							Save
						</Button>
					</CardFooterRight>
				</ModalFooter>
			</Modal>
		</PageWrapper>
	);
};

export default Partners;
