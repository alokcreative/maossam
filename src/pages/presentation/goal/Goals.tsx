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
} from '../../../features/auth/taskManagementApiSlice';

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
	timeline: string;
	status: string;
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
interface IGoalProps {
	category: string;
	created_at: string;
	description: string;
	id: 2;
	title: string;
	updated_at: string;
}
const Goals: FC = () => {
	const { darkModeStatus } = useDarkMode();

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [modalHeader, setModalHeader] = useState<string>('Add Goal');

	// const navigate = useNavigate();
	const { data, isLoading, isSuccess, isError ,refetch } = useGetGoalsQuery({});
	console.log('Data>>', data);
	const [productView, setProductView] = useState<boolean>(false);
	const [goalList, setGoalList] = useState<IValues[]>(data1);

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
		setGoalId(id);
		setIsModalOpen(true);
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
		deleteGoal(id);
		refetch();
	};
	const handleEdit = (id: number) => {
		setModalHeader('Edit Goal');
		setIsOpen(true);
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
					{role !== 'user' && (
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
											timeline={item.category}
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
																				onClick={() =>
																					openModal(
																						i.id || 1,
																					)
																				}
																				className='me-1'
																			/>
																			{role !== 'user' ? (
																				<>
																					<Button
																						icon='Edit'
																						color='success'
																						isLight
																						onClick={() =>
																							handleEdit(
																								i.id,
																							)
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
		</PageWrapper>
	);
};

export default Goals;
