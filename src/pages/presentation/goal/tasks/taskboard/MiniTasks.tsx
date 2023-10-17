import React, { FC, useState } from 'react';
import { Calendar as DatePicker } from 'react-date-range';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../../../components/bootstrap/Card';
import Button from '../../../../../components/bootstrap/Button';
import Modal, {
	ModalBody,
	ModalHeader,
	ModalTitle,
} from '../../../../../components/bootstrap/Modal';
import FormGroup from '../../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../../components/bootstrap/forms/Input';
import Todo, { ITodoListItem } from '../../../../../components/extras/Todo';
import Label from '../../../../../components/bootstrap/forms/Label';
import Checks, { ChecksGroup } from '../../../../../components/bootstrap/forms/Checks';
import Badge from '../../../../../components/bootstrap/Badge';
import Progress from '../../../../../components/bootstrap/Progress';
import { TColor } from '../../../../../type/color-type';
import Select from '../../../../../components/bootstrap/forms/Select';
import data from '../../../../../common/data/dummyGoals';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { Role } from '../../../../../common/data/userDummyData';

interface IPropsValue {
	subTaskId: number;
}
const MiniTasks: FC<IPropsValue> = ({ subTaskId }) => {
	const { id, taskId } = useParams();
	const TODO_BADGES: {
		[key: string]: {
			text: string;
			color?: TColor;
		};
	} = {
		NEW: { text: 'New', color: 'success' },
		UPDATE: { text: 'Update', color: 'info' },
		TEST: { text: 'Test', color: 'warning' },
		REPORT: { text: 'Report', color: 'info' },
		PRINT: { text: 'Print', color: 'danger' },
		CONTROL: { text: 'Control', color: 'primary' },
		MEETING: { text: 'Meeting', color: 'secondary' },
	};
	const getBadgeWithText = (text: string): string => {
		return TODO_BADGES[
			// @ts-ignore
			Object.keys(TODO_BADGES).filter((key) => TODO_BADGES[key].text === text)
		];
	};

	/**
	 * To/Do List
	 */
	const filteredData = data
		.filter((i) => i.id === Number(id))
		.map((i) =>
			i?.task
				?.filter((task) => task?.id === Number(taskId))
				.map((task) => task?.subTask?.filter((subtask) => subtask.id === subTaskId)),
		)
		.flat(2);
	// console.log('filteredData>>', filteredData);
	// console.log('filteredData miniTasks>>', filteredData[0]?.miniTasks);
	const [list, setList] = useState<ITodoListItem[] | undefined>(filteredData[0]?.miniTasks);
	const listLength = list?.length;
	const completeTaskLength = list?.filter((i) => i.status).length;

	/**
	 * Add New Modal Status
	 */
	const [modalStatus, setModalStatus] = useState(false);

	/**
	 * Ann New To/Do func
	 * @param title
	 * @param date
	 * @param badge
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const addTodo = (title: string, date: dayjs.ConfigType, badge: any) => {
		if (list) {
			const newTodos: {
				id?: string | number;
				status?: boolean;
				title?: string | number;
				date?: dayjs.ConfigType;
				badge?: {
					text?: string;
					color?: TColor;
				};
			}[] = [{ title, date, badge }, ...list];
			setList(newTodos);
		}
	};

	/**
	 * New To/Do Day
	 */
	const [date, setDate] = useState(new Date());

	const validate = (values: {
		todoTitle: string;
		todoBadges: string;
		productSelect: string;
		taskTime: string;
		marketingChannel: string;
	}) => {
		const errors: {
			todoTitle: string;
			productSelect: string;
			taskTime: string;
			marketingChannel: string;
		} = {
			todoTitle: '',
			productSelect: '',
			taskTime: '',
			marketingChannel: '',
		};
		if (!values.todoTitle) {
			errors.todoTitle = 'Required';
		} else if (values.todoTitle.length > 40) {
			errors.todoTitle = 'Must be 40 characters or less';
		}
		if (!values.productSelect) {
			errors.productSelect = 'Required';
		}
		if (!values.taskTime) {
			errors.taskTime = 'Required';
		}
		if (!values.marketingChannel) {
			errors.marketingChannel = 'Required';
		}

		return errors;
	};
	const formik = useFormik({
		initialValues: {
			todoTitle: '',
			todoBadges: '',
			productSelect: '',
			taskTime: '',
			marketingChannel: '',
		},
		validate,
		onSubmit: (values, { resetForm }) => {
			addTodo(values.todoTitle, date, getBadgeWithText(values.todoBadges));
			setModalStatus(false);
			resetForm({
				values: {
					todoTitle: '',
					todoBadges: '',
					productSelect: '',
					taskTime: '',
					marketingChannel: '',
				},
			});
		},
	});

	// const { user } = useSelector((state: RootState) => state.auth);
	// const savedValue = localStorage?.getItem('user');
	// const localUser = savedValue ? JSON.parse(savedValue) : null;
	// const role = user.role || localUser?.role;
	return (
		<Card stretch>
			<CardHeader>
				<CardLabel icon='AssignmentTurnedIn' iconColor='danger'>
					<CardTitle tag='div' className='h5'>
						Tasks
					</CardTitle>
					<CardSubTitle tag='div'>
						<Progress
							height={8}
							max={listLength}
							value={completeTaskLength}
							color={completeTaskLength === listLength ? 'success' : 'primary'}
						/>
					</CardSubTitle>
				</CardLabel>
				<CardActions>
					<Button
						color='info'
						icon='Add'
						isLight
						onClick={() => setModalStatus(!modalStatus)}>
						New
					</Button>

					<Modal setIsOpen={setModalStatus} isOpen={modalStatus} titleId='new-todo-modal'>
						<ModalHeader setIsOpen={setModalStatus}>
							<ModalTitle id='new-todo-modal'>New Task</ModalTitle>
						</ModalHeader>
						<ModalBody>
							<form className='row g-3' onSubmit={formik.handleSubmit}>
								<div className='col-12'>
									<FormGroup id='todoTitle' label='Title'>
										<Input
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											isValid={formik.isValid}
											isTouched={formik.touched.todoTitle}
											invalidFeedback={formik.errors.todoTitle}
											validFeedback='Looks good!'
											value={formik.values.todoTitle}
										/>
									</FormGroup>
								</div>
								<div className='col-12'>
									<FormGroup id='productSelect' label='Product'>
										<Select
											ariaLabel='allProducts'
											placeholder='Select Product'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											isValid={formik.isValid}
											isTouched={formik.touched.productSelect}
											invalidFeedback={formik.errors.productSelect}
											validFeedback='Looks good!'
											value={formik.values.productSelect}
											list={[
												{ value: 'value1', text: 'Beveled Cone' },
												{ value: 'value2', text: 'Cloud Ball' },
												{ value: 'value3', text: 'Quadrilateral' },
												{ value: 'value4', text: 'Bendy Rectangle' },
												{ value: 'value5', text: 'Bendy Rectangle' },
												{ value: 'value6', text: 'Octahedron' },
											]}
										/>
									</FormGroup>
								</div>
								<div className='col-12'>
									<div>
										{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
										<Label>Due Date</Label>
									</div>
									<div className='text-center mt-n4'>
										<DatePicker
											onChange={(item) => setDate(item)}
											date={date}
											minDate={new Date()}
											color={process.env.REACT_APP_PRIMARY_COLOR}
										/>
									</div>
								</div>
								<div className='col-12'>
									<FormGroup id='taskTime' label='Task Time'>
										<Input
											type='time'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											isValid={formik.isValid}
											isTouched={formik.touched.taskTime}
											invalidFeedback={formik.errors.taskTime}
											validFeedback='Looks good!'
											value={formik.values.taskTime}
										/>
									</FormGroup>
								</div>
								<div className='col-12'>
									<FormGroup id='marketingChannel' label='Marketing Channel'>
										<Select
											ariaLabel='allProducts'
											placeholder='Select Marketing Channel'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											isValid={formik.isValid}
											isTouched={formik.touched.marketingChannel}
											invalidFeedback={formik.errors.marketingChannel}
											validFeedback='Looks good!'
											value={formik.values.marketingChannel}
											list={[
												{ value: 'value1', text: 'MA OSSIM Team' },
												{ value: 'value2', text: 'Code Team' },
												{ value: 'value3', text: 'Omtanke Taem' },
											]}
										/>
									</FormGroup>
								</div>
								<div className='col-12'>
									<FormGroup>
										<Label htmlFor='todoBadges'>Badge</Label>
										<ChecksGroup isInline>
											{Object.keys(TODO_BADGES).map((i) => (
												<Checks
													key={TODO_BADGES[i].text}
													type='radio'
													name='todoBadges'
													id={TODO_BADGES[i].text}
													label={
														<Badge isLight color={TODO_BADGES[i].color}>
															{TODO_BADGES[i].text}
														</Badge>
													}
													value={TODO_BADGES[i].text}
													onChange={formik.handleChange}
													checked={formik.values.todoBadges}
												/>
											))}
										</ChecksGroup>
									</FormGroup>
								</div>
								<div className='col' />
								<div className='col-auto'>
									<Button
										type='submit'
										color='info'
										isLight
										isDisable={!formik.isValid && !!formik.submitCount}>
										Add Task
									</Button>
								</div>
							</form>
						</ModalBody>
					</Modal>
				</CardActions>
			</CardHeader>
			<CardBody>{list && <Todo list={list} setList={setList} />}</CardBody>
		</Card>
	);
};

export default MiniTasks;
