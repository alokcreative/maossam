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
import Select from '../../../components/bootstrap/forms/Select';
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
import { toast } from 'react-toastify';
import SubTask from './tasks/SubTask';
import TableRow from '../../../helpers/TableRow';
import TaskTableRow from './tasks/TaskTableRow';

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
	status?: string;
	dueDate?: string | undefined;
	category?: string;
	expectedTime?: string;
}

interface IGoalValues {
	id?: number;
	name?: string;
	description?: string;
	timeline?: string;
	status?: string;
	task?: ITask[];
}

interface ITaskProps {
	id: number;
	dueDate: string;
	name: string;
	description: string;
	category: string;
	expectedTime: string;
	status: string;
	assigned?: string | undefined;
	edit: string;
	goalId: number;
}

const GoalDescription: FC = () => {
	const { id } = useParams();

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['10']);
	const navigate = useNavigate();
	const [modalState, setModalState] = useState('Add Task');
	const [currTask, setCurrTask] = useState<ITask>();
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
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [taskList, setTaskList] = useState(data && data.tasks);
	// const handleDelete = (id: number) => {
	// 	const newGoals = goalList.filter((i) => i.id !== id);
	// 	setGoalList(newGoals);
	// };
	// const handleEdit = (id: number) => {
	// 	setIsOpen(true);
	// };
	// const handleView = (id: number) => {
	// 	console.log('id', id);
	// };
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
			category: '',
			expectedTime: '',
			status: '',
		},
		enableReinitialize: true,
		onSubmit: (values) => {
			if (modalState === 'Add Task') {
				createTask({
					title: values.name,
					description: values.description,
					goal_id: String(id),
				})
					.unwrap()
					.then((res) => {
						console.log('response>>', res);
						refetch();
					})
					.catch(() => {
						console.log('error');
					});
			}
			if (modalState === 'Edit Task') {
				console.log('id>>>', values.id);
				const taskData = {
					title: values.name,
					description: values.description,
				};
				updateTask({
					taskData,
					task_id: values.id,
				})
					.unwrap()
					.then((res) => {
						console.log('response>>', res);
						refetch();
					})
					.catch((res) => {
						console.log('error', res);
					});
			}

			// setTaskList([...taskList, newTask]);
			setIsOpen(false);
		},
	});

	const handleDeleteAction = (taskId: number) => {
		// setTaskList(taskList.filter((i) => i.id !== taskId));
		deleteTask(taskId)
			.unwrap()
			.then((res: unknown) => {
				toast(`Task deleted successfully`);
				refetch();
			})
			.catch((res) => {
				toast(`${res.data.detail[0]}`);
				// console.log('Delete task rejects>>', res.data.detail[0]);
			});
	};
	const handleEdit = (taskId: number) => {
		setCurrTask(undefined);
		setModalState(`Edit Task`);
		const task = taskList.filter((i: ITask) => Number(i.id) === taskId);
		formiknewTask.setFieldValue('name', task[0]?.title);
		formiknewTask.setFieldValue('description', task[0]?.description);
		formiknewTask.setFieldValue('dueDate', task[0]?.dueDate);
		formiknewTask.setFieldValue('category', task[0]?.category);
		formiknewTask.setFieldValue('status', task[0]?.status);
		formiknewTask.setFieldValue('expectedTime', task[0]?.expectedTime);
		formiknewTask.setFieldValue('id', taskId);
		setIsOpen(true);
	};

	const handleView = (taskId: number) => {
		setIsModalOpen(true);
	};
	const handleAddTask = () => {
		setCurrTask(undefined);
		formiknewTask.setFieldValue('name', '');
		formiknewTask.setFieldValue('description', '');
		formiknewTask.setFieldValue('dueDate', '');
		formiknewTask.setFieldValue('category', '');
		formiknewTask.setFieldValue('status', '');
		formiknewTask.setFieldValue('expectedTime', '');
		setModalState('Add Task');
		setIsOpen(true);
	};
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
					<div className='display-4 fw-bold py-3'> Goal Description</div>
					<div className='row h-100'>
						<div className='col-12'>
							<Card>
								<CardBody>
									<div>
										<span className='display-7 fw-bold p-3'>Name :</span>
										<span>{data.goal?.title}</span>
									</div>
									<div>
										<span className='display-7 fw-bold p-3'>Description :</span>
										<span>
											{showMore
												? `${data.goal?.description}`
												: `${data.goal?.description.substring(0, 50)}`}
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
												List Of Tasks
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
															scope='col'
															style={{ whiteSpace: 'nowrap' }}>
															Sr No
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
															Status
														</th>
														<th
															scope='col'
															style={{ whiteSpace: 'nowrap' }}>
															ExpectedTime
														</th>
														<th
															scope='col'
															style={{ whiteSpace: 'nowrap' }}>
															Due Date
														</th>
														<th
															scope='col'
															style={{ whiteSpace: 'nowrap' }}>
															Action
														</th>
													</tr>
												</thead>
												<tbody>
													{taskList ? (
														dataPagination(
															taskList,
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
																deleteAction={handleDeleteAction}
															/>
														))
													) : (
														<div>No data</div>
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
				</Page>
			) : (
				<div>Error</div>
			)}

			<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='lg'>
				<ModalHeader setIsOpen={setIsOpen} className='p-4'>
					<ModalTitle id='new_task'>{modalState}</ModalTitle>
				</ModalHeader>
				<>
					<ModalBody className='px-4'>
						<div className='row g-4'>
							<div className='col-12 border-bottom' />
							<FormGroup id='name' label='Name' className='col-lg-6'>
								<Input
									type='text'
									onChange={formiknewTask.handleChange}
									value={formiknewTask.values.name}
								/>
							</FormGroup>
							<FormGroup id='description' label='Description' className='col-lg-6'>
								<Input
									type='text'
									onChange={formiknewTask.handleChange}
									value={formiknewTask.values.description}
								/>
							</FormGroup>
							<FormGroup id='dueDate' label='Due Date' className='col-lg-6'>
								<Input
									type='date'
									onChange={formiknewTask.handleChange}
									value={formiknewTask.values.dueDate}
								/>
							</FormGroup>
							{/* <FormGroup id='category' label='Enter Category'>
									<Input
										type='text'
										onChange={formiknewTask.handleChange}
										value={formiknewTask.values.category}
									/>
								</FormGroup> */}

							<FormGroup id='expectedTime' label='Expected Time' className='col-lg-6'>
								<Input
									type='date'
									onChange={formiknewTask.handleChange}
									value={formiknewTask.values.expectedTime}
								/>
							</FormGroup>
							<FormGroup id='status' label='Status' className='col-lg-6'>
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
							</FormGroup>
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
							<Button color='info' onClick={formiknewTask.handleSubmit}>
								Save
							</Button>
						</CardFooterRight>
					</ModalFooter>
				</>
			</Modal>
		</PageWrapper>
	);
};

export default GoalDescription;
