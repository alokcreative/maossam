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
	useGetSubTaskMutation,
} from '../../../../features/auth/taskManagementApiSlice';
import { useEffectOnce } from 'react-use';
import { pagesMenu } from '../../../../menu';
import SubtaskTableRow from './subtaskHelper/SubtaskTableRow';
import AddSubtaskModal from './subtaskHelper/AddSubtaskModal';
import ConfirmationModal from '../../../documentation/components/ConfirmationModal';

interface ITaskValue {
	goalId: number;
	ITask: ITask;
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
	const [getSubtask] = useGetSubTaskMutation();
	const [createSubTask] = useCreateSubTaskMutation();
	const [updateSubTask] = useUpdateSubTaskMutation();
	const [deleteSubTask] = useDeleteSubTaskMutation();
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['10']);
	const [modalState, setModalState] = useState('Add Sub Task');
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [deleteId, setDeleteId] = useState<number>();
	const [currTask, setCurrTask] = useState();
	const role = localStorage?.getItem('role');

	const handleDeleteAction = () => {
		const subId = deleteId;
		setShowConfirmation(false);
		if (subId) {
			deleteSubTask(subId)
				.unwrap()
				.then((res: unknown) => {
					refetch();
				});
		}
	};
	const handleCloseClick = () => {
		setIsOpen(false);
		navigate(`../${pagesMenu.subTasks.path}/${id}`);
	};

	const handleAddSubTask = () => {
		setModalState('Add Sub Task');
		setIsOpen(true);
	};
	const handleEdit = (SubId: number) => {
		getSubtask(SubId)
			.unwrap()
			.then((res) => {
				setCurrTask(res);
			});
		setModalState(`Edit Sub Task`);
		setIsOpen(true);
	};
	return (
		<PageWrapper>
			<SubHeader>
				<SubHeaderLeft>
					<Button
						className=''
						color='info'
						isLink
						icon='ArrowBack'
						onClick={() => navigate(-1)}>
						Back to list
					</Button>
					{/* <Breadcrumb list={[{ title: 'Tasks', to: '/' }]} /> */}
				</SubHeaderLeft>
				<SubHeaderRight>
					<Button
						color='success'
						isLight
						icon='Add'
						onClick={() => {
							handleAddSubTask();
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
									<th scope='col'>Minitask Count</th>
									<th scope='col' className='cursor-pointer'>
										Action
									</th>
								</tr>
							</thead>
							<tbody>
								{data && data.subtasks && data.subtasks.length !== 0 ? (
									dataPagination(data.subtasks, currentPage, perPage).map(
										(i, index) => (
											<SubtaskTableRow
												// eslint-disable-next-line react/no-array-index-key
												key={index}
												id={index + 1}
												// eslint-disable-next-line react/jsx-props-no-spreading
												subtask={i}
												edit={handleEdit}
												deleteAction={() => {
													setShowConfirmation(true);
													setDeleteId(i.id);
												}}
											/>
										),
									)
								) : (
									<div>No subtask yet.</div>
								)}
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
			<ConfirmationModal
				isOpen={showConfirmation}
				setIsOpen={() => setShowConfirmation(false)}
				onConfirm={handleDeleteAction}
			/>
		</PageWrapper>
	);
};

export default SubTask;
