import React, { useEffect, useState } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons';
import { useFormik } from 'formik';
import TableRow from '../../../helpers/TableRow';
import { useGetTaskListQuery } from '../../../features/auth/taskManagementApiSlice';
import Loading from '../../../common/other/Loading';
import TaskTableRow from '../goal/tasks/TaskTableRow';

interface ITaskValue {
	created_at: string;
	description: string;
	goal: string;
	id: number;
	title: string;
	updated_at: string;
	created_by: string;
	expected_time: string;
	due_date: string;
	status: string;
}
const TaskOnHold = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);
	const { data, isLoading, isSuccess, refetch } = useGetTaskListQuery({});
	const [taskList, setTaskList] = useState<ITaskValue[] | undefined>(data);
	const formik = useFormik({
		initialValues: {
			taskHoldFil: ['Marketing Asset', 'Product', 'Client'],
		},
		onSubmit: (values) => {},
	});
	useEffect(() => {
		// console.log(
		// 	'Data>>',
		// 	data?.filter((f: ITaskValue) => f.status === 'hold'),
		// );
		setTaskList(data?.filter((f: ITaskValue) => f.status === 'hold'));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	const deleteAction = () => {};
	const edit = () => {};
	return (
		<div className='col-xxl-12 mt-10'>
			<Card stretch>
				<CardHeader>
					<CardLabel icon='CalendarToday' iconColor='info'>
						<CardTitle tag='div' className='h5'>
							Tasks on hold
						</CardTitle>
					</CardLabel>
					{/* <CardActions>
						<div className='d-flex gap-4'>
							<Dropdown>
								<DropdownToggle hasIcon={false}>
									<Button
										icon='FilterAlt'
										color='dark'
										isLight
										className='btn-only-icon position-relative'
										aria-label='Filter'>
										{data.length !== filteredData.length && (
											<Popovers desc='Filtering applied' trigger='hover'>
												<span className='position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2'>
													<span className='visually-hidden'>
														there is filtering
													</span>
												</span>
											</Popovers>
										)}
									</Button>
								</DropdownToggle>
								<DropdownMenu isAlignmentEnd size='md'>
									<div className='container px-5'>
										<FormGroup>
											<ChecksGroup isInline className='row g-2'>
												<Checks
													key='Marketing Asset'
													id='Marketing Asset'
													label='Marketing Asset'
													name='taskHoldFil'
													value='Marketing Asset'
													onChange={formik.handleChange}
													checked={formik.values.taskHoldFil.includes(
														'Marketing Asset',
													)}
												/>
												<Checks
													key='Product'
													id='Product'
													label='Product'
													name='taskHoldFil'
													value='Product'
													onChange={formik.handleChange}
													checked={formik.values.taskHoldFil.includes(
														'Product',
													)}
												/>
												<Checks
													key='Client'
													id='Client'
													label='Client'
													name='taskHoldFil'
													value='Client'
													onChange={formik.handleChange}
													checked={formik.values.taskHoldFil.includes(
														'Client',
													)}
												/>
											</ChecksGroup>
										</FormGroup>
									</div>
								</DropdownMenu>
							</Dropdown>

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
						</div>
					</CardActions> */}
				</CardHeader>
				<CardBody className='table-responsive'>
					{isLoading ? (
						<Loading />
					) : isSuccess && taskList?.length !== 0 ? (
						<table className='table table-modern table-hover'>
							<thead>
								<tr>
									<th scope='col' className='cursor-pointer'>
										Sr No
									</th>

									<th scope='col' className='cursor-pointer'>
										Name
									</th>
									<th scope='col'>Descripton</th>
									<th scope='col'>Due Date</th>
									<th scope='col'>Expected Time</th>
									<th scope='col' className='cursor-pointer'>
										Status
									</th>
									<th scope='col'>Action</th>
									{/* <th scope='col' className='cursor-pointer'>
												Edit
											</th> */}
								</tr>
							</thead>
							<tbody>
								{taskList &&
									dataPagination(taskList, currentPage, perPage).map(
										(i, index) => (
											// eslint-disable-next-line react/jsx-props-no-spreading
											<TaskTableRow
												// eslint-disable-next-line react/no-array-index-key
												key={index}
												id={index + 1}
												// eslint-disable-next-line react/jsx-props-no-spreading
												task={i}
												edit={edit}
												deleteAction={deleteAction}
											/>
										),
									)}
							</tbody>
						</table>
					) : (
						<div>No Data found</div>
					)}
				</CardBody>
				{taskList?.length !== 0 && (
					<PaginationButtons
						data={taskList!}
						label='items'
						setCurrentPage={setCurrentPage}
						currentPage={currentPage}
						perPage={perPage}
						setPerPage={setPerPage}
					/>
				)}
			</Card>
		</div>
	);
};

export default TaskOnHold;
