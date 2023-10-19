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
import TableRow from '../../../../helpers/TableRow';
// import data from '../../../common/data/dummyTaskHoldData';
import { ISubTask, ITask } from '../../../../common/data/dummyGoals';
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
	useCreateSubTaskMutation,
	useDeleteSubTaskMutation,
	useGetSubTaskByTaskIdQuery,
	useUpdateSubTaskMutation,
} from '../../../../features/auth/taskManagementApiSlice';
import { useEffectOnce } from 'react-use';
import { pagesMenu } from '../../../../menu';
import SubtaskTableRow from './subtaskHelper/SubtaskTableRow';

interface ITaskValue {
	goalId: number;
	ITask: ITask;
}
interface ISubtask {
	created_at: string;
	description: string;
	id: number;
	scheduled_on: string;
	task: string;
	title: string;
	updated_at: string;
	user_assigned: string;
}
const SubTask: FC = () => {
	const navigate = useNavigate();
	const { taskId: id, addSubtask } = useParams();
	useEffectOnce(() => {
		if (addSubtask === 'add-sub-task') {
			setIsOpen(true);
			// console.log('Add new sub task');
		} else if (addSubtask && addSubtask !== 'add-sub-task') {
			navigate(`../${pagesMenu.page404.path}`);
		}
	});
	const { data, isLoading, isSuccess, isError, refetch } = useGetSubTaskByTaskIdQuery(
		Number(id!),
	);
	const [createSubTask] = useCreateSubTaskMutation();
	const [updateSubTask] = useUpdateSubTaskMutation();
	const [deleteSubTask] = useDeleteSubTaskMutation();
	const [cardsData, setCardsData] = useState<ISubtask[]>(data && data.subtasks);
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['10']);
	const [modalState, setModalState] = useState('Add Task');
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [currTask, setCurrTask] = useState<ITask[]>();
	// const savedValue = localStorage?.getItem('user');
	// const localUser = savedValue ? JSON.parse(savedValue) : null;
	// const role = user.role || localUser?.role;
	const role = localStorage?.getItem('role');
	console.log('subtask>>', data);

	// useEffect(() => {
	// 	const allTasks: ITaskValue[] = [];
	// 	data.forEach((goal) => {
	// 		if (goal.task) {
	// 			goal.task.forEach((task) => {
	// 				allTasks.push({ goalId: goal.id, ITask: task });
	// 			});
	// 		}
	// 	});
	// 	setTaskList(allTasks);
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [data]);
	// console.log('taskList>>>', taskList);

	const formik = useFormik({
		initialValues: {
			title: '',
			description: '',
			dueDate: '',
			category: '',
			expectedTime: '',
			status: '',
			goalId: 0,
			sub_id: '',
		},
		enableReinitialize: true,
		onSubmit: (values) => {
			console.log('id>>>>', id);
			if (modalState === 'Add Task') {
				createSubTask({
					task_id: String(id),
					title: values.title,
					description: values.description,
				}).then((res) => {
					console.log('Subtask Created', res);
					refetch();
				});
			}
			if (modalState === 'Edit Task') {
				const taskData = {
					task_id: String(id),
					description: values.description,
					title: values.title,
				};
				updateSubTask({
					subtaskId: String(values.sub_id),
					taskData,
				}).then(() => {
					refetch();
				});
			}
			// setTaskList([...taskList, newTask]);
			setIsOpen(false);
		},
	});
	const handleDeleteAction = (subId: number) => {
		// setTaskList(taskList.filter((i) => i.id !== id));
		deleteSubTask(subId).then((res)=>{
			console.log("res",res);
			refetch();
		})
	};
	const handleEdit = (SubId: number) => {
		setModalState(`Edit Task`);
		const task = data.subtasks.filter((i: any) => i.id === SubId);
		formik.setFieldValue('title', task[0]?.title);
		formik.setFieldValue('description', task[0]?.description);
		formik.setFieldValue('sub_id', task[0]?.id);
		// formik.setFieldValue('category', task[0]?.category);
		// formik.setFieldValue('status', task[0]?.status);
		// formik.setFieldValue('expectedTime', task[0]?.expectedTime);
		setIsOpen(true);
	};
	const handleView = (Subid: ISubTask) => {
		setModalState(`SubTask Details`);
		// console.log('clicked view', id);
		// if (role !== 'superadmin') navigate(`../${pagesMenu.subtasks.path}/${id}/`);
	};
	const handleCloseClick = () => {
		setIsOpen(false);
		navigate(`../${pagesMenu.subTasks.path}/${id}`);
	};

	const handleAddTask = () => {
		setCurrTask(undefined);
		formik.setFieldValue('name', '');
		formik.setFieldValue('description', '');
		formik.setFieldValue('dueDate', '');
		formik.setFieldValue('category', '');
		formik.setFieldValue('status', '');
		formik.setFieldValue('expectedTime', '');
		setModalState('Add Task');
		setIsOpen(true);
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
						Add SubTask
					</Button>
				</SubHeaderRight>
			</SubHeader>
			<Page container='fluid'>
				<div className='display-4 fw-bold py-3'>SubTasks</div>
				<Card stretch>
					<CardHeader>
						<CardLabel icon='CalendarToday' iconColor='info'>
							<CardTitle tag='div' className='h5'>
								SubTasks List
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
									<th scope='col'>Description</th>
									<th scope='col' className='cursor-pointer'>
										Action
									</th>
								</tr>
							</thead>
							<tbody>
								{data && data.subtasks
									? dataPagination(data.subtasks, currentPage, perPage).map(
											(i, index) => (
												<SubtaskTableRow
													// eslint-disable-next-line react/no-array-index-key
													key={index}
													id={index + 1}
													// eslint-disable-next-line react/jsx-props-no-spreading
													subtask={i}
													edit={handleEdit}
													view={handleView}
													deleteAction={handleDeleteAction}
												/>
											),
									  )
									: null}
							</tbody>
						</table>
					</CardBody>
					{data && data.subtasks && (
						<PaginationButtons
							data={data.subtasks}
							label='items'
							setCurrentPage={setCurrentPage}
							currentPage={currentPage}
							perPage={perPage}
							setPerPage={setPerPage}
						/>
					)}
				</Card>
			</Page>
			<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='lg'>
				<ModalHeader setIsOpen={handleCloseClick} className='p-4'>
					<ModalTitle id='new_task'>{modalState}</ModalTitle>
				</ModalHeader>
				{currTask ? (
					<>
						<ModalBody className='px-4'>
							<div className='row g-4'>
								<div className='col-12 border-bottom' />
								<div>{/* <span>Name :</span> <span>{currTask.name}</span> */}</div>
								<div>
									{/* <span>Description :</span> <span>{currTask.description}</span> */}
								</div>
								<div>
									{/* <span>DueDate :</span> <span>{currTask.dueDate}</span> */}
								</div>
								<div>
									{/* <span>Status :</span> <span>{currTask.status}</span> */}
								</div>
								<div>
									<span>Expected Time :</span>
									{/* <span>{currTask.expectedTime}</span> */}
								</div>
							</div>
						</ModalBody>
						<ModalFooter>
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
				) : (
					<>
						<ModalBody className='px-4'>
							<div className='row g-4'>
								<div className='col-12 border-bottom' />
								<FormGroup id='title' label='Name' className='col-lg-6'>
									<Input
										type='text'
										onChange={formik.handleChange}
										value={formik.values.title}
									/>
								</FormGroup>
								<FormGroup
									id='description'
									label='Description'
									className='col-lg-6'>
									<Input
										type='text'
										onChange={formik.handleChange}
										value={formik.values.description}
									/>
								</FormGroup>
								<FormGroup id='dueDate' label='Due Date' className='col-lg-6'>
									<Input
										type='date'
										onChange={formik.handleChange}
										value={formik.values.dueDate}
									/>
								</FormGroup>
								{/* <FormGroup id='category' label='Enter Category'>
									<Input
										type='text'
										onChange={formik.handleChange}
										value={formik.values.category}
									/>
								</FormGroup> */}

								<FormGroup
									id='expectedTime'
									label='Expected Time'
									className='col-lg-6'>
									<Input
										type='date'
										onChange={formik.handleChange}
										value={formik.values.expectedTime}
									/>
								</FormGroup>
								<FormGroup id='status' label='Status' className='col-lg-6'>
									<Select
										ariaLabel='Default select example'
										placeholder='Select One...'
										onChange={formik.handleChange}
										value={formik.values.status}
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
								<Button color='info' onClick={formik.handleSubmit}>
									Save
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
				)}
			</Modal>
		</PageWrapper>
	);
};

export default SubTask;
