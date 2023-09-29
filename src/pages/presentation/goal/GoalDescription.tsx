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
	taskName: string;
	Description: string;
	Status: string;
	DueDate?: string | undefined;
}
interface IValues {
	id: number;
	name: string;
	description: string;
	timeline: string;
	status: string;
	task?: ITask[] | undefined;
}

const GoalDescription: FC = () => {
	const { id } = useParams();
	const [goal, setGoal] = useState<IValues | undefined>(data.find((i) => i.id === Number(id)));
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [tasks, setTasks] = useState<ITask[] | undefined>(goal?.task);
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['10']);
	const navigate = useNavigate();
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
	console.log('goal>>', goal);
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
								<div className='display-6 fw-bold py-3'>{goal?.name}</div>
								<div className='display-7 fw-bold py-3'>{goal?.description}</div>
								<div className='display-7 fw-bold py-3'>Status: {goal?.status}</div>
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
												setIsOpen(true);
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
													<th scope='col'>#</th>
													<th scope='col'>Name</th>
													<th scope='col'>Description</th>
													<th scope='col'>Status</th>
													<th scope='col'>Due Date</th>
													<th scope='col'>Action</th>
												</tr>
											</thead>
											<tbody>
												{tasks ? (
													dataPagination(tasks, currentPage, perPage).map(
														(i) => (
															<tr>
																<td>{i.id}</td>
																<td>{i.taskName}</td>
																<td>{i.Description}</td>
																<td>{i.Status}</td>
																<td>{i.DueDate}</td>
																<td>
																	<Button
																		icon='Visibility'
																		color='primary'
																		isLight
																		className='me-1'
																	/>
																	<Button
																		icon='Edit'
																		color='success'
																		isLight
																		className='me-1'
																	/>
																	<Button
																		icon='Delete'
																		color='danger'
																		isLight
																		className='me-1'
																	/>
																</td>
															</tr>
														),
													)
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
					<ModalTitle id='goal'>Add Task</ModalTitle>
				</ModalHeader>
				<ModalBody className='px-4'>
					<div className='row g-4'>
						<div className='col-12 border-bottom' />
						<div className='col-12'>
							<div className='mb-3'>
								<FormGroup id='taskname' label='Enter Task Name'>
									<Input
										placeholder=''
										// onChange={formik.handleChange}
										// onBlur={formik.handleBlur}
										// value=''
										// isValid={formik.isValid}
										// isTouched={formik.touched.taskName}
										// invalidFeedback={formik.errors.taskname}
										validFeedback='Looks good!'
									/>
								</FormGroup>
							</div>
						</div>
						<div className='col-12'>
							<div className='mb-3'>
								<FormGroup id='description' label='Enter Description'>
									<Input
										placeholder=''
										// onChange={formik.handleChange}
										// onBlur={formik.handleBlur}
										// value=''
										// isValid={formik.isValid}
										// isTouched={formik.touched.taskName}
										// invalidFeedback={formik.errors.taskname}
										validFeedback='Looks good!'
									/>
								</FormGroup>
							</div>
						</div>
						<div className='col-12'>
							<FormGroup id='status' label='Select Status'>
								<Select
									ariaLabel='Default select example'
									placeholder=''
									// onChange={formikOneWay.handleChange}
									// value={formikOneWay.values.exampleSelectOneWay}
									list={SELECT_OPTIONS}
								/>
							</FormGroup>
						</div>

						{/* <div className='col-12 col-md-6'>
							<div className='mb-3'>
								<FormGroup id='customer' label='Confirm that this goal is relevant'>
									<Input
										placeholder=''
										autoComplete='additional-name'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value=''
										// isValid={formik.isValid}
										// isTouched={formik.touched.taskName}
										// invalidFeedback={formik.errors.taskname}
										validFeedback='Looks good!'
									/>
								</FormGroup>
							</div>
						</div> */}
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
						<Button color='info'>Save</Button>
					</CardFooterRight>
				</ModalFooter>
			</Modal>
		</PageWrapper>
	);
};

export default GoalDescription;
