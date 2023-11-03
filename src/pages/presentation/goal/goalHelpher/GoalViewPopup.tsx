import React, { FC, useEffect, useState } from 'react';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../../../../components/bootstrap/Modal';
import { useFormik } from 'formik';
import Button from '../../../../components/bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { dashboardPagesMenu } from '../../../../menu';
// eslint-disable-next-line import/no-named-as-default
import dayjs from 'dayjs';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../../components/PaginationButtons';
import { TColor } from '../../../../type/color-type';
import { useGetUsersMutation } from '../../../../features/auth/authApiSlice';
import { IUserData } from '../../../_layout/_asides/DefaultAside';
import { useGetTaskByGoalIdQuery } from '../../../../features/auth/taskManagementApiSlice';
import SubTask from '../tasks/taskboard/SubTaskCard';
import parse from 'html-react-parser';

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
	const { isModalOpen, setIsModalOpen, id } = props;
	const {
		data,
		isLoading: loading,
		isSuccess,
		isFetching,
		refetch,
	} = useGetTaskByGoalIdQuery(id!);
	const navigate = useNavigate();
	// User data
	const token = localStorage?.getItem('access_token');
	const logUserId = localStorage.getItem('UserId');
	const role = localStorage.getItem('role');
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
	const [perPage, setPerPage] = useState(PER_COUNT['1']);
	useEffect(() => {
		refetch();
		if (data) {
			const { tasks } = data;
			// console.log('Tasks>>', tasks);
			if (tasks) {
				setTaskData(tasks);
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, loading, isSuccess]);
	const formik = useFormik({
		initialValues: {
			secheduledate: dayjs().add(1, 'days').format('YYYY-MM-DD'),
		},
		onSubmit: (values) => {
			// console.log(values.secheduledate);
		},
	});

	const handleAddSubtask = (goalId: number) => {
		setIsModalOpen(false);
		navigate(`../${dashboardPagesMenu.tasks.path}/${goalId}/add-task`);
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
				{loading ? (
					<div>Loading</div>
				) : isFetching ? (
					<div>fetching</div>
				) : isSuccess && data ? (
					<div className='row p-auto'>
						<div className=' mb-4 '>
							<div className='d-flex align-items-center justify-content-between'>
								<h5 className='mb-3 fw-bold'>Hi, {userData?.first_name}</h5>
								{(Number(logUserId) === data.goal.created_by ||
									role =='superadmin') && (
									<Button
										color='primary'
										className='mb-3'
										onClick={() => handleAddSubtask(id!)}>
										Add Task
									</Button>
								)}
							</div>
							<p>
								{taskData && taskData?.length !== 0 ? (
									dataPagination(taskData && taskData, currentPage, perPage).map(
										(i) => (
											// eslint-disable-next-line react/jsx-props-no-spreading
											<div>
												<p className='fw-bold h4'>
													<span className='fw-bold  h4'>
														Task: {i.title}
													</span>
												</p>
												<p
													style={{
														height: '100px',
														overflow: 'scroll',
														msOverflowStyle: 'none',
													}}>
													{parse(i.description)}
												</p>
												<SubTask
													setIsModalOpen={setIsModalOpen}
													subTaskId={Number(i.id)}
												/>
											</div>
										),
									)
								) : (
									<div>No Tasks</div>
								)}
							</p>
							<p className='mb-3'>
								{taskData && taskData?.length !== 0 && (
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
				) : null}
			</ModalBody>
		</Modal>
	);
};

export default GoalViewPopup;
