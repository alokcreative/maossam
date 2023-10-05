import React, { FC, useState } from 'react';
import { useFormik } from 'formik';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import Page from '../../../layout/Page/Page';
import Card, {
	CardBody,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons';
import TableRow from '../../../helpers/TableRow';
import data from '../../../common/data/dummyTaskHoldData';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal';
import Select from '../../../components/bootstrap/forms/Select';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { Role } from '../../../common/data/userDummyData';

interface ITaskProps {
	id: number;
	dueDate: string;
	name: string;
	category: string;
	description: string;
	expectedTime: string;
	status: string;
	assigned?: string | undefined;
	edit: string;
	goalId: number;
}
const Tasks: FC = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['10']);
	const [modalState, setModalState] = useState('Add Task');
	const [taskList, setTaskList] = useState(data);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [currTask, setCurrTask] = useState<ITaskProps>();
	const { user } = useSelector((state: RootState) => state.auth);
	const savedValue = localStorage?.getItem('user');
	const localUser = savedValue ? JSON.parse(savedValue) : null;
	const role = user.role || localUser?.role;

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
				id: taskList.length + 1,
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
	const handleDeleteAction = (id: number) => {
		setTaskList(taskList.filter((i) => i.id !== id));
	};
	const handleEdit = (id: number) => {
		setCurrTask(undefined);
		setModalState(`Edit Task`);
		const task = taskList.filter((i) => i.id === id);
		formiknewTask.setFieldValue('name', task[0]?.name);
		formiknewTask.setFieldValue('description', task[0]?.description);
		formiknewTask.setFieldValue('dueDate', task[0]?.dueDate);
		formiknewTask.setFieldValue('category', task[0]?.category);
		formiknewTask.setFieldValue('status', task[0]?.status);
		formiknewTask.setFieldValue('expectedTime', task[0]?.expectedTime);
		setIsOpen(true);
	};
	const handleView = (id: number) => {
		setModalState(`Task Details`);
		const task = taskList.filter((i) => i.id === id);
		setCurrTask(task[0]);
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
	return (
		<PageWrapper>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb list={[{ title: 'Tasks', to: '/' }]} />
				</SubHeaderLeft>
				<SubHeaderRight>
					{role === Role.admin && (
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
										Sr No
									</th>
									<th scope='col' className='cursor-pointer'>
										Name
									</th>
									<th scope='col'>Description</th>
									<th scope='col'>Due Date</th>
									<th scope='col'>Expected Time</th>
									<th scope='col' className='cursor-pointer'>
										Status
									</th>
									<th scope='col' className='cursor-pointer'>
										Action
									</th>
								</tr>
							</thead>
							<tbody>
								{dataPagination(taskList, currentPage, perPage).map((i) => (
									// eslint-disable-next-line react/jsx-props-no-spreading
									<TableRow
										key={i.id}
										{...i}
										edit={handleEdit}
										view={handleView}
										deleteAction={handleDeleteAction}
									/>
								))}
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
								<div>
									<span>Name :</span> <span>{currTask.name}</span>
								</div>
								<div>
									<span>Description :</span> <span>{currTask.description}</span>
								</div>
								<div>
									<span>DueDate :</span> <span>{currTask.dueDate}</span>
								</div>
								<div>
									<span>Status :</span> <span>{currTask.status}</span>
								</div>
								<div>
									<span>Expected Time :</span>
									<span>{currTask.expectedTime}</span>
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

export default Tasks;
