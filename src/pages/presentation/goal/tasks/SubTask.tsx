import React, { FC, useState } from 'react';
import { useFormik } from 'formik';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../../layout/SubHeader/SubHeader';
import Breadcrumb from '../../../../components/bootstrap/Breadcrumb';
import Page from '../../../../layout/Page/Page';
import Card, {
	CardBody,
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
import { ISubTask, ITask } from '../../../../common/data/dummyGoals';
import { useNavigate, useParams } from 'react-router-dom';
import {
	useCreateSubTaskMutation,
	useDeleteSubTaskMutation,
	useGetSubTaskByTaskIdQuery,
	useUpdateSubTaskMutation,
} from '../../../../features/auth/taskManagementApiSlice';
import { useEffectOnce } from 'react-use';
import { pagesMenu } from '../../../../menu';
import SubtaskTableRow from './subtaskHelper/SubtaskTableRow';
import AddSubtaskModal from './subtaskHelper/AddSubtaskModal';

interface ITaskValue {
	goalId: number;
	ITask: ITask;
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
}
const SubTask: FC = () => {
	const navigate = useNavigate();
	const { taskId: id, addSubtask } = useParams();
	useEffectOnce(() => {
		if (addSubtask === 'add-sub-task') {
			setIsOpen(true);
			// console.log('Add new sub task');
		} else if (addSubtask && addSubtask !== 'add-sub-task') {
			navigate(`../${pagesMenu.page404.path}`);
		}
	});
	const { data, isLoading, isSuccess, isError, refetch } = useGetSubTaskByTaskIdQuery(
		Number(id!),
	);
	const [createSubTask] = useCreateSubTaskMutation();
	const [updateSubTask] = useUpdateSubTaskMutation();
	const [deleteSubTask] = useDeleteSubTaskMutation();
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['10']);
	const [modalState, setModalState] = useState('Add Sub Task');
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const [currTask, setCurrTask] = useState();
	const role = localStorage?.getItem('role');

	const handleDeleteAction = (subId: number) => {
		deleteSubTask(subId)
			.unwrap()
			.then((res) => {
				refetch();
			});
	};
	const handleCloseClick = () => {
		setIsOpen(false);
		navigate(`../${pagesMenu.subTasks.path}/${id}`);
	};

	const handleAddTask = () => {
		setModalState('Add Sub Task');
		setIsOpen(true);
	};
	const handleEdit = (SubId: number) => {
		setModalState(`Edit Sub Task`);
		const task = data.subtasks.filter((i: any) => i.id === SubId);
		console.log("task>>>>",task[0]);
		setCurrTask(task[0])
		setIsOpen(true);
	};
	return (
		<PageWrapper>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb list={[{ title: 'Tasks', to: '/' }]} />
				</SubHeaderLeft>
				<SubHeaderRight>
					<Button
						color='success'
						isLight
						icon='Add'
						onClick={() => {
							handleAddTask();
						}}>
						Add SubTask
					</Button>
				</SubHeaderRight>
			</SubHeader>
			<Page container='fluid'>
				<div className='display-4 fw-bold py-3'>SubTasks</div>
				<Card stretch>
					<CardHeader>
						<CardLabel icon='CalendarToday' iconColor='info'>
							<CardTitle tag='div' className='h5'>
								SubTasks List
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
										Name
									</th>
									<th scope='col'>Description</th>
									<th scope='col' className='cursor-pointer'>
										Action
									</th>
								</tr>
							</thead>
							<tbody>
								{data && data.subtasks
									? dataPagination(data.subtasks, currentPage, perPage).map(
											(i, index) => (
												<SubtaskTableRow
													// eslint-disable-next-line react/no-array-index-key
													key={index}
													id={index + 1}
													// eslint-disable-next-line react/jsx-props-no-spreading
													subtask={i}
													edit={handleEdit}
													deleteAction={handleDeleteAction}
												/>
											),
									  )
									: null}
							</tbody>
						</table>
					</CardBody>
					{data && data.subtasks && (
						<PaginationButtons
							data={data.subtasks}
							label='items'
							setCurrentPage={setCurrentPage}
							currentPage={currentPage}
							perPage={perPage}
							setPerPage={setPerPage}
						/>
					)}
				</Card>
			</Page>
			<AddSubtaskModal
				setIsOpen={setIsOpen}
				id={id}
				refetch={refetch}
				isOpen={isOpen}
				handleCloseClick={handleCloseClick}
				modalState={modalState}
				currTask={currTask}
			/>
		</PageWrapper>
	);
};

export default SubTask;
