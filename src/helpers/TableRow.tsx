import React, { FC, useState } from 'react';
import Badge from '../components/bootstrap/Badge';
import Button from '../components/bootstrap/Button';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Role } from '../common/data/userDummyData';
import { ITask } from '../common/data/dummyGoals';
import SubTasksCard from '../pages/presentation/goal/tasks/taskboard/SubTasksCard';

interface ITaskValue {
	goalId: number;
	ITask: ITask;
}
interface ITableRowProps {
	id: number;
	task: ITaskValue;
	edit(...args: unknown[]): unknown;
	view(...args: unknown[]): unknown;
	deleteAction(...args: unknown[]): unknown;
}

const TableRow: FC<ITableRowProps> = ({ id, task, edit, view, deleteAction }) => {
	// const { user } = useSelector((state: RootState) => state.auth);

	// const savedValue = localStorage?.getItem('user');
	// const localUser = savedValue ? JSON.parse(savedValue) : null;
	// const role = user.role || localUser?.role;
	const role = localStorage?.getItem('role');
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<tr>
			{task && (
				<>
					<th scope='row'>{id}</th>
					<td>
						<div>
							{task.ITask.name}
							{/* <div className='text-muted'>
						<small>{category}</small>
					</div> */}
						</div>
					</td>
					<td>{task.ITask.description}</td>
					{/* <td>{category}</td> */}
					<td>
						<span style={{ whiteSpace: 'nowrap' }}>{task.ITask.dueDate}</span>
					</td>
					<td>{task.ITask.expectedTime}</td>
					<td className='h5'>
						<Badge
							color={
								(task.ITask.status === 'Hold' && 'danger') ||
								(task.ITask.status === 'Todo' && 'secondary') ||
								(task.ITask.status === 'InProgress' && 'warning') ||
								(task.ITask.status === 'Done' && 'success') ||
								'info'
							}>
							{task.ITask.status}
						</Badge>
					</td>
					<td>
						<div className='d-flex flex-nowrap'>
							<Button
								icon='Visibility'
								color='primary'
								isLight
								className='me-1'
								onClick={() => {
									view(task.ITask.id);
									setIsModalOpen(true);
								}}
							/>

							<Button
								icon='Edit'
								color='success'
								isLight
								className='me-1'
								onClick={() => edit(task.ITask.id)}
							/>
							<Button
								icon='Delete'
								color='danger'
								isLight
								onClick={() => deleteAction(task.ITask.id)}
							/>
							{isModalOpen && (
								<SubTasksCard
									task={task}
									isModalOpen={isModalOpen}
									setIsModalOpen={setIsModalOpen}
								/>
							)}
						</div>
					</td>
				</>
			)}
		</tr>
	);
};

export default TableRow;
