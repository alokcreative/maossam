import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import PageWrapper from '../../../../../layout/PageWrapper/PageWrapper';
import { pagesMenu } from '../../../../../menu';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
} from '../../../../../layout/SubHeader/SubHeader';
import Page from '../../../../../layout/Page/Page';
import COLORS from '../../../../../common/data/enumColors';
import useDarkMode from '../../../../../hooks/useDarkMode';
import { TColumnsData } from '../../../project-management/type/types';
import Board from '../../../project-management/component/Board';
import Button from '../../../../../components/bootstrap/Button';
import SubTaskBoard from './SubTaskBoard';
import {
	useCreateSubTaskMutation,
	useGetSubTaskByTaskIdQuery,
	useUpdateSubTaskMutation,
} from '../../../../../features/auth/taskManagementApiSlice';

import AddSubtaskModal from '../subtaskHelper/AddSubtaskModal';
import { useEffectOnce } from 'react-use';
import showNotification from '../../../../../components/extras/showNotification';
import Icon from '../../../../../components/icon/Icon';

interface ICardsInColumn {
	[key: string]: ISubtask[];
}
interface ISubtask {
	created_at: string;
	description: string;
	id: number;
	scheduled_on: string;
	task: string;
	title: string;
	updated_at: string;
	user_assigned: string;
	status: string;
}
const TaskManagement = () => {
	const { darkModeStatus } = useDarkMode();
	const { taskId: id, addNew } = useParams();
	const [isOpen, setIsOpen] = useState(false);
	const logUserId = localStorage.getItem('UserId');
	const role = localStorage.getItem('role');
	useEffectOnce(() => {
		if (addNew === 'add-sub-task') {
			setIsOpen(true);
			console.log('Add new sub task');
		} else if (addNew && addNew !== 'add-sub-task') {
			navigate(`../${pagesMenu.page404.path}`);
		}
	});

	const navigate = useNavigate();
	const { data, isLoading, isSuccess, refetch } = useGetSubTaskByTaskIdQuery(Number(id!));
	const [cardsData, setCardsData] = useState<ISubtask[]>(data && data.subtasks);
	const [createSubTask] = useCreateSubTaskMutation();
	const [modalState, setModalState] = useState('Add Sub Task');
	const columnsData: TColumnsData = {
		column1: {
			id: 'column1',
			title: 'backlog',
			color: darkModeStatus ? 'info' : 'warning',
			icon: 'RateReview',
		},
		column2: {
			id: 'column2',
			title: 'todo',
			color: darkModeStatus ? 'info' : 'warning',
			icon: 'DoneOutline',
		},
		column3: {
			id: 'column3',
			title: 'progress',
			color: COLORS.INFO.name,
			icon: 'PendingActions',
		},
		column4: {
			id: 'column4',
			title: 'done',
			color: darkModeStatus ? 'info' : 'warning',
			icon: 'Verified',
		},
		column5: {
			id: 'column5',
			title: 'hold',
			color: darkModeStatus ? 'info' : 'warning',
			icon: 'DirectionsRun',
		},
	};

	useEffect(() => {
		if (data) setCardsData(data.subtasks);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, data]);

	const [taskStatusToColumnMapping, setTaskStatusToColumnMapping] = useState<ICardsInColumn>();
	const [updateSubTask] = useUpdateSubTaskMutation({});

	useEffect(() => {
		if (data) {
			const statusMapping: { [key: string]: ISubtask[] } = {};

			// Initialize statusMapping with empty arrays for each column
			Object.keys(columnsData).forEach((columnKey) => {
				statusMapping[columnKey] = [];
			});
			const data1 = cardsData.map((item) => {
				return { ...item, status: item.status };
			});
			// Assign tasks to their respective columns based on status
			if (data1)
				data1.forEach((task) => {
					const { status } = task;

					// Find the columnKey based on status title
					const columnKey = Object.keys(columnsData).find(
						(key) => columnsData[key].title === status,
					);

					if (columnKey && statusMapping[columnKey]) {
						statusMapping[columnKey].push(task);
					} else {
						// console.log('Invalid status:', status);
					}
				});

			setTaskStatusToColumnMapping(statusMapping);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cardsData]);

	const onDragEnd = (result: DropResult) => {
		const { source, destination } = result;
		// console.log('result>>>', result);
		// console.log('source', source);
		// console.log('destination', destination);
		// dropped outside the list
		if (!destination) {
			return;
		}
		if (!taskStatusToColumnMapping) {
			return;
		}

		if (source.droppableId === destination.droppableId) {
			const sourceList = source.droppableId;
		} else {
			const taskToMove = taskStatusToColumnMapping[source.droppableId].find(
				(task) => task.id === Number(result.draggableId),
			);

			// Remove the task from the source column
			taskStatusToColumnMapping[source.droppableId] = taskStatusToColumnMapping[
				source.droppableId
			].filter((task) => task.id !== Number(result.draggableId));
			if (taskToMove) taskStatusToColumnMapping[destination.droppableId].push(taskToMove);
			const taskData = {
				status: columnsData[destination.droppableId].title,
			};
			updateSubTask({ subtaskId: String(taskToMove?.id), taskData })
				.unwrap()
				.then((res) => {
					showNotification(
						<span className='d-flex align-items-center'>
							<Icon icon='Info' size='lg' className='me-1' />
							<span>Task moved to ${res.status}</span>
						</span>,
						``,
					);
					refetch();
				})
				.catch((res) => {
					showNotification(
						<span className='d-flex align-items-center'>
							<Icon icon='Info' size='lg' className='me-1' />
							<span>Something went wrong</span>
						</span>,
						``,
					);
				});
			setTaskStatusToColumnMapping(taskStatusToColumnMapping);
			// const RESULT = move(

			// 	taskStatusToColumnMapping[source.droppableId	],
			// 	taskStatusToColumnMapping[destination.droppableId],
			// 	source,
			// 	destination,
			// );

			// setTaskStatusToColumnMapping({
			// 	...taskStatusToColumnMapping,
			// 	...RESULT,
			// });
		}
	};

	const handleBackClick = () => {
		navigate(-1);
	};
	const handleCloseClick = () => {
		setIsOpen(false);
		setModalState('');
		navigate(`../${pagesMenu.subTasks.path}/${id}`);
	};
	return (
		<PageWrapper title={pagesMenu.projectManagement.subMenu.item.text}>
			<SubHeader>
				<SubHeaderLeft>
					<Button icon='ArrowBackIos' color='info' isLink onClick={handleBackClick}>
						Back
					</Button>
				</SubHeaderLeft>
				<SubHeaderRight>
					{data &&
						(Number(logUserId) === data.task?.created_by || role === 'superadmin') && (
							<Button color='info' onClick={() => setIsOpen(true)}>
								Add Sub task
							</Button>
						)}
				</SubHeaderRight>
			</SubHeader>
			{isLoading ? (
				<div>Loading</div>
			) : isSuccess && data ? (
				<Page container='fluid'>
					<DragDropContext onDragEnd={onDragEnd}>
						<Board>
							{taskStatusToColumnMapping && (
								<SubTaskBoard
									refetch={refetch}
									columnsData={columnsData}
									cardsData={taskStatusToColumnMapping}
									setCardsData={setCardsData}
								/>
							)}
						</Board>
					</DragDropContext>
				</Page>
			) : (
				<div>Error!</div>
			)}

			<AddSubtaskModal
				setIsOpen={setIsOpen}
				id={id}
				refetch={refetch}
				isOpen={isOpen}
				handleCloseClick={handleCloseClick}
				modalState={modalState || 'Add Sub Task'}
			/>
		</PageWrapper>
	);
};

export default TaskManagement;
