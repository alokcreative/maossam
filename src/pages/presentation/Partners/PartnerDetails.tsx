import React, { FC, useState } from 'react';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { dashboardPagesMenu, demoPagesMenu } from '../../../menu';
import data from '../../../common/data/dummyCustomerData';
import salesData from '../../../common/data/dummySalesData';
import Button from '../../../components/bootstrap/Button';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Avatar from '../../../components/Avatar';
import Icon from '../../../components/icon/Icon';
import { priceFormat } from '../../../helpers/helpers';
import latestSalesData from '../../../common/data/dummySalesData';
import useSortableData from '../../../hooks/useSortableData';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons';
import PartnerEditModal from './PartnerEditModal';
import { getColorNameWithIndex } from '../../../common/data/enumColors';
import useDarkMode from '../../../hooks/useDarkMode';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../../../components/bootstrap/Modal';
import CommonDashboardRecentActivities from '../dashboard/common/CommonDashboardRecentActivities';
import CommonDashboardTopSeller from '../dashboard/common/CommonDashboardTopSeller';
import showNotification from '../../../components/extras/showNotification';
import Wizard, { WizardItem } from '../../../components/Wizard';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Select from '../../../components/bootstrap/forms/Select';
import Label from '../../../components/bootstrap/forms/Label';
import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
import CommonTaskTable from '../../_common/CommonTaskTable';

