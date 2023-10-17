import React, { FC, useState } from 'react';
import { ITask, ISubTask } from '../../../../../common/data/dummyGoals';
import Button from '../../../../../components/bootstrap/Button';
import FormGroup from '../../../../../components/bootstrap/forms/FormGroup';
import Accordion, { AccordionItem } from '../../../../../components/bootstrap/Accordion';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../../../components/PaginationButtons';
import { useNavigate } from 'react-router-dom';
import { pagesMenu } from '../../../../../menu';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../../../components/bootstrap/Modal';
import Input from '../../../../../components/bootstrap/forms/Input';

interface ITaskValue {
	goalId: number;
	ITask: ITask;
}
type IAssetNameProps = {
	task: ITaskValue;
	isModalOpen: boolean;
	setIsModalOpen: (item: boolean) => void;
};
const SubTasksCard: FC<IAssetNameProps> = (props) => {
	const { isModalOpen, setIsModalOpen, task } = props;
	const navigate = useNavigate();
	const [currentPage, setCurrentPage] = useState(1);
	const [currentPageSubtask, setCurrentPageSubtask] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['1']);
	const [perPageSubtask, setPerPageSubtask] = useState(PER_COUNT['1']);

	const handleSubmit = (taskId: number) => {
		setIsModalOpen(false);
		const role = localStorage.getItem('role');
		if (role !== 'superadmin') navigate(`../${pagesMenu.taskId.path}/${task.goalId}/${taskId}`);
	};

	const formik = useFormik({
		initialValues: {
			secheduledate: dayjs().add(1, 'days').format('YYYY-MM-DD'),
		},
		onSubmit: (values) => {
			console.log(values.secheduledate);
		},
	});
	return (
		<Modal
			isOpen={isModalOpen}
			setIsOpen={setIsModalOpen}
			id='sdmsk12'
			size='lg'
			isScrollable
			isStaticBackdrop>
			<ModalHeader setIsOpen={setIsModalOpen}>
				<ModalTitle id='mks1'>Subtask</ModalTitle>
			</ModalHeader>
			<ModalBody>
				<div className='row'>
					<div className='col-12'>
						<div className='row g-4'>
							<div className='col-12 pt-0'>
								<p>
									<span className='fw-bold'>Subtask Intro : </span>
									{task.ITask.subtaskIntro}
								</p>
								<table className='table table-modern table-hover'>
									<tbody>
										{task.ITask.subTask &&
											dataPagination(
												task.ITask.subTask,
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
																	handleSubmit(task.ITask.id)
																}>
																START NOW
															</Button>
															<FormGroup id='secheduledate'>
																<Input
																	onChange={formik.handleChange}
																	value={
																		formik.values.secheduledate
																	}
																	type='date'
																/>
															</FormGroup>
														</div>
													</div>

													<div className='row g-3'>
														<div className='col-12'>
															{item.questions &&
																item.questions.map((q: any) => {
																	return (
																		<Accordion
																			id='logofaq1'
																			className='mb-1'>
																			<AccordionItem
																				id={q.id}
																				title={q.name}>
																				{' '}
																				{q.answer}
																			</AccordionItem>
																		</Accordion>
																	);
																})}

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
					</div>
				</div>
			</ModalBody>
			<ModalFooter>
				<div className='col-12'>
					{task.ITask.subTask && (
						<PaginationButtons
							data={task.ITask.subTask}
							label='items'
							setCurrentPage={setCurrentPageSubtask}
							currentPage={currentPageSubtask}
							perPage={perPageSubtask}
							setPerPage={setPerPageSubtask}
						/>
					)}
				</div>
			</ModalFooter>
		</Modal>
	);
};

export default SubTasksCard;
