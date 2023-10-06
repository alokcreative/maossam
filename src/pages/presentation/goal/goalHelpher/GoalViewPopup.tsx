import React, { FC, useContext, useEffect, useState } from 'react';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../../../../components/bootstrap/Modal';
import { Formik, Field, Form, useFormik } from 'formik';
import Button from '../../../../components/bootstrap/Button';
import AuthContext from '../../../../contexts/authContext';
import Card, {
	CardBody,
	CardFooter,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import User1Webp from '../../../../assets/img/wanna/wanna2.webp';
import User1Img from '../../../../assets/img/wanna/wanna2.png';
import Avatar from '../../../../components/Avatar';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import Accordion, { AccordionItem } from '../../../../components/bootstrap/Accordion';
import { useNavigate } from 'react-router-dom';
import { pagesMenu } from '../../../../menu';
import data from '../../../../common/data/dummyGoals';
import dayjs from 'dayjs';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../../components/PaginationButtons';

type IAssetNameProps = {
	id: number | undefined;
	idOfBussiness: number | undefined;
	nameOfBussiness: string | undefined;
	isModalOpen: boolean;
	setIsModalOpen: (item: boolean) => void;
	getFormValue(...args: unknown[]): unknown;
};
interface IMiniTask {
	id?: string | number;
	title?: string | number;
	description: string;
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
	const { idOfBussiness = 0, nameOfBussiness = '', isModalOpen, setIsModalOpen, id } = props;
	const navigate = useNavigate();
	// User data
	const { userData } = useContext(AuthContext);
	const savedValue = localStorage.getItem('user');
	const parsedValue = savedValue ? JSON.parse(savedValue) : null;
	const newUserName = parsedValue?.newUserName || parsedValue?.name;
	const name = userData?.name || newUserName;
	const [taskData, setTaskData] = useState<any>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [currentPageSubtask, setCurrentPageSubtask] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['1']);
	const [perPageSubtask, setPerPageSubtask] = useState(PER_COUNT['1']);
	useEffect(() => {
		const tasks = data.filter((goal) => goal.id === id);
		setTaskData(tasks[0].task);
		console.log('tasks>>', tasks[0].task);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	const handleSubmit = (isSocialMedia: string, isSocialMediaimportant: string) => {
		// console.log(
		// 	'handle submit>>> ',
		// 	isSocialMedia,
		// 	' ',
		// 	isSocialMediaimportant,
		// 	' ',
		// 	idOfBussiness,
		// 	' ',
		// 	nameOfBussiness,
		// );
		// eslint-disable-next-line react/destructuring-assignment
		props.getFormValue(isSocialMedia, isSocialMediaimportant);
		setIsModalOpen(false);
		navigate(`../${pagesMenu.goalId.path}/${id}`);
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
						<h5 className='mb-3 fw-bold'>Hi, {name}</h5>
						<p>
							{taskData &&
								dataPagination(taskData && taskData, currentPage, perPage).map(
									(i) => (
										// eslint-disable-next-line react/jsx-props-no-spreading
										<div>
											<p className='fw-bold h4'><span className='fw-bold  h5'>Task {i.id}:</span> {i.name}</p>
											<p className='fw-bold'>{i.title}</p>
											<p>{i.description}</p>
											
											<div className='row'>
												<div className='col-12'>
													<Card stretch>
														<CardHeader>
															<CardLabel
																icon='TrackChanges'
																iconColor='success'>
																<CardTitle tag='div' className='h5'>
																	List Of Subtask
																</CardTitle>
															</CardLabel>
														</CardHeader>
														<CardBody className='table-responsive'>
															<div className='row g-4'>
																<div className='col-12'>
																<p><span className='fw-bold'>Subtask Intro: </span>{i.subtaskIntro}</p>
																	<table className='table table-modern table-hover'>
																		<tbody>
																			{i.subTask &&
																				dataPagination(
																					i.subTask,
																					currentPageSubtask,
																					perPageSubtask,
																				).map((is) => (
																					// eslint-disable-next-line react/jsx-props-no-spreading
																					<div>
																						<p>
																							{
																								is.name
																							}
																						</p>
																						<p>
																							{
																								is.description
																							}
																						</p>
																					</div>
																				))}
																		</tbody>
																	</table>
																</div>
															</div>
														</CardBody>
														<CardFooter>
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
																		setPerPage={setPerPage}
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