interface IPreviewItemProps {
	title: string;
	value: string;
}
const PreviewItem: FC<IPreviewItemProps> = ({ title, value }) => {
	return (
		<>
			<div className='col-3 text-end'>{title}</div>
			<div className='col-9 fw-bold'>{value || '-'}</div>
		</>
	);
};
const Partner = () => {
	const { darkModeStatus } = useDarkMode();

	const { id } = useParams();
	console.log(id);

	const itemData = data.filter((item) => item.id.toString() === id?.toString());
	const item = itemData[0];
	console.log(item);

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['3']);

	const { items, requestSort, getClassNamesFor } = useSortableData(latestSalesData);

	const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
	const handleClickEdit = () => {
		setEditModalStatus(true);
	};

	const [newTransferModal, setNewTransferModal] = useState<boolean>(false);

	const bankTypes: { id: number; name: string }[] = [
		{ id: 1, name: 'Fast Bank' },
		{ id: 2, name: 'Bank of World' },
		{ id: 3, name: 'OS Bank' },
	];
	const formik = useFormik({
		initialValues: {
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
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
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

	return (
		<PageWrapper title={demoPagesMenu.projectManagement.subMenu.item.text}>
			<SubHeader>
				<SubHeaderLeft>
					<Button
						color='primary'
						isLink
						icon='ArrowBack'
						tag='a'
						to={`../${dashboardPagesMenu.partners.path}`}>
						Back to List
					</Button>
					<SubheaderSeparator />
					<span className='text-muted fst-italic me-2'>Last update:</span>
					<span className='fw-bold'>13 hours ago</span>
				</SubHeaderLeft>
				<SubHeaderRight>
					<Button icon='Edit' color='primary' isLight onClick={handleClickEdit}>
						Edit
					</Button>
				</SubHeaderRight>
			</SubHeader>
			<Page container='fluid'>
				<div className='pt-3 pb-5 d-flex align-items-center justify-content-between'>
					<div className='d-flex align-items-center'>
						<span className='display-4 fw-bold me-3'>{item.name}</span>
						<span className='border border-success border-2 text-success fw-bold px-3 py-2 rounded'>
							{item.type}
						</span>
					</div>
					<div>
						<Button
							icon='Add'
							color='success'
							tag='a'
							to={`../${demoPagesMenu.addtask.path}`}>
							Add Task
						</Button>
					</div>
				</div>
				<div className='row'>
					<div className='col-lg-4'>
						<Card className='shadow-3d-primary' stretch>
							<CardBody>
								<div className='row g-5 py-3'>
									<div className='col-12 d-flex justify-content-center'>
										<Avatar
											src={item.src}
											srcSet={item.srcSet}
											color={getColorNameWithIndex(item.id)}
											isOnline={item.isOnline}
										/>
									</div>
									<div className='col-12'>
										<div className='row g-3'>
											<div className='col-12'>
												<div className='d-flex align-items-center'>
													<div className='flex-shrink-0'>
														<Icon
															icon='Mail'
															size='3x'
															color='primary'
														/>
													</div>
													<div className='flex-grow-1 ms-3'>
														<div className='fw-bold fs-5 mb-0'>
															{item.email}
														</div>
														<div className='text-muted'>
															Email Address
														</div>
													</div>
												</div>
											</div>
											<div className='col-12'>
												<div className='d-flex align-items-center'>
													<div className='flex-shrink-0'>
														<Icon
															icon='Phone'
															size='3x'
															color='primary'
														/>
													</div>
													<div className='flex-grow-1 ms-3'>
														<div className='fw-bold fs-5 mb-0'>
															{item.phone}
														</div>
														<div className='text-muted'>
															Phone Number
														</div>
													</div>
												</div>
											</div>
											<div className='col-12'>
												<div className='d-flex align-items-center'>
													<div className='flex-shrink-0'>
														<Icon
															icon='Home'
															size='3x'
															color='primary'
														/>
													</div>
													<div className='flex-grow-1 ms-3'>
														<div className='fw-bold fs-5 mb-0'>
															{item.city},{item.state}
														</div>
														<div className='text-muted'>Address</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
					<div className='col-lg-8'>
						<Card stretch>
							<CardHeader>
								<CardLabel icon='Receipt'>
									<CardTitle tag='div' className='h5'>
										Latest Sales
									</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<table className='table table-modern table-hover'>
									<thead>
										<tr>
											<th>Name</th>
											<th>Price</th>
											<th>Total Sale</th>
											<th>Type</th>
											<th>Date</th>
										</tr>
									</thead>
									<tbody>
										{dataPagination(items, currentPage, perPage).map((i) => (
											<tr>
												<td>
													<div className='d-flex'>
														<div className='flex-grow-1 ms-3 d-flex align-items-center text-nowrap'>
															{i.name}
														</div>
													</div>
												</td>
												<td>{i.price}</td>
												<td>{i.count}</td>
												<td>{i.type}</td>
												<td>{i.date}</td>
											</tr>
										))}
										{/* {dataPagination(items, currentPage, perPage).map((i) => (
											<tr key={i.name}>
												<td>{i.name}</td>
												<td>{dayjs(i.date).format('ll')}</td>
												<td>{priceFormat(i.price)}</td>
											</tr>
										))} */}
									</tbody>
								</table>
							</CardBody>
							<PaginationButtons
								data={items}
								label='items'
								setCurrentPage={setCurrentPage}
								currentPage={currentPage}
								perPage={perPage}
								setPerPage={setPerPage}
							/>
						</Card>
					</div>
				</div>
				<div className='row'>
					<div className='col-lg-6'>
						<Card>
							<CardHeader>
								<CardLabel icon='MapsHomeWork'>
									<CardTitle tag='div' className='h5'>
										Billing and Delivery Address
									</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='row'>
									<div className='col-md-6'>
										<p className='lead fw-bold'>Billing address</p>
										<div>{item.streetAddress}</div>
										<div>{item.streetAddress2}</div>
										<div>{item.city}</div>
										<div>{`${item.state}, ${item.stateFull}`}</div>
										<div>{item.zip}</div>
										<br />
										<div className='row g-2'>
											<div className='col-auto'>
												<Button
													icon='Edit'
													color='dark'
													isLight
													onClick={handleClickEdit}>
													Edit
												</Button>
											</div>
											<div className='col-auto'>
												<Button icon='Location On' color='primary' isLight>
													Make Primary
												</Button>
											</div>
										</div>
									</div>
									<div className='col-md-6'>
										<p className='lead fw-bold'>Delivery address</p>
										<div>{item.streetAddressDelivery}</div>
										<div>{item.streetAddress2Delivery}</div>
										<div>{item.cityDelivery}</div>
										<div>{`${item.stateDelivery}, ${item.stateFullDelivery}`}</div>
										<div>{item.zipDelivery}</div>
										<br />
										<div className='row g-2'>
											<div className='col-auto'>
												<Button
													icon='Edit'
													color='dark'
													isLight
													onClick={handleClickEdit}>
													Edit
												</Button>
											</div>
											<div className='col-auto'>
												<Button
													icon='LocationOn'
													color='primary'
													isLight
													isDisable>
													Primary
												</Button>
											</div>
										</div>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
					<div className='col-lg-6'>
						<CommonDashboardRecentActivities />
					</div>

					<div className='col-lg-12 mt-10'>
						<CommonTaskTable />
					</div>
				</div>
			</Page>
			<PartnerEditModal
				setIsOpen={setEditModalStatus}
				isOpen={editModalStatus}
				id={id || 'loading'}
			/>
			<Modal
				setIsOpen={setNewTransferModal}
				isOpen={newTransferModal}
				size='lg'
				titleId='transfer-modal'>
				<ModalHeader setIsOpen={setNewTransferModal}>
					<ModalTitle id='transfer-modal'>New Task</ModalTitle>
				</ModalHeader>
				<ModalBody className='h-100 d-flex align-items-center'>
					<div className='row w-100'>
						<div className='col-12 shadow-3d-container'>
							<Wizard
								isHeader
								color='info'
								onSubmit={formik.handleSubmit}
								className='shadow-3d-info'>
								<WizardItem id='step1' title='Account Detail'>
									<Card>
										<CardHeader>
											<CardLabel icon='Edit' iconColor='warning'>
												<CardTitle>Personal Information</CardTitle>
											</CardLabel>
										</CardHeader>
										<CardBody className='pt-0'>
											<div className='row g-4'>
												<div className='col-md-6'>
													<FormGroup
														id='firstName'
														label='First Name'
														isFloating>
														<Input
															placeholder='First Name'
															autoComplete='additional-name'
															onChange={formik.handleChange}
															value={formik.values.firstName}
														/>
													</FormGroup>
												</div>
												<div className='col-md-6'>
													<FormGroup
														id='lastName'
														label='Last Name'
														isFloating>
														<Input
															placeholder='Last Name'
															autoComplete='family-name'
															onChange={formik.handleChange}
															value={formik.values.lastName}
														/>
													</FormGroup>
												</div>
											</div>
										</CardBody>
									</Card>

									<Card className='mb-0'>
										<CardHeader>
											<CardLabel icon='MarkunreadMailbox' iconColor='success'>
												<CardTitle>Contact Information</CardTitle>
											</CardLabel>
										</CardHeader>
										<CardBody className='pt-0'>
											<div className='row g-4'>
												<div className='col-12'>
													<FormGroup
														id='phoneNumber'
														label='Phone Number'
														isFloating>
														<Input
															placeholder='Phone Number'
															type='tel'
															autoComplete='tel'
															onChange={formik.handleChange}
															value={formik.values.phoneNumber}
														/>
													</FormGroup>
												</div>
												<div className='col-12'>
													<FormGroup
														id='emailAddress'
														label='Email address'
														isFloating>
														<Input
															type='email'
															placeholder='Email address'
															autoComplete='email'
															onChange={formik.handleChange}
															value={formik.values.emailAddress}
														/>
													</FormGroup>
												</div>
											</div>
										</CardBody>
									</Card>
								</WizardItem>
								<WizardItem id='step2' title='Address'>
									<div className='row g-4'>
										<div className='col-lg-12'>
											<FormGroup
												id='addressLine'
												label='Address Line'
												isFloating>
												<Input
													onChange={formik.handleChange}
													value={formik.values.addressLine}
												/>
											</FormGroup>
										</div>
										<div className='col-lg-12'>
											<FormGroup
												id='addressLine2'
												label='Address Line 2'
												isFloating>
												<Input
													onChange={formik.handleChange}
													value={formik.values.addressLine2}
												/>
											</FormGroup>
										</div>

										<div className='col-lg-6'>
											<FormGroup id='city' label='City' isFloating>
												<Input
													onChange={formik.handleChange}
													value={formik.values.city}
												/>
											</FormGroup>
										</div>
										<div className='col-md-3'>
											<FormGroup id='state' label='State' isFloating>
												<Select
													ariaLabel='State'
													placeholder='Choose...'
													list={[
														{ value: 'usa', text: 'USA' },
														{ value: 'ca', text: 'Canada' },
													]}
													onChange={formik.handleChange}
													value={formik.values.state}
												/>
											</FormGroup>
										</div>
										<div className='col-md-3'>
											<FormGroup id='zip' label='Zip' isFloating>
												<Input
													onChange={formik.handleChange}
													value={formik.values.zip}
												/>
											</FormGroup>
										</div>
									</div>
								</WizardItem>
								<WizardItem id='step3' title='Bank Information'>
									<Card>
										<CardHeader>
											<CardLabel icon='AccountBalance' iconColor='warning'>
												<CardTitle>Bank Information</CardTitle>
											</CardLabel>
										</CardHeader>
										<CardBody>
											<FormGroup>
												<Label htmlFor='selectedBank'>Bank Name</Label>
												<ChecksGroup>
													{bankTypes.map((b) => (
														<Checks
															key={b.id}
															type='radio'
															id={b.id.toString()}
															label={b.name}
															name='selectedBank'
															value={b.id.toString()}
															onChange={formik.handleChange}
															checked={formik.values.selectedBank}
														/>
													))}
												</ChecksGroup>
											</FormGroup>
										</CardBody>
									</Card>

									<Card className='mb-0'>
										<CardHeader>
											<CardLabel icon='Paid' iconColor='success'>
												<CardTitle>Price Information</CardTitle>
											</CardLabel>
										</CardHeader>
										<CardBody className='pt-0'>
											<div className='row g-4'>
												<div className='col-12'>
													<FormGroup
														id='youSend'
														label='Price'
														isFloating>
														<Input
															placeholder='Price'
															onChange={formik.handleChange}
															value={formik.values.youSend}
														/>
													</FormGroup>
												</div>
												<div className='col-12'>
													<FormGroup id='iban' label='IBAN' isFloating>
														<Input
															placeholder='IBAN'
															onChange={formik.handleChange}
															value={formik.values.iban}
														/>
													</FormGroup>
												</div>
											</div>
										</CardBody>
									</Card>
								</WizardItem>
								<WizardItem id='step4' title='Preview'>
									<div className='row g-3'>
										<div className='col-9 offset-3'>
											<h3 className='mt-4'>Summary</h3>
											<h4 className='mt-4'>Personal Information</h4>
										</div>
										<PreviewItem
											title='First Name'
											value={formik.values.firstName}
										/>
										<PreviewItem
											title='Last Name'
											value={formik.values.lastName}
										/>
										<div className='col-9 offset-3'>
											<h4 className='mt-4'>Contact Information</h4>
										</div>
										<PreviewItem
											title='Phone Number'
											value={formik.values.phoneNumber}
										/>
										<PreviewItem
											title='Email Address'
											value={formik.values.emailAddress}
										/>
										<div className='col-9 offset-3'>
											<h3 className='mt-4'>Address</h3>
										</div>
										<PreviewItem
											title='Address Line'
											value={formik.values.addressLine}
										/>
										<PreviewItem
											title='Address Line 2'
											value={formik.values.addressLine2}
										/>
										<PreviewItem title='City' value={formik.values.city} />
										<PreviewItem title='State' value={formik.values.state} />
										<PreviewItem title='ZIP' value={formik.values.zip} />
										<div className='col-9 offset-3'>
											<h4 className='mt-4'>Bank & Money</h4>
										</div>
										<PreviewItem
											title='Bank Name'
											value={formik.values.selectedBank}
										/>
										<PreviewItem title='IBAN' value={formik.values.iban} />
										<PreviewItem
											title='You Send'
											value={formik.values.youSend}
										/>
									</div>
								</WizardItem>
							</Wizard>
						</div>
					</div>
				</ModalBody>
			</Modal>
		</PageWrapper>
	);
};

export default Partner;
