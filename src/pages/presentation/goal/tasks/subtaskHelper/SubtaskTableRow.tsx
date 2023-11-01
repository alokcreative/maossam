import React, { FC, useState } from 'react';
import Button from '../../../../../components/bootstrap/Button';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../../../components/bootstrap/Modal';
import MiniTasks from '../taskboard/MiniTasks';

interface ISubtask {
	created_at: string;
	description: string;
	id: number;
	scheduled_on: string;
	task: string;
	title: string;
	updated_at: string;
	user_assigned: string;
	minitask_count: string;
}
interface ITableRowProps {
	id: number;
	subtask: ISubtask;
	edit(...args: unknown[]): unknown;
	deleteAction(...args: unknown[]): unknown;
}

const SubtaskTableRow: FC<ITableRowProps> = ({ id, subtask, edit, deleteAction }) => {
	const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
	const [modalStatus, setModalStatus] = useState(false);
	return (
		<tr>
			{subtask && (
				<>
					<th scope='row'>{id}</th>
					<td>
						<div>{subtask.title}</div>
					</td>
					<td>{subtask.description}</td>
					<td>{subtask.minitask_count}</td>
					<td>
						<div className='d-flex flex-nowrap'>
							<Button
								icon='Visibility'
								color='primary'
								isLight
								className='me-1'
								onClick={() => {
									// view(subtask.id);
									setEditModalStatus(true);
								}}
							/>
							{editModalStatus && (
								<Modal
									setIsOpen={setEditModalStatus}
									isOpen={editModalStatus}
									size='lg'
									isScrollable
									isStaticBackdrop
									data-tour='mail-app-modal'>
									<ModalHeader
										className='px-4'
										setIsOpen={setEditModalStatus}
										style={{ filter: modalStatus ? 'blur(1px)' : 'none' }}>
										<ModalTitle id='project-edit'>{subtask.title}</ModalTitle>
									</ModalHeader>
									<ModalBody
										className='px-4'
										style={{ filter: modalStatus ? 'blur(1px)' : 'none' }}>
										<MiniTasks
											subTaskId={subtask.id}
											modalStatus={modalStatus}
											setModalStatus={setModalStatus}
										/>
									</ModalBody>
									<ModalFooter
										className='px-4 pb-4'
										style={{ filter: modalStatus ? 'blur(1px)' : 'none' }}>
										{/* <Button
						color='primary'
						className='w-100'
						type='submit'
						onClick={() => {
							formik.handleSubmit();
							setEditModalStatus(false);
						}}>
						Save
					</Button> */}
									</ModalFooter>
								</Modal>
							)}
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
