import React, { FC, useState } from 'react';
import Badge from '../components/bootstrap/Badge';
import Button from '../components/bootstrap/Button';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Role } from '../common/data/userDummyData';

interface ITableRowProps {
	id: number;
	dueDate: string;
	name: string;
	description: string;
	category: string;
	expectedTime: string;
	status: string;
	edit(...args: unknown[]): unknown;
	view(...args: unknown[]): unknown;
	deleteAction(...args: unknown[]): unknown;
}

const TableRow: FC<ITableRowProps> = ({
	id,
	dueDate,
	name,
	description,
	category,
	expectedTime,
	status,
	edit,
	view,
	deleteAction,
}) => {
	const { user } = useSelector((state: RootState) => state.auth);
	// const savedValue = localStorage?.getItem('user');
	// const localUser = savedValue ? JSON.parse(savedValue) : null;
	// const role = user.role || localUser?.role;
	const role = localStorage?.getItem('role');

	return (
		<tr>
			<th scope='row'>{id}</th>
			<td>
				<div>
					{name}
					{/* <div className='text-muted'>
						<small>{category}</small>
					</div> */}
				</div>
			</td>
			<td>{description}</td>
			{/* <td>{category}</td> */}
			<td>{dueDate}</td>
			<td>{expectedTime}</td>
			<td className='h5'>
				<Badge
					color={
						(status === 'Hold' && 'danger') ||
						(status === 'Todo' && 'secondary') ||
						(status === 'InProgress' && 'warning') ||
						(status === 'Done' && 'success') ||
						'info'
					}>
					{status}
				</Badge>
			</td>
			<td>
				<Button
					icon='Visibility'
					color='primary'
					isLight
					className='me-1'
					// onClick={() => view(id)}
				/>

				{role !== 'user' && (
					<>
						<Button
							icon='Edit'
							color='success'
							isLight
							className='me-1'
							onClick={() => edit(id)}
						/>
						<Button
							icon='Delete'
							color='danger'
							isLight
							onClick={() => deleteAction(id)}
						/>
					</>
				)}
			</td>
		</tr>
	);
};

export default TableRow;
