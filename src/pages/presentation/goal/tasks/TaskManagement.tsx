import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import { pagesMenu } from '../../../../menu';
import SubHeader, { SubHeaderLeft } from '../../../../layout/SubHeader/SubHeader';
import Page from '../../../../layout/Page/Page';
import COLORS from '../../../../common/data/enumColors';
import useDarkMode from '../../../../hooks/useDarkMode';
import { TColumnsData } from '../../project-management/type/types';
import { move, reorder } from '../../project-management/helper/helper';
import Board from '../../project-management/component/Board';
import Columns from '../../project-management/component/Columns';
import Button from '../../../../components/bootstrap/Button';
import { data, ITask, ISubTask } from '../../../../common/data/dummyGoals';
import SubTaskBoard from './taskboard/SubTaskBoard';

interface ICardsInColumn {
	[key: string]: ISubTask[];
}
const TaskManagement = () => {
	const { darkModeStatus } = useDarkMode();
	const { id } = useParams();
	const navigate = useNavigate();

	const [cardsData, setCardsData] = useState<ISubTask[]>();

	const columnsData: TColumnsData = {
		column1: {
			id: 'column1',
			title: 'Backlog',
			color: darkModeStatus ? 'info' : 'warning',
			icon: 'RateReview',
		},
		column2: {
			id: 'column2',
			title: 'Todo',
			color: darkModeStatus ? 'info' : 'warning',
			icon: 'DoneOutline',
		},
		column3: {
			id: 'column3',
			title: 'Progress',
			color: COLORS.INFO.name,
			icon: 'PendingActions',
		},
		column4: {
			id: 'column4',
			title: 'Done',
			color: darkModeStatus ? 'info' : 'warning',
			icon: 'Verified',
		},
		column5: {
			id: 'column5',
			title: 'Hold',
			color: darkModeStatus ? 'info' : 'warning',
			icon: 'DirectionsRun',
		},
	};

	function getSubtasksByGoalAndTaskId(goalId: number, taskId: number) {
		// Find the goal with the specified id
		const goal = data.find((item) => item.id === goalId);

		if (!goal || !goal.task) {
			console.log('Goal not found or no tasks for this goal.');
			return [];
		}

		// Find the task with the specified id within the goal
		const task = goal.task.find((tempTask) => tempTask.id === taskId);

		if (!task || !task.subTask) {
			console.log('Task not found or no subtasks for this task.');
			return [];
		}

		// Return the subtasks for the specified task
		setCardsData(task.subTask);
		return task.subTask;
	}

	const goalId = 1;
	const taskId = 1;
	useEffect(() => {
		const subtasks = getSubtasksByGoalAndTaskId(goalId, taskId);
		// console.log('Subtasks:', subtasks);
	}, [goalId, taskId]);

	const [taskStatusToColumnMapping, setTaskStatusToColumnMapping] = useState<ICardsInColumn>();

	useEffect(() => {
		const statusMapping: { [key: string]: ISubTask[] } = {};

		// Initialize statusMapping with empty arrays for each column
		Object.keys(columnsData).forEach((columnKey) => {
			statusMapping[columnKey] = [];
		});

		// Assign tasks to their respective columns based on status
		if (cardsData)
			cardsData.forEach((task) => {
				const { status } = task;

				// Find the columnKey based on status title
				const columnKey = Object.keys(columnsData).find(
					(key) => columnsData[key].title === status,
				);

				if (columnKey && statusMapping[columnKey]) {
					statusMapping[columnKey].push(task);
				} else {
					console.log('Invalid status:', status);
				}
			});

		setTaskStatusToColumnMapping(statusMapping);
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
	return (
		<PageWrapper title={pagesMenu.projectManagement.subMenu.item.text}>
			<SubHeader>
				<SubHeaderLeft>
					<Button icon='ArrowBackIos' color='info' isLink onClick={handleBackClick}>
						Back
					</Button>
				</SubHeaderLeft>
			</SubHeader>
			<Page container='fluid'>
				<DragDropContext onDragEnd={onDragEnd}>
					<Board>
						{taskStatusToColumnMapping && (
							<SubTaskBoard
								columnsData={columnsData}
								cardsData={taskStatusToColumnMapping}
								setCardsData={setCardsData}
							/>
						)}
					</Board>
				</DragDropContext>
			</Page>
		</PageWrapper>
	);
};

export default TaskManagement;
