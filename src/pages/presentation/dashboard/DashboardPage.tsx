import React, { FC, useContext, HTMLAttributes, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTour } from '@reactour/tour';
import useDarkMode from '../../../hooks/useDarkMode';
import { demoPagesMenu } from '../../../menu';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { TABS, TTabs } from './common/helper';
import Button, { ButtonGroup } from '../../../components/bootstrap/Button';
import Badge from '../../../components/bootstrap/Badge';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Icon from '../../../components/icon/Icon';
import CommonAvatarTeam from '../../../common/other/CommonAvatarTeam';
import Progress from '../../../components/bootstrap/Progress';
import Avatar, { AvatarGroup } from '../../../components/Avatar';
import USERS from '../../../common/data/userDummyData';

import CommonDashboardAlert from './common/CommonDashboardAlert';
import CommonDashboardRecentActivities from './common/CommonDashboardRecentActivities';
import CommonDashboardTopSeller from './common/CommonDashboardTopSeller';
import ThemeContext from '../../../contexts/themeContext';
import googleBusiness from '../../../assets/logos/business.png';
import facebook from '../../../assets/logos/facebook.png';
import instagram from '../../../assets/logos/instagram.png';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons';
import data from '../../../common/data/dummyTaskHoldData';
import goalData from '../../../common/data/dummyGoals';
import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Label from '../../../components/bootstrap/forms/Label';
import { useFormik } from 'formik';
import Dropdown, { DropdownMenu, DropdownToggle } from '../../../components/bootstrap/Dropdown';
import Popovers from '../../../components/bootstrap/Popovers';

interface IItemProps {
	name: string;
	attributes: string;
	timeline: string;
	status: string;
}
const Item: FC<IItemProps> = ({ name, attributes, timeline, status }) => {
	const { darkModeStatus } = useDarkMode();
	const navigate = useNavigate();
	const handleOnClickToProjectPage = useCallback(
		() => navigate(`../${demoPagesMenu.projectManagement.subMenu.itemID.path}/1`),
		[navigate],
	);
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<div className='col-md-4'>
			<Card stretch onClick={handleOnClickToProjectPage} className='cursor-pointer'>
				<CardHeader>
					<CardLabel>
						<CardTitle>{name}</CardTitle>
					</CardLabel>
					<CardActions>
						<Badge
							color={
								(status === 'Progress' && 'danger') ||
								(status === 'New' && 'warning') ||
								(status === 'Done' && 'success') ||
								'info'
							}>
							{status}
						</Badge>
					</CardActions>
				</CardHeader>
				<CardBody>
					<div className='row g-2 mb-3'>
						<div className='col-auto'>
							<p className='h6 fw-bold'>Description:</p>
						</div>
						<div className='col-12'>
							<p className='text-muted'>{attributes}</p>
						</div>
					</div>
					<div className='row'>
						<div className='col-md-12'>
							{60}%
							<Progress isAutoColor value={60} height={10} />
						</div>
						{/* <div className='col-md-6 d-flex justify-content-end'>
							<AvatarGroup>
								<Avatar
									srcSet={USERS.GRACE.srcSet}
									src={USERS.GRACE.src}
									userName={`${USERS.GRACE.name} ${USERS.GRACE.surname}`}
									color={USERS.GRACE.color}
								/>
								<Avatar
									srcSet={USERS.SAM.srcSet}
									src={USERS.SAM.src}
									userName={`${USERS.SAM.name} ${USERS.SAM.surname}`}
									color={USERS.SAM.color}
								/>
								<Avatar
									srcSet={USERS.CHLOE.srcSet}
									src={USERS.CHLOE.src}
									userName={`${USERS.CHLOE.name} ${USERS.CHLOE.surname}`}
									color={USERS.CHLOE.color}
								/>

								<Avatar
									srcSet={USERS.JANE.srcSet}
									src={USERS.JANE.src}
									userName={`${USERS.JANE.name} ${USERS.JANE.surname}`}
									color={USERS.JANE.color}
								/>
								<Avatar
									srcSet={USERS.JOHN.srcSet}
									src={USERS.JOHN.src}
									userName={`${USERS.JOHN.name} ${USERS.JOHN.surname}`}
									color={USERS.JOHN.color}
								/>
								<Avatar
									srcSet={USERS.RYAN.srcSet}
									src={USERS.RYAN.src}
									userName={`${USERS.RYAN.name} ${USERS.RYAN.surname}`}
									color={USERS.RYAN.color}
								/>
							</AvatarGroup>
						</div> */}
					</div>
				</CardBody>
			</Card>
		</div>
	);
};
interface ITableRowProps {
	id: number;
	dueDate: string;
	name: string;
	category: string;
	expectedTime: string;
	status: string;
	assigned: string;
	edit: string;
}
const TableRow: FC<ITableRowProps> = ({
	id,
	dueDate,
	name,
	category,
	expectedTime,
	status,
	assigned,
	edit,
}) => {
	return (
		<tr>
			<th scope='row'>{id}</th>
			<td>{dueDate}</td>
			<td>
				<div>{name}</div>
			</td>
			<td>{expectedTime}</td>
			<td>{assigned}</td>
			<td>{category}</td>
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
			{/* <td>
				<Button icon='Edit' color='primary' isLight>
					{edit}
				</Button>
			</td> */}
		</tr>
	);
};

