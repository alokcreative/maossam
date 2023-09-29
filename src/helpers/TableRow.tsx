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
	category,
	expectedTime,
	status,
	edit,
	view,
	deleteAction,
}) => {
	const { user } = useSelector((state: RootState) => state.auth);
	const savedValue = localStorage?.getItem('user');
	const localUser = savedValue ? JSON.parse(savedValue) : null;
	const role = user.role || localUser?.role;
	return (
		<tr>
			<th scope='row'>{id}</th>
			<td>
				<div>
					{name}
					<div className='text-muted'>
						<small>{category}</small>
					</div>
				</div>
			</td>
			<td>{dueDate}</td>
			<td>{expectedTime}</td>
			<td className='h5'>
				<Badge
					color={
						(status === 'Rejected' && 'danger') ||
						(status === 'Cancelled' && 'warning') ||
						(status === 'Approved' && 'success') ||
						'info'
					}>
					{status}
				</Badge>
			</td>
			<td>
				<Button icon='Visibility' color='primary' isLight className='me-1'  />
				{role === Role.admin && (
					<>
						<Button
							icon='Edit'
							color='success'
							isLight
							className='me-1'
							onClick={edit}
						/>
						<Button icon='Delete' color='danger' isLight />
					</>
				)}
			</td>
		</tr>
	);
};

export default TableRow;
