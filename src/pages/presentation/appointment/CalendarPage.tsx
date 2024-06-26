import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import classNames from 'classnames'
import { Calendar, dayjsLocalizer, View as TView, Views } from 'react-big-calendar'
import { useFormik } from 'formik'
import { Calendar as DatePicker } from 'react-date-range'
import USERS, { getUserDataWithUsername, IUserProps } from '../../../common/data/userDummyData'
import eventList, { IEvents } from '../../../common/data/events'
import {
	CalendarTodayButton,
	CalendarViewModeButtons,
	getLabel,
	getUnitType,
	getViews,
} from '../../../components/extras/calendarHelper'
import SERVICES, { getServiceDataWithServiceName } from '../../../common/data/serviceDummyData'
import PageWrapper from '../../../layout/PageWrapper/PageWrapper'
// import { pagesMenu } from '../../../menu';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader'
import Icon from '../../../components/icon/Icon'
import Button from '../../../components/bootstrap/Button'
import Popovers from '../../../components/bootstrap/Popovers'
import Page from '../../../layout/Page/Page'
import Avatar, { AvatarGroup } from '../../../components/Avatar'
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../components/bootstrap/Card'
import OffCanvas, {
	OffCanvasBody,
	OffCanvasHeader,
	OffCanvasTitle,
} from '../../../components/bootstrap/OffCanvas'
import FormGroup from '../../../components/bootstrap/forms/FormGroup'
import Select from '../../../components/bootstrap/forms/Select'
import Option from '../../../components/bootstrap/Option'
import Checks from '../../../components/bootstrap/forms/Checks'
import Input from '../../../components/bootstrap/forms/Input'
import Tooltips from '../../../components/bootstrap/Tooltips'
import useDarkMode from '../../../hooks/useDarkMode'
import { TColor } from '../../../type/color-type'
import { useNavigate } from 'react-router-dom'
import Modal, { ModalBody, ModalHeader } from '../../../components/bootstrap/Modal'

const localizer = dayjsLocalizer(dayjs)
const now = new Date()

interface IEvent extends IEvents {
	user?: IUserProps
	users?: IUserProps[]
	color?: TColor
}

const MyEvent = (data: { event: IEvent }) => {
	const { darkModeStatus } = useDarkMode()

	const { event } = data
	return (
		<div className='row g-2'>
			<div className='col text-truncate'>
				{event?.icon && <Icon icon={event?.icon} size='lg' className='me-2' />}
				{event?.name}
			</div>
			{event?.user?.src && (
				<div className='col-auto'>
					<div className='row g-1 align-items-baseline'>
						<div className='col-auto'>
							<Avatar src={event?.user?.src} srcSet={event?.user?.src} size={18} />
						</div>
						<small
							className={classNames('col-auto text-truncate', {
								'text-dark': !darkModeStatus,
								'text-white': darkModeStatus,
							})}>
							{event?.user?.name}
						</small>
					</div>
				</div>
			)}
			{event?.users && (
				<div className='col-auto'>
					{/* <AvatarGroup size={18}>
						{event.users.map((user) => (
							// eslint-disable-next-line react/jsx-props-no-spreading
							<Avatar key={user.src} {...user} />
						))}
					</AvatarGroup> */}
					Avatar removed14
				</div>
			)}
		</div>
	)
}

const MyWeekEvent = (data: { event: IEvent }) => {
	const { darkModeStatus } = useDarkMode()

	const { event } = data
	return (
		<div className='row g-2'>
			<div className='col-12 text-truncate'>
				{event?.icon && <Icon icon={event?.icon} size='lg' className='me-2' />}
				{event?.name}
			</div>
			{event?.user && (
				<div className='col-12'>
					<div className='row g-1 align-items-baseline'>
						<div className='col-auto'>
							{/* eslint-disable-next-line react/jsx-props-no-spreading */}
							{/* <Avatar {...event?.user} size={18} /> */} Avatarremoved13
						</div>
						<small
							className={classNames('col-auto text-truncate', {
								'text-dark': !darkModeStatus,
								'text-white': darkModeStatus,
							})}>
							{event?.user?.name}
						</small>
					</div>
				</div>
			)}
			{event?.users && (
				<div className='col-12'>
					{/* <AvatarGroup size={18}>
						{event.users.map((user) => (
							// eslint-disable-next-line react/jsx-props-no-spreading
							<Avatar key={user.src} {...user} />
						))}
					</AvatarGroup> */}
					Avater removed12
				</div>
			)}
		</div>
	)
}

