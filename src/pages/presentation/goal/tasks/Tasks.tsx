import React, { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../../layout/SubHeader/SubHeader';
import Breadcrumb from '../../../../components/bootstrap/Breadcrumb';
import Page from '../../../../layout/Page/Page';
import Card, {
	CardBody,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import Button from '../../../../components/bootstrap/Button';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../../components/PaginationButtons';
import TaskTableRow from './TaskTableRow';
// import data from '../../../common/data/dummyTaskHoldData';
// import data, { ISubTask, ITask } from '../../../../common/data/dummyGoals';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../../components/bootstrap/Modal';
import Select from '../../../../components/bootstrap/forms/Select';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import { useNavigate, useParams } from 'react-router-dom';
import {
	useCreateTaskMutation,
	useGetGoalsQuery,
	useGetTaskListQuery,
	useDeleteTaskMutation,
	useUpdateTaskMutation,
} from '../../../../features/auth/taskManagementApiSlice';
import { dashboardPagesMenu, pagesMenu } from '../../../../menu';
import { useEffectOnce } from 'react-use';
import Loading from '../../../../common/other/Loading';
import { Calendar as DatePicker } from 'react-date-range';
import { format } from 'date-fns';
import showNotification from '../../../../components/extras/showNotification';
import Icon from '../../../../components/icon/Icon';
import ConfirmationModal from '../../../documentation/components/ConfirmationModal';
import ReactQuill from 'react-quill';

interface IGoalValueData {
	category: string;
	created_at: string;
	description: string;
	id: number;
	title: string;
	updated_at: string;
	created_by: number;
}
interface IGoalValue {
	value: number;
	text: string;
}
interface ITaskValue {
	created_at: string;
	description: string;
	goal: string;
	id: number;
	title: string;
	updated_at: string;
	created_by: string;
	expected_time: string;
	due_date: string;
	subtask_count: string;
}
const Tasks: FC = () => {
	const { goalId, newTask } = useParams();
	const navigate = useNavigate();
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['10']);
	const [modalState, setModalState] = useState('Add Task');
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { data: goalsData, isLoading: loading } = useGetGoalsQuery({
		fixedCacheKey: 'listTask',
	});
	const [date, setDate] = useState<Date>(new Date());

	const { data, isLoading, isSuccess, refetch } = useGetTaskListQuery({});
	const [taskList, setTaskList] = useState<ITaskValue[]>();
	const [currTask, setCurrTask] = useState<ITaskValue>();
	const [goalList, setGoalList] = useState<IGoalValue[]>();
	const [goalName, setGoalName] = useState<string>();
	const [createTask] = useCreateTaskMutation();
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [deleteId, setDeleteId] = useState<number>();
	const [deleteTask] = useDeleteTaskMutation({
		fixedCacheKey: 'deleteTask',
	});
	const [updateTask] = useUpdateTaskMutation({
		fixedCacheKey: 'updateTask',
	});

	const role = localStorage?.getItem('role');
	const logUserId = localStorage.getItem('UserId');
	useEffectOnce(() => {
		refetch();
		if (newTask === 'add-task') {
			setIsOpen(true);
			setModalState('Add Task');
		} else if (newTask && newTask !== 'add-task') {
			navigate(`../${pagesMenu.page404.path}`);
		}
	});
	useEffect(() => {
		if (role == 'superadmin') {
			setTaskList(data);
		} else {
			const tempdata = data?.filter(
				(item: ITaskValue) => logUserId == item.created_by || item.created_by == '1',
			);
			setTaskList(tempdata);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isLoading]);
	useEffect(() => {
		if (goalsData) {
			const GoalList = goalsData.map((item: IGoalValueData) => {
				if (Number(logUserId) === item.created_by || role === 'superadmin') {
					return { value: item.id, text: item.title };
				}
				return null;
			});
			const filteredData = GoalList.filter((item: IGoalValue) => item !== null);
			setGoalList(filteredData);
			const GoalName = filteredData.filter(
				(item: IGoalValue) => item.value === Number(goalId!),
			);
			setGoalName(GoalName[0]?.text);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [goalsData]);

	const formiknewTask = useFormik({
		initialValues: {
			name: '',
			description: '',
			dueDate: '',
			category: '',
			expectedTime: '',
			// status: '',
			goalId: '',
			taskId: '',
		},
		enableReinitialize: true,
		onSubmit: (values) => {
			if (modalState === 'Add Task') {
				if (role == 'superadmin') {
					createTask({
						title: values.name,
						description: values.description,
						// status: values.status,
						goal_id: String(goalId || values.goalId),
					})
						.unwrap()
						.then(() => {
							refetch();
						})
						.catch(() => {
							// console.log('error');
						});
				} else {
					createTask({
						title: values.name,
						description: values.description,
						due_date: format(date, 'MM/dd/yyyy'),
						expected_time: values.expectedTime,
						// status: values.status,
						goal_id: String(goalId || values.goalId),
					})
						.unwrap()
						.then(() => {
							refetch();
						})
						.catch(() => {
							// console.log('error');
						});
				}
			}
			if (modalState === 'Edit Task') {
				if (role == 'superadmin') {
					const taskData = {
						title: values.name,
						description: values.description,
					};
					updateTask({
						taskData,
						task_id: values.taskId,
					})
						.unwrap()
						.then(() => {
							refetch();
						})
						.catch(() => {
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
						task_id: values.taskId,
					})
						.unwrap()
						.then(() => {
							refetch();
						})
						.catch(() => {
							// console.log('error', res);
						});
				}
			}
			// setTaskList([...taskList, newTask]);
			setIsOpen(false);
			handleCloseClick();
		},
	});
	const handleDeleteAction = () => {
		// setTaskList(taskList.filter((i) => i.id !== taskId));
		const taskId = deleteId;
		setShowConfirmation(false);
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
	const handleEdit = (id: number) => {
		setCurrTask(undefined);
		setModalState(`Edit Task`);
		if (taskList) {
			const task = taskList.filter((i: ITaskValue) => i.id === id);
			// console.log('selected task>>', task[0]);
			formiknewTask.setFieldValue('name', task[0]?.title);
			formiknewTask.setFieldValue('description', task[0]?.description);
			formiknewTask.setFieldValue('taskId', task[0]?.id);
			formiknewTask.setFieldValue('dueDate', task[0]?.due_date);
			// formiknewTask.setFieldValue('status', task[0]?.status);
			formiknewTask.setFieldValue('expectedTime', task[0]?.expected_time);
		}
		setIsOpen(true);
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
	const handleCloseClick = () => {
		setIsOpen(false);
		navigate(`../${dashboardPagesMenu.tasks.path}`);
	};
	const handledescription = (value: any) => {
		formiknewTask.setFieldValue('description', value);
	};

	return (
		<PageWrapper title={dashboardPagesMenu.tasks.text}>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb list={[{ title: 'Tasks', to: '/' }]} />
				</SubHeaderLeft>
				<SubHeaderRight>
					<Button
						color='success'
						isLight
						icon='Add'
						onClick={() => {
							handleAddTask();
						}}>
						Add Task
					</Button>
				</SubHeaderRight>
			</SubHeader>
			{isLoading ? (
				<Loading />
			) : isSuccess && data ? (
				<Page container='fluid'>
					<div className='display-4 fw-bold py-3'>Tasks</div>
					<Card stretch>
						<CardHeader>
							<CardLabel icon='CalendarToday' iconColor='info'>
								<CardTitle tag='div' className='h5'>
									Tasks List
								</CardTitle>
							</CardLabel>
						</CardHeader>
						<CardBody className='table-responsive'>
							<table className='table table-modern table-hover'>
								<thead>
									<tr>
										<th scope='col' className='cursor-pointer'>
											<span style={{ whiteSpace: 'nowrap' }}>Sr No</span>
										</th>
										<th scope='col' className='cursor-pointer'>
											Name
										</th>
										<th scope='col' style={{ whiteSpace: 'nowrap' }}>
											Description
										</th>
										<th scope='col' style={{ whiteSpace: 'nowrap' }}>
											Subtask Count
										</th>
										{role != 'superadmin' && (
											<>
												<th scope='col' style={{ whiteSpace: 'nowrap' }}>
													Due Date
												</th>
												<th scope='col'>
													<span style={{ whiteSpace: 'nowrap' }}>
														Expected Time
													</span>
												</th>
											</>
										)}

										<th
											scope='col'
											className='cursor-pointer'
											style={{ whiteSpace: 'nowrap' }}>
											Status
										</th>
										<th
											scope='col'
											className='cursor-pointer'
											style={{ whiteSpace: 'nowrap' }}>
											Action
										</th>
									</tr>
								</thead>
								<tbody>
									{taskList && taskList?.length !== 0 ? (
										dataPagination(taskList, currentPage, perPage).map(
											(i, index) => (
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
											),
										)
									) : (
										<div>Not task yet.</div>
									)}
								</tbody>
							</table>
						</CardBody>
						<PaginationButtons
							data={data}
							label='items'
							setCurrentPage={setCurrentPage}
							currentPage={currentPage}
							perPage={perPage}
							setPerPage={setPerPage}
						/>
					</Card>
				</Page>
			) : (
				<div>Error</div>
			)}

			<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='lg' isStaticBackdrop>
				<ModalHeader setIsOpen={handleCloseClick} className='p-4'>
					<ModalTitle id='new_task'>{modalState}</ModalTitle>
				</ModalHeader>
				<ModalBody className='px-4'>
					<div className='row g-4'>
						<div className='col-12 border-bottom' />
						<div className={role != 'superadmin' ? 'col-lg-6' : 'col-lg-12'}>
							{modalState !== 'Edit Task' &&
								(newTask ? (
									<div className='h4 fw-bold py-3'>Goal : {goalName} </div>
								) : (
									<FormGroup id='goalId' label='Goals' className=''>
										<Select
											ariaLabel='Default select example'
											placeholder='Select One...'
											onChange={formiknewTask.handleChange}
											value={formiknewTask.values.goalId}
											list={goalList}
											defaultValue='3'
										/>
									</FormGroup>
								))}

							<FormGroup id='name' label='Name' className='mt-3'>
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
							{role != 'superadmin' && (
								<FormGroup id='expectedTime' label='Expected Time' className='mt-3'>
									<Input
										type='time'
										onChange={formiknewTask.handleChange}
										value={formiknewTask.values.expectedTime}
									/>
								</FormGroup>
							)}
						</div>
						{role != 'superadmin' && (
							<FormGroup id='dueDate' label='Due Date' className='col-lg-6'>
								<div>
									<div className='text-center mt-n4'>
										<DatePicker
											onChange={(item) => setDate(item)}
											date={date}
											minDate={new Date()}
											color={process.env.REACT_APP_PRIMARY_COLOR}
										/>
									</div>
								</div>
							</FormGroup>
						)}
					</div>
				</ModalBody>
				<ModalFooter>
					<CardFooterLeft>
						<Button color='info' onClick={formiknewTask.handleSubmit}>
							{modalState !== 'Edit Task' ? `Save` : `Update`}
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
			<ConfirmationModal
				isOpen={showConfirmation}
				setIsOpen={() => setShowConfirmation(false)}
				onConfirm={handleDeleteAction}
			/>
		</PageWrapper>
	);
};

export default Tasks;
