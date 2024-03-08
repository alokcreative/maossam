import React, { FC, useEffect, useLayoutEffect, useState } from 'react'
import OffCanvas, { OffCanvasBody, OffCanvasHeader, OffCanvasTitle } from '../bootstrap/OffCanvas'
import FormGroup from '../bootstrap/forms/FormGroup'
import Input from '../bootstrap/forms/Input'
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../bootstrap/Card'
import ReactQuill from 'react-quill'
import Checks from '../bootstrap/forms/Checks'
import Button from '../bootstrap/Button'
import Icon from '../icon/Icon'
import Popovers from '../bootstrap/Popovers'
import { useFormik } from 'formik'
import { useGetGoalsQuery, useUpdateGoalMutation } from '../../features/auth/taskManagementApiSlice'
import showNotification from '../extras/showNotification'
import dayjs from 'dayjs'
import { format } from 'date-fns'
import { categoryStringValue } from '../../utiles/helper'

export interface IGoalProps {
	id: string
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
	setIsOffCanvasOpen(...args: unknown[]): unknown
	refetch(...args: unknown[]): unknown
	isOffCanvasOpen: boolean
	logUserId: string | null
	createdBy: string
	role: string | null
	goalEditId: number | undefined
}

const GoalOfCanvas: FC<IProps> = ({
	role,
	createdBy,
	setIsOffCanvasOpen,
	isOffCanvasOpen,
	logUserId,
	refetch,
	goalEditId,
}) => {
	const [updateGoal] = useUpdateGoalMutation()
	const [date, setDate] = useState<Date>(new Date())

	const { data, isLoading } = useGetGoalsQuery({
		fixedCacheKey: 'listTask',
	})

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
			}
		},
	})
	useEffect(() => {
		const tempGoal = data.find((i: IGoalProps) => i.id === String(goalEditId))
		console.log('goalEditId>>', goalEditId)
		console.log('tempGoal>>', tempGoal)
		updateGoalForm.setFieldValue('id', tempGoal?.id)
		updateGoalForm.setFieldValue('name', tempGoal?.title)
		updateGoalForm.setFieldValue('description', tempGoal?.description)
		updateGoalForm.setFieldValue('due_date', tempGoal?.due_date)
		updateGoalForm.setFieldValue('expected_time', tempGoal?.expected_time)
		// updateGoalForm.setFieldValue('status', goal?.status);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, goalEditId, isLoading])

	const handledescription = (value: string) => {
		updateGoalForm.setFieldValue('description', value)
	}
	return (
		<OffCanvas setOpen={setIsOffCanvasOpen} isOpen={isOffCanvasOpen} titleId='canvas-title'>
			<OffCanvasHeader setOpen={setIsOffCanvasOpen} className='p-4'>
				<OffCanvasTitle id='canvas-title'>
					{logUserId == createdBy || role == 'superadmin'
						? 'Edit Goal and Set Deadline'
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
								// invalidFeedback={updateGoalForm.errors.name}
								isValid={updateGoalForm.isValid}
								// isTouched={updateGoalForm.touched.name}
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
								<FormGroup id='description' label='Description' className='mt-3'>
									<ReactQuill
										theme='snow'
										value={updateGoalForm.values.description}
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
	)
}

export default GoalOfCanvas
