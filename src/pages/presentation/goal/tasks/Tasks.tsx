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
import { toast } from 'react-toastify';

interface IGoalValue {
	category: string;
	created_at: string;
	description: string;
	id: number;
	title: string;
	updated_at: string;
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
}
const Tasks: FC = () => {
	const { newTask } = useParams();
	const navigate = useNavigate();
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['10']);
	const [modalState, setModalState] = useState('Add Task');
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { data: goalsData, isLoading: loading } = useGetGoalsQuery({
		fixedCacheKey: 'listTask',
	});

	const { data, isLoading, isSuccess, refetch } = useGetTaskListQuery({});
	const [taskList, setTaskList] = useState<ITaskValue[]>(data);
	const [currTask, setCurrTask] = useState<ITaskValue>();
	const [goalList, setGoalList] = useState<IGoalValue[]>();
	const [createTask] = useCreateTaskMutation();
	const [deleteTask] = useDeleteTaskMutation({
		fixedCacheKey: 'deleteTask',
	});
	const [updateTask] = useUpdateTaskMutation({
		fixedCacheKey: 'updateTask',
	});

	// const role = localStorage?.getItem('role');
	useEffectOnce(() => {
		refetch()
		if (newTask === 'add-task') {
			setIsOpen(true);
			setModalState('Add Task');
		} else if (newTask && newTask !== 'add-task') {
			navigate(`../${pagesMenu.page404.path}`);
		}
	});
	useEffect(() => {
		// const allTasks: ITaskValue[] = [];
		// data.forEach((goal:any) => {
		// 	if (goal.task) {
		// 		goal.task.forEach((task) => {
		// 			allTasks.push({ goalId: goal.id, ITask: task });
		// 		});
		// 	}
		// });
		setTaskList(data);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);
	useEffect(() => {
		if (goalsData) {
			const GoalList = goalsData.map((item: IGoalValue) => {
				return { value: item.id, text: item.title };
			});
			setGoalList(GoalList);
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
			status: '',
			goalId: '',
			taskId: '',
		},
		enableReinitialize: true,
		onSubmit: (values) => {
			if (modalState === 'Add Task') {
				createTask({
					title: values.name,
					description: values.description,
					goal_id: String(values.goalId),
				})
					.unwrap()
					.then((res: any) => {
						refetch();
					})
					.catch(() => {
						// console.log('error');
					});
			}
			if (modalState === 'Edit Task') {
				const taskData = {
					title: values.name,
					description: values.description,
				};
				updateTask({
					taskData,
					task_id: values.taskId,
				})
					.unwrap()
					.then((res) => {
						refetch();
					})
					.catch((res) => {
						// console.log('error', res);
					});
			}
			// setTaskList([...taskList, newTask]);
			setIsOpen(false);
			handleCloseClick();
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
	const handleEdit = (id: number) => {
		setCurrTask(undefined);
		setModalState(`Edit Task`);
		const task = taskList.filter((i: ITaskValue) => i.id === id);
		// console.log('selected task>>', task[0]);
		formiknewTask.setFieldValue('name', task[0]?.title);
		formiknewTask.setFieldValue('description', task[0]?.description);
		formiknewTask.setFieldValue('taskId', task[0]?.id);
		// formiknewTask.setFieldValue('dueDate', task[0]?.dueDate);
		// formiknewTask.setFieldValue('category', task[0]?.category);
		// formiknewTask.setFieldValue('status', task[0]?.status);
		// formiknewTask.setFieldValue('expectedTime', task[0]?.expectedTime);
		setIsOpen(true);
	};
	const handleView = (id: number) => {
		setModalState(`Task Details`);
		// console.log('clicked view', id);
		const task = taskList.filter((i: ITaskValue) => i.id === id);
		// console.log('task Clicked>>', task);
		setCurrTask(task[0]);

		// subcardData(i);
		// if (role !== 'superadmin') navigate(`../${pagesMenu.}/${id}/`);
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
	return (
		<PageWrapper>
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
											Due Date
										</th>
										<th scope='col'>
											<span style={{ whiteSpace: 'nowrap' }}>
												Expected Time
											</span>
										</th>
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
									{taskList
										? dataPagination(taskList, currentPage, perPage).map(
												(i, index) => (
													<TaskTableRow
														// eslint-disable-next-line react/no-array-index-key
														key={index}
														id={index + 1}
														// eslint-disable-next-line react/jsx-props-no-spreading
														task={i}
														edit={handleEdit}
														deleteAction={handleDeleteAction}
													/>
												),
										  )
										: null}
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
						{modalState !== 'Edit Task' && (
							<FormGroup id='goalId' label='goalId' className='col-lg-6'>
								<Select
									ariaLabel='Default select example'
									placeholder='Select One...'
									onChange={formiknewTask.handleChange}
									value={formiknewTask.values.goalId}
									list={goalList}
								/>
							</FormGroup>
						)}

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
		</PageWrapper>
	);
};

export default Tasks;
