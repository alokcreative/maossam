import React, { FC, useEffect, useState } from 'react';
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
import Todo from '../../../../../components/extras/Todo';
import Label from '../../../../../components/bootstrap/forms/Label';
import Checks, { ChecksGroup } from '../../../../../components/bootstrap/forms/Checks';
import Badge from '../../../../../components/bootstrap/Badge';
import Progress from '../../../../../components/bootstrap/Progress';
import { TColor } from '../../../../../type/color-type';
import Select from '../../../../../components/bootstrap/forms/Select';
// import data from '../../../../../common/data/dummyGoals';
import { useParams } from 'react-router-dom';
import {
	useCreateMinitaskMutation,
	useGetMiniTasksBySubIdQuery,
	useUpdateMinitaskMutation,
} from '../../../../../features/auth/taskManagementApiSlice';

interface IPropsValue {
	subTaskId: number;
	modalStatus: boolean;
	setModalStatus: (status: boolean) => void;
}

interface ITodoListItem {
	created_by: string;
	description: string;
	due_date: string;
	id: string;
	status: boolean;
	status_name: string;
	subtask: string;
	title: string;
	badge?: {
		text?: string;
		color?: TColor;
	};
	date?: string;
}
interface ITodoItem {
	created_by: string;
	description: string;
	due_date: string;
	id: string;
	status: string;
	subtask: string;
	title: string;
	badge?: {
		text?: string;
		color?: TColor;
	};
	date?: string;
}
const MiniTasks: FC<IPropsValue> = ({ subTaskId, modalStatus, setModalStatus }) => {
	const [list, setList] = useState<ITodoListItem[] | undefined>();
	const [createMinitask] = useCreateMinitaskMutation({});
	const { data, isLoading, refetch } = useGetMiniTasksBySubIdQuery(subTaskId);
	useEffect(() => {
		if (data) {
			// console.log("data>>",data);
			const transformedData = data.minitasks.map((item: ITodoItem) => ({
				...item,
				status: item.status !== 'todo',
			}));
			setList(transformedData);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isLoading]);
	// console.log('dataMini task>>>', data.minitasks);
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
	// const filteredData = data
	// 	.filter((i) => i.id === Number(id))
	// 	.map((i) =>
	// 		i?.task
	// 			?.filter((task) => task?.id === Number(taskId))
	// 			.map((task) => task?.subTask?.filter((subtask) => subtask.id === subTaskId)),
	// 	)
	// 	.flat(2);
	// console.log('filteredData>>', filteredData);
	// console.log('filteredData miniTasks>>', filteredData[0]?.miniTasks);

	const listLength = list?.length;
	const completeTaskLength = list?.filter((i) => i.status).length;

	/**
	 * Add New Modal Status
	 */
	// const [modalStatus, setModalStatus] = useState(false);

	/**
	 * Ann New To/Do func
	 * @param title
	 * @param date
	 * @param badge
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	// const addTodo = (title: string, date: dayjs.ConfigType, badge: any) => {
	// 	if (list) {
	// 		const newTodos: {
	// 			id?: string | number;
	// 			status?: boolean;
	// 			title?: string | number;
	// 			date?: dayjs.ConfigType;
	// 			badge?: {
	// 				text?: string;
	// 				color?: TColor;
	// 			};
	// 		}[] = [{ title, date, badge }, ...list];
	// 		// setList(newTodos);
	// 	}
	// };

	/**
	 * New To/Do Day
	 */
	const [date, setDate] = useState(new Date());

	const validate = (values: { minitaskTitle?: string; description?: string }) => {
		const errors: {
			minitaskTitle?: string;
			description?: string;
		} = {};
		if (!values.minitaskTitle) {
			errors.minitaskTitle = 'Required';
		} else if (values.minitaskTitle.length > 40) {
			errors.minitaskTitle = 'Must be 40 characters or less';
		}
		if (!values.description) {
			errors.description = 'Required';
		}
		return errors;
	};
	const formik = useFormik({
		initialValues: {
			minitaskTitle: '',
			description: '',
		},
		validate,
		validateOnChange: false,
		onSubmit: (values, { resetForm }) => {
			const minitaskData = {
				subtask_id: String(subTaskId),
				title: values.minitaskTitle,
				description: values.description,
			};
			createMinitask(minitaskData)
				.unwrap()
				.then((res) => {
					// console.log('Minitask create res>>', res);
					refetch();
				})
				.catch((res) => {
					// console.log('Minitask create res cach>>', res);
				});
			// addTodo(values.todoTitle, date, getBadgeWithText(values.todoBadges));
			setModalStatus(false);
			resetForm({
				values: {
					minitaskTitle: '',
					description: '',
				},
			});
		},
	});

	return (
		<Card stretch>
			<CardHeader>
				<CardLabel icon='AssignmentTurnedIn' iconColor='danger'>
					<CardTitle tag='div' className='h5'>
						Mini Tasks
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

					<Modal
						setIsOpen={setModalStatus}
						isOpen={modalStatus}
						titleId='new-todo-modal'
						isStaticBackdrop
						// style={{
						// 	position: 'fixed',
						// 	top: 0,
						// 	left: 0,
						// 	width: '100%',
						// 	height: '100%',
						// 	background: 'rgba(0, 0, 0, 0.3)',
						// 	display: 'flex',
						// 	justifyContent: 'center',
						// 	alignItems: 'center',
						// 	zIndex: 99999,
						// }}
					>
						<ModalHeader setIsOpen={setModalStatus}>
							<ModalTitle id='new-todo-modal'>New Mini Task</ModalTitle>
						</ModalHeader>
						<ModalBody>
							<div className='row d-flex align-items-center justify-content-center'>
								<div className='col-12'>
									<FormGroup id='minitaskTitle' label='Title'>
										<Input
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											isValid={formik.isValid}
											isTouched={formik.touched.minitaskTitle}
											invalidFeedback={formik.errors.minitaskTitle}
											validFeedback='Looks good!'
											value={formik.values.minitaskTitle}
										/>
									</FormGroup>
								</div>
								<div className='col-12 mt-3'>
									<FormGroup id='description' label='Description'>
										<Input
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											isValid={formik.isValid}
											isTouched={formik.touched.description}
											invalidFeedback={formik.errors.description}
											validFeedback='Looks good!'
											value={formik.values.description}
										/>
									</FormGroup>
								</div>
								<div className='col-12 d-flex justify-content-center mt-3'>
									<Button
										className='col-auto'
										type='submit'
										color='info'
										isLight
										onClick={formik.handleSubmit}>
										Add Mini Task
									</Button>
								</div>
							</div>
						</ModalBody>
					</Modal>
				</CardActions>
			</CardHeader>
			<CardBody>{list && <Todo list={list} setList={setList} refetch={refetch} />}</CardBody>
		</Card>
	);
};

export default MiniTasks;