interface IItemPropsSocial extends HTMLAttributes<HTMLDivElement> {
	name: string;
	teamName: string;
	attachCount: number;
	taskCount: number;
	percent: number;
	dueDate: string;
}
const SocialItem: FC<IItemPropsSocial> = ({
	name,
	teamName,
	attachCount,
	taskCount,
	percent,
	dueDate,
	...props
}) => {
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<div className='col-md-4' {...props}>
			<Card stretch className='cursor-pointer'>
				<CardHeader>
					<CardLabel>
						<CardTitle>
							<img
								src={name}
								alt=''
								width={100}
								height={100}
								className='mx-auto d-block img-fluid mb-3'
							/>
						</CardTitle>
						<CardSubTitle>{teamName}</CardSubTitle>
					</CardLabel>
					<CardActions>
						<small className='border border-success border-2 text-success fw-bold px-2 py-1 rounded-1'>
							{dueDate}
						</small>
					</CardActions>
				</CardHeader>
				<CardBody>
					<div className='row g-2 mb-3'>
						<div className='col-auto'>
							<Badge>
								<Icon icon='AttachFile' /> {attachCount}
							</Badge>
						</div>
						<div className='col-auto'>
							<Badge>
								<Icon icon='TaskAlt' /> {taskCount}
							</Badge>
						</div>
					</div>
					<div className='row'>
						<div className='col-md-6'>
							{percent}%
							<Progress isAutoColor value={percent} height={10} />
						</div>
						<div className='col-md-6 d-flex justify-content-end'>
							{/* <AvatarGroup url='/'>
								<Avatar
									srcSet={USERS.GRACE.srcSet}
									src={USERS.GRACE.src}
									userName={`${USERS.GRACE.name} ${USERS.GRACE.surname}`}
									color='info'
								/>
								<Avatar
									srcSet={USERS.SAM.srcSet}
									src={USERS.SAM.src}
									userName={`${USERS.SAM.name} ${USERS.SAM.surname}`}
									color='info'
								/>
								<Avatar
									srcSet={USERS.CHLOE.srcSet}
									src={USERS.CHLOE.src}
									userName={`${USERS.CHLOE.name} ${USERS.CHLOE.surname}`}
									color='info'
								/>

								<Avatar
									srcSet={USERS.JANE.srcSet}
									src={USERS.JANE.src}
									userName={`${USERS.JANE.name} ${USERS.JANE.surname}`}
									color='info'
								/>
								<Avatar
									srcSet={USERS.JOHN.srcSet}
									src={USERS.JOHN.src}
									userName={`${USERS.JOHN.name} ${USERS.JOHN.surname}`}
									color='info'
								/>
								<Avatar
									srcSet={USERS.RYAN.srcSet}
									src={USERS.RYAN.src}
									userName={`${USERS.RYAN.name} ${USERS.RYAN.surname}`}
									color='info'
								/>
							</AvatarGroup> */}
						</div>
					</div>
				</CardBody>
			</Card>
		</div>
	);
};

interface CardProp {
	id: number;
	name: string;
	image: string;
	option: string;
	teamName: string;
	dueDate: string;
	attachCount: number;
	taskCount: number;
	percent: number;
}

