import React, { FC, useState } from 'react';
//
import parse from 'html-react-parser';
import { useLocation } from 'react-router-dom';
import Button from '../../../../../components/bootstrap/Button';
import Modal, { ModalBody, ModalHeader } from '../../../../../components/bootstrap/Modal';
import SubTaskCard from '../../../goal/tasks/taskboard/SubTaskCard';
import { Label } from '../../../../../components/icon/material-icons';

interface ITaskValue {
	id: number;
	name: string;
	description: string;
	websiteType: string;
	websiteUrl: string;
	isFree: boolean;
}
interface ITableRowProps {
	id: number;
	task: ITaskValue;
	edit(...args: unknown[]): unknown;
	deleteAction(...args: unknown[]): unknown;
}

const TaskTableRow: FC<ITableRowProps> = ({ id, task, edit, deleteAction }) => {
	const logUserId = localStorage.getItem('UserId');
	const location = useLocation();
	// const { user } = useSelector((state: RootState) => state.auth);
	// const savedValue = localStorage?.getItem('user');
	// const localUser = savedValue ? JSON.parse(savedValue) : null;
	// const role = user.role || localUser?.role;
	const role = localStorage?.getItem('role');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showMore, setShowMore] = useState<boolean>(false);

	return (
		<tr>
			{task && (
				<>
					<th scope='row'>{id}</th>
					<td>
						<div className='line-clamp'>
							{task.name}
							{/* <div className='text-muted'>
						<small>{category}</small>
					</div> */}
						</div>
					</td>
					<td className='parent col-6'>
						{showMore
							? parse(task.description)
							: parse(task.description.substring(0, 50))}
						{task.description.length > 50 && (
							<span aria-hidden='true' onClick={() => setShowMore(!showMore)}>
								...
							</span>
						)}
					</td>
					<td>{task.websiteType}</td>
					<td>{task.websiteUrl}</td>
					<td>{task.isFree ? 'Free' : 'NotFree'}</td>
					{/* {role !== 'superadmin' && (
						<>
							<td>
								<span style={{ whiteSpace: 'nowrap' }}>{task.due_date}</span>
							</td>
							{location && location?.pathname != '/goals' && (
								<td>
									<span style={{ whiteSpace: 'nowrap' }}>
										{task.expected_time}
									</span>
								</td>
							)}
						</>
					)} */}

					{/* <td className='h5'>
						<Badge
							color={
								(task.status === 'Hold' && 'danger') ||
								(task.status === 'Todo' && 'secondary') ||
								(task.status === 'InProgress' && 'warning') ||
								(task.status === 'Done' && 'success') ||
								'info'
							}>
							{task.status}
						</Badge>
					</td> */}
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
							{
								// Number(logUserId) === task.created_by ||

								role === 'superadmin' ? (
									<>
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
									</>
								) : null
							}

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
													{/* <SubTaskCard
														subTaskId={task.id}
														setIsModalOpen={setIsModalOpen}
													/> */}
													<div className='d-flex mt-3'>
														<span>
															<strong>Website Name :</strong>
														</span>
														<p className='mx-2'>{task.name}</p>
													</div>
													<div className='d-flex mt-3'>
														<span>
															<strong>Description :</strong>
														</span>
														<p className='mx-2'>{task.description}</p>
													</div>
													<div className='d-flex mt-3'>
														<span>
															<strong>Website Type :</strong>
														</span>
														<p className='mx-2'>{task.websiteType}</p>
													</div>
													<div className='d-flex mt-3'>
														<span>
															<strong>Website URL :</strong>
														</span>
														<p className='mx-2'>{task.websiteUrl}</p>
													</div>
													<div className='d-flex mt-3'>
														<span>
															<strong>Free/Not Free :</strong>
														</span>
														<p className='mx-2'>
															{task.isFree ? 'Free' : 'Not Free'}
														</p>
													</div>
												</div>
											</div>
										</div>
									</ModalBody>
								</Modal>
							)}
						</div>
					</td>
				</>
			)}
		</tr>
	);
};

export default TaskTableRow;
