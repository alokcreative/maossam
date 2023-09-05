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

const Tasks: FC = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['10']);
	const [taskList, setTaskList] = useState(data);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const formiknewTask = useFormik({
		initialValues: {
			name: '',
			dueDate: '',
			category: '',
			expectedTime: '',
			status: '',
		},
		onSubmit: (values) => {
			const newTask = {
				id: taskList.length + 1,
				dueDate: values.dueDate,
				name: values.name,
				category: values.category,
				expectedTime: values.expectedTime,
				status: values.status,
				edit: 'Edit',
			};
			setTaskList([...taskList, newTask]);
			setIsOpen(false);
		},
	});
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
							setIsOpen(true);
						}}>
						Add Task
					</Button>
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
										#
									</th>
									<th scope='col'>Due Date</th>
									<th scope='col' className='cursor-pointer'>
										Name
									</th>
									<th scope='col'>Expected Time</th>
									<th scope='col' className='cursor-pointer'>
										Status
									</th>
									<th scope='col' className='cursor-pointer'>
										Edit
									</th>
								</tr>
							</thead>
							<tbody>
								{dataPagination(taskList, currentPage, perPage).map((i) => (
									// eslint-disable-next-line react/jsx-props-no-spreading
									<TableRow key={i.id} {...i} />
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
					<ModalTitle id='new_task'>Add Task</ModalTitle>
				</ModalHeader>
				<ModalBody className='px-4'>
					<div className='row g-4'>
						<div className='col-12 border-bottom' />
						<FormGroup id='name' label='Name of Task' className='col-lg-6'>
							<Input
								type='text'
								onChange={formiknewTask.handleChange}
								value={formiknewTask.values.name}
							/>
						</FormGroup>
						<FormGroup id='dueDate' label='Due Date' className='col-lg-6'>
							<Input
								type='date'
								onChange={formiknewTask.handleChange}
								value={formiknewTask.values.dueDate}
							/>
						</FormGroup>
						<FormGroup id='category' label='Enter Category'>
							<Input
								type='text'
								onChange={formiknewTask.handleChange}
								value={formiknewTask.values.category}
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
									{ value: 'Approved', text: 'Approved' },
									{ value: 'Rejected', text: 'Rejected' },
									{ value: 'Cancelled', text: 'Cancelled' },
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
			</Modal>
		</PageWrapper>
	);
};

export default Tasks;
