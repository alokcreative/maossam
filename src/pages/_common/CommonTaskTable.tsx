import { useFormik } from 'formik';
import React, {FC, useState } from 'react';
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../../components/bootstrap/Card';
import PaginationButtons,{
	dataPagination,
	PER_COUNT,
} from '../../components/PaginationButtons';
import TableRow from '../../helpers/TableRow';
import data from '../../common/data/dummyTaskHoldData';

const CommonTaskTable: FC = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['3']);
	const [taskList, setTaskList] = useState(data);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const formiknewTask = useFormik({
		initialValues: {
			name: '',
			description:' ',
			dueDate: '',
			category: '',
			expectedTime: '',
			status: '',
			goalId: 0,
		},
		onSubmit: (values) => {
			const newTask = {
				id: taskList.length + 1,
				dueDate: values.dueDate,
				name: values.name,
				description: values.description,
				category: values.category,
				expectedTime: values.expectedTime,
				status: values.status,
				edit: 'Edit',
				goalId: values.goalId,
			};
			setTaskList([...taskList, newTask]);
			setIsOpen(false);
		},
	});
	return (
		<Card stretch>
			<CardHeader>
				<CardLabel icon='CalendarToday' iconColor='info'>
					<CardTitle tag='div' className='h5'>
						Tasks List
					</CardTitle>
				</CardLabel>
			</CardHeader>
			<CardBody className='table-responsive'>
				<table className='table table-modern table-hover'>
					<thead>
						<tr>
							<th scope='col' className='cursor-pointer'>
							Sr No
							</th>
							<th scope='col'>Due Date</th>
							<th scope='col' className='cursor-pointer'>
								Name
							</th>
							<th scope='col' className='cursor-pointer'>
								Description
							</th>
							<th scope='col'>Expected Time</th>
							<th scope='col' className='cursor-pointer'>
								Status
							</th>
							<th scope='col' className='cursor-pointer'>
								Edit
							</th>
						</tr>
					</thead>
					<tbody>
						{dataPagination(taskList, currentPage, perPage).map((i) => (
							// eslint-disable-next-line react/jsx-props-no-spreading
							<TableRow key={i.id} {...i} />
						))}
					</tbody>
				</table>
			</CardBody>
			<PaginationButtons
				data={data}
				label='items'
				setCurrentPage={setCurrentPage}
				currentPage={currentPage}
				perPage={perPage}
				setPerPage={setPerPage}
			/>
		</Card>
	);
};

export default CommonTaskTable;
