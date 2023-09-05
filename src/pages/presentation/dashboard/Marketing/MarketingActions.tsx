import React, { FC, useState } from 'react';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import Button from '../../../../components/bootstrap/Button';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../../components/PaginationButtons';
import data from '../../../../common/data/dummyTaskHoldData';
import Badge from '../../../../components/bootstrap/Badge';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../layout/Page/Page';
import SubHeader, { SubHeaderLeft } from '../../../../layout/SubHeader/SubHeader';
import Breadcrumb from '../../../../components/bootstrap/Breadcrumb';

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
			<td>{dueDate}</td>
			<td>
				<div>
					{name}
					<div className='text-muted'>
						<small>{category}</small>
					</div>
				</div>
			</td>
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
				<Button icon='Edit' color='primary' isLight>
					{edit}
				</Button>
			</td>
		</tr>
	);
};

const MarketingActions = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['10']);
	return (
		<PageWrapper>
			<SubHeader>
				<SubHeaderLeft className='d-flex row mt-0'>
					<Breadcrumb
						list={[
							{ title: 'Marketing Action', to: '/' },
							// { title: 'Edit User', to: '/' },
						]}
					/>
				</SubHeaderLeft>
			</SubHeader>
			<Page  container='fluid'>
			<div className='display-4 fw-bold py-3'>Marketing Action</div>
				<Card stretch>
					<CardHeader>
						<CardLabel icon='CalendarToday' iconColor='info'>
							<CardTitle tag='div' className='h5'>
								Tasks on hold
							</CardTitle>
							<CardSubTitle tag='div' className='h6'>
								Upcoming Appointments
							</CardSubTitle>
						</CardLabel>
						<CardActions>
							<Button
								color='info'
								icon='CloudDownload'
								isLight
								tag='a'
								to='/somefile.txt'
								target='_blank'
								download>
								Export
							</Button>
						</CardActions>
					</CardHeader>
					<CardBody className='table-responsive'>
						<table className='table table-modern table-hover'>
							<thead>
								<tr>
									<th scope='col' className='cursor-pointer'>
										#
									</th>
									<th scope='col'>Due Date</th>
									<th scope='col' className='cursor-pointer'>
										Name
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
								{dataPagination(data, currentPage, perPage).map((i) => (
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
			</Page>
		</PageWrapper>
	);
};

export default MarketingActions;
