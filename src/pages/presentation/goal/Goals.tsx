import React, { FC, useEffect, useLayoutEffect, useState } from 'react'
import { useFormik } from 'formik'
import PageWrapper from '../../../layout/PageWrapper/PageWrapper'
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader'
import Button from '../../../components/bootstrap/Button'
import Icon from '../../../components/icon/Icon'
import Card, {
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card'
import useDarkMode from '../../../hooks/useDarkMode'
import Page from '../../../layout/Page/Page'
import showNotification from '../../../components/extras/showNotification'
import validate from '../demo-pages/helper/editPagesValidate'
import Breadcrumb from '../../../components/bootstrap/Breadcrumb'
import data1 from '../../../common/data/dummyGoals'
import PaginationButtons, { dataPagination, PER_COUNT } from '../../../components/PaginationButtons'
import Badge from '../../../components/bootstrap/Badge'
import { useNavigate } from 'react-router-dom'
import GoalViewPopup from './goalHelpher/GoalViewPopup'
import Item from '../dashboardHelper/GoalItems'

import {
	useDeleteGoalMutation,
	useGetGoalsQuery,
	useCreateGoalMutation,
	useUpdateGoalMutation,
	useGetCategoryListQuery,
} from '../../../features/auth/taskManagementApiSlice'
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal'
import FormGroup from '../../../components/bootstrap/forms/FormGroup'
import Input from '../../../components/bootstrap/forms/Input'
import Select from '../../../components/bootstrap/forms/Select'
import { Calendar as DatePicker } from 'react-date-range'
import { format } from 'date-fns'
import { categoryEnum, categoryStringValue, formatCategory } from '../../../utiles/helper'
import Dropdown, { DropdownToggle } from '../../../components/bootstrap/Dropdown'
import { dashboardPagesMenu } from '../../../menu'
import ConfirmationModal from '../../documentation/components/ConfirmationModal'
import { useDashboard } from '../../../contexts/dashboardContext'
import ReactQuill from 'react-quill'
import GoalTableRows from './goalHelpher/GoalTableRows'
import classNames from 'classnames'
import useSortableData from '../../../hooks/useSortableData'
import OffCanvas, {
	OffCanvasBody,
	OffCanvasHeader,
	OffCanvasTitle,
} from '../../../components/bootstrap/OffCanvas'
import dayjs from 'dayjs'
import Popovers from '../../../components/bootstrap/Popovers'
import Checks from '../../../components/bootstrap/forms/Checks'

export const SELECT_OPTIONS = [
	{ value: 1, text: 'Product One' },
	{ value: 2, text: 'Product Two' },
	{ value: 3, text: 'Product Three' },
	{ value: 4, text: 'Product Four' },
	{ value: 5, text: 'Product Five' },
	{ value: 6, text: 'Product Six' },
]

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

interface ICategoryList {
	id: number
	goal_count: number
	created_at: string
	updated_at: string
	title: string
	slug: string
}

interface ICategory {
	value: number
	text: string
}

const Goals: FC = () => {
	const navigate = useNavigate()
	const { data, isLoading, isSuccess, isError, refetch } = useGetGoalsQuery({
		fixedCacheKey: 'listTask',
	})
	const {
		data: categoryData,
		refetch: refetchCategory,
		isLoading: isLoadingCategorydata,
	} = useGetCategoryListQuery({
		fixedCacheKey: 'categorylist',
	})
	const [createGoal] = useCreateGoalMutation()
	const [updateGoal] = useUpdateGoalMutation()
	const { darkModeStatus } = useDarkMode()
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [isOffCanvasOpen, setIsOffCanvasOpen] = useState<boolean>(false)
	const [modalHeader, setModalHeader] = useState<string>('Add Goal')
	const [currentPage, setCurrentPage] = useState(1)
	const [perPage, setPerPage] = useState(PER_COUNT['10'])
	const logUserId = localStorage.getItem('UserId')
	const { gridData, setGridData } = useDashboard()
	const [goalList, setGoalList] = useState<IGoalProps[]>(data || null)
	const role = localStorage?.getItem('role')
	const [deleteGoal] = useDeleteGoalMutation()
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const [goalId, setGoalId] = useState<number>()
	const [date, setDate] = useState<Date>(new Date())
	const [showConfirmation, setShowConfirmation] = useState(false)
	const [deleteId, setDeleteId] = useState<number>()
	const [categoryList, setCategoryList] = useState<ICategory[]>([])
	const [categoryTitle, setCategoryTitle] = useState<string>('All Category')
	const [createdBy, setcreatedBy] = useState('')

	const openModal = (id: number) => {
		// console.log('Id og goal', id);
		setGoalId(id)
		setIsModalOpen(true)
	}

	useEffect(() => {
		if (data) {
			formik.resetForm()
			setCategoryTitle('Category')
			if (logUserId == '1') {
				setGoalList(data)
			} else {
				const tempdata = data?.filter(
					(item: IGoalProps) => logUserId == item.created_by || item.created_by == '1',
				)
				setGoalList(tempdata)
			}
		}
		if (categoryData) {
			const newCategoryList = formatCategory(categoryData)
			console.log(
				'categoryData>>',
				newCategoryList.unshift({ value: 0, text: 'All Category' }),
			)
			setCategoryList(newCategoryList)
		} else {
			refetchCategory()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading, data, isOpen, isLoadingCategorydata])

	const formikNewGoal = useFormik({
		initialValues: {
			name: '',
			description: '',
			due_date: '',
			expected_time: '14:25',
			// status: '',
			category: '',
		},

		validate: (values) => {
			const errors: {
				// id: string;
				name?: string
				description?: string
				due_date?: string
				expected_time?: string
				// status?: string;
				category?: string
			} = {}

			if (!values.name) {
				errors.name = 'Required'
			}

			if (!values.description) {
				errors.description = 'Required'
			}
			// if (!values.due_date) {
			// 	errors.due_date = 'Required';
			// }
			if (!values.expected_time) {
				errors.expected_time = 'Required'
			}

			// if (!values.status) {
			// 	errors.status = 'Required';
			// }
			if (!values.category) {
				errors.category = 'Required'
			}
			return errors
		},

		onSubmit: (values, { resetForm }) => {
			const goalData = new FormData()
			goalData.append('title', values.name)
			goalData.append('description', values.description)
			goalData.append('due_date', format(date, 'MM/dd/yyyy'))
			goalData.append('expected_time', values.expected_time)
			// goalData.append('status', values.status);
			goalData.append('category', values.category)

			if (Object.keys(formikNewGoal.errors).length === 0) {
				if (role == 'superadmin') {
					createGoal({
						title: values.name,
						description: values.description,
						category: values.category,
					}).then((res) => {
						setIsOpen(false)
						refetch()
					})
				} else {
					createGoal({
						title: values.name,
						description: values.description,
						category: values.category,
						due_date: format(date, 'MM/dd/yyyy'),
						expected_time: values.expected_time,
						// status: values.status,
					}).then((res) => {
						setIsOpen(false)
						refetch()
					})
				}
			}
			setIsOpen(false)
			resetForm()
		},
	})

	const newGoal = () => {
		setIsOpen(true)
		setModalHeader('New Goal')
		refetchCategory()
	}

	const updateGoalForm = useFormik({
		initialValues: {
			id: '',
			name: '',
			description: '',
			due_date: '',
			expected_time: '14:25',
			customerName: 'Alison Berry',
			service: 'Exercise Bike',
			employee: '',
			location: 'Maryland',
			date: dayjs().add(1, 'days').format('YYYY-MM-DD'),
			time: '10:30',
			notify: true,
		},
		enableReinitialize: true,
		validate: (values) => {
			const errors: {
				name?: string
				description?: string
				due_date?: string
				expected_time?: string
				// status?: string;
				category?: string
			} = {}

			if (!values.name) {
				errors.name = 'Required'
			}

			if (!values.description) {
				errors.description = 'Required'
			}
			if (role !== 'superadmin') {
				if (!values.due_date) {
					errors.due_date = 'Required'
				}
				if (!values.expected_time) {
					errors.expected_time = 'Required'
				}
			}

			return errors
		},
		onSubmit: (values, { resetForm }) => {
			if (role === 'superadmin') {
				const goalData = {
					title: values.name,
					description: values.description,
					due_date: format(date, 'MM/dd/yyyy'),
				}
				updateGoal({ id: updateGoalForm.values.id, goalData })
					.unwrap()
					.then((res) => {
						setIsOffCanvasOpen(false)
						refetch()
						if (res) {
							showNotification(
								<span className='d-flex align-items-center'>
									<Icon icon='Info' size='lg' className='me-1' />
									<span>Goal updated sucessfully.</span>
								</span>,
								``,
							)
						}
					})
					.catch((res) => {
						// console.log(res);
					})
			} else {
				const parts = values.expected_time.split(':')
				const timeWithoutSeconds = `${parts[0]}:${parts[1]}`
				const goalData = {
					title: values.name,
					description: values.description,
					due_date: format(date, 'MM/dd/yyyy'),
					expected_time: timeWithoutSeconds,
					// status: values.status,
				}

				updateGoal({ id: updateGoalForm.values.id, goalData })
					.unwrap()
					.then((res) => {
						setIsOpen(false)
						refetch()
						if (res) {
							showNotification(
								<span className='d-flex align-items-center'>
									<Icon icon='Info' size='lg' className='me-1' />
									<span>Goal updated sucessfully.</span>
								</span>,
								``,
							)
						}
					})
					.catch((res) => {
						// console.log(res);
					})
			}
		},
	})

	const handleDelete = () => {
		const id = deleteId
		setShowConfirmation(false)
		if (data && id) {
			const newGoals = data.filter((i: IGoalProps) => i.id !== id)
			setGoalList(newGoals)

			deleteGoal(id)
				.unwrap()
				.then((response) => {
					//	TODO:  Make Toast Dynamically
					showNotification(
						<span className='d-flex align-items-center'>
							<Icon icon='Info' size='lg' className='me-1' />
							<span>Goal deleted sucessfully.</span>
						</span>,
						``,
					)
					refetch().then((res) => {})
				})
				.catch((response1) => {
					// console.log("rescatch>>",response1.data.detail[0]);
					showNotification(
						<span className='d-flex align-items-center'>
							<Icon icon='Info' size='lg' className='me-1' />
							<span>{response1.data.detail[0]}</span>
						</span>,
						``,
					)
					showNotification(
						<span className='d-flex align-items-center'>
							<Icon icon='Info' size='lg' className='me-1' />
							<span>{response1.data.detail[0]}</span>
						</span>,
						``,
					)
				})
		}
	}
	const handleEdit = (id: number, created_by: string) => {
		// setModalHeader('Update Goal')
		setIsOffCanvasOpen(true)
		setcreatedBy(created_by)

		const goal = data.find((i: IGoalProps) => i.id === id)
		// console.log('goal>>>',   categoryStringValue[goal.category]);
		// const formatedDate = formatDate(goal &&  goal?.date)
		// let category;
		// if (goal?.category === 'New Category2') {
		// 	category = 2;
		// }

		updateGoalForm.setFieldValue('id', goal?.id)
		updateGoalForm.setFieldValue('name', goal?.title)
		updateGoalForm.setFieldValue('description', goal?.description)
		updateGoalForm.setFieldValue('due_date', goal?.due_date)
		updateGoalForm.setFieldValue('expected_time', goal?.expected_time)
		// updateGoalForm.setFieldValue('status', goal?.status);
		updateGoalForm.setFieldValue('category', categoryStringValue[goal.category])
	}

	const handleCloseClick = () => {
		setIsOpen(false)
		// navigate(`../${dashboardPagesMenu.tasks.path}`);
	}
	const handledescription = (value: string) => {
		if (modalHeader === 'New Goal') {
			formikNewGoal.setFieldValue('description', value)
		} else {
			updateGoalForm.setFieldValue('description', value)
		}
	}

	const filterData = (category: number) => {
		let tempData = data
		const tempCategory = categoryList.find((item) => item.value == category)
		if (tempCategory?.value === 0) {
			return tempData
		}
		if (tempCategory) {
			setCategoryTitle(tempCategory.text)
			tempData = tempData.filter((item: any) => item.category === tempCategory?.text)
		}

		return tempData
	}
	const onFormSubmit = (values: { category: any }) => {
		const newData = filterData(values.category)

		if (!values.category) {
			setGoalList(goalList)
		} else {
			setGoalList(newData)
		}
	}
	const debounce = (func: any, wait: number | undefined) => {
		let timeout: string | number | NodeJS.Timeout | undefined

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return function executedFunction (...args: any[]) {
			const later = () => {
				clearTimeout(timeout)
				func(...args)
			}

			clearTimeout(timeout)
			timeout = setTimeout(later, wait)
		}
	}
	const formik = useFormik({
		initialValues: {
			category: '',
		},
		onSubmit: onFormSubmit,
		onReset: () => setGoalList(data),
	})

	const { items, requestSort, getClassNamesFor } = useSortableData(goalList || [])

	return (
		<PageWrapper title={dashboardPagesMenu.goals.text}>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb list={[{ title: 'Goals', to: '/' }]} />
				</SubHeaderLeft>
				<SubHeaderRight>
					<div className='row'>
						{/* <div className='col-12 text-center my-5'>
						<span className='display-5 fw-bold'>Hello, May I help you?</span>
					</div> */}
						<div className=' text-center' data-tour='knowledge-filter'>
							<form onChange={formik.handleSubmit}>
								<div className=''>
									<Select
										id='category'
										size='lg'
										style={{ width: '200px', fontSize: '12px' }}
										ariaLabel='Category'
										placeholder='Category'
										list={categoryList}
										className={classNames('rounded-1', {
											'bg-white': !darkModeStatus,
										})}
										// eslint-disable-next-line @typescript-eslint/no-explicit-any
										onChange={(e: { target: { value: any } }) => {
											formik.handleChange(e)

											if (e.target.value) {
												debounce(
													() =>
														onFormSubmit({
															...formik.values,
															category: e.target.value,
														}),
													1000,
												)()
												formik.handleSubmit()
											}
										}}
										value={formik.values.category}
									/>
								</div>
							</form>
						</div>
					</div>
					<Button
						color={darkModeStatus ? 'light' : 'dark'}
						isLight
						type='button'
						className={`${gridData.view === 'grid' ? 'me-3 active' : 'me-3'}`}
						onClick={() => setGridData({ view: 'grid' })}>
						Grid View
					</Button>
					<Button
						color={darkModeStatus ? 'light' : 'dark'}
						isLight
						type='button'
						className={`${gridData.view === 'list' ? 'active' : ''}`}
						onClick={() => setGridData({ view: 'list' })}>
						List View
					</Button>

					<Button color='success' isLight icon='Add' onClick={newGoal}>
						Add Goal
					</Button>
				</SubHeaderRight>
			</SubHeader>
			{isLoading ? (
				<div>Loading...</div>
			) : isSuccess ? (
				<Page container='fluid'>
					<div className='display-6 fw-bold py-3'>{categoryTitle}</div>
					<div className='row h-100'>
						<div className='col-12'>
							{gridData.view === 'grid' ? (
								<div className='row'>
									{goalList?.length !== 0 ? (
										goalList?.map((item: IGoalProps) => (
											<Item
												parent='main'
												handleDelete={() => {
													setShowConfirmation(true)
													setDeleteId(item.id)
												}}
												handleEdit={handleEdit}
												handleView={(id) =>
													navigate(`../goal-details/${id}`)
												}
												created_by={item.created_by!}
												key={item.id}
												id={item?.id}
												name={item?.title}
												attributes={item?.description}
												task_count={item?.task_count}
												timeline={item.category!}
											/>
										))
									) : (
										<div>No goals yet.</div>
									)}
								</div>
							) : (
								<Card stretch>
									<CardHeader>
										<CardLabel icon='TrackChanges' iconColor='success'>
											<CardTitle tag='div' className='h4'>
												List of Goals
											</CardTitle>
										</CardLabel>
									</CardHeader>
									<CardBody className='table-responsive'>
										<div className='row g-4'>
											<div className='col-12'>
												<table className='table table-modern table-hover'>
													<thead>
														<tr>
															<th
																scope='col'
																className='cursor-pointer text-decoration-underline'
																onClick={() => requestSort('id')}>
																<div className='d-flex'>
																	<span
																		style={{
																			whiteSpace: 'nowrap',
																		}}>
																		Sr No
																	</span>
																	<Icon
																		size='lg'
																		className={getClassNamesFor(
																			'id',
																		)}
																		icon='FilterList'
																	/>
																</div>
															</th>
															<th
																scope='col'
																className='line-clamp'
																style={{
																	whiteSpace: 'nowrap',
																}}>
																Name
															</th>
															<th
																scope='col-6'
																style={{
																	whiteSpace: 'nowrap',
																}}>
																Description
															</th>
															<th
																scope='col'
																style={{
																	whiteSpace: 'nowrap',
																}}>
																No. of task
															</th>

															{role != 'superadmin' && (
																<th
																	scope='col'
																	style={{
																		whiteSpace: 'nowrap',
																	}}>
																	Deadline
																</th>
															)}

															<th
																scope='col'
																style={{
																	whiteSpace: 'nowrap',
																}}>
																Status
															</th>
															<th
																scope='col'
																style={{
																	whiteSpace: 'nowrap',
																}}>
																Action
															</th>
														</tr>
													</thead>
													<tbody>
														{items && goalList?.length !== 0 ? (
															dataPagination(
																items || goalList,
																currentPage,
																perPage,
															)?.map((i: IGoalProps, index) => {
																return (
																	<GoalTableRows
																		goalData={i}
																		setDeleteId={setDeleteId}
																		setShowConfirmation={
																			setShowConfirmation
																		}
																		handleEdit={handleEdit}
																		openModal={openModal}
																		index={index}
																	/>
																)
															})
														) : (
															<div>No goals yet.</div>
														)}
													</tbody>
												</table>
											</div>
										</div>
									</CardBody>
									<CardFooter>
										<PaginationButtons
											data={goalList}
											label='items'
											setCurrentPage={setCurrentPage}
											currentPage={currentPage}
											perPage={perPage}
											setPerPage={setPerPage}
										/>
									</CardFooter>
								</Card>
							)}
						</div>
					</div>

					{isModalOpen ? (
						<GoalViewPopup
							isModalOpen={isModalOpen}
							setIsModalOpen={setIsModalOpen}
							id={goalId}
						/>
					) : null}
				</Page>
			) : (
				<div>Error!!! : {isError}</div>
			)}

			<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='lg' isStaticBackdrop>
				<ModalHeader setIsOpen={handleCloseClick}>
					<ModalTitle id='new_task'>{modalHeader}</ModalTitle>
				</ModalHeader>

				<ModalBody>
					<div className='row g-4 px-4'>
						<div className='col-12 border-bottom' />
						<div className={role !== 'superadmin' ? 'col-lg-6' : 'col-lg-12'}>
							<FormGroup id='name' label='Name'>
								<Input
									type='text'
									name='name'
									onChange={
										modalHeader === 'New Goal'
											? formikNewGoal.handleChange
											: updateGoalForm.handleChange
									}
									value={
										modalHeader === 'New Goal'
											? formikNewGoal.values.name
											: updateGoalForm.values.name
									}
									invalidFeedback={formikNewGoal.errors.name}
									isValid={formikNewGoal.isValid}
									isTouched={formikNewGoal.touched.name}
								/>
							</FormGroup>
							<FormGroup id='description' label='Description' className='mt-3'>
								<ReactQuill
									theme='snow'
									value={
										modalHeader === 'New Goal'
											? formikNewGoal.values.description
											: updateGoalForm.values.description
									}
									onChange={(value) => handledescription(value)}
								/>
								{/* <Input
									type='text'
									name='description'
									onChange={
										modalHeader === 'New Goal'
											? formikNewGoal.handleChange
											: updateGoalForm.handleChange
									}
									value={
										modalHeader === 'New Goal'
											? formikNewGoal.values.description
											: updateGoalForm.values.description
									}
									invalidFeedback={formikNewGoal.errors.description}
									isValid={formikNewGoal.isValid}
									isTouched={formikNewGoal.touched.description}
								/> */}
							</FormGroup>
							{modalHeader === 'New Goal' && (
								<FormGroup id='category' label='Category' className='mt-3'>
									<Select
										ariaLabel='Default select Category'
										placeholder='Select One...'
										name='category'
										list={categoryList}
										onChange={formikNewGoal.handleChange}
										value={formikNewGoal.values.category}
										invalidFeedback={formikNewGoal.errors.category}
										isValid={formikNewGoal.isValid}
										isTouched={formikNewGoal.touched.category}
									/>
								</FormGroup>
							)}
						</div>
						{role != 'superadmin' && (
							<FormGroup id='due_date' label='Date' className='col-lg-6'>
								<div>
									<div className='text-center mt-n4'>
										<DatePicker
											onChange={(item) => setDate(item)}
											date={date}
											minDate={new Date()}
											color={process.env.REACT_APP_PRIMARY_COLOR}
										/>
									</div>
								</div>
							</FormGroup>
						)}
					</div>
				</ModalBody>
				<ModalFooter>
					<CardFooterLeft>
						<Button
							color='info'
							onClick={
								modalHeader === 'New Goal'
									? formikNewGoal.handleSubmit
									: updateGoalForm.handleSubmit
							}>
							{modalHeader === 'New Goal' ? ' Save' : 'Update'}
						</Button>
					</CardFooterLeft>
					<CardFooterRight>
						<Button
							color='danger'
							onClick={() => {
								handleCloseClick()
							}}>
							Cancel
						</Button>
					</CardFooterRight>
				</ModalFooter>
			</Modal>
			<ConfirmationModal
				isOpen={showConfirmation}
				setIsOpen={() => setShowConfirmation(false)}
				onConfirm={handleDelete}
			/>
			<OffCanvas setOpen={setIsOffCanvasOpen} isOpen={isOffCanvasOpen} titleId='canvas-title'>
				<OffCanvasHeader setOpen={setIsOffCanvasOpen} className='p-4'>
					<OffCanvasTitle id='canvas-title'>
						{logUserId == createdBy || role == 'superadmin'
							? 'Edit Goal'
							: 'Set Deadline'}
					</OffCanvasTitle>
				</OffCanvasHeader>
				<OffCanvasBody tag='form' onSubmit={updateGoalForm.handleSubmit} className='p-4'>
					<div className='row g-4'>
						<div className='col-12'>
							<FormGroup id='customerName' label='Customer'>
								<Input
									onChange={updateGoalForm.handleChange}
									value={updateGoalForm.values.customerName}
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='service' label='Service'>
								<Input
									onChange={updateGoalForm.handleChange}
									value={updateGoalForm.values.service}
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='employee' label='Employee'>
								<Input
									onChange={updateGoalForm.handleChange}
									value={updateGoalForm.values.employee}
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='location' label='Location'>
								<Input
									onChange={updateGoalForm.handleChange}
									value={updateGoalForm.values.location}
								/>
							</FormGroup>
						</div>
						<div className='col-6'>
							<FormGroup id='date' label='Date'>
								<Input
									onChange={updateGoalForm.handleChange}
									value={updateGoalForm.values.date}
									type='date'
								/>
							</FormGroup>
						</div>
						<div className='col-6'>
							<FormGroup id='time' label='time'>
								<Input
									onChange={updateGoalForm.handleChange}
									value={updateGoalForm.values.time}
									type='time'
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='name' label='Name'>
								<Input
									type='text'
									name='name'
									onChange={updateGoalForm.handleChange}
									value={updateGoalForm.values.name}
									invalidFeedback={updateGoalForm.errors.name}
									isValid={updateGoalForm.isValid}
									isTouched={updateGoalForm.touched.name}
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<Card isCompact borderSize={2} shadow='none' className='mb-0'>
								<CardHeader>
									<CardLabel>
										<CardTitle>Extras</CardTitle>
									</CardLabel>
								</CardHeader>
								<CardBody>
									<FormGroup
										id='description'
										label='Description'
										className='mt-3'>
										<ReactQuill
											theme='snow'
											value={
												modalHeader === 'New Goal'
													? formikNewGoal.values.description
													: updateGoalForm.values.description
											}
											onChange={(value) => handledescription(value)}
										/>
									</FormGroup>
								</CardBody>
							</Card>
						</div>
						<div className='col-12'>
							<Card isCompact borderSize={2} shadow='none' className='mb-0'>
								<CardHeader>
									<CardLabel>
										<CardTitle>Notification</CardTitle>
									</CardLabel>
								</CardHeader>
								<CardBody>
									<FormGroup>
										<Checks
											id='notify'
											type='switch'
											label={
												<>
													Notify the Customer
													<Popovers
														trigger='hover'
														desc='Check this checkbox if you want your customer to receive an email about the scheduled appointment'>
														<Icon
															icon='Help'
															size='lg'
															className='ms-1 cursor-help'
														/>
													</Popovers>
												</>
											}
											onChange={updateGoalForm.handleChange}
											checked={updateGoalForm.values.notify}
										/>
									</FormGroup>
								</CardBody>
							</Card>
						</div>

						<div className='col'>
							<Button color='info' type='submit'>
								Save
							</Button>
						</div>
					</div>
				</OffCanvasBody>
			</OffCanvas>
		</PageWrapper>
	)
}

export default Goals
