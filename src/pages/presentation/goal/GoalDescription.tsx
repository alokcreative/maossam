import React, { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft } from '../../../layout/SubHeader/SubHeader';
import Button from '../../../components/bootstrap/Button';
import Input from '../../../components/bootstrap/forms/Input';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
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
// eslint-disable-next-line import/no-named-as-default
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
import { useNavigate, useParams } from 'react-router-dom';
import {
	useCreateTaskMutation,
	useDeleteTaskMutation,
	useGetTaskByGoalIdQuery,
	useUpdateTaskMutation,
} from '../../../features/auth/taskManagementApiSlice';
import Loading from '../../../common/other/Loading';
import TaskTableRow from './tasks/TaskTableRow';
import { Calendar as DatePicker } from 'react-date-range';
import { format } from 'date-fns';
import Icon from '../../../components/icon/Icon';
import showNotification from '../../../components/extras/showNotification';
import ConfirmationModal from '../../documentation/components/ConfirmationModal';
import ReactQuill from 'react-quill';
import parse from 'html-react-parser';
import useSortableData from '../../../hooks/useSortableData';

export const SELECT_OPTIONS = [
	{ value: 1, text: 'Backlog' },
	{ value: 2, text: 'To Do' },
	{ value: 3, text: 'Progress' },
	{ value: 4, text: 'Done' },
	{ value: 5, text: 'Hold' },
];

interface ITask {
	id: number;
	title?: string;
	description?: string;
	// status?: string;
	dueDate?: string | undefined;
	category?: string;
	expectedTime?: string;
}

