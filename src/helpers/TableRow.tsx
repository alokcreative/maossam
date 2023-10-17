import React, { FC, useState } from 'react';
import Badge from '../components/bootstrap/Badge';
import Button from '../components/bootstrap/Button';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Role } from '../common/data/userDummyData';
import { ITask } from '../common/data/dummyGoals';
import Modal, { ModalBody, ModalHeader } from '../components/bootstrap/Modal';
import SubTask from '../pages/presentation/goal/goalHelpher/SubTask';

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

const TableRow: FC<any> = ({ id, task, edit, view, deleteAction }) => {
	// const { user } = useSelector((state: RootState) => state.auth);
	// const savedValue = localStorage?.getItem('user');
	// const localUser = savedValue ? JSON.parse(savedValue) : null;
	// const role = user.role || localUser?.role;
	// const role = localStorage?.getItem('role');
	const [isModalOpen, setIsModalOpen] = useState(false);
	return (
		<tr>
			{task && (
				<>
					<th scope='row'>{id}</th>
					<td>
						<div>
							{task.title}
							{/* <div className='text-muted'>
						<small>{category}</small>
					</div> */}
						</div>
					</td>
					<td>{task.description}</td>
					<td />
					<td>
						{/* <span style={{ whiteSpace: 'nowrap' }}>{task.ITask.dueDate}</span> */}
					</td>
					<td className='h5'>
						{/* <Badge
							color={
								(task.ITask.status === 'Hold' && 'danger') ||
								(task.ITask.status === 'Todo' && 'secondary') ||
								(task.ITask.status === 'InProgress' && 'warning') ||
								(task.ITask.status === 'Done' && 'success') ||
								'info'
							}>
							{task.ITask.status}
						</Badge> */}
					</td>
					<td>
						<div className='d-flex flex-nowrap'>
							<Button
								icon='Visibility'
								color='primary'
								isLight
								className='me-1'
								onClick={() => {
									view(task.id);
									setIsModalOpen(true);
								}}
							/>
							{isModalOpen && (
								<Modal
									isOpen={isModalOpen}
									setIsOpen={setIsModalOpen}
									id='sdmsk12'
									size='lg'
									isScrollable
									isStaticBackdrop>
									<ModalHeader setIsOpen={setIsModalOpen} />

									<ModalBody>
										<div className='row'>
											<div className='col-12'>
												<div className='row g-4'>
													<SubTask
														subTaskId={task.id}
														setIsModalOpen={setIsModalOpen}
													/>
												</div>
											</div>
										</div>
									</ModalBody>
								</Modal>
							)}
							<Button
								icon='Edit'
								color='success'
								isLight
								className='me-1'
								onClick={() => edit(task.id)}
							/>
							<Button
								icon='Delete'
								color='danger'
								isLight
								onClick={() => deleteAction(task.id)}
							/>
						</div>
					</td>
				</>
			)}
		</tr>
	);
};

export default TableRow;
