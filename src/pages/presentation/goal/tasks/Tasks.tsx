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
import data, { ISubTask, ITask } from '../../../../common/data/dummyGoals';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../../components/bootstrap/Modal';
import Select from '../../../../components/bootstrap/forms/Select';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { Role } from '../../../../common/data/userDummyData';
import SubTasksCard from './taskboard/SubTasksCard';

interface ITaskValue {
	goalId: number;
	ITask: ITask;
}
const Tasks: FC = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['10']);
	const [modalState, setModalState] = useState('Add Task');
	const [taskList, setTaskList] = useState<ITaskValue[] | undefined>();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [currTask, setCurrTask] = useState<ITask[]>();
	// const savedValue = localStorage?.getItem('user');
	// const localUser = savedValue ? JSON.parse(savedValue) : null;
	// const role = user.role || localUser?.role;
	const role = localStorage?.getItem('role');

	useEffect(() => {
		const allTasks: ITaskValue[] = [];
		data.forEach((goal) => {
			if (goal.task) {
				goal.task.forEach((task) => {
					allTasks.push({ goalId: goal.id, ITask: task });
				});
			}
		});
		setTaskList(allTasks);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);
	// console.log('taskList>>>', taskList);

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
				// id: taskList?.length + 1,
				id: 1,
				dueDate: values.dueDate,
				name: values.name,
				description: values.description,
				category: values.category,
				expectedTime: values.expectedTime,
				status: values.status,
				edit: 'Edit',
				goalId: values.goalId,
			};
			// setTaskList([...taskList, newTask]);
			setIsOpen(false);
		},
	});
	const handleDeleteAction = (id: number) => {
		// setTaskList(taskList.filter((i) => i.id !== id));
	};
	const handleEdit = (id: number) => {
		setCurrTask(undefined);
		setModalState(`Edit Task`);
		// const task = taskList.filter((i) => i.id === id);
		// formiknewTask.setFieldValue('name', task[0]?.name);
		// formiknewTask.setFieldValue('description', task[0]?.description);
		// formiknewTask.setFieldValue('dueDate', task[0]?.dueDate);
		// formiknewTask.setFieldValue('category', task[0]?.category);
		// formiknewTask.setFieldValue('status', task[0]?.status);
		// formiknewTask.setFieldValue('expectedTime', task[0]?.expectedTime);
		setIsOpen(true);
	};
	const handleView = (i: ISubTask) => {
		setModalState(`Task Details`);
		console.log('clicked view', i);
		// const task = taskList.filter((i) => i.id === id);
		// setCurrTask(task[0]);

		// subcardData(i);
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
					<Breadcrumb list={[{ title: 'Tasks', to: '/' }]} />
				</SubHeaderLeft>
				<SubHeaderRight>
					{role !== 'user' && (
						<Button
							color='success'
							isLight
							icon='Add'
							onClick={() => {
								handleAddTask();
							}}>
							Add Task
						</Button>
					)}
				</SubHeaderRight>
			</SubHeader>
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
									<th scope='col'>Description</th>
									<th scope='col'>Due Date</th>
									<th scope='col'>
										<span style={{ whiteSpace: 'nowrap' }}>Expected Time</span>
									</th>
									<th scope='col' className='cursor-pointer'>
										Status
									</th>
									<th scope='col' className='cursor-pointer'>
										Action
									</th>
								</tr>
							</thead>
							<tbody>
								{taskList
									? dataPagination(taskList, currentPage, perPage).map(
											(i, index) => (
												<TableRow
													// eslint-disable-next-line react/no-array-index-key
													key={index}
													id={index + 1}
													// eslint-disable-next-line react/jsx-props-no-spreading
													task={i}
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
			<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='lg'>
				<ModalHeader setIsOpen={setIsOpen} className='p-4'>
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
								<Button color='info' onClick={formiknewTask.handleSubmit}>
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

export default Tasks;
