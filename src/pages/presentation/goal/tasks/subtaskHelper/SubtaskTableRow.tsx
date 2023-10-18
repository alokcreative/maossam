import React, { FC, useState } from 'react';
import Button from '../../../../../components/bootstrap/Button';
import Modal ,{ ModalBody, ModalHeader } from '../../../../../components/bootstrap/Modal';

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
interface ITableRowProps {
	id: number;
	subtask: ISubtask;
	edit(...args: unknown[]): unknown;
	view(...args: unknown[]): unknown;
	deleteAction(...args: unknown[]): unknown;
}

const SubtaskTableRow: FC<ITableRowProps> = ({ id, subtask, edit, view, deleteAction }) => {
	// const { user } = useSelector((state: RootState) => state.auth);
	// const savedValue = localStorage?.getItem('user');
	// const localUser = savedValue ? JSON.parse(savedValue) : null;
	// const role = user.role || localUser?.role;
	// const role = localStorage?.getItem('role');
	const [isModalOpen, setIsModalOpen] = useState(false);
	return (
		<tr>
			{subtask && (
				<>
					<th scope='row'>{id}</th>
					<td>
						<div>
							{subtask.title}
						</div>
					</td>
					<td>{subtask.description}</td>
					<td>
						<div className='d-flex flex-nowrap'>
							<Button
								icon='Visibility'
								color='primary'
								isLight
								className='me-1'
								onClick={() => {
									view(subtask.id);
									setIsModalOpen(true);
								}}
							/>
							{/* {isModalOpen && (
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
							)} */}
							<Button
								icon='Edit'
								color='success'
								isLight
								className='me-1'
								onClick={() => edit(subtask.id)}
							/>
							<Button
								icon='Delete'
								color='danger'
								isLight
								onClick={() => deleteAction(subtask.id)}
							/>
						</div>
					</td>
				</>
			)}
		</tr>
	);
};

export default SubtaskTableRow;
