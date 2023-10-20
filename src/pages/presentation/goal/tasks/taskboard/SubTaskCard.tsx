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
import Accordion, { AccordionItem } from '../../../../../components/bootstrap/Accordion';
import { useGetSubTaskByTaskIdQuery } from '../../../../../features/auth/taskManagementApiSlice';
import { pagesMenu } from '../../../../../menu';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import SubTaskQuestion from './SubTaskQuestion';
import { useEffectOnce } from 'react-use';

interface IValueProps {
	subTaskId: number;
	setIsModalOpen(...args: unknown[]): unknown;
}
const SubTaskCard: FC<IValueProps> = (props) => {
	const { subTaskId: id, setIsModalOpen } = props;
	const { data, isLoading, isSuccess, isError, refetch } = useGetSubTaskByTaskIdQuery(
		Number(id!),
	);
	const [currentPageSubtask, setCurrentPageSubtask] = useState(1);
	const [perPageSubtask, setPerPageSubtask] = useState(PER_COUNT['1']);
	const navigate = useNavigate();
	const role = localStorage.getItem('role');
	const logUserId = localStorage.getItem('UserId');
	useEffectOnce(() => {
		refetch();
	});
	const handleSubmit = (taskId: number) => {
		setIsModalOpen(false);
		if (role !== 'superadmin') navigate(`../${pagesMenu.subTasks.path}/${id}`);
		if (role === 'superadmin') navigate(`../${pagesMenu.subTasks.path}/${id}`);
	};
	const handleAddSubtask = (taskId: number) => {
		setIsModalOpen(false);
		navigate(`../${pagesMenu.subTasks.path}/${id}/add-sub-task`);
	};

	const formik = useFormik({
		initialValues: {
			secheduledate: '',
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {},
	});
	// console.log('SubtaskData>>>', data?.task?.created_by);
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
									<p>
										<span className='fw-bold'>Subtask Intro : </span>
										{data.task.title}
									</p>
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
															{item.name}
														</span>
														<div className='row'>
															<div className='col-8' />
															<div className='col-12 d-flex justify-content-between mt-3'>
																<Button
																	color='primary'
																	className='mb-3'
																	onClick={() =>
																		handleSubmit(id)
																	}>
																	START NOW
																</Button>
																<FormGroup id='secheduledate'>
																	<Input
																		onChange={
																			formik.handleChange
																		}
																		value={
																			formik.values
																				.secheduledate
																		}
																		type='date'
																		autoComplete='current-password'
																		isTouched={
																			formik.touched
																				.secheduledate
																		}
																		isValid={formik.isValid}
																		onBlur={formik.handleBlur}
																	/>
																</FormGroup>
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
												<div>No Subtasks</div>
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
