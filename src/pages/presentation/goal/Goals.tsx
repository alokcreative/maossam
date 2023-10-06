import React, { FC, useCallback, useState } from 'react';
import { useFormik } from 'formik';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import Input from '../../../components/bootstrap/forms/Input';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
// import useSortableData from '../../../../hooks/useSortableData';
// import useDarkMode from '../../../../hooks/useDarkMode';
import PAYMENTS from '../../../common/data/enumPaymentMethod';
import USERS, { Role } from '../../../common/data/userDummyData';
// import { PER_COUNT } from '../../../../components/PaginationButtons';
// import data from '../../../../common/data/dummyCustomerData';
import CustomerEditModal from '../crm/CustomerEditModal';
import Card, {
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Page from '../../../layout/Page/Page';
import showNotification from '../../../components/extras/showNotification';
import validate from '../demo-pages/helper/editPagesValidate';
import Avatar from '../../../components/Avatar';
import Select from '../../../components/bootstrap/forms/Select';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import data from '../../../common/data/dummyGoals';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal';
import Badge from '../../../components/bootstrap/Badge';
import { pagesMenu } from '../../../menu';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';
import MarketingAssetForms from '../dashboard/Marketing/MarketingAssetForms/MarketingAssetForms';
import { toast } from 'react-toastify';
import GoalViewPopup from './goalHelpher/GoalViewPopup';

export const SELECT_OPTIONS = [
	{ value: 1, text: 'Product One' },
	{ value: 2, text: 'Product Two' },
	{ value: 3, text: 'Product Three' },
	{ value: 4, text: 'Product Four' },
	{ value: 5, text: 'Product Five' },
	{ value: 6, text: 'Product Six' },
];

interface IValues {
	id: number;
	name: string;
	description: string;
}

interface CardProp {
	id: number;
	name: string;
	image: string;
	option: string;
	teamName: string;
	dueDate: string;
	attachCount: number;
	taskCount: number;
	percent: number;
}
const Goals: FC = () => {
	const [goalList, setGoalList] = useState<IValues[]>(data);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [modalHeader, setModalHeader] = useState<string>('Add Goal');
	const navigate = useNavigate();
	const { user } = useSelector((state: RootState) => state.auth);
	const savedValue = localStorage?.getItem('user');
	const localUser = savedValue ? JSON.parse(savedValue) : null;
	const role = user.role || localUser?.role;
	const formikOneWay = useFormik({
		initialValues: {
			exampleSelectOneWay: '',
		},
		onSubmit: (values) => {
			// eslint-disable-next-line no-alert
			alert(JSON.stringify(values, null, 2));
		},
	});
	// console.log(`date>>> ${Date.now()}`);
	const [elementId, setElementId] = useState<number>();
	const [elementName, setElementName] = useState<string>();
	const [existingCards, setExistingCards] = useState<CardProp[]>([]);
	const [maybeCards, setMaybeCards] = useState<CardProp[]>([]);
	const [notInUseCards, setNotInUseCards] = useState<CardProp[]>([]);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [goalId, setGoalId] = useState<number>();

	const openModal = (id: number, nameOfBussiness: string) => {
		setGoalId(id);
		setElementId(id);
		setElementName(nameOfBussiness);
		setIsModalOpen(true);
	};
	// Function to handle closing the modal
	const notifyOnYes = () => toast('Great! We’ll check out the best set up for you !');
	const notifyOnNoAndNotSure = () =>
		toast(
			'I guess we’ll need to check that out – will send you more info on this media and add it to media to check!',
		);
	const notifyOnNoAndNope = () =>
		toast('– Ok, Good to know, no need to spend time and energy when not necessary ');

	const [cards, setCards] = useState<CardProp[]>([
		{
			id: 1,
			name: 'Google Business',
			image: 'googleBusiness',
			option: 'yes',
			teamName: 'MA OSSIM Team',
			dueDate: '14 days left',
			attachCount: 0,
			taskCount: 0,
			percent: 0,
		},
	]);

	const getFormValue = (isSocialMedia: string, isSocialMediaimportant: string) => {
		const element: CardProp[] = cards.filter((card) => card.id === elementId);
		if (isSocialMedia === 'yes' && isSocialMediaimportant === 'yes') {
			notifyOnYes();
			setExistingCards((elements) => [...elements, element[0]]);
			const updatedCards = cards.filter((card) => card.id !== elementId);
			setCards(updatedCards);
		} else if (isSocialMedia === 'no' && isSocialMediaimportant === 'maybe') {
			notifyOnNoAndNotSure();
			setMaybeCards((elements) => [...elements, element[0]]);
			const updatedCards = cards.filter((card) => card.id !== elementId);
			setCards(updatedCards);
		} else if (isSocialMedia === 'no' && isSocialMediaimportant === 'nope') {
			notifyOnNoAndNope();
			setNotInUseCards((elements) => [...elements, element[0]]);
			const updatedCards = cards.filter((card) => card.id !== elementId);
			setCards(updatedCards);
		}
	};

	const formik = useFormik({
		initialValues: {
			firstName: 'John',
			lastName: 'Doe',
			displayName: 'johndoe',
			emailAddress: 'johndoe@site.com',
			currentPassword: '',
			newPassword: '',
			confirmPassword: '',
			searchInput: '',
			date: "dayjs().add(1, 'days').format('YYYY-MM-DD')",
			payment: Object.keys(PAYMENTS).map((i) => PAYMENTS[i].name),
			minPrice: '',
			maxPrice: '',
			mCustomer: '',
			mrCustomer: '',
			mRevenue: '',
			mrRevenue: '',
			maPotential: '',
			nPrice: '',
			pToday: '',
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		validate,
		onSubmit: () => {
			showNotification(
				<span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>Updated Successfully</span>
				</span>,
				"The user's account details have been successfully updated.",
			);
		},
	});

	const formiknewGoal = useFormik({
		initialValues: {
			name: '',
			description: '',
			timeline: '',
			photo: '',
		},
		onSubmit: (values) => {
			// console.log(`values>> ${values.attribute}  ${goalList.length + 1}`);
			const newGoal = {
				id: goalList.length + 1,
				name: values.name,
				description: values.description,
				timeline: values.timeline,
				status: 'New',
			};
			setGoalList([...goalList, newGoal]);
			console.log(values.photo);
			setIsOpen(false);
		},
	});
	// const filteredData = data.filter(
	// 	(f) =>
	// 		// Name
	// 		f.name.toLowerCase().includes(formik.values.searchInput.toLowerCase()) &&
	// 		// Price
	// 		(formik.values.minPrice === '' || f.balance > Number(formik.values.minPrice)) &&
	// 		(formik.values.maxPrice === '' || f.balance < Number(formik.values.maxPrice)) &&
	// 		// Payment Type
	// 		formik.values.payment.includes(f.payout),
	// );

	// const { items, requestSort, getClassNamesFor } = useSortableData(filteredData);

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['10']);
	const handleDelete = (id: number) => {
		const newGoals = goalList.filter((i) => i.id !== id);
		setGoalList(newGoals);
	};
	const handleEdit = (id: number) => {
		setModalHeader('Edit Goal');
		setIsOpen(true);
	};
	const handleView = (id: number) => {
		console.log('id', id);
		navigate(`../${pagesMenu.goalId.path}/${id}`);
	};

	return (
		<PageWrapper>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Goals', to: '/' },
							// { title: 'Edit User', to: '/' },
						]}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					{role === Role.admin && (
						<Button
							color='success'
							isLight
							icon='Add'
							onClick={() => {
								setIsOpen(true);
								setModalHeader('Add Goal');
							}}>
							Add Goal
						</Button>
					)}
				</SubHeaderRight>
			</SubHeader>
			<Page container='fluid'>
				<div className='display-4 fw-bold py-3'> Goals</div>
				<div className='row h-100'>
					<div className='col-12'>
						<Card stretch>
							<CardHeader>
								<CardLabel icon='TrackChanges' iconColor='success'>
									<CardTitle tag='div' className='h5'>
										List Of Goals
									</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody className='table-responsive'>
								<div className='row g-4'>
									<div className='col-12'>
										<table className='table table-modern table-hover'>
											<thead>
												<tr>
													<th scope='col'>Sr No</th>
													<th scope='col'>Name</th>
													<th scope='col'>Description</th>
													<th scope='col'>Date</th>
													<th scope='col'>Status</th>
													<th scope='col'>Action</th>
												</tr>
											</thead>
											<tbody>
												{dataPagination(goalList, currentPage, perPage).map(
													(i) => {
														return (
															<tr>
																<th scope='row'>{i.id}</th>
																<th>{i.name}</th>
																<td>{i.description}</td>
																<td>{i.timeline}</td>
																<td className='h5'>
																	<Badge
																		color={
																			(i.status ===
																				'Progress' &&
																				'danger') ||
																			(i.status === 'New' &&
																				'warning') ||
																			(i.status === 'Done' &&
																				'success') ||
																			'info'
																		}>
																		{i.status}
																	</Badge>
																</td>
																<td>
																	<Button
																		icon='Visibility'
																		color='primary'
																		isLight
																		// onClick={() =>
																		// 	handleView(i.id)
																		// }
																		onClick={() =>
																			openModal(i.id, 'Task')
																		}
																		className='me-1'
																	/>
																	{role === Role.admin ? (
																		<>
																			<Button
																				icon='Edit'
																				color='success'
																				isLight
																				onClick={() =>
																					handleEdit(i.id)
																				}
																				className='me-1'
																			/>
																			<Button
																				icon='Delete'
																				color='danger'
																				isLight
																				onClick={() =>
																					handleDelete(
																						i.id,
																					)
																				}
																			/>
																		</>
																	) : null}
																</td>
															</tr>
														);
													},
												)}
											</tbody>
										</table>
									</div>
								</div>
							</CardBody>
							<CardFooter>
								<PaginationButtons
									data={data}
									label='items'
									setCurrentPage={setCurrentPage}
									currentPage={currentPage}
									perPage={perPage}
									setPerPage={setPerPage}
								/>
							</CardFooter>
						</Card>
					</div>
				</div>

				{isModalOpen ? (
					<GoalViewPopup
						idOfBussiness={1}
						nameOfBussiness='Task'
						isModalOpen={isModalOpen}
						setIsModalOpen={setIsModalOpen}
						getFormValue={getFormValue}
						id={goalId}
					/>
				) : null}
			</Page>
			<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='lg'>
				<ModalHeader setIsOpen={setIsOpen} className='p-4'>
					<ModalTitle id='goal'>{modalHeader}</ModalTitle>
				</ModalHeader>
				<ModalBody className='px-4'>
					<div className='row g-4'>
						<div className='col-12 border-bottom' />
						<div className='col-12'>
							<FormGroup id='services' label='Select Product/Services'>
								<Select
									ariaLabel='Default select example'
									placeholder=''
									onChange={formikOneWay.handleChange}
									value={formikOneWay.values.exampleSelectOneWay}
									list={SELECT_OPTIONS}
								/>
							</FormGroup>
						</div>

						<FormGroup id='name' label='Name' className='col-lg-6'>
							<Input
								onChange={formiknewGoal.handleChange}
								value={formiknewGoal.values.name}
							/>
						</FormGroup>
						<FormGroup id='attribute' label='Description' className='col-lg-6'>
							<Input
								type='text'
								onChange={formiknewGoal.handleChange}
								value={formiknewGoal.values.description}
							/>
						</FormGroup>
						<FormGroup id='timeline' label='Timeline' className='col-lg-6'>
							<Input
								type='date'
								onChange={formiknewGoal.handleChange}
								value={formiknewGoal.values.timeline}
							/>
						</FormGroup>
						<div className='row g-4'>
							<div className='col-12 col-md-6'>
								<div className='mb-3'>
									<div className='form-check'>
										<input
											className='form-check-input'
											name='goal'
											type='checkbox'
											id='example'
											value='checkbox value'
											checked
										/>
										CAPTURE NEW CUSTOMERS
										{/* <label className='form-check-label'>
																</label> */}
									</div>
								</div>
								<div className='mb-3'>
									<FormGroup
										id='mCustomer'
										label='How many customers would you like to reach for this product?'>
										<Input
											placeholder=''
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.mCustomer}
											// isValid={formik.isValid}
											// isTouched={formik.touched.taskName}
											// invalidFeedback={formik.errors.taskname}
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
								<div className='mb-3'>
									<FormGroup
										id='mrCustomer'
										label='How many more customers for this product from today?'>
										<Input
											placeholder=''
											autoComplete='additional-name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.mrCustomer}
											// isValid={formik.isValid}
											// isTouched={formik.touched.taskName}
											// invalidFeedback={formik.errors.taskname}
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
							</div>
							<div className='col-12 col-md-6'>
								<div className='mb-3'>
									<div className='form-check'>
										<input
											className='form-check-input'
											name='goal'
											type='checkbox'
											id='example'
											value='checkbox value'
										/>
										INCREASE IN REVENUE
										{/* <label className='form-check-label'>
																</label> */}
									</div>
								</div>
								<div className='mb-3'>
									<FormGroup
										id='mRevenue'
										label='How much revenue would you like to reach for this product?'>
										<Input
											placeholder=''
											autoComplete='additional-name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.mRevenue}
											// isValid={formik.isValid}
											// isTouched={formik.touched.taskName}
											// invalidFeedback={formik.errors.taskname}
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
								<div className='mb-3'>
									<FormGroup
										id='mrRevenue'
										label='How much more revenue from today?'>
										<Input
											placeholder=''
											autoComplete='additional-name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.mrRevenue}
											// isValid={formik.isValid}
											// isTouched={formik.touched.taskName}
											// invalidFeedback={formik.errors.taskname}
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
							</div>
							<div className='col-12 col-md-6'>
								<div className='mb-3'>
									<div className='form-check'>
										<input
											className='form-check-input'
											name='goal'
											type='checkbox'
											id='example'
											value='checkbox value'
										/>
										BUILD PRODUCT AWARENESS
										{/* <label className='form-check-label'>
																</label> */}
									</div>
								</div>

								<div className='mb-3'>
									<FormGroup
										id='maPotential'
										label='How many potential clients would you like to reach?'>
										<Input
											placeholder=''
											autoComplete='additional-name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.maPotential}
											// isValid={formik.isValid}
											// isTouched={formik.touched.taskName}
											// invalidFeedback={formik.errors.taskname}
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
							</div>
							<div className='col-12 col-md-6'>
								<div className='mb-3'>
									<div className='form-check'>
										<input
											className='form-check-input'
											name='goal'
											type='checkbox'
											id='example'
											value='checkbox value'
										/>
										INCREASE PRICE
										{/* <label className='form-check-label'>
																</label> */}
									</div>
								</div>
								<div className='mb-3'>
									<FormGroup
										id='nPrice'
										label='What is the new price you would like to reach?'>
										<Input
											placeholder=''
											autoComplete='additional-name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.nPrice}
											// isValid={formik.isValid}
											// isTouched={formik.touched.taskName}
											// invalidFeedback={formik.errors.taskname}
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
								<div className='mb-3'>
									<FormGroup id='pToday' label='What is the price today?'>
										<Input
											placeholder='What is the price today?'
											autoComplete='additional-name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.pToday}
											// isValid={formik.isValid}
											// isTouched={formik.touched.taskName}
											// invalidFeedback={formik.errors.taskname}
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
							</div>
						</div>
						<div className='col-12 col-md-6'>
							<div className='mb-3'>
								<FormGroup id='customer' label='How can you measure this goal?'>
									<Input
										placeholder=''
										autoComplete='additional-name'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value=''
										// isValid={formik.isValid}
										// isTouched={formik.touched.taskName}
										// invalidFeedback={formik.errors.taskname}
										validFeedback='Looks good!'
									/>
								</FormGroup>
							</div>
						</div>
						<div className='col-12 col-md-6'>
							<div className='mb-3'>
								<FormGroup id='customer' label='What is your present achievement?'>
									<Input
										placeholder=''
										autoComplete='additional-name'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value=''
										// isValid={formik.isValid}
										// isTouched={formik.touched.taskName}
										// invalidFeedback={formik.errors.taskname}
										validFeedback='Looks good!'
									/>
								</FormGroup>
							</div>
						</div>
						<div className='col-12 col-md-6'>
							<div className='mb-3'>
								<FormGroup
									id='customer'
									label='Confirm that this goal is achievable'>
									<Input
										placeholder=''
										autoComplete='additional-name'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value=''
										// isValid={formik.isValid}
										// isTouched={formik.touched.taskName}
										// invalidFeedback={formik.errors.taskname}
										validFeedback='Looks good!'
									/>
								</FormGroup>
							</div>
						</div>
						<div className='col-12 col-md-6'>
							<div className='mb-3'>
								<FormGroup id='customer' label='Confirm that this goal is relevant'>
									<Input
										placeholder=''
										autoComplete='additional-name'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value=''
										// isValid={formik.isValid}
										// isTouched={formik.touched.taskName}
										// invalidFeedback={formik.errors.taskname}
										validFeedback='Looks good!'
									/>
								</FormGroup>
							</div>
						</div>
					</div>
				</ModalBody>
				<ModalFooter>
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
						<Button color='info' onClick={formiknewGoal.handleSubmit}>
							Save
						</Button>
					</CardFooterRight>
				</ModalFooter>
			</Modal>
		</PageWrapper>
	);
};

export default Goals;
