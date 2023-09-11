import React, { useState } from 'react';
import { useFormik } from 'formik';
import { adminDashboardPagesMenu } from '../../../menu';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons';
import Card, {
	CardActions,
	CardBody,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../components/bootstrap/Card';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Button from '../../../components/bootstrap/Button';
import data from '../../../common/data/dummyTaskHoldData';
import Badge from '../../../components/bootstrap/Badge';
import { useNavigate } from 'react-router-dom';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import useDarkMode from '../../../hooks/useDarkMode';
import CommonDashboardRecentActivities from '../../presentation/dashboard/common/CommonDashboardRecentActivities';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
import { date } from 'yup';
import Label from '../../../components/bootstrap/forms/Label';

interface ITaskData {
	id: number;
	dueDate: string;
	name: string;
	category: string;
	expectedTime: string;
	status: string;
	edit: string;
	goalId: number;
}
const TaskManagement = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['10']);
	const { darkModeStatus } = useDarkMode();
	const [isOpen, setIsOpen] = useState(false);
	const [taskData, setTaskData] = useState(data);

	const handleDelete = (id: number) => {
		const updatedTask = taskData.filter((item) => item.id !== id);
		setTaskData(updatedTask);
	};

	const validate = (values: {
		name: string;
		dueDate: string;
		category: string;
		expectedTime: string;
		status: string;
		goalId: number;
	}) => {
		const errors: {
			name: string;
			dueDate: string;
			category: string;
			expectedTime: string;
			status: string;
			goalId: number;
		} = {
			name: '',
			dueDate: '',
			category: '',
			expectedTime: '',
			status: '',
			goalId: 0,
		};
		if (!values.name) {
			errors.name = 'Required';
		}
		if (!values.dueDate) {
			errors.dueDate = 'Required';
		}
		if (!values.category) {
			errors.category = 'Required';
		}
		if (!values.expectedTime) {
			errors.expectedTime = 'Required';
		}
		if (!values.status) {
			errors.status = 'Required';
		}	
	};

	const formik = useFormik({
		initialValues: {
			name: '',
			dueDate: '',
			category: '',
			expectedTime: '',
			status: '',
			goalId: 0,
		},
		validate,
		onSubmit: (values) => {
			// console.log(values);
			setIsOpen(false);
			const newTask: ITaskData = {
				id: taskData.length + 1,
				name: values.name,
				dueDate: values.dueDate,
				category: values.category,
				expectedTime: values.expectedTime,
				status: values.status,
				edit: 'Edit',
				goalId: values.goalId,
			};
			setTaskData([...taskData, newTask]);
		},
		enableReinitialize: true,
	});
	return (
		<PageWrapper title={adminDashboardPagesMenu.task.text}>
			<SubHeader>
				<SubHeaderLeft>
					<span className='text-muted fst-italic me-2'>Last update:</span>
					<span className='fw-bold'>13 hours ago</span>
				</SubHeaderLeft>
				<SubHeaderRight>
					<Button color='info' icon='Add' isLight onClick={() => setIsOpen(true)}>
						Add New
					</Button>
				</SubHeaderRight>
			</SubHeader>
			<Page container='fluid'>
				<div className='display-6 fw-bold py-3'>Task Management</div>
				<Card stretch>
					<CardBody className='table-responsive'>
						<table className='table table-modern table-hover'>
							<thead>
								<tr>
									<th scope='col' className='cursor-pointer'>
										#
									</th>
									<th scope='col'>Name</th>
									<th scope='col' className='cursor-pointer'>
										Due Date
									</th>
									<th scope='col'>Category</th>
									<th scope='col' className='cursor-pointer'>
										Expected Time
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
								{dataPagination(taskData, currentPage, perPage).map((i) => (
									<tr>
										<th scope='row'>{i.id}</th>
										<td>{i.name}</td>
										<td>{i.dueDate}</td>
										<td>{i.category}</td>
										<td>{i.expectedTime}</td>
										<td>
											{/* <Badge
												color={
													(i.status === 'Rejected' && 'danger') ||
													(i.status === 'Cancelled' && 'warning') ||
													(i.status === 'Approved' && 'success') ||
													'info'
												}>
												{i.status}
											</Badge> */}
										</td>

										<td>
											<Button
												color='info'
												icon='Visibility'
												className='me-2'
												isLight
												// isDisable
											/>
											<Button
												icon='Delete'
												className='me-1'
												color='danger'
												isLight
												onClick={() => handleDelete(i.id)}
											/>
										</td>
									</tr>
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
				<div className='row'>
					<div className='col-xxl-8'>
						<Card stretch>
							<CardHeader>
								<CardLabel icon='Task' iconColor='secondary'>
									<CardTitle tag='div' className='h5'>
										Task Tracker
									</CardTitle>
								</CardLabel>
								<CardActions>
									<Dropdown>
										<DropdownToggle hasIcon={false}>
											<Button
												color={darkModeStatus ? 'light' : 'dark'}
												isLink
												hoverShadow='default'
												icon='MoreHoriz'
												aria-label='More Actions'
											/>
										</DropdownToggle>
										<DropdownMenu isAlignmentEnd>
											<DropdownItem>
												<Button
													icon='Send'
													tag='a'
													href='mailto:example@site.com'>
													Send Bulk Mail
												</Button>
											</DropdownItem>
										</DropdownMenu>
									</Dropdown>
								</CardActions>
							</CardHeader>
							<CardBody>
								<div className='row g-3'>Time</div>
							</CardBody>
						</Card>
					</div>
					<div className='col-xxl-4'>
						<CommonDashboardRecentActivities />
					</div>
				</div>
			</Page>
			<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
				<ModalHeader setIsOpen={setIsOpen} className='p-4'>
					<ModalTitle id='user'>New Task</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<FormGroup id='name' label='Name' className='col-lg-12 mb-3'>
						<Input
							onChange={formik.handleChange}
							value={formik.values.name}
							isValid={formik.isValid}
							isTouched={formik.touched.name}
							invalidFeedback={formik.errors.name}
							validFeedback='Looks good!'
						/>
					</FormGroup>
					<FormGroup id='dueDate' label='Due Date' className='col-lg-12 mb-3'>
						<Input
							type='date'
							onChange={formik.handleChange}
							value={formik.values.dueDate}
							isValid={formik.isValid}
							isTouched={formik.touched.dueDate}
							invalidFeedback={formik.errors.dueDate}
							validFeedback='Looks good!'
						/>
					</FormGroup>
					<FormGroup id='category' label='Category' className='col-lg-12 mb-3'>
						<Input
							onChange={formik.handleChange}
							value={formik.values.category}
							isValid={formik.isValid}
							isTouched={formik.touched.category}
							invalidFeedback={formik.errors.category}
							validFeedback='Looks good!'
						/>
					</FormGroup>
					<FormGroup id='expectedTime' label='Expected Time' className='col-lg-12 mb-3'>
						<Input
							type='date'
							onChange={formik.handleChange}
							value={formik.values.expectedTime}
							isValid={formik.isValid}
							isTouched={formik.touched.expectedTime}
							invalidFeedback={formik.errors.expectedTime}
							validFeedback='Looks good!'
						/>
					</FormGroup>
					<FormGroup id='status' label='Status' className='col-lg-12 mb-3'>
						<ChecksGroup isInline>
							<Checks
								type='radio'
								id='Approved'
								name='status'
								label='Approved'
								value='Approved'
								onChange={formik.handleChange}
								checked={formik.values.status}
								isValid={formik.isValid}
								isTouched={formik.touched.status}
								invalidFeedback={formik.errors.status}
								validFeedback='Looks good!'
							/>
							<Checks
								type='radio'
								id='Cancelled'
								name='status'
								label='Cancelled'
								value='Cancelled'
								onChange={formik.handleChange}
								checked={formik.values.status}
								isValid={formik.isValid}
								isTouched={formik.touched.status}
								invalidFeedback={formik.errors.status}
								validFeedback='Looks good!'
							/>
							<Checks
								type='radio'
								id='Rejected'
								name='status'
								label='Rejected'
								value='Rejected'
								onChange={formik.handleChange}
								checked={formik.values.status}
								isValid={formik.isValid}
								isTouched={formik.touched.status}
								invalidFeedback={formik.errors.status}
								validFeedback='Looks good!'
							/>
						</ChecksGroup>
					</FormGroup>
				</ModalBody>
				<ModalFooter>
					<CardFooterLeft>
						<Button
							type='submit'
							color='danger'
							icon='Cancel'
							onClick={() => {
								setIsOpen(false);
							}}>
							Cancel
						</Button>
					</CardFooterLeft>
					<CardFooterRight>
						<Button
							type='submit'
							color='success'
							icon='save'
							onClick={formik.handleSubmit}>
							Submit
						</Button>
					</CardFooterRight>
				</ModalFooter>
			</Modal>
		</PageWrapper>
	);
};

export default TaskManagement;
