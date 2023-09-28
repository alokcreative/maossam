import React, { useState } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Dropdown, { DropdownMenu, DropdownToggle } from '../../../components/bootstrap/Dropdown';
import Button from '../../../components/bootstrap/Button';
import Popovers from '../../../components/bootstrap/Popovers';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons';
import data from '../../../common/data/dummyTaskHoldData';
import { useFormik } from 'formik';
import TableRow from '../../../helpers/TableRow';

const TaskOnHold = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);
	const formik = useFormik({
		initialValues: {
			taskHoldFil: ['Marketing Asset', 'Product', 'Client'],
		},
		onSubmit: (values) => {},
	});

	const filteredData = data.filter((f) => formik.values.taskHoldFil.includes(f.category));

	return (
		<div className='col-xxl-12 mt-10'>
			<Card stretch>
				<CardHeader>
					<CardLabel icon='CalendarToday' iconColor='info'>
						<CardTitle tag='div' className='h5'>
							Tasks on hold
						</CardTitle>
					</CardLabel>
					<CardActions>
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
								<th scope='col'>Assigned to</th>
								<th>Associated with</th>
								<th scope='col' className='cursor-pointer'>
									Status
								</th>
								{/* <th scope='col' className='cursor-pointer'>
												Edit
											</th> */}
							</tr>
						</thead>
						<tbody>
							{dataPagination(filteredData, currentPage, perPage).map((i) => (
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
		</div>
	);
};

export default TaskOnHold;
