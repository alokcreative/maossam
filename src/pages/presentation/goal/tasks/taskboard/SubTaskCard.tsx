import React, { FC, useEffect, useState } from 'react';
import Card, {
	CardBody,
	CardFooter,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../../../components/bootstrap/Card';
import Button from '../../../../../components/bootstrap/Button';
import FormGroup from '../../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../../components/bootstrap/forms/Input';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../../../components/PaginationButtons';
import {
	useAsignSubtaskMutation,
	useGetSubTaskByTaskIdQuery,
} from '../../../../../features/auth/taskManagementApiSlice';
import { pagesMenu } from '../../../../../menu';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import SubTaskQuestion from './SubTaskQuestion';
import { useEffectOnce } from 'react-use';
import showNotification from '../../../../../components/extras/showNotification';
import Icon from '../../../../../components/icon/Icon';
import parse from 'html-react-parser';

interface IValueProps {
	subTaskId: number;
	setIsModalOpen(...args: unknown[]): unknown;
}
const SubTaskCard: FC<IValueProps> = (props) => {
	const { subTaskId: id, setIsModalOpen } = props;
	const [errMsg, setErrMsg] = useState<string>();
	const { data, isLoading, isSuccess, isError, refetch } = useGetSubTaskByTaskIdQuery(
		Number(id!),
	);
	const [currentPageSubtask, setCurrentPageSubtask] = useState(1);
	const [asignSubtask] = useAsignSubtaskMutation();
	const [perPageSubtask, setPerPageSubtask] = useState(PER_COUNT['1']);
	const navigate = useNavigate();
	const role = localStorage.getItem('role');
	const logUserId = localStorage.getItem('UserId');
	useEffectOnce(() => {
		refetch();
	});

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			subtask_id: '',
			scheduled_on: '',
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values, { resetForm }) => {
			resetForm({
				values: {
					scheduled_on: '',
					subtask_id: '',
				},
			});
		},
	});
	// useEffect(() => {
	// 	formik.resetForm();
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [currentPageSubtask]);
	useEffect(() => {
		setErrMsg('');
	}, [formik.values.scheduled_on]);
	const handleSubmit = (taskId: number, subtaskId: string) => {
		formik.setFieldValue('subtask_id', subtaskId);
		if (formik.values.scheduled_on === '') {
			setErrMsg('Please select date to start the task');
			return;
		}
		formik.handleSubmit();
		const date = new Date(formik.values.scheduled_on);
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		const year = date.getFullYear();
		const formattedDate = `${month}/${day}/${year}`;
		const payload = {
			subtask_id: subtaskId,
			scheduled_on: formattedDate,
		};
		asignSubtask(payload)
			.unwrap()
			.then(() => {
				showNotification(
					<span className='d-flex align-items-center'>
						<Icon icon='Info' size='lg' className='me-1' />
						<span>Subtask assigned</span>
					</span>,
					``,
				);
			})
			.catch(() => {
				showNotification(
					<span className='d-flex align-items-center'>
						<Icon icon='Info' size='lg' className='me-1' />
						<span>Something went wrong</span>
					</span>,
					``,
				);
			});
		setIsModalOpen(false);
		if (role !== 'superadmin') navigate(`../${pagesMenu.subTasks.path}/${id}`);
		if (role === 'superadmin') navigate(`../${pagesMenu.subTasks.path}/${id}`);
	};
	const handleAddSubtask = (taskId: number) => {
		setIsModalOpen(false);
		navigate(`../${pagesMenu.subTasks.path}/${id}/add-sub-task`);
	};

	return (
		<div className='row'>
			<div className='col-12'>
				<Card stretch>
					<CardHeader
					// style={{ paddingBottom: '0px' }}
					>
						<CardLabel icon='TrackChanges' iconColor='success'>
							<CardTitle tag='div' className='h5 pb-0 no-gutters'>
								Subtask
							</CardTitle>
						</CardLabel>
						<CardSubTitle>
							{data &&
								(Number(logUserId) === data.task.created_by ||
									role === 'superadmin') && (
									<Button
										color='primary'
										className='mb-3'
										onClick={() => handleAddSubtask(id)}>
										Add Sub Task
									</Button>
								)}
						</CardSubTitle>
					</CardHeader>
					{isLoading ? (
						<div>loading</div>
					) : isSuccess && data ? (
						<CardBody className='table-responsive' style={{ paddingTop: '0px' }}>
							<div className='row g-4'>
								<div className='col-12 pt-0'>
									{/* <p>
										<span className='fw-bold'>Subtask Intro : </span>
										{data.task.title}
									</p> */}
									<table className='table table-modern table-hover'>
										<tbody>
											{data.subtasks && data.subtasks.length !== 0 ? (
												dataPagination(
													data.subtasks,
													currentPageSubtask,
													perPageSubtask,
												).map((item) => (
													// eslint-disable-next-line react/jsx-props-no-spreading
													<div>
														<span
															className='fw-bold'
															style={{
																paddingRight: '0px',
															}}>
															Sub Task Name :
														</span>
														<span
															style={{
																paddingLeft: '1px',
															}}>
															{item.title}
														</span>
														<div>
															<span
																className='fw-bold'
																style={{
																	paddingRight: '0px',
																}}>
																Description :
															</span>
															<span
																style={{
																	paddingLeft: '1px',
																}}>
																{parse(item.description)}
															</span>
														</div>
														<div>
															{item.user_assigned.includes(Number(logUserId)) === true && (
																<span
																	style={{
																		paddingLeft: '1px',
																	}}>
																	Already assigned
																</span>
															)}
														</div>
														<div className='row'>
															<div className='col-8' />
															<div className='col-12 '>
																{role === 'superadmin' ? (
																	<Button
																		color='primary'
																		className='mb-3 d-flex justify-content-end'
																		onClick={() =>
																			navigate(
																				`../${pagesMenu.subTasks.path}/${id}/`,
																			)
																		}>
																		View All
																	</Button>
																) : item.user_assigned.includes(Number(logUserId)) === true ? (
																	<Button
																		color='primary'
																		className='mb-3 d-flex justify-content-end'
																		onClick={() =>
																			navigate(
																				`../${pagesMenu.subTasks.path}/${id}/`,
																			)
																		}>
																		View
																	</Button>
																) : (
																	<div className='d-flex justify-content-between mt-3'>
																		<Button
																			color='primary'
																			className='mb-3'
																			onClick={() => {
																				handleSubmit(
																					id,
																					item.id,
																				);
																			}}>
																			START NOW
																		</Button>
																		<FormGroup>
																			<Input
																				id='scheduled_on'
																				onChange={
																					formik.handleChange
																				}
																				value={
																					formik.values
																						.scheduled_on
																				}
																				type='date'
																				autoComplete='scheduled_on'
																				isTouched={
																					formik.touched
																						.scheduled_on
																				}
																				isValid={
																					formik.isValid
																				}
																				onBlur={
																					formik.handleBlur
																				}
																			/>
																			<span className='text-danger'>
																				{errMsg}
																			</span>
																		</FormGroup>
																	</div>
																)}
															</div>
														</div>
														<SubTaskQuestion id={item.id} />
														{/* <div className='row g-3'>
															<div className='col-12'>
																{item.questions &&
																	item.questions.map((q: any) => {
																		return (
																			<Accordion
																				id={item.id}
																				isFlush
																				className='mb-1'>
																				<AccordionItem
																					id={q.id}
																					title={q.name}
																					activeItem={
																						null
																					}>
																					{q.answer}
																				</AccordionItem>
																			</Accordion>
																		);
																	})}
															</div>
														</div> */}
													</div>
												))
											) : (
												<div>No subtasks yet.</div>
											)}
										</tbody>
									</table>
								</div>
							</div>
						</CardBody>
					) : (
						<div>{isError}</div>
					)}

					<CardFooter className='p-0'>
						<div className='col-12'>
							{data && data.subtasks && data.subtasks.length !== 0 && (
								<PaginationButtons
									data={data.subtasks}
									label='items'
									setCurrentPage={setCurrentPageSubtask}
									currentPage={currentPageSubtask}
									perPage={perPageSubtask}
									setPerPage={setPerPageSubtask}
								/>
							)}
						</div>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
};

export default SubTaskCard;