const MyEventDay = (data: { event: IEvent }) => {
	const { event } = data
	return (
		<Tooltips
			title={`${event?.name} / ${dayjs(event.start).format('LT')} - ${dayjs(event.end).format(
				'LT',
			)}`}>
			<div className='row g-2'>
				{/* {event?.user?.src && (
					<div className='col-auto'>
						<Avatar src={event?.user?.src} srcSet={event?.user?.srcSet} size={16} />
					</div>
				)} */}
				{/* {event?.users && (
					<div className='col'>
						<AvatarGroup size={16}>
							{event.users.map((user) => (
								// eslint-disable-next-line react/jsx-props-no-spreading
								<Avatar key={user.src} {...user} />
							))}
						</AvatarGroup>
					</div>
				)} */}
				<small className='col text-truncate'>
					{event?.icon && <Icon icon={event?.icon} size='lg' className='me-2' />}
					{event?.name}
				</small>
			</div>
		</Tooltips>
	)
}

const CalendarPage = () => {
	const { darkModeStatus, themeStatus } = useDarkMode()

	// BEGIN :: Calendar
	// Active employee
	const [employeeList, setEmployeeList] = useState({
		[USERS.JOHN.email]: true,
		[USERS.ELLA.email]: true,
		[USERS.RYAN.email]: true,
		[USERS.GRACE.email]: true,
	})
	// Events
	const [events, setEvents] = useState(eventList)

	// FOR DEV
	useEffect(() => {
		setEvents(eventList)
		return () => {}
	}, [])

	const initialEventItem: IEvent = {
		start: undefined,
		end: undefined,
		name: undefined,
		id: undefined,
		user: undefined,
	}
	// Selected Event
	const [eventItem, setEventItem] = useState<IEvent>(initialEventItem)
	// Calendar View Mode
	const [viewMode, setViewMode] = useState<TView>(Views.MONTH)
	// Calendar Date
	const [date, setDate] = useState(new Date())
	// Item edit panel status
	const [toggleInfoEventCanvas, setToggleInfoEventCanvas] = useState(false)
	const setInfoEvent = () => setToggleInfoEventCanvas(!toggleInfoEventCanvas)
	const [eventAdding, setEventAdding] = useState(false)

	// Calendar Unit Type
	const unitType = getUnitType(viewMode)
	// Calendar Date Label
	const calendarDateLabel = getLabel(date, viewMode)

	// Change view mode
	const handleViewMode = (e: dayjs.ConfigType) => {
		setDate(dayjs(e).toDate())
		setViewMode(Views.DAY)
	}
	// For Modal
	const [isOpen, setIsOpen] = useState<boolean>(() => {
		const storedValue = localStorage.getItem('isOpen')
		return storedValue ? JSON.parse(storedValue) : true
	})

	useEffect(() => {
		// Set isOpen in localStorage when component unmounts
		localStorage.setItem('isOpen', JSON.stringify(true))
	}, [isOpen])

	const handleCloseClick = () => {
		setIsOpen(false)
	}
	// View modes; Month, Week, Work Week, Day and Agenda
	const views = getViews()

	// New Event
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleSelect = ({ start, end }: { start: any; end: any }) => {
		setEventAdding(true)
		setEventItem({ start, end })
	}

	useEffect(() => {
		if (eventAdding) {
			setInfoEvent()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [eventAdding])

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const eventStyleGetter = (
		event: { color?: TColor },
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		start: any,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		end: any,
		isSelected: boolean,
	) => {
		const isActiveEvent = start <= now && end >= now
		const isPastEvent = end < now
		const color = isActiveEvent ? 'success' : event.color

		return {
			className: classNames({
				[`bg-l${darkModeStatus ? 'o25' : '10'}-${color} text-${color}`]: color,
				'border border-success': isActiveEvent,
				'opacity-50': isPastEvent,
			}),
		}
	}

	const formik = useFormik({
		initialValues: {
			eventName: '',
			eventStart: '',
			eventEnd: '',
			eventEmployee: '',
			eventAllDay: false,
		},
		onSubmit: (values) => {
			if (eventAdding) {
				setEvents((prevEvents) => [
					...prevEvents,
					{
						id: values.eventStart,
						...getServiceDataWithServiceName(values.eventName),
						end: values.eventEnd,
						start: values.eventStart,
						user: { ...getUserDataWithUsername(values.eventEmployee) },
					},
				])
			}
			setToggleInfoEventCanvas(false)
			setEventAdding(false)
			setEventItem(initialEventItem)
			formik.setValues({
				eventName: '',
				eventStart: '',
				eventEnd: '',
				eventEmployee: '',
				eventAllDay: false,
			})
		},
	})

	useEffect(() => {
		if (eventItem)
			formik.setValues({
				...formik.values,
				// @ts-ignore
				eventId: eventItem.id || null,
				eventName: eventItem.name || '',
				eventStart: dayjs(eventItem.start).format(),
				eventEnd: dayjs(eventItem.end).format(),
				eventEmployee: eventItem?.user?.email || '',
			})
		return () => {}
		//	eslint-disable-next-line react-hooks/exhaustive-deps
	}, [eventItem])
	// END:: Calendar
	const navigate = useNavigate()
	return (
		<PageWrapper>
			<SubHeader>
				<SubHeaderLeft>
					<Icon icon='Info' className='me-2' size='2x' />
					<span className='text-muted'>
						You have{' '}
						<Icon icon='Check Circle ' color='success' className='mx-1' size='lg' /> 12
						approved appointments and{' '}
						<Icon icon='pending_actions ' color='danger' className='mx-1' size='lg' /> 3
						pending appointments for today.
					</span>
				</SubHeaderLeft>
				<SubHeaderRight>
					<Popovers
						desc={
							<DatePicker
								onChange={(item) => setDate(item)}
								date={date}
								color={process.env.REACT_APP_PRIMARY_COLOR}
							/>
						}
						placement='bottom-end'
						className='mw-100'
						trigger='click'>
						<Button color='light'>{calendarDateLabel}</Button>
					</Popovers>
				</SubHeaderRight>
			</SubHeader>
			<Page container='fluid'>
				<div className='row mb-4 g-3'>
					{Object.keys(USERS).map((u) => (
						<div key={USERS[u].email} className='col-auto'>
							<Popovers
								trigger='hover'
								desc={
									<>
										<div className='h6'>{`${USERS[u].name} ${USERS[u].lastname}`}</div>
										<div>
											<b>Event: </b>
											{
												events.filter(
													(i) => i.user?.email === USERS[u].email,
												).length
											}
										</div>
										<div>
											<b>Approved: </b>
											{
												events.filter(
													(i) =>
														i.user?.email === USERS[u].email &&
														i.color === 'info',
												).length
											}
										</div>
									</>
								}>
								<div className='position-relative'>
									<Avatar
										srcSet={USERS[u].src}
										src={USERS[u].src}
										color='info'
										size={64}
										border={4}
										className='cursor-pointer'
										borderColor={
											employeeList[USERS[u].email] ? 'info' : themeStatus
										}
										onClick={() =>
											setEmployeeList({
												...employeeList,
												[USERS[u].email]: !employeeList[USERS[u].email],
											})
										}
									/>
									{!!events.filter(
										(i) =>
											i.user?.email === USERS[u].email &&
											i.start &&
											i.start < now &&
											i.end &&
											i.end > now,
									).length && (
										<span className='position-absolute top-85 start-85 translate-middle badge border border-2 border-light rounded-circle bg-success p-2'>
											<span className='visually-hidden'>Online user</span>
										</span>
									)}
								</div>
							</Popovers>
						</div>
					))}
				</div>

				<div className='row h-100'>
					<div className='col-xl-12'>
						<Card stretch style={{ minHeight: 600 }}>
							<CardHeader>
								<CardActions>
									<CalendarTodayButton
										unitType={unitType}
										date={date}
										setDate={setDate}
										viewMode={viewMode}
									/>
								</CardActions>
								<CardActions>
									<div className='d-flex align-items-center gap-2'>
										{/* <Button
											icon='add'
											color='info'
											isLink
											onClick={() => {
												navigate('/add-task')
											}}>
											New Task
										</Button> */}
										<CalendarViewModeButtons
											setViewMode={setViewMode}
											viewMode={viewMode}
										/>
									</div>
								</CardActions>
							</CardHeader>
							<CardBody isScrollable>
								<Calendar
									selectable
									toolbar={false}
									localizer={localizer}
									events={events.filter(
										(i) => i?.user && employeeList[i.user.email],
									)}
									defaultView={Views.WEEK}
									views={views}
									view={viewMode}
									date={date}
									onNavigate={(_date) => setDate(_date)}
									scrollToTime={new Date(1970, 1, 1, 6)}
									defaultDate={new Date()}
									onSelectEvent={(event) => {
										setInfoEvent()
										setEventItem(event)
									}}
									onSelectSlot={handleSelect}
									onView={handleViewMode}
									onDrillDown={handleViewMode}
									components={{
										event: MyEvent, // used by each view (Month, Day, Week)
										week: {
											event: MyWeekEvent,
										},
										work_week: {
											event: MyWeekEvent,
										},
									}}
									eventPropGetter={eventStyleGetter}
								/>
							</CardBody>
						</Card>
					</div>
					{/* <div className='col-xl-3'>
						<Card stretch style={{ minHeight: 600 }}>
							<CardHeader>
								<CardLabel icon='Today' iconColor='info'>
									<CardTitle tag='div' className='h5'>
										{dayjs(date).format('MMMM Do YYYY')}
									</CardTitle>
									<CardSubTitle tag='div' className='h6'>
										{dayjs(date).fromNow()}
									</CardSubTitle>
								</CardLabel>
								<CardActions>
									<CalendarTodayButton
										unitType={Views.DAY}
										date={date}
										setDate={setDate}
										viewMode={Views.DAY}
									/>
								</CardActions>
							</CardHeader>
							<CardBody isScrollable>
								<Calendar
									selectable
									toolbar={false}
									localizer={localizer}
									events={events}
									defaultView={Views.WEEK}
									views={views}
									view={Views.DAY}
									date={date}
									scrollToTime={new Date(1970, 1, 1, 6)}
									defaultDate={new Date()}
									onSelectEvent={(event) => {
										setInfoEvent()
										setEventItem(event)
									}}
									onSelectSlot={handleSelect}
									onView={handleViewMode}
									onDrillDown={handleViewMode}
									components={{
										event: MyEventDay, // used by each view (Month, Day, Week)
									}}
									eventPropGetter={eventStyleGetter}
								/>
							</CardBody>
						</Card>
						
					</div> */}
				</div>

				<OffCanvas
					setOpen={(status: boolean) => {
						setToggleInfoEventCanvas(status)
						setEventAdding(status)
					}}
					isOpen={toggleInfoEventCanvas}
					titleId='canvas-title'>
					<OffCanvasHeader
						setOpen={(status: boolean) => {
							setToggleInfoEventCanvas(status)
							setEventAdding(status)
						}}
						className='p-4'>
						<OffCanvasTitle id='canvas-title'>
							{eventAdding ? 'Add Event' : 'Edit Event'}
						</OffCanvasTitle>
					</OffCanvasHeader>
					<OffCanvasBody tag='form' onSubmit={formik.handleSubmit} className='p-4'>
						<div className='row g-4'>
							<div className='col-12'>
								<FormGroup id='eventName' label='Name'>
									<Select
										ariaLabel='Service select'
										placeholder='Please select...'
										size='lg'
										value={formik.values.eventName}
										onChange={formik.handleChange}>
										{Object.keys(SERVICES).map((s) => (
											<Option key={SERVICES[s].name} value={SERVICES[s].name}>
												{SERVICES[s].name}
											</Option>
										))}
									</Select>
								</FormGroup>
							</div>

							<div className='col-12'>
								<Card className='mb-0 bg-l10-info' shadow='sm'>
									<CardHeader className='bg-l25-info'>
										<CardLabel icon='DateRange' iconColor='info'>
											<CardTitle className='text-info'>
												Date Options
											</CardTitle>
										</CardLabel>
									</CardHeader>
									<CardBody>
										<div className='row g-3'>
											<div className='col-12'>
												<FormGroup id='eventAllDay'>
													<Checks
														type='switch'
														value='true'
														label='All day event'
														checked={formik.values.eventAllDay}
														onChange={formik.handleChange}
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
												<FormGroup
													id='eventStart'
													label={
														formik.values.eventAllDay
															? 'Date'
															: 'Start Date'
													}>
													<Input
														type={
															formik.values.eventAllDay
																? 'date'
																: 'datetime-local'
														}
														value={
															formik.values.eventAllDay
																? dayjs(
																		formik.values.eventStart,
																  ).format('YYYY-MM-DD')
																: dayjs(
																		formik.values.eventStart,
																  ).format('YYYY-MM-DDTHH:mm')
														}
														onChange={formik.handleChange}
													/>
												</FormGroup>
											</div>

											{!formik.values.eventAllDay && (
												<div className='col-12'>
													<FormGroup id='eventEnd' label='End Date'>
														<Input
															type='datetime-local'
															value={dayjs(
																formik.values.eventEnd,
															).format('YYYY-MM-DDTHH:mm')}
															onChange={formik.handleChange}
														/>
													</FormGroup>
												</div>
											)}
										</div>
									</CardBody>
								</Card>
							</div>

							<div className='col-12'>
								<Card className='mb-0 bg-l10-dark' shadow='sm'>
									<CardHeader className='bg-l25-dark'>
										<CardLabel icon='Person Add' iconColor='dark'>
											<CardTitle>Employee Options</CardTitle>
										</CardLabel>
									</CardHeader>
									<CardBody>
										<FormGroup id='eventEmployee' label='Employee'>
											<Select
												placeholder='Please select...'
												value={formik.values.eventEmployee}
												onChange={formik.handleChange}
												ariaLabel='Employee select'>
												{Object.keys(USERS).map((u) => (
													<Option
														key={USERS[u].id}
														value={USERS[u].email}>
														{`${USERS[u].name} ${USERS[u].lastname}`}
													</Option>
												))}
											</Select>
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
				<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='lg' isStaticBackdrop>
					<ModalHeader setIsOpen={handleCloseClick} />
					<ModalBody>
						<div className='row g-4 px-4'>
							<div className='col'>
								<h4 className='text-center mb-4'>
									Welcome to your daily working hours setup!
								</h4>
								<p className='text-center'>
									Don't miss out on this crucial step—it ensures we can keep you
									in the loop if your tasks clash with your time slots or if you
									have room to add more tasks and accelerate towards your goals.
								</p>
								<p className='text-center'>
									Remember, you can always adjust this later. Remember to allocate
									time for those essential breaks and lunchtime pauses!
								</p>
							</div>
						</div>
					</ModalBody>
				</Modal>
			</Page>
		</PageWrapper>
	)
}

export default CalendarPage
