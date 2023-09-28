import React, { FC, useState } from 'react';
import Badge from '../components/bootstrap/Badge';
import Button from '../components/bootstrap/Button';

interface ITableRowProps {
	id: number;
	dueDate: string;
	name: string;
	category: string;
	expectedTime: string;
	status: string;
	edit: string;
}

const TableRow: FC<ITableRowProps> = ({
	id,
	dueDate,
	name,
	category,
	expectedTime,
	status,
	edit,
}) => {
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
				<Button icon='Visibility' color='primary' isLight />
				<Button icon='Edit' color='success' isLight />
				<Button icon='Delete' color='danger' isLight />
			</td>
		</tr>
	);
};

export default TableRow;
