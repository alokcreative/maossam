import React, { FC, useState } from 'react';
import Badge from '../../../../components/bootstrap/Badge';
import Button from '../../../../components/bootstrap/Button';
import Modal, { ModalBody, ModalHeader } from '../../../../components/bootstrap/Modal';
import SubTaskCard from './taskboard/SubTaskCard';
import { pagesMenu } from '../../../../menu';
import { useNavigate } from 'react-router-dom';

interface ITaskValue {
	id:number;
	title: string;
	description: string;
}
interface ITableRowProps {
	id: number;
	task: ITaskValue;
	edit(...args: unknown[]): unknown;
	deleteAction(...args: unknown[]): unknown;
}

const TaskTableRow: FC<ITableRowProps> = ({ id, task, edit, deleteAction }) => {
	// const { user } = useSelector((state: RootState) => state.auth);
	// const savedValue = localStorage?.getItem('user');
	// const localUser = savedValue ? JSON.parse(savedValue) : null;
	// const role = user.role || localUser?.role;
	const role = localStorage?.getItem('role');
	const navigate = useNavigate();
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
													<SubTaskCard
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

export default TaskTableRow;
