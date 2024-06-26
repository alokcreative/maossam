import React, { FC, useState } from 'react'
import Badge from '../../../../components/bootstrap/Badge'
import Button from '../../../../components/bootstrap/Button'
import { dataPagination, PER_COUNT } from '../../../../components/PaginationButtons'
import { useNavigate } from 'react-router-dom'
import parse from 'html-react-parser'
import classNames from 'classnames'
import useDarkMode from '../../../../hooks/useDarkMode'
import dayjs from 'dayjs'

interface IGoalProps {
	id: number
	title: string
	description: string
	due_date?: string
	expected_time?: string
	status?: string
	category?: string
	created_at?: string
	created_by?: string
	updated_at?: string
	task_count: string
}
interface IProps {
	goalData: IGoalProps
	setDeleteId(...args: unknown[]): unknown
	setShowConfirmation(...args: unknown[]): unknown
	handleEdit(...args: unknown[]): unknown
	openModal(...args: unknown[]): unknown
	index: number
}
const GoalTableRows: FC<IProps> = ({
	goalData,
	setDeleteId,
	setShowConfirmation,
	handleEdit,
	openModal,
	index,
}) => {
	const role = localStorage.getItem('role')
	const [currentPage, setCurrentPage] = useState(1)
	const [perPage, setPerPage] = useState(PER_COUNT['10'])
	const navigate = useNavigate()
	const logUserId = localStorage.getItem('UserId')
	const [showMore, setShowMore] = useState<boolean>(false)
	const { themeStatus, darkModeStatus } = useDarkMode()

	return (
		<tr>
			<td scope='row'>{index + 1}</td>
			<td>
				<div className='line-clamp'>{goalData.title}</div>
			</td>
			<td className='parent col-6 tabledesc'>
				{showMore
					? parse(goalData.description)
					: parse(goalData.description.substring(0, 130))}
				{goalData.description.length > 50 && (
					<span aria-hidden='true' onClick={() => setShowMore(!showMore)}>
						...
					</span>
				)}
			</td>
			{/* <td>{parse(i.description)}</td> */}
			<td>{goalData.task_count}</td>
			{role != 'superadmin' && (
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
			)}

			<td className='h5'>
				<Badge
					color={
						(goalData.status === 'Progress' && 'danger') ||
						(goalData.status === 'New' && 'warning') ||
						(goalData.status === 'Done' && 'success') ||
						'info'
					}>
					{`0/${goalData.task_count}`}
				</Badge>
			</td>
			<td>
				<div className='d-flex flex-nowrap'>
					<Button
						icon='Visibility'
						color='primary'
						isLight
						onClick={() => {
							if (role === 'superadmin') {
								navigate(`../goal-details/${goalData.id}`)
							} else {
								openModal(goalData.id)
							}
						}}
						className='me-1'
					/>
					{Number(logUserId) === Number(goalData.created_by) || role == 'superadmin' ? (
						<>
							<Button
								icon='Edit'
								color='success'
								isLight
								onClick={() => handleEdit(goalData.id)}
								className='me-1'
							/>
							<Button
								icon='Delete'
								color='danger'
								isLight
								onClick={() => {
									setShowConfirmation(true)
									setDeleteId(goalData.id)
								}}
							/>
						</>
					) : null}
				</div>
			</td>
		</tr>
	)
}

export default GoalTableRows
