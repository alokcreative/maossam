import React, { FC, useState } from 'react';
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
import { useNavigate, useParams } from 'react-router-dom';

export const SELECT_OPTIONS = [
	{ value: 1, text: 'Backlog' },
	{ value: 2, text: 'To Do' },
	{ value: 3, text: 'Progress' },
	{ value: 4, text: 'Done' },
	{ value: 5, text: 'Hold' },
];

interface ITask {
	id: number;
	name?: string;
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
	const [goal, setGoal] = useState<IGoalValues | undefined>(() => {
		const foundGoal = data.find((i) => i.id === Number(id));
		return foundGoal;
	});
	const [isOpen, setIsOpen] = useState<boolean>(false);
	// const [tasks, setTasks] = useState<ITask[] | undefined>(goal?.task);
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['10']);
	const navigate = useNavigate();
	const [modalState, setModalState] = useState('Add Task');
	const [taskList, setTaskList] = useState<ITask[]>(goal?.task || []);
	const [currTask, setCurrTask] = useState<ITask>();
	console.log('goal', goal);

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

	const formiknewTask = useFormik({
		initialValues: {
			name: '',
			description: '',
			dueDate: '',
			category: '',
			expectedTime: '',
			status: '',
			goalId: 0,
		},
		enableReinitialize: true,
		onSubmit: (values) => {
			const newTask = {
				id: taskList ? taskList.length + 1 : 1,
				dueDate: values.dueDate,
				name: values.name,
				description: values.description,
				category: values.category,
				expectedTime: values.expectedTime,
				status: values.status,
				edit: 'Edit',
				goalId: values.goalId,
			};
			setTaskList([...taskList, newTask]);
			setIsOpen(false);
		},
	});

	const handleDeleteAction = (taskId: number) => {
		setTaskList(taskList.filter((i) => i.id !== taskId));
	};
	const handleEdit = (taskId: number) => {
		setCurrTask(undefined);
		setModalState(`Edit Task`);
		const task = taskList.filter((i) => i.id === taskId);
		formiknewTask.setFieldValue('name', task[0]?.name);
		formiknewTask.setFieldValue('description', task[0]?.description);
		formiknewTask.setFieldValue('dueDate', task[0]?.dueDate);
		formiknewTask.setFieldValue('category', task[0]?.category);
		formiknewTask.setFieldValue('status', task[0]?.status);
		formiknewTask.setFieldValue('expectedTime', task[0]?.expectedTime);
		setIsOpen(true);
	};
	const handleView = (taskId: number) => {
		setModalState(`Task Details`);
		const task = taskList.filter((i) => i.id === taskId);

		console.log('taskId>>>', taskId);
		setCurrTask(task[0]);
		console.log('task>>>', task[0]);
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
	console.log('taskList', taskList);
	return (
		<PageWrapper>
			<SubHeader>
				<SubHeaderLeft>
					<Button color='info' isLink icon='ArrowBack' onClick={() => navigate(-1)}>
						Back to Goals
					</Button>
				</SubHeaderLeft>
			</SubHeader>
			<Page container='fluid'>
				<div className='display-4 fw-bold py-3'> Goal Description</div>
				<div className='row h-100'>
					<div className='col-12'>
						<Card>
							<CardBody>
								<div>
									<span className='display-7 fw-bold p-3'>Name :</span>
									<span>{goal?.name}</span>
								</div>
								<div>
									<span className='display-7 fw-bold p-3'>Description :</span>
									<span>{goal?.description}</span>
								</div>
								<div>
									<span className='display-7 fw-bold p-3'>Status: </span>
									<span>{goal?.status}</span>
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
													<th scope='col'>Sr No</th>
													<th scope='col'>Name</th>
													<th scope='col'>Description</th>
													<th scope='col'>Status</th>
													<th scope='col'>ExpectedTime</th>
													<th scope='col'>Due Date</th>
													<th scope='col'>Action</th>
												</tr>
											</thead>
											<tbody>
												{taskList ? (
													dataPagination(
														taskList,
														currentPage,
														perPage,
													).map((i) => (
														<tr>
															<td>{i.id}</td>
															<td>{i.name}</td>
															<td>{i.description}</td>
															<td>{i.status}</td>
															<td>{i.expectedTime}</td>
															<td>{i.dueDate}</td>
															<td>
																<Button
																	icon='Visibility'
																	color='primary'
																	isLight
																	className='me-1'
																	onClick={() => handleView(i.id)}
																/>
																<Button
																	icon='Edit'
																	color='success'
																	isLight
																	className='me-1'
																	onClick={() => handleEdit(i.id)}
																/>
																<Button
																	icon='Delete'
																	color='danger'
																	isLight
																	className='me-1'
																	onClick={() =>
																		handleDeleteAction(i.id)
																	}
																/>
															</td>
														</tr>
													))
												) : (
													<th scope='col'>No Data</th>
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
			<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='lg'>
				<ModalHeader setIsOpen={setIsOpen} className='p-4'>
					<ModalTitle id='new_task'>{modalState}</ModalTitle>
				</ModalHeader>
				{currTask ? (
					<>
						<ModalBody className='px-4'>
							<div className='row g-4'>
								<div className='col-12 border-bottom' />
								<div>
									<span>Name :</span> <span>{currTask?.name}</span>
								</div>

								<div>
									<span>Description :</span> <span>{currTask?.description}</span>
								</div>
								<div>
									<span>Expected Time :</span>
									<span>{currTask?.expectedTime}</span>
								</div>
								<div>
									<span>DueDate :</span> <span>{currTask?.dueDate}</span>
								</div>
								<div>
									<span>Status :</span> <span>{currTask?.status}</span>
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
								<FormGroup id='name' label='Name' className='col-lg-6'>
									<Input
										type='text'
										onChange={formiknewTask.handleChange}
										value={formiknewTask.values.name}
									/>
								</FormGroup>
								<FormGroup id='name' label='Description' className='col-lg-6'>
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

								<FormGroup
									id='expectedTime'
									label='Expected Time'
									className='col-lg-6'>
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
				)}
			</Modal>
		</PageWrapper>
	);
};

export default GoalDescription;
