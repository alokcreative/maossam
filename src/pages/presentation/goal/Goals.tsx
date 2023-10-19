import React, { FC, useState } from 'react';
import { useFormik } from 'formik';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';

import PAYMENTS from '../../../common/data/enumPaymentMethod';
import { Role } from '../../../common/data/userDummyData';
import Card, {
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import useDarkMode from '../../../hooks/useDarkMode';
import Page from '../../../layout/Page/Page';
import showNotification from '../../../components/extras/showNotification';
import validate from '../demo-pages/helper/editPagesValidate';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import data1 from '../../../common/data/dummyGoals';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons';
import Badge from '../../../components/bootstrap/Badge';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import GoalViewPopup from './goalHelpher/GoalViewPopup';
import Item from '../../_common/dashboardHelper/GoalItems';

import {
	useDeleteGoalMutation,
	useGetGoalsQuery,
	useCreateGoalMutation,
	useUpdateGoalMutation,
} from '../../../features/auth/taskManagementApiSlice';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Select from '../../../components/bootstrap/forms/Select';

export const SELECT_OPTIONS = [
	{ value: 1, text: 'Product One' },
	{ value: 2, text: 'Product Two' },
	{ value: 3, text: 'Product Three' },
	{ value: 4, text: 'Product Four' },
	{ value: 5, text: 'Product Five' },
	{ value: 6, text: 'Product Six' },
];

// interface IValues {
// 	id: number;
// 	name: string;
// 	description: string;
// 	date: string;
// 	status: string;
// 	category: string;
// }

// interface CardProp {
// 	id: number;
// 	name: string;
// 	image: string;
// 	option: string;
// 	teamName: string;
// 	dueDate: string;
// 	attachCount: number;
// 	taskCount: number;
// 	percent: number;
// }
interface IGoalProps {
	id: number;
	title: string;
	description: string;
	date?: string;
	status?: string;
	category?: string;
}
const Goals: FC = () => {
	const navigate = useNavigate();
	const { data, isLoading, isSuccess, isError, refetch } = useGetGoalsQuery({});
	const [createGoal] = useCreateGoalMutation();
	const [updateGoal] = useUpdateGoalMutation();
	const { darkModeStatus } = useDarkMode();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [modalHeader, setModalHeader] = useState<string>('Add Goal');
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['10']);

	const [productView, setProductView] = useState<boolean>(false);
	const [goalList, setGoalList] = useState<IGoalProps[]>(data);

	const role = localStorage?.getItem('role');
	const [deleteGoal] = useDeleteGoalMutation();

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
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [goalId, setGoalId] = useState<number>();

	const openModal = (id: number) => {
		// console.log('Id og goal', id);
		setGoalId(id);
		setIsModalOpen(true);
	};

	const formikNewGoal = useFormik({
		initialValues: {
			name: '',
			description: '',
			date: '',
			status: '',
			category: '',
		},

		validate: (values) => {
			const errors: {
				// id: string;
				name?: string;
				description?: string;
				date?: string;
				status?: string;
				category?: string;
			} = {};

			if (!values.name) {
				errors.name = 'Required';
			}

			if (!values.description) {
				errors.description = 'Required';
			}
			if (!values.date) {
				errors.date = 'Required';
			}

			if (!values.status) {
				errors.status = 'Required';
			}
			if (!values.category) {
				errors.category = 'Required';
			}
			return errors;
		},

		onSubmit: (values, { resetForm }) => {
			const goalData = new FormData();
			goalData.append('title', values.name);
			goalData.append('description', values.description);
			// goalData.append('date', values.date);
			// goalData.append('status', values.status);
			goalData.append('category', values.category);

			if (Object.keys(formikNewGoal.errors).length === 0) {
				createGoal({
					title: values.name,
					description: values.description,
					category: values.category,
				}).then((res) => {
					setIsOpen(false);
					refetch();
				});
			}
			setIsOpen(false);
			resetForm();
		},
	});

	const newGoal = () => {
		setIsOpen(true);
		setModalHeader('New Goal');
	};

	const updateGoalForm = useFormik({
		initialValues: {
			id: '',
			name: '',
			description: '',
			date: '',
			status: '',
			category: '',
		},
		enableReinitialize: true,
		validate: (values) => {
			const errors: {
				name?: string;
				description?: string;
				date?: string;
				status?: string;
				category?: string;
			} = {};

			if (!values.name) {
				errors.name = 'Required';
			}

			if (!values.description) {
				errors.description = 'Required';
			}
			if (!values.date) {
				errors.date = 'Required';
			}

			if (!values.status) {
				errors.status = 'Required';
			}
			if (!values.category) {
				errors.category = 'Required';
			}
			return errors;
		},
		onSubmit: (values, { resetForm }) => {
			// const goalData = new FormData();
			// goalData.append('title', values.name);
			// goalData.append('description', values.description);
			// // goalData.append('date', values.date);
			// // goalData.append('status', values.status);
			// goalData.append('category', values.category);
			const goalData = {
				title: values.name,
				description: values.description,
				category: values.category,
			};

			updateGoal({ id: updateGoalForm.values.id, goalData })
				.unwrap()
				.then((res) => {
					setIsOpen(false);
					refetch();
					if (res) {
						toast('Updated');
					}
				})
				.catch((res) => {
					// console.log(res.data.detail[0]);
					toast(res.data.detail[0]);
				});

			// showNotification(
			// 	<span className='d-flex align-items-center'>
			// 		<Icon icon='Info' size='lg' className='me-1' />
			// 		<span>Updated Successfully</span>
			// 	</span>,
			// 	"The user's account details have been successfully updated.",
			// );
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

	const handleDelete = (id: number) => {
		if (data) {
			const newGoals = data.filter((i: IGoalProps) => i.id !== id);
			setGoalList(newGoals);

			deleteGoal(id)
				.unwrap()
				.then((response) => {
					//	TODO:  Make Toast Dynamically
					toast('Goal deleted sucessfully');
					refetch().then((res) => {});
				})
				.catch((response1) => {
					// console.log("rescatch>>",response1.data.detail[0]);
					toast(response1.data.detail[0]);
				});
		}
	};
	const handleEdit = (id: number) => {
		setModalHeader('Update Goal');
		setIsOpen(true);

		const goal = data.find((i: IGoalProps) => i.id === id);
		updateGoalForm.setFieldValue('id', goal?.id);
		updateGoalForm.setFieldValue('name', goal?.title);
		updateGoalForm.setFieldValue('description', goal?.description);
		updateGoalForm.setFieldValue('date', goal?.date);
		updateGoalForm.setFieldValue('status', goal?.status);
		updateGoalForm.setFieldValue('category', goal?.category);
	};

	const handleCloseClick = () => {
		setIsOpen(false);
		// navigate(`../${dashboardPagesMenu.tasks.path}`);
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
					<Button
						color={darkModeStatus ? 'light' : 'dark'}
						isLight
						type='button'
						className={`${productView === false ? 'me-3 active' : 'me-3'}`}
						onClick={() => setProductView(false)}>
						Grid View
					</Button>
					<Button
						color={darkModeStatus ? 'light' : 'dark'}
						isLight
						type='button'
						className={`${productView === true ? 'active' : ''}`}
						onClick={() => setProductView(true)}>
						List View
					</Button>

					<Button color='success' isLight icon='Add' onClick={newGoal}>
						Add Goal
					</Button>
				</SubHeaderRight>
			</SubHeader>
			{isLoading ? (
				<div>Loadning</div>
			) : isSuccess ? (
				<Page container='fluid'>
					<div className='display-4 fw-bold py-3'> Goals</div>
					<div className='row h-100'>
						<div className='col-12'>
							{productView === false ? (
								<div className='row'>
									{data.map((item: IGoalProps) => (
										<Item
											key={item.id}
											id={item.id}
											name={item.title}
											attributes={item.description}
											timeline={item.category!}
										/>
									))}
								</div>
							) : (
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
														{dataPagination(
															data,
															currentPage,
															perPage,
														).map((i, index) => {
															return (
																<tr>
																	<th scope='row'>{index + 1}</th>
																	<th>{i.title}</th>
																	<td>{i.description}</td>
																	<td>
																		<span
																			style={{
																				whiteSpace:
																					'nowrap',
																			}}>
																			{i.timeline}
																		</span>
																	</td>
																	<td className='h5'>
																		<Badge
																			color={
																				(i.status ===
																					'Progress' &&
																					'danger') ||
																				(i.status ===
																					'New' &&
																					'warning') ||
																				(i.status ===
																					'Done' &&
																					'success') ||
																				'info'
																			}>
																			{i.status}
																		</Badge>
																	</td>
																	<td>
																		<div className='d-flex flex-nowrap'>
																			<Button
																				icon='Visibility'
																				color='primary'
																				isLight
																				onClick={() => {
																					if (
																						role ===
																						'superadmin'
																					) {
																						navigate(
																							`../goal-details/${i.id}`,
																						);
																					} else {
																						openModal(
																							i.id,
																						);
																					}
																				}}
																				className='me-1'
																			/>

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
																		</div>
																	</td>
																</tr>
															);
														})}
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
							)}
						</div>
					</div>

					{isModalOpen ? (
						<GoalViewPopup
							isModalOpen={isModalOpen}
							setIsModalOpen={setIsModalOpen}
							id={goalId}
						/>
					) : null}
				</Page>
			) : (
				<div>Error!!! : {isError}</div>
			)}

			<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='lg' isStaticBackdrop>
				<ModalHeader setIsOpen={handleCloseClick} className='p-4'>
					<ModalTitle id='new_task'>{modalHeader}</ModalTitle>
				</ModalHeader>

				<ModalBody className='px-4'>
					<div className='row g-4'>
						<div className='col-12 border-bottom' />
						<FormGroup id='name' label='Name' className='col-lg-6'>
							<Input
								type='text'
								name='name'
								onChange={
									modalHeader === 'New Goal'
										? formikNewGoal.handleChange
										: updateGoalForm.handleChange
								}
								value={
									modalHeader === 'New Goal'
										? formikNewGoal.values.name
										: updateGoalForm.values.name
								}
								invalidFeedback={formikNewGoal.errors.name}
								isValid={formikNewGoal.isValid}
								isTouched={formikNewGoal.touched.name}
							/>
						</FormGroup>
						<FormGroup id='description' label='Description' className='col-lg-6'>
							<Input
								type='text'
								name='description'
								onChange={
									modalHeader === 'New Goal'
										? formikNewGoal.handleChange
										: updateGoalForm.handleChange
								}
								value={
									modalHeader === 'New Goal'
										? formikNewGoal.values.description
										: updateGoalForm.values.description
								}
								invalidFeedback={formikNewGoal.errors.description}
								isValid={formikNewGoal.isValid}
								isTouched={formikNewGoal.touched.description}
							/>
						</FormGroup>
						<FormGroup id='date' label='Date' className='col-lg-6'>
							<Input
								type='date'
								name='date'
								onChange={
									modalHeader === 'New Goal'
										? formikNewGoal.handleChange
										: updateGoalForm.handleChange
								}
								value={
									modalHeader === 'New Goal'
										? formikNewGoal.values.date
										: updateGoalForm.values.date
								}
								invalidFeedback={formikNewGoal.errors.date}
								isValid={formikNewGoal.isValid}
								isTouched={formikNewGoal.touched.date}
							/>
						</FormGroup>

						<FormGroup id='status' label='Status' className='col-lg-6'>
							<Select
								ariaLabel='Default select Status'
								placeholder='Select One...'
								name='status'
								list={[
									{ value: 'Backlog', text: 'Backlog' },
									{ value: 'Todo', text: 'Todo' },
									{ value: 'InProgress', text: 'InProgress' },
									{ value: 'Done', text: 'Done' },
									{ value: 'Hold', text: 'Hold' },
								]}
								onChange={
									modalHeader === 'New Goal'
										? formikNewGoal.handleChange
										: updateGoalForm.handleChange
								}
								value={
									modalHeader === 'New Goal'
										? formikNewGoal.values.status
										: updateGoalForm.values.status
								}
								invalidFeedback={formikNewGoal.errors.status}
								isValid={formikNewGoal.isValid}
								isTouched={formikNewGoal.touched.status}
							/>
						</FormGroup>

						<FormGroup id='category' label='Category' className='col-lg-6'>
							<Select
								ariaLabel='Default select Category'
								placeholder='Select One...'
								name='category'
								list={[
									{ value: '4', text: 'Category4' },
									{ value: '2', text: 'New Category2' },
									{ value: '1', text: 'Category1' },
									{ value: '3', text: 'Category3' },
								]}
								onChange={
									modalHeader === 'New Goal'
										? formikNewGoal.handleChange
										: updateGoalForm.handleChange
								}
								value={
									modalHeader === 'New Goal'
										? formikNewGoal.values.category
										: updateGoalForm.values.category
								}
								invalidFeedback={formikNewGoal.errors.category}
								isValid={formikNewGoal.isValid}
								isTouched={formikNewGoal.touched.category}
							/>
						</FormGroup>
					</div>
				</ModalBody>
				<ModalFooter>
					<CardFooterLeft>
						<Button
							color='info'
							onClick={
								modalHeader === 'New Goal'
									? formikNewGoal.handleSubmit
									: updateGoalForm.handleSubmit
							}>
							{modalHeader === 'New Goal' ? ' Save' : 'Update'}
						</Button>
					</CardFooterLeft>
					<CardFooterRight>
						<Button
							color='danger'
							onClick={() => {
								handleCloseClick();
							}}>
							Cancel
						</Button>
					</CardFooterRight>
				</ModalFooter>
			</Modal>
		</PageWrapper>
	);
};

export default Goals;
