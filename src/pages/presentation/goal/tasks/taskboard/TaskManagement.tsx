import React, { useEffect, useState } from 'react';
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
import { ISubTask } from '../../../../../common/data/dummyGoals';
import SubTaskBoard from './SubTaskBoard';
import { useGetSubTaskByTaskIdQuery } from '../../../../../features/auth/taskManagementApiSlice';
import Modal, {
	ModalBody,
	ModalHeader,
	ModalTitle,
} from '../../../../../components/bootstrap/Modal';
import FormGroup from '../../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../../components/bootstrap/forms/Input';
import { useFormik } from 'formik';
import { useEffectOnce } from 'react-use';

interface ICardsInColumn {
	[key: string]: ISubTask[];
}
const TaskManagement = () => {
	const { darkModeStatus } = useDarkMode();
	const { taskId: id, addNew } = useParams();
	const [isOpen, setIsOpen] = useState(false);
	console.log("addNew",addNew);
	useEffectOnce(() => {
		if (addNew === 'add-sub-task') {
			setIsOpen(true);
			console.log('Add new sub task');
		}else if(addNew && addNew !== 'add-sub-task'){
			navigate(`../${pagesMenu.page404.path}`)
		}
	});

	const navigate = useNavigate();
	const { data, isLoading, isSuccess, isError } = useGetSubTaskByTaskIdQuery(Number(id!));

	const [cardsData, setCardsData] = useState<any[]>(data && data.subtasks);

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
	// function getSubtasksByGoalAndTaskId(goalId: number, task_Id: number) {
	// 	// Find the goal with the specified id
	// 	const goal = data.find((item) => item.id === goalId);

	// 	if (!goal || !goal.task) {
	// 		// console.log('Goal not found or no tasks for this goal.');
	// 		return [];
	// 	}

	// 	// Find the task with the specified id within the goal
	// 	const task = goal.task.find((tempTask) => tempTask.id === task_Id);

	// 	if (!task || !task.subTask) {
	// 		// console.log('Task not found or no subtasks for this task.');
	// 		return [];
	// 	}

	// 	// Return the subtasks for the specified task
	// 	setCardsData(task.subTask);
	// 	return task.subTask;
	// }

	useEffect(() => {
		// const subtasks = getSubtasksByGoalAndTaskId(Number(id), Number(taskId));
		// console.log('Subtasks:', subtasks);
		if (data) setCardsData(data.subtasks);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, data]);

	const [taskStatusToColumnMapping, setTaskStatusToColumnMapping] = useState<ICardsInColumn>();

	useEffect(() => {
		if (data) {
			const statusMapping: { [key: string]: ISubTask[] } = {};

			// Initialize statusMapping with empty arrays for each column
			Object.keys(columnsData).forEach((columnKey) => {
				statusMapping[columnKey] = [];
			});
			const data1 = cardsData.map((item) => {
				return { ...item, status: 'Backlog' };
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
	const formik = useFormik({
		initialValues: {
			title: '',
			description: '',
			question: '',
			answer: '',
		},
		onSubmit: (values) => {
			setIsOpen(false);
			navigate(`../${pagesMenu.taskId.path}/${id}`);
		},
	});
	const handleCloseClick = () => {
		setIsOpen(false);
		navigate(`../${pagesMenu.taskId.path}/${id}`);
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
					<Button color='info' onClick={() => setIsOpen(true)}>
						Add Sub task
					</Button>
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
			<Modal
				setIsOpen={setIsOpen}
				isOpen={isOpen}
				titleId='new-sub-task-modal'
				isStaticBackdrop>
				<ModalHeader setIsOpen={handleCloseClick}>
					<ModalTitle id='new-todo-modal'>New Sub Task</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<div className='col-12'>
						<FormGroup id='title' label='Title'>
							<Input
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								isValid={formik.isValid}
								isTouched={formik.touched.title}
								invalidFeedback={formik.errors.title}
								validFeedback='Looks good!'
								value={formik.values.title}
							/>
						</FormGroup>
					</div>
					<div className='col-12'>
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
					<div className='col-12'>
						<FormGroup id='question' label='Question'>
							<Input
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								isValid={formik.isValid}
								isTouched={formik.touched.question}
								invalidFeedback={formik.errors.question}
								validFeedback='Looks good!'
								value={formik.values.question}
							/>
						</FormGroup>
					</div>
					<div className='col-12'>
						<FormGroup id='answer' label='Answer'>
							<Input
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								isValid={formik.isValid}
								isTouched={formik.touched.answer}
								invalidFeedback={formik.errors.answer}
								validFeedback='Looks good!'
								value={formik.values.answer}
							/>
						</FormGroup>
					</div>
					<div className='col-12 mt-2 d-flex align-items-center justify-content-center'>
						<Button type='submit' color='info' isLight onClick={formik.handleSubmit}>
							Add Task
						</Button>
					</div>
				</ModalBody>
			</Modal>
		</PageWrapper>
	);
};

export default TaskManagement;
