import React, { FC, useContext, useEffect, useState } from 'react';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../../../../components/bootstrap/Modal';
import { useFormik } from 'formik';
import Button from '../../../../components/bootstrap/Button';
import Card, {
	CardBody,
	CardFooter,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import Accordion, { AccordionItem } from '../../../../components/bootstrap/Accordion';
import { useNavigate } from 'react-router-dom';
import { pagesMenu } from '../../../../menu';
// eslint-disable-next-line import/no-named-as-default
import data from '../../../../common/data/dummyGoals';
import dayjs from 'dayjs';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../../components/PaginationButtons';
import { TColor } from '../../../../type/color-type';
import { useGetUsersMutation } from '../../../../features/auth/authApiSlice';
import { IUserData } from '../../../_layout/_asides/DefaultAside';
// import questions from '../../../../common/data/dummyTaskQuestions';

type IAssetNameProps = {
	id: number | undefined;
	isModalOpen: boolean;
	setIsModalOpen: (item: boolean) => void;
};
interface IMiniTask {
	id?: string | number;
	title?: string | number;
	status?: boolean;
	date?: dayjs.ConfigType;
	badge?: {
		text?: string;
		color?: TColor;
	};
}
interface ISubTask {
	id: number;
	name: string;
	description: string;
	status: string;
	expectedTime: string;
	secheduledate: dayjs.ConfigType;
	miniTasks?: IMiniTask[] | undefined;
}
interface ITask {
	id: number;
	name: string;
	title: string;
	description: string;
	status: string;
	expectedTime: string;
	dueDate?: string | undefined;
	subtaskIntro: string;
	subTask?: ISubTask[] | undefined;
}
interface IGoal {
	id: number;
	name: string;
	description: string;
	timeline: string;
	status: string;
	task?: ITask[] | undefined;
}
const GoalViewPopup: FC<IAssetNameProps> = (props) => {
	const { isModalOpen, setIsModalOpen, id=2 } = props;
	const navigate = useNavigate();
	// User data
	const token = localStorage?.getItem('access_token');
	const [GetUsersMutation, { isLoading }] = useGetUsersMutation();
	const [userData, setUserData] = useState<IUserData>();
	useEffect(() => {
		if (token) {
			GetUsersMutation(token)
				.unwrap()
				.then((res) => {
					setUserData(res);
				})
				.catch(() => {
					localStorage.removeItem('refresh_token');
					localStorage.removeItem('access_token');
					localStorage.removeItem('tourModalStarted');
					localStorage.removeItem('role');
					localStorage.removeItem('i18nextLng');
					localStorage.removeItem('facit_asideStatus');
					localStorage.removeItem('user');
					navigate('/auth-pages/login');
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token]);
	const [taskData, setTaskData] = useState<ITask[] | undefined>();
	const [currentPage, setCurrentPage] = useState(1);
	const [currentPageSubtask, setCurrentPageSubtask] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['1']);
	const [perPageSubtask, setPerPageSubtask] = useState(PER_COUNT['1']);
	useEffect(() => {
		const tasks = data.filter((goal) => goal.id === id);
		setTaskData(tasks[0].task);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);
	const formik = useFormik({
		initialValues: {
			secheduledate: dayjs().add(1, 'days').format('YYYY-MM-DD'),
		},
		onSubmit: (values) => {
			// console.log(values.secheduledate);
		},
	});

	const handleSubmit = (taskId: number) => {
		setIsModalOpen(false);
		const role = localStorage.getItem('role');
		if (role != 'superadmin') navigate(`../${pagesMenu.taskId.path}/${id}/${taskId}`);
	};

	return (
		<Modal
			isOpen={isModalOpen}
			setIsOpen={setIsModalOpen}
			id='sdmsk12'
			size='lg'
			isScrollable
			isStaticBackdrop>
			<ModalHeader setIsOpen={setIsModalOpen}>
				<ModalTitle id='mks1' />
			</ModalHeader>
			<ModalBody>
				<div className='row p-auto'>
					<div className=' mb-4 '>
						<h5 className='mb-3 fw-bold'>Hi, {userData?.first_name}</h5>
						<p>
							{taskData &&
								dataPagination(taskData && taskData, currentPage, perPage).map(
									(i) => (
										// eslint-disable-next-line react/jsx-props-no-spreading
										<div>
											<p className='fw-bold h4'>
												<span className='fw-bold  h4'>Task {i.id}:</span>{' '}
												{i.name}
											</p>
											<p className='fw-bold' style={{ marginBottom: '8px' }}>
												{i.title}
											</p>
											<p
												style={{
													height: '100px',
													overflow: 'scroll',
													msOverflowStyle: 'none',
												}}>
												{i.description}
											</p>

											<div className='row'>
												<div className='col-12'>
													<Card stretch>
														<CardHeader
														// style={{ paddingBottom: '0px' }}
														>
															<CardLabel
																icon='TrackChanges'
																iconColor='success'>
																<CardTitle
																	tag='div'
																	className='h5 pb-0 no-gutters'>
																	Subtask
																</CardTitle>
															</CardLabel>
														</CardHeader>
														<CardBody
															className='table-responsive'
															style={{ paddingTop: '0px' }}>
															<div className='row g-4'>
																<div className='col-12 pt-0'>
																	<p>
																		<span className='fw-bold'>
																			Subtask Intro :{' '}
																		</span>
																		{i.subtaskIntro}
																	</p>
																	<table className='table table-modern table-hover'>
																		<tbody>
																			{i.subTask &&
																				dataPagination(
																					i.subTask,
																					currentPageSubtask,
																					perPageSubtask,
																				).map((item) => (
																					// eslint-disable-next-line react/jsx-props-no-spreading
																					<div>
																						<span
																							className='fw-bold'
																							style={{
																								paddingRight:
																									'0px',
																							}}>
																							Sub Task
																							Name :
																						</span>
																						<span
																							style={{
																								paddingLeft:
																									'1px',
																							}}>
																							{
																								item.name
																							}
																						</span>
																						<div className='row'>
																							<div className='col-8'>
																								{/* <span>
																									{
																										item.description
																									}
																								</span> */}
																							</div>
																							<div className='col-12 d-flex justify-content-between mt-3'>
																								<Button
																									color='primary'
																									className='mb-3'
																									onClick={() =>
																										handleSubmit(
																											i.id,
																										)
																									}>
																									START
																									NOW
																								</Button>
																								<FormGroup id='secheduledate'>
																									<Input
																										onChange={
																											formik.handleChange
																										}
																										value={
																											formik
																												.values
																												.secheduledate
																										}
																										type='date'
																										autoComplete='current-password'
																										isTouched={
																											formik
																												.touched
																												.secheduledate
																										}
																										isValid={
																											formik.isValid
																										}
																										onBlur={
																											formik.handleBlur
																										}
																									/>
																								</FormGroup>
																							</div>
																						</div>

																						<div className='row g-3'>
																							<div className='col-12'>
																								{item.questions &&
																									item.questions.map(
																										(
																											q: any,
																										) => {
																											return (
																												<Accordion

																													id={
																														item.id
																													}
																													isFlush
																													className='mb-1'>

																													<AccordionItem
																														id={
																															q.id
																														}
																														title={
																															q.name
																														}
																														activeItem={
																															null
																														}>
																														{
																															q.answer
																														}
																													</AccordionItem>
																												</Accordion>
																											);
																										},
																									)}

																								{/* <Accordion
																									id='logofaq1'
																									shadow='sm'>
																									{item.questions &&
																										item.questions.map(
																											(
																												q: any,
																											) => {
																												return (
																													<AccordionItem
																														key={
																															q.id
																														}
																														id={
																															q.id
																														}
																														title={
																															q.name
																														}>
																														{
																															q.answer
																														}
																													</AccordionItem>
																												);
																											},
																										)}
																								</Accordion> */}
																							</div>
																						</div>
																					</div>
																				))}
																		</tbody>
																	</table>
																</div>
															</div>
														</CardBody>
														<CardFooter className='p-0'>
															<div className='col-12'>
																{i.subTask && (
																	<PaginationButtons
																		data={i.subTask}
																		label='items'
																		setCurrentPage={
																			setCurrentPageSubtask
																		}
																		currentPage={
																			currentPageSubtask
																		}
																		perPage={perPageSubtask}
																		setPerPage={
																			setPerPageSubtask
																		}
																	/>
																)}
															</div>
														</CardFooter>
													</Card>
												</div>
											</div>
										</div>
									),
								)}
						</p>
						<p className='mb-3'>
							{taskData && (
								<PaginationButtons
									data={taskData}
									label='items'
									setCurrentPage={setCurrentPage}
									currentPage={currentPage}
									perPage={perPage}
									setPerPage={setPerPage}
								/>
							)}
						</p>
					</div>
				</div>
			</ModalBody>
		</Modal>
	);
};

export default GoalViewPopup;