const DashboardPage = () => {
	const { mobileDesign } = useContext(ThemeContext);
	const { setIsOpen } = useTour();
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);
	useEffect(() => {
		if (localStorage.getItem('tourModalStarted') !== 'shown' && !mobileDesign) {
			setTimeout(() => {
				// setIsOpen(true);
				localStorage.setItem('tourModalStarted', 'shown');
			}, 7000);
		}
		return () => {};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const { themeStatus } = useDarkMode();
	const [activeTab, setActiveTab] = useState<TTabs>(TABS.YEARLY);

	const [cards] = useState<CardProp[]>([
		{
			id: 1,
			name: 'googleBusiness',
			image: googleBusiness,
			option: 'yes',
			teamName: 'MA OSSIM Team',
			dueDate: '3 days left',
			attachCount: 6,
			taskCount: 24,
			percent: 65,
		},
		{
			id: 2,
			name: 'facebook',
			image: facebook,
			option: 'yes',
			teamName: 'Code Team',
			dueDate: '14 days left',
			attachCount: 1,
			taskCount: 4,
			percent: 70,
		},
		{
			id: 3,
			name: 'instagram',
			image: instagram,
			option: 'yes',
			teamName: 'MA OSSIM Team',
			dueDate: '14 days left',
			attachCount: 12,
			taskCount: 34,
			percent: 78,
		},
	]);
	const navigate = useNavigate();
	const formik = useFormik({
		initialValues: {
			taskHoldFil: ['Marketing Asset', 'Product', 'Client'],
		},
		onSubmit: (values) => {},
	});
	// console.log(formik.values.checkOne);

	const filteredData = data.filter((f) => formik.values.taskHoldFil.includes(f.category));

	return (
		<PageWrapper title={demoPagesMenu.sales.subMenu.dashboard.text}>
			<SubHeader>
				<SubHeaderLeft>
					<span className='h4 mb-0 fw-bold'>Overview</span>
					<SubheaderSeparator />
					<ButtonGroup>
						{Object.keys(TABS).map((key) => (
							<Button
								key={key}
								color={activeTab === TABS[key] ? 'success' : themeStatus}
								onClick={() => setActiveTab(TABS[key])}>
								{TABS[key]}
							</Button>
						))}
					</ButtonGroup>
				</SubHeaderLeft>
				<SubHeaderRight>
					<CommonAvatarTeam>
						<strong>Marketing</strong> Team
					</CommonAvatarTeam>
				</SubHeaderRight>
			</SubHeader>

			<Page container='fluid'>
				<div className='row'>
					<div className='col-12'>
						<CommonDashboardAlert />
					</div>

					<div className='col-12'>
						<div className='display-4 fw-bold py-3'>Current Goals</div>
					</div>
					{goalData.slice(0, 6).map((i) => (
						<Item
							key={i.id}
							name={i.name}
							attributes={i.attributes}
							timeline={i.timeline}
							status={i.status}
						/>
					))}
					<div className='col-12 d-flex justify-content-end me-10 mb-3'>
						<Button color='primary' onClick={() => navigate('/goals')}>
							See more...
						</Button>
					</div>
					<div className='col-xxl-9 mt-10'>
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
														<Popovers
															desc='Filtering applied'
															trigger='hover'>
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
										{dataPagination(filteredData, currentPage, perPage).map(
											(i) => (
												// eslint-disable-next-line react/jsx-props-no-spreading
												<TableRow key={i.id} {...i} />
											),
										)}
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
					<div className='col-xxl-3'>
						<CommonDashboardRecentActivities />
					</div>

					<div className='col-12'>
						<div className='display-4 fw-bold py-3'>
							Display by media/marketing support
						</div>
					</div>

					{cards.length === 0 ? (
						<p>Not Found</p>
					) : (
						cards.map((card) => (
							<SocialItem
								key={card.id}
								name={card.image}
								teamName={card.teamName}
								dueDate={card.dueDate}
								attachCount={card.attachCount}
								taskCount={card.taskCount}
								percent={card.percent}
								data-tour='project-item'
							/>
						))
					)}
				</div>
			</Page>
		</PageWrapper>
	);
};

export default DashboardPage;