const GoalDescription: FC = () => {
	const { id } = useParams();

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['10']);
	const navigate = useNavigate();
	const [modalState, setModalState] = useState('Add Task');
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [deleteId, setDeleteId] = useState<number>();
	const { data, isLoading, isSuccess, refetch } = useGetTaskByGoalIdQuery(
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		Number(id!),
	);
	const [showMore, setShowMore] = useState<boolean>(false);
	const [createTask] = useCreateTaskMutation();
	const [deleteTask] = useDeleteTaskMutation({
		fixedCacheKey: 'deleteTask',
	});
	const [updateTask] = useUpdateTaskMutation({
		fixedCacheKey: 'updateTask',
	});
	const [taskList, setTaskList] = useState(data && data.tasks);
	const [date, setDate] = useState<Date>(new Date());
	const role = localStorage?.getItem('role');

	useEffect(() => {
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);
	useEffect(() => {
		setTaskList(data && data.tasks);
	}, [data]);

	const formiknewTask = useFormik({
		initialValues: {
			id: '',
			name: '',
			description: '',
			dueDate: '',
			// category: '',
			expectedTime: '',
			// status: '',
		},
		enableReinitialize: true,
		onSubmit: (values, { resetForm }) => {
			console.log('values', values);
			console.log('modalState', modalState);
			console.log('role', role);
			if (modalState === 'Add Task') {
				if (role === 'superadmin') {
					createTask({
						title: values.name,
						description: values.description,
						goal_id: String(id),
						// status: values.status,
					})
						.unwrap()
						.then((res) => {
							refetch();
							formiknewTask.resetForm();
							setDate(new Date());
						})
						.catch(() => {});
				} else {
					const parts = values.expectedTime.split(':');
					const timeWithoutSeconds = `${parts[0]}:${parts[1]}`;
					createTask({
						title: values.name,
						description: values.description,
						goal_id: String(id),
						due_date: format(date, 'MM/dd/yyyy'),
						expected_time: timeWithoutSeconds,
						// status: values.status,
					})
						.unwrap()
						.then((res) => {
							refetch();
							formiknewTask.resetForm();
							setDate(new Date());
						})
						.catch(() => {});
				}
			}
			if (modalState === 'Edit Task') {
				if (role === 'superadmin') {
					const taskData = {
						title: values.name,
						description: values.description,
						// status: values.status,
					};
					updateTask({
						taskData,
						task_id: values.id,
					})
						.unwrap()
						.then((res) => {
							// console.log('response>>', res);
							refetch();
							formiknewTask.resetForm();
							setDate(new Date());
						})
						.catch((res) => {
							// console.log('error', res);
						});
				} else {
					const parts = values.expectedTime.split(':');
					const timeWithoutSeconds = `${parts[0]}:${parts[1]}`;
					const taskData = {
						title: values.name,
						description: values.description,
						due_date: format(date, 'MM/dd/yyyy'),
						expected_time: timeWithoutSeconds,
						// status: values.status,
					};
					updateTask({
						taskData,
						task_id: values.id,
					})
						.unwrap()
						.then((res) => {
							// console.log('response>>', res);
							refetch();
							formiknewTask.resetForm();
							setDate(new Date());
						})
						.catch((res) => {
							// console.log('error', res);
						});
				}
			}

			// setTaskList([...taskList, newTask]);
			setIsOpen(false);
			resetForm();
		},
	});
	const handledescription = (value: any) => {
		formiknewTask.setFieldValue('description', value);
	};

	const handleDeleteAction = () => {
		const taskId = deleteId;
		setShowConfirmation(false);
		// setTaskList(taskList.filter((i) => i.id !== taskId));
		if (taskId) {
			deleteTask(taskId)
				.unwrap()
				.then((res: unknown) => {
					showNotification(
						<span className='d-flex align-items-center'>
							<Icon icon='Info' size='lg' className='me-1' />
							<span>Task deleted successfully</span>
						</span>,
						``,
					);
					refetch();
				})
				.catch((res) => {
					showNotification(
						<span className='d-flex align-items-center'>
							<Icon icon='Info' size='lg' className='me-1' />
							<span>{res.data.detail[0]}</span>
						</span>,
						``,
					);
					// console.log('Delete task rejects>>', res.data.detail[0]);
				});
		}
	};
	const handleEdit = (taskId: number) => {
		setModalState(`Edit Task`);
		const task = taskList.filter((i: ITask) => Number(i.id) === taskId);
		formiknewTask.setFieldValue('name', task[0]?.title);
		formiknewTask.setFieldValue('description', task[0]?.description);
		formiknewTask.setFieldValue('dueDate', task[0]?.due_date);
		// formiknewTask.setFieldValue('category', task[0]?.category);
		// formiknewTask.setFieldValue('status', task[0]?.status);
		formiknewTask.setFieldValue('expectedTime', task[0]?.expected_time);
		formiknewTask.setFieldValue('id', taskId);
		setIsOpen(true);
	};

	const handleAddTask = () => {
		formiknewTask.setFieldValue('name', '');
		formiknewTask.setFieldValue('description', '');
		formiknewTask.setFieldValue('dueDate', '');
		formiknewTask.setFieldValue('category', '');
		formiknewTask.setFieldValue('status', '');
		formiknewTask.setFieldValue('expected_time', '');
		setModalState('Add Task');
		setIsOpen(true);
	};
	const { items, requestSort, getClassNamesFor } = useSortableData(taskList || []);

	return (
		<PageWrapper>
			<SubHeader>
				<SubHeaderLeft>
					<Button color='info' isLink icon='ArrowBack' onClick={() => navigate(-1)}>
						Back to Goals
					</Button>
				</SubHeaderLeft>
			</SubHeader>
			{isLoading ? (
				<Loading />
			) : isSuccess && data ? (
				<Page container='fluid'>
					{/* <div className='display-4 fw-bold py-3'> Goal Description</div> */}
					<div className='row h-100'>
						<div className='col-12'>
							<Card>
								<CardBody>
									<div>
										{/* <span className='display-7 fw-bold p-3'>Name :</span> */}
										<span className='h5 p-3 fw-bold'>{data.goal?.title}</span>
									</div>
									<div className=' p-3'>
										{/* <span>Description :</span> */}
										<span className='ml-5 parent tabledesc'>
											{showMore
												? parse(data.goal?.description)
												: parse(data.goal?.description.substring(0, 100))}
											{data.goal?.description.length > 50 && (
												<span
													aria-hidden='true'
													onClick={() => setShowMore(!showMore)}>
													...
												</span>
											)}
										</span>
									</div>
								</CardBody>
							</Card>
							<Card>
								<CardHeader>
									<div className='row col-12 d-flex'>
										<CardLabel icon='Task' iconColor='success'>
											<CardTitle tag='div' className='h5'>
												Tasks List
											</CardTitle>
										</CardLabel>
										<div>
											<Button
												className='float-end justify-content-end'
												color='success'
												isLight
												icon='Add'
												onClick={() => {
													handleAddTask();
												}}>
												Add Task
											</Button>
										</div>
									</div>
								</CardHeader>

								<CardBody className='table-responsive'>
									<div className='row g-4'>
										<div className='col-12'>
											<table className='table table-modern table-hover'>
												<thead>
													<tr>
														<th
															className='cursor-pointer text-decoration-underline d-flex'
															onClick={() => requestSort('id')}>
															<span style={{ whiteSpace: 'nowrap' }}>
																Sr No
															</span>
															<Icon
																size='lg'
																className={getClassNamesFor('id')}
																icon='FilterList'
															/>
														</th>
														<th
															scope='col'
															style={{ whiteSpace: 'nowrap' }}>
															Name
														</th>
														<th
															scope='col'
															style={{ whiteSpace: 'nowrap' }}>
															Description
														</th>
														<th
															scope='col'
															style={{ whiteSpace: 'nowrap' }}>
															No. of subtask
														</th>
														<th
															scope='col'
															style={{ whiteSpace: 'nowrap' }}>
															Status
														</th>
														{role !== 'superadmin' && (
															<>
																<th
																	scope='col'
																	style={{
																		whiteSpace: 'nowrap',
																	}}>
																	ExpectedTime
																</th>
																<th
																	scope='col'
																	style={{
																		whiteSpace: 'nowrap',
																	}}>
																	Due Date
																</th>
															</>
														)}

														<th
															scope='col'
															style={{ whiteSpace: 'nowrap' }}>
															Action
														</th>
													</tr>
												</thead>
												<tbody>
													{items && taskList && taskList?.length !== 0 ? (
														dataPagination(
															items || taskList,
															currentPage,
															perPage,
														).map((i, index) => (
															<TaskTableRow
																// eslint-disable-next-line react/no-array-index-key
																key={index}
																id={index + 1}
																// eslint-disable-next-line react/jsx-props-no-spreading
																task={i}
																edit={handleEdit}
																deleteAction={() => {
																	setShowConfirmation(true);
																	setDeleteId(i.id);
																}}
															/>
														))
													) : (
														<div>No task yet.</div>
													)}
												</tbody>
											</table>
										</div>
									</div>
								</CardBody>
								<CardFooter>
									<PaginationButtons
										data={taskList}
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
				</Page>
			) : (
				<div>Error</div>
			)}

			<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='lg'>
				<ModalHeader setIsOpen={setIsOpen}>
					<ModalTitle id='new_task'>{modalState}</ModalTitle>
				</ModalHeader>
				<>
					<ModalBody>
						<div className='row g-4'>
							<div className='col-12 border-bottom' />
							<div className={role !== 'superadmin' ? 'col-lg-6' : 'col-lg-12'}>
								<FormGroup id='name' label='Name'>
									<Input
										type='text'
										onChange={formiknewTask.handleChange}
										value={formiknewTask.values.name}
									/>
								</FormGroup>
								<FormGroup id='description' label='Description' className='mt-3'>
									<ReactQuill
										theme='snow'
										value={formiknewTask.values.description}
										onChange={(value) => handledescription(value)}
									/>
									{/* <Input
										type='text'
										onChange={formiknewTask.handleChange}
										value={formiknewTask.values.description}
									/> */}
								</FormGroup>
								{role !== 'superadmin' && (
									<FormGroup
										id='expectedTime'
										label='Expected Time'
										className='mt-3'>
										<Input
											type='time'
											onChange={formiknewTask.handleChange}
											value={formiknewTask.values.expectedTime}
										/>
									</FormGroup>
								)}
							</div>
							{role !== 'superadmin' && (
								<FormGroup id='dueDate' label='Due Date' className='col-lg-6'>
									<div className='col-6'>
										<div className='text-center mt-n4'>
											<DatePicker
												onChange={(item) => setDate(item)}
												date={date}
												minDate={new Date()}
												color={process.env.REACT_APP_PRIMARY_COLOR}
												shownDate={date}
											/>
										</div>
									</div>
								</FormGroup>
							)}

							{/* <FormGroup id='category' label='Enter Category'>
									<Input
										type='text'
										onChange={formiknewTask.handleChange}
										value={formiknewTask.values.category}
									/>
								</FormGroup> */}

							{/* <FormGroup id='status' label='Status' className='col-lg-6'>
								<Select
									ariaLabel='Default select example'
									placeholder='Select One...'
									onChange={formiknewTask.handleChange}
									value={formiknewTask.values.status}
									list={[
										{ value: 'Backlog', text: 'Backlog' },
										{ value: 'Todo', text: 'Todo' },
										{ value: 'InProgress', text: 'InProgress' },
										{ value: 'Done', text: 'Done' },
										{ value: 'Hold', text: 'Hold' },
									]}
								/>
							</FormGroup> */}
						</div>
					</ModalBody>
					<ModalFooter>
						<CardFooterLeft>
							<Button color='info' onClick={formiknewTask.handleSubmit}>
								{modalState === 'Add Task' ? 'Save' : 'Update'}
							</Button>
						</CardFooterLeft>
						<CardFooterRight>
							<Button
								color='danger'
								onClick={() => {
									setIsOpen(false);
								}}>
								Cancel
							</Button>
						</CardFooterRight>
					</ModalFooter>
				</>
			</Modal>
			<ConfirmationModal
				isOpen={showConfirmation}
				setIsOpen={() => setShowConfirmation(false)}
				onConfirm={handleDeleteAction}
			/>
		</PageWrapper>
	);
};

export default GoalDescription;
