import React, { FC, useState } from 'react';
import { useFormik } from 'formik';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import Input from '../../../components/bootstrap/forms/Input';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import PAYMENTS from '../../../common/data/enumPaymentMethod';
import CustomerEditModal from '../crm/CustomerEditModal';
import Card, {
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Page from '../../../layout/Page/Page';
// import showNotification from '../../../components/extras/showNotification';
// import validate from '../demo-pages/helper/editPagesValidate';
// import Avatar from '../../../components/Avatar';
import Select from '../../../components/bootstrap/forms/Select';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import data from '../../../common/data/dummyGoals';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal';

export const SELECT_OPTIONS = [
	{ value: 1, text: 'Product One' },
	{ value: 2, text: 'Product Two' },
	{ value: 3, text: 'Product Three' },
	{ value: 4, text: 'Product Four' },
	{ value: 5, text: 'Product Five' },
	{ value: 6, text: 'Product Six' },
];

interface IValues {
	id: number;
	name: string;
	attributes: string;
}
const GoalDescription: FC = () => {
	const [goalList, setGoalList] = useState<IValues[]>(data);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['10']);
	const handleDelete = (id: number) => {
		const newGoals = goalList.filter((i) => i.id !== id);
		setGoalList(newGoals);
	};
	const handleEdit = (id: number) => {
		setIsOpen(true);
	};
	const handleView = (id: number) => {
		console.log('id', id);
	};
	return (
		<PageWrapper>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Goals', to: '/' },
							// { title: 'Edit User', to: '/' },
						]}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					<Button
						color='success'
						isLight
						icon='Add'
						onClick={() => {
							setIsOpen(true);
						}}>
						Add Goal
					</Button>
				</SubHeaderRight>
			</SubHeader>
			<Page container='fluid'>
				<div className='display-4 fw-bold py-3'> Goal Description</div>
				<div className='row h-100'>
					<div className='col-12'>
						<Card stretch>
							<CardHeader>
								<CardLabel icon='TrackChanges' iconColor='success'>
									<CardTitle tag='div' className='h5'>
										List Of Goals
									</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody className='table-responsive'>
								<div className='row g-4'>
									<div className='col-12'>
										<table className='table table-modern table-hover'>
											<thead>
												<tr>
													<th scope='col'>#</th>
													<th scope='col'>Name</th>
													<th scope='col'>Description</th>
													<th scope='col'>Date</th>
													<th scope='col'>Status</th>
													<th scope='col'>Action</th>
												</tr>
											</thead>
											<tbody />
										</table>
									</div>
								</div>
							</CardBody>
							<CardFooter>
								<PaginationButtons
									data={data}
									label='items'
									setCurrentPage={setCurrentPage}
									currentPage={currentPage}
									perPage={perPage}
									setPerPage={setPerPage}
								/>
							</CardFooter>
						</Card>
					</div>
				</div>
			</Page>
			<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='lg'>
				<ModalHeader setIsOpen={setIsOpen} className='p-4'>
					<ModalTitle id='goal'>Add Task</ModalTitle>
				</ModalHeader>
				<ModalBody className='px-4'>
					<div className='row g-4'>
						<div className='col-12 border-bottom' />
						<div className='col-12'>
							<FormGroup id='services' label='Select Product/Services'>
								<Select
									ariaLabel='Default select example'
									placeholder=''
									// onChange={formikOneWay.handleChange}
									// value={formikOneWay.values.exampleSelectOneWay}
									list={SELECT_OPTIONS}
								/>
							</FormGroup>
						</div>
						{/* <div className='col-12 col-md-6'>
							<div className='mb-3'>
								<FormGroup
									id='customer'
									label='Confirm that this goal is achievable'>
									<Input
										placeholder=''
										autoComplete='additional-name'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value=''
										// isValid={formik.isValid}
										// isTouched={formik.touched.taskName}
										// invalidFeedback={formik.errors.taskname}
										validFeedback='Looks good!'
									/>
								</FormGroup>
							</div>
						</div>
						<div className='col-12 col-md-6'>
							<div className='mb-3'>
								<FormGroup id='customer' label='Confirm that this goal is relevant'>
									<Input
										placeholder=''
										autoComplete='additional-name'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value=''
										// isValid={formik.isValid}
										// isTouched={formik.touched.taskName}
										// invalidFeedback={formik.errors.taskname}
										validFeedback='Looks good!'
									/>
								</FormGroup>
							</div>
						</div> */}
					</div>
				</ModalBody>
				<ModalFooter>
					<CardFooterLeft>
						<Button
							color='danger'
							onClick={() => {
								setIsOpen(false);
							}}>
							Cancel
						</Button>
					</CardFooterLeft>
					<CardFooterRight>
						<Button color='info'>Save</Button>
					</CardFooterRight>
				</ModalFooter>
			</Modal>
		</PageWrapper>
	);
};

export default GoalDescription;
