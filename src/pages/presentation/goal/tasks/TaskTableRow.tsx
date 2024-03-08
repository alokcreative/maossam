import React, { FC, useState } from 'react'
import Badge from '../../../../components/bootstrap/Badge'
import Button from '../../../../components/bootstrap/Button'
import Modal, { ModalBody, ModalHeader } from '../../../../components/bootstrap/Modal'
import SubTaskCard from './taskboard/SubTaskCard'
import parse from 'html-react-parser'
import { useLocation } from 'react-router-dom'
import { stringify } from 'querystring'
import ReactQuill from 'react-quill'
import dayjs from 'dayjs'
import classNames from 'classnames'
import useDarkMode from '../../../../hooks/useDarkMode'

interface ITaskValue {
	id: number
	title: string
	description: string
	status: string
	created_by: number
	expected_time: number
	due_date: number
	subtask_count: number
}
interface ITableRowProps {
	id: number
	task: ITaskValue
	edit(...args: unknown[]): unknown
	deleteAction(...args: unknown[]): unknown
}

const TaskTableRow: FC<ITableRowProps> = ({ id, task, edit, deleteAction }) => {
	const logUserId = localStorage.getItem('UserId')
	const location = useLocation()
	const { themeStatus, darkModeStatus } = useDarkMode()

	// const { user } = useSelector((state: RootState) => state.auth);
	// const savedValue = localStorage?.getItem('user');
	// const localUser = savedValue ? JSON.parse(savedValue) : null;
	// const role = user.role || localUser?.role;
	const role = localStorage?.getItem('role')
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [showMore, setShowMore] = useState<boolean>(false)
	// console.log("showMore>>>",showMore);
	// console.log("parse(task.description)>>>",parse(task.description).toString());
	// // console.log("parse(task.description.substring(0, 50))>>>",parse(task.description.substring(0, 50)));
	// console.log("{parse(task.description).toString().length>>>",parse(task.description).toString().length);

	return (
		<tr>
			{task && (
				<>
					<td scope='row'>{id}</td>
					<td>
						<div className='line-clamp'>
							{task.title}
							{/* <div className='text-muted'>
						<small>{category}</small>
					</div> */}
						</div>
					</td>
					<td className='parent col-6 tabledesc'>
						{showMore
							? parse(task.description)
							: parse(task.description.substring(0, 170))}
						{task.description.length > 50 && (
							<span aria-hidden='true' onClick={() => setShowMore(!showMore)}>
								{' '}
								...
							</span>
						)}
					</td>
					<td>{task.subtask_count}</td>
					{role !== 'superadmin' && (
						<>
							{/* <td>
								<span style={{ whiteSpace: 'nowrap' }}>{task.due_date}</span>
							</td> */}
							{location && location?.pathname != '/goals' && (
								<td>
									<td className='text-nowrap'>
										<div className='d-flex align-items-center'>
											<span
												className={classNames(
													'badge',
													'border border-2',
													[`border-${themeStatus}`],
													'rounded-circle',
													'bg-success',
													'p-2 me-2',
												)}
											/>

											<span className='text-nowrap'>
												{dayjs(
													`${
														dayjs().format('YYYY') +
														dayjs().format('MM') +
														dayjs().add(1, 'days').format('DD')
													} ${1030}`,
												).format('MMM Do YYYY, h:mm a')}
											</span>
										</div>
									</td>
								</td>
							)}
						</>
					)}

					<td className='h5'>
						<Badge
							color={
								(task.status === 'Hold' && 'danger') ||
								(task.status === 'Todo' && 'secondary') ||
								(task.status === 'InProgress' && 'warning') ||
								(task.status === 'Done' && 'success') ||
								'info'
							}>
							{`0/${task.subtask_count}`}
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
									setIsModalOpen(true)
								}}
							/>
							{Number(logUserId) === task.created_by || role === 'superadmin' ? (
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
							) : null}

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
						</div>
					</td>
				</>
			)}
		</tr>
	)
}

export default TaskTableRow
