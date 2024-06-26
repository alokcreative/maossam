import React, { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../../layout/SubHeader/SubHeader';
import Breadcrumb from '../../../../components/bootstrap/Breadcrumb';
import Page from '../../../../layout/Page/Page';
import Card, {
	CardBody,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import Button from '../../../../components/bootstrap/Button';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../../components/PaginationButtons';
// import data from '../../../common/data/dummyTaskHoldData';
// import data, { ISubTask, ITask } from '../../../../common/data/dummyGoals';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../../components/bootstrap/Modal';
import Select from '../../../../components/bootstrap/forms/Select';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import { useNavigate, useParams } from 'react-router-dom';
import {
	useCreateTaskMutation,
	useGetGoalsQuery,
	useGetTaskListQuery,
	useDeleteTaskMutation,
	useUpdateTaskMutation,
} from '../../../../features/auth/taskManagementApiSlice';
import { adminDashboardPagesMenu, dashboardPagesMenu, pagesMenu } from '../../../../menu';
import { useEffectOnce } from 'react-use';
import Loading from '../../../../common/other/Loading';
import { Calendar as DatePicker } from 'react-date-range';
import { format } from 'date-fns';
import showNotification from '../../../../components/extras/showNotification';
import Icon from '../../../../components/icon/Icon';
import ConfirmationModal from '../../../documentation/components/ConfirmationModal';
import ReactQuill from 'react-quill';
import TaskTableRow from '../../goal/tasks/TaskTableRow';
import WebTableRows from './helper/WebTableRows';
import { dummyWeb } from './helper/dummydata';

interface IGoalValueData {
	category: string;
	created_at: string;
	description: string;
	id: number;
	title: string;
	updated_at: string;
	created_by: number;
}
interface IGoalValue {
	value: number;
	text: string;
}
interface ITaskValue {
	id: number;
	name: string;
	description: string;
	websiteType: string;
	websiteUrl: string;
	isFree: boolean;
}
const WebIndex: FC = () => {
	const { goalId, newTask } = useParams();
	const navigate = useNavigate();
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['10']);
	const [modalState, setModalState] = useState('Add Task');
	const [isOpen, setIsOpen] = useState<boolean>(false);
	// const { data: goalsData, isLoading: loading } = useGetGoalsQuery({
	// 	fixedCacheKey: 'listTask',
	// });
	const [date, setDate] = useState<Date>(new Date());

	const { data, isLoading, isSuccess, refetch } = useGetTaskListQuery({});
	const [taskList, setTaskList] = useState<ITaskValue[]>();
	const [currTask, setCurrTask] = useState<ITaskValue>();
	const [goalList, setGoalList] = useState<IGoalValue[]>();
	const [goalName, setGoalName] = useState<string>();
	const [createTask] = useCreateTaskMutation();
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [deleteId, setDeleteId] = useState<number>();
	const [filterableData, setFilterableData] = useState(data);

	const [deleteTask] = useDeleteTaskMutation({
		fixedCacheKey: 'deleteTask',
	});
	const [updateTask] = useUpdateTaskMutation({
		fixedCacheKey: 'updateTask',
	});

	const role = localStorage?.getItem('role');
	const logUserId = localStorage.getItem('UserId');
	useEffectOnce(() => {
		refetch();
		if (newTask === 'add-task') {
			setIsOpen(true);
			setModalState('Add Task');
		} else if (newTask && newTask !== 'add-task') {
			navigate(`../${pagesMenu.page404.path}`);
		}
	});
	useEffect(() => {
		// if (role == 'superadmin') {
		// 	setTaskList(data);
		// } else {
		// 	const tempdata = data?.filter(
		// 		(item: ITaskValue) => logUserId == item.created_by || item.created_by == '1',
		// 	);
		// 	setTaskList(tempdata);
		// }

		setTaskList(dummyWeb);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// useEffect(() => {
	// 	if (goalsData) {
	// 		const GoalList = goalsData.map((item: IGoalValueData) => {
	// 			if (Number(logUserId) === item.created_by || role === 'superadmin') {
	// 				return { value: item.id, text: item.title };
	// 			}
	// 			return null;
	// 		});
	// 		const filteredData = GoalList.filter((item: IGoalValue) => item !== null);
	// 		setGoalList(filteredData);
	// 		const GoalName = filteredData.filter(
	// 			(item: IGoalValue) => item.value === Number(goalId!),
	// 		);
	// 		setGoalName(GoalName[0]?.text);
	// 	}
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [goalsData]);

	const formiknewTask = useFormik({
		initialValues: {
			name: '',
			description: '',
			websiteType: '',
			websiteUrl: '',
			isFree: '',
			// dueDate: '',
			// category: '',
			// expectedTime: '',
			// status: '',
			// goalId: '',
			// taskId: '',
		},
		enableReinitialize: true,
		onSubmit: (values) => {
			if (modalState === 'Add Task') {
				if (role == 'superadmin') {
					// createTask({
					// 	title: values.name,
					// 	description: values.description,
					// 	// status: values.status,
					// 	goal_id: String(goalId || values.goalId),
					// })
					// 	.unwrap()
					// 	.then(() => {
					// 		refetch();
					// 	})
					// 	.catch(() => {
					// 		// console.log('error');
					// 	});
				} else {
					// createTask({
					// 	title: values.name,
					// 	description: values.description,
					// 	due_date: format(date, 'MM/dd/yyyy'),
					// 	// expected_time: values.expectedTime,
					// 	// status: values.status,
					// 	// goal_id: String(goalId || values.goalId),
					// })
					// 	.unwrap()
					// 	.then(() => {
					// 		refetch();
					// 	})
					// 	.catch(() => {
					// 		// console.log('error');
					// 	});
				}
			}
			if (modalState === 'Edit Website') {
				if (role == 'superadmin') {
					const taskData = {
						title: values.name,
						description: values.description,
					};
					updateTask({
						taskData,
						// task_id: values.taskId,
					})
						.unwrap()
						.then(() => {
							refetch();
						})
						.catch(() => {
							// console.log('error', res);
						});
				} else {
					// const parts = values.expectedTime.split(':');
					// const timeWithoutSeconds = `${parts[0]}:${parts[1]}`;
					const taskData = {
						title: values.name,
						description: values.description,
						due_date: format(date, 'MM/dd/yyyy'),
						// expected_time: timeWithoutSeconds,
						// status: values.status,
					};
					updateTask({
						taskData,
						// task_id: values.taskId,
					})
						.unwrap()
						.then(() => {
							refetch();
						})
						.catch(() => {
							// console.log('error', res);
						});
				}
			}
			// setTaskList([...taskList, newTask]);
			setIsOpen(false);
			handleCloseClick();
		},
	});
	const handleDeleteAction = () => {
		// setTaskList(taskList.filter((i) => i.id !== taskId));
		const taskId = deleteId;
		setShowConfirmation(false);
		if (taskId) {
			deleteTask(taskId)
				.unwrap()
				.then((res: unknown) => {
					showNotification(
						<span className='d-flex align-items-center'>
							<Icon icon='Info' size='lg' className='me-1' />
							<span>Task deleted successfully</span>
						</span>,
						``,
					);
					refetch();
				})
				.catch((res) => {
					showNotification(
						<span className='d-flex align-items-center'>
							<Icon icon='Info' size='lg' className='me-1' />
							<span>{res.data.detail[0]}</span>
						</span>,
						``,
					);
					// console.log('Delete task rejects>>', res.data.detail[0]);
				});
		}
	};
	const handleEdit = (id: number) => {
		setCurrTask(undefined);
		setModalState(`Edit Website`);
		if (taskList) {
			const webIndex = taskList.filter((i: ITaskValue) => i.id === id);
			// console.log('selected task>>', task[0]);
			formiknewTask.setFieldValue('taskId', webIndex[0]?.id);
			formiknewTask.setFieldValue('name', webIndex[0]?.name);
			formiknewTask.setFieldValue('description', webIndex[0]?.description);
			formiknewTask.setFieldValue('websiteType', webIndex[0]?.websiteType);
			formiknewTask.setFieldValue('isFree', webIndex[0]?.isFree);
			formiknewTask.setFieldValue('websiteUrl', webIndex[0]?.websiteUrl);
		}
		setIsOpen(true);
	};

	const handleAddTask = () => {
		setCurrTask(undefined);
		formiknewTask.setFieldValue('name', '');
		formiknewTask.setFieldValue('description', '');
		formiknewTask.setFieldValue('websiteType', '');
		formiknewTask.setFieldValue('websiteUrl', '');
		formiknewTask.setFieldValue('isFree', '');
		// formiknewTask.setFieldValue('expectedTime', '');
		setModalState('Register');
		setIsOpen(true);
	};
	const handleCloseClick = () => {
		setIsOpen(false);
		// navigate(`../${dashboardPagesMenu.tasks.path}`);
	};
	const handledescription = (value: any) => {
		formiknewTask.setFieldValue('description', value);
	};
	const debounce = (func: any, wait: number | undefined) => {
		let timeout: string | number | NodeJS.Timeout | undefined;

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return function executedFunction(...args: any[]) {
			const later = () => {
				clearTimeout(timeout);
				func(...args);
			};

			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
		};
	};
	const searchAndFilterData = (searchValue: string) => {
		const tempData = taskList;
		if (taskList)
			return taskList.filter((item: any) => {
				return (
					item.name?.toLowerCase().includes(searchValue) ||
					item.websiteUrl?.toLowerCase().includes(searchValue) ||
					item.description?.toLowerCase().includes(searchValue)
				);
			});
		return taskList;
	};
	const onFormSubmit = (values: { search: any }) => {
		const searchValue = formikSearch.values.search.toString()?.toLowerCase();
		const newData = searchAndFilterData(searchValue);
		if (!values.search) {
			setFilterableData(taskList);
		} else {
			setFilterableData(newData);
		}
	};
	const formikSearch = useFormik({
		initialValues: {
			search: '',
		},
		onSubmit: onFormSubmit,
		onReset: () => setFilterableData(taskList),
	});
	useEffect(() => {
		setFilterableData(taskList);
	}, [taskList]);
	return (
		<PageWrapper title={adminDashboardPagesMenu.webindex.text}>
			<SubHeader>
				<SubHeaderLeft>
					{/* <Breadcrumb   list={[{ title: 'Web Index', to: '/' }]} /> */}
					<label
						className='border-0 bg-transparent cursor-pointer me-0'
						htmlFor='searchInput'>
						<svg
							viewBox='0 0 24 24'
							fill='currentColor'
							className='svg-icon--material svg-icon svg-icon-2x text-primary'
							data-name='Material--Search'>
							// eslint-disable-next-line react/self-closing-comp
							<path d='M0 0h24v24H0V0z' fill='none' />
							<path d='M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
						</svg>
					</label>
					<input
						id='search'
						type='search'
						className='form-control border-0 shadow-none bg-transparent'
						placeholder='Search...'
						onChange={(e: { target: { value: string | any[] } }) => {
							formikSearch.handleChange(e);
							if (e.target.value)
								debounce(
									() =>
										onFormSubmit({
											...formikSearch.values,
											search: e.target.value,
										}),
									300,
								)();

							if (e.target.value.length === 0) formikSearch.resetForm();
						}}
						value={formikSearch.values.search}
					/>
				</SubHeaderLeft>
				{role === 'superadmin' && (
					<SubHeaderRight>
						<Button
							color='success'
							isLight
							icon='Add'
							onClick={() => {
								handleAddTask();
							}}>
							Register
						</Button>
					</SubHeaderRight>
				)}
			</SubHeader>
			{isLoading ? (
				<Loading />
			) : isSuccess && data ? (
				<Page container='fluid'>
					{/* <div className='display-4 fw-bold py-3'>Web Index</div> */}
					<Card stretch>
						<CardHeader>
							<CardLabel icon='CalendarToday' iconColor='info'>
								<CardTitle tag='div' className='h5'>
									Web Index List
								</CardTitle>
							</CardLabel>
						</CardHeader>
						<CardBody className='table-responsive'>
							<table className='table table-modern table-hover'>
								<thead>
									<tr>
										<th scope='col' className='cursor-pointer'>
											<span style={{ whiteSpace: 'nowrap' }}>Sr No</span>
										</th>
										<th scope='col' className='cursor-pointer'>
											Website Name
										</th>
										<th scope='col' style={{ whiteSpace: 'nowrap' }}>
											Description
										</th>
										<th scope='col' style={{ whiteSpace: 'nowrap' }}>
											Website Type
										</th>
										<th scope='col' style={{ whiteSpace: 'nowrap' }}>
											Website Url
										</th>
										{/* {role != 'superadmin' && (
											<>
												<th scope='col' style={{ whiteSpace: 'nowrap' }}>
													Due Date
												</th>
												<th scope='col'>
													<span style={{ whiteSpace: 'nowrap' }}>
														Expected Time
													</span>
												</th>
											</>
										)} */}

										<th
											scope='col'
											className='cursor-pointer'
											style={{ whiteSpace: 'nowrap' }}>
											Free/Not Free
										</th>
										<th
											scope='col'
											className='cursor-pointer'
											style={{ whiteSpace: 'nowrap' }}>
											Action
										</th>
									</tr>
								</thead>
								<tbody>
									{taskList && taskList?.length !== 0 ? (
										dataPagination(
											filterableData || taskList,
											currentPage,
											perPage,
										).map((i, index) => (
											<WebTableRows
												// eslint-disable-next-line react/no-array-index-key
												key={index}
												id={index + 1}
												// eslint-disable-next-line react/jsx-props-no-spreading
												task={i}
												edit={handleEdit}
												deleteAction={() => {
													setShowConfirmation(true);
													setDeleteId(i.id);
												}}
											/>
										))
									) : (
										<div>Not task yet.</div>
									)}
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
			) : (
				<div>Error</div>
			)}

			<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='lg' isStaticBackdrop>
				<ModalHeader setIsOpen={handleCloseClick} className='p-4'>
					<ModalTitle id='new_task'>{modalState}</ModalTitle>
				</ModalHeader>
				<ModalBody className='px-4'>
					<div className='row g-4'>
						<div className='col-12 border-bottom' />
						<div className={role != 'superadmin' ? 'col-lg-6' : 'col-lg-12'}>
							{/* {modalState !== 'Edit Task' &&
								(newTask ? (
									<div className='h4 fw-bold py-3'>Goal : {goalName} </div>
								) : ( */}
							{/* // ))} */}
							<FormGroup id='name' label='Website Name' className=''>
								<Input
									type='text'
									onChange={formiknewTask.handleChange}
									value={formiknewTask.values.name}
								/>
							</FormGroup>
							<FormGroup id='description' label='Description' className='mt-3'>
								<ReactQuill
									theme='snow'
									value={formiknewTask.values.description}
									onChange={(value) => handledescription(value)}
								/>

								{/* <Input
									type='text'
									onChange={formiknewTask.handleChange}
									value={formiknewTask.values.description}
								/> */}
							</FormGroup>
							<FormGroup id='websiteUrl' label='website Url' className='mt-3'>
								<Input
									type='text'
									onChange={formiknewTask.handleChange}
									value={formiknewTask.values.websiteUrl}
								/>
							</FormGroup>
							<FormGroup id='websiteType' label='website Type' className='mt-3'>
								<Input
									type='text'
									onChange={formiknewTask.handleChange}
									value={formiknewTask.values.websiteType}
								/>
							</FormGroup>
							<FormGroup id='isFree' label='Free/Not Free' className='mt-3'>
								<Select
									ariaLabel='Default select example'
									placeholder='Select One...'
									onChange={formiknewTask.handleChange}
									value={formiknewTask.values.isFree}
									list={[
										{ value: 'true', text: 'Free' },
										{ value: 'false', text: 'Not Free' },
									]}
									defaultValue='3'
								/>
							</FormGroup>
							{/* {role != 'superadmin' && (
								<FormGroup id='expectedTime' label='Expected Time' className='mt-3'>
									<Input
										type='time'
										onChange={formiknewTask.handleChange}
										value={formiknewTask.values.expectedTime}
									/>
								</FormGroup>
							)} */}
						</div>
						{/* {role != 'superadmin' && (
							<FormGroup id='dueDate' label='Due Date' className='col-lg-6'>
								<div>
									<div className='text-center mt-n4'>
										<DatePicker
											onChange={(item) => setDate(item)}
											date={date}
											minDate={new Date()}
											color={process.env.REACT_APP_PRIMARY_COLOR}
										/>
									</div>
								</div>
							</FormGroup>
						)} */}
					</div>
				</ModalBody>
				<ModalFooter>
					<CardFooterLeft>
						<Button color='info' onClick={formiknewTask.handleSubmit}>
							{modalState !== 'Edit Website' ? `Save` : `Update`}
						</Button>
					</CardFooterLeft>
					<CardFooterRight>
						<Button
							color='danger'
							onClick={() => {
								handleCloseClick();
							}}>
							Cancel
						</Button>
					</CardFooterRight>
				</ModalFooter>
			</Modal>
			<ConfirmationModal
				isOpen={showConfirmation}
				setIsOpen={() => setShowConfirmation(false)}
				onConfirm={handleDeleteAction}
			/>
		</PageWrapper>
	);
};

export default WebIndex;
