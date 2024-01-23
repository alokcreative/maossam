import React, { FC, HTMLAttributes, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTour } from '@reactour/tour';
import useDarkMode from '../../../hooks/useDarkMode';
import { dashboardPagesMenu, pagesMenu } from '../../../menu';
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
import CommonAvatarTeam from '../../../common/other/CommonAvatarTeam';
import CommonDashboardAlert from './common/CommonDashboardAlert';
import CommonDashboardRecentActivities from './common/CommonDashboardRecentActivities';
import ThemeContext from '../../../contexts/themeContext';
import googleBusiness from '../../../assets/logos/business.png';
import facebook from '../../../assets/logos/facebook.png';
import instagram from '../../../assets/logos/instagram.png';
import { PER_COUNT } from '../../../components/PaginationButtons';
// import data from '../../../common/data/dummyTaskHoldData';
// import goalData from '../../../common/data/dummyGoals';
import { useFormik } from 'formik';
import SocialItem from '../dashboardHelper/SocialItem';
import Item from '../dashboardHelper/GoalItems';
import TaskOnHold from '../dashboardHelper/TaskOnHold';
import { useGetGoalsQuery } from '../../../features/auth/taskManagementApiSlice';
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';
import Card, { CardActions, CardBody, CardHeader, CardLabel, CardSubTitle, CardTitle } from '../../../components/bootstrap/Card';
import Progress from '../../../components/bootstrap/Progress';
import Avatar, { AvatarGroup } from '../../../components/Avatar';
import USERS from '../../../common/data/userDummyData';
import { useTranslation } from 'react-i18next';

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
interface IGoalProps {
	id: number;
	title: string;
	description: string;
	due_date?: string;
	expected_time?: string;
	// status?: string;
	category?: string;
	created_at?: string;
	created_by?: string;
	updated_at?: string;
	task_count: string;
}

interface IItemProps extends HTMLAttributes<HTMLDivElement> {
	name: string;
	teamName: string;
	attachCount: number;
	taskCount: number;
	percent: number;
	dueDate: string;
}

const Items: FC<IItemProps> = ({
	name,
	teamName,
	attachCount,
	taskCount,
	percent,
	dueDate,
	...props
}) => {
	const { darkModeStatus } = useDarkMode();
	const navigate = useNavigate();
	// const handleOnClickToProjectPage = useCallback(
	// 	() => navigate(`../${demoPagesMenu.projectManagement.subMenu.itemID.path}/1`),
	// 	[navigate],
	// );
	const { t, i18n } = useTranslation();

	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<div className='col-md-4' {...props}>
			<Card
				stretch
				// onClick={handleOnClickToProjectPage}
				className='shadow-none border border-1 cursor-pointer'>
				<CardHeader>
					<CardLabel icon='Ballot'>
						<CardTitle>{t(`${name}`)}</CardTitle>
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
							<Badge color={darkModeStatus ? 'light' : 'dark'} >
								<Icon icon='AttachFile' /> {attachCount}
							</Badge>
						</div>
						<div className='col-auto'>
							<Badge color={darkModeStatus ? 'light' : 'dark'} >
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
							<AvatarGroup>
								<Avatar
									// srcSet={USERS.GRACE.srcSet}
									src={USERS.GRACE.src}
									userName={`${USERS.GRACE.name} ${USERS.GRACE}`}
									color='info'
								/>
								<Avatar
									// srcSet={USERS.SAM.srcSet}
									src={USERS.SAM.src}
									userName={`${USERS.SAM.name} ${USERS.SAM}`}
									color='info'
								/>
								<Avatar
									// srcSet={USERS.CHLOE.srcSet}
									src={USERS.CHLOE.src}
									userName={`${USERS.CHLOE.name} ${USERS.CHLOE}`}
									color='info'
								/>

								<Avatar
									// srcSet={USERS.JANE.srcSet}
									src={USERS.JANE.src}
									userName={`${USERS.JANE.name} ${USERS.JANE}`}
									color='info'
								/>
								<Avatar
									// srcSet={USERS.JOHN}
									src={USERS.JOHN.src}
									userName={`${USERS.JOHN.name} ${USERS.JOHN}`}
									color='info'
								/>
								<Avatar
									// srcSet={USERS.RYAN.srcSet}
									src={USERS.RYAN.src}
									userName={`${USERS.RYAN.name} ${USERS.RYAN}`}
									color='info'
								/>
							</AvatarGroup>
						</div>
					</div>
				</CardBody>
			</Card>
		</div>
	);
};

const DashboardPage = () => {
	const { mobileDesign } = useContext(ThemeContext);
	const { themeStatus } = useDarkMode();
	const [activeTab, setActiveTab] = useState<TTabs>(TABS.YEARLY);
	const navigate = useNavigate();
	const [elementId, setElementId] = useState<number>();
	const [elementName, setElementName] = useState<string>();
	const [maybeCards, setMaybeCards] = useState<CardProp[]>([]);
	const [notInUseCards, setNotInUseCards] = useState<CardProp[]>([]);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [existingCards, setExistingCards] = useState<CardProp[]>([]);
	const [goalId, setGoalId] = useState<number>();
	const { data, isLoading, isSuccess } = useGetGoalsQuery({
		fixedCacheKey: 'listTask',
	});
	const [goalList, setGoalList] = useState<IGoalProps[]>(data);

	const openModal = (id: number, nameOfBussiness: string) => {
		setElementId(id);
		setElementName(nameOfBussiness);
		setIsModalOpen(true);
	};
	const openGoalModal = (id: number, nameOfBussiness: string) => {
		// setElementId(id);
		// setElementName(nameOfBussiness);
		setGoalId(id);
		setIsModalOpen(true);
	};

	// Function to handle closing the modal

	const notifyOnYes = () =>
		showNotification(
			<span className='d-flex align-items-center'>
				<Icon icon='Info' size='lg' className='me-1' />
				<span>Great! We’ll check out the best set up for you !</span>
			</span>,
			``,
		);
	const notifyOnNoAndNotSure = () =>
		showNotification(
			<span className='d-flex align-items-center'>
				<Icon icon='Info' size='lg' className='me-1' />
				<span>
					I guess we’ll need to check that out – will send you more info on this media and
					add it to media to check!'
				</span>
			</span>,
			``,
		);

	const notifyOnNoAndNope = () =>
		showNotification(
			<span className='d-flex align-items-center'>
				<Icon icon='Info' size='lg' className='me-1' />
				<span>– Ok, Good to know, no need to spend time and energy when not necessary</span>
			</span>,
			``,
		);

	const [cards, setCards] = useState<CardProp[]>([
		{
			id: 1,
			name: 'Google Business',
			image: googleBusiness,
			option: 'yes',
			teamName: 'MA OSSIM Team',
			dueDate: '14 days left',
			attachCount: 0,
			taskCount: 0,
			percent: 0,
		},
		{
			id: 2,
			name: 'Facebook',
			image: facebook,
			option: 'yes',
			teamName: 'Code Team',
			dueDate: '14 days left',
			attachCount: 0,
			taskCount: 0,
			percent: 0,
		},
		{
			id: 3,
			name: 'Instagram',
			image: instagram,
			option: 'yes',
			teamName: 'MA OSSIM Team',
			dueDate: '14 days left',
			attachCount: 0,
			taskCount: 0,
			percent: 0,
		},
	]);
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

	const formik = useFormik({
		initialValues: {
			taskHoldFil: ['Marketing Asset', 'Product', 'Client'],
		},
		onSubmit: (values) => {},
	});

	// const filteredData = data.filter((f) => formik.values.taskHoldFil.includes(f.category));

	const getFormValue = (isSocialMedia: string, isSocialMediaimportant: string) => {
		const element: CardProp[] = cards.filter((card) => card.id === elementId);
		if (isSocialMedia === 'yes' && isSocialMediaimportant === 'yes') {
			notifyOnYes();
			setExistingCards((elements) => [...elements, element[0]]);
			const updatedCards = cards.filter((card) => card.id !== elementId);
			setCards(updatedCards);
		} else if (isSocialMedia === 'no' && isSocialMediaimportant === 'maybe') {
			notifyOnNoAndNotSure();
			setMaybeCards((elements) => [...elements, element[0]]);
			const updatedCards = cards.filter((card) => card.id !== elementId);
			setCards(updatedCards);
		} else if (isSocialMedia === 'no' && isSocialMediaimportant === 'nope') {
			notifyOnNoAndNope();
			setNotInUseCards((elements) => [...elements, element[0]]);
			const updatedCards = cards.filter((card) => card.id !== elementId);
			setCards(updatedCards);
		}
	};
	return (
		<PageWrapper title={dashboardPagesMenu.dashboard.text}>
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
					<Card className='shadow-3d-info'>
						<CardHeader>
							<CardLabel icon='AutoStories' iconColor='primary'>
								<CardTitle>Current Projects </CardTitle>
							</CardLabel>
							{/* <CardActions>
							Only in <strong>{dayjs().format('MMM')}</strong>.
						</CardActions> */}
						</CardHeader>
						<CardBody>
							<div className='row'>
								<Items
									name='Theme'
									teamName='Facit Team'
									dueDate='3 days left'
									attachCount={6}
									taskCount={24}
									percent={65}
									data-tour='project-item'
								/>
								<Items
									name='Plugin'
									teamName='Code Team'
									dueDate='14 days left'
									attachCount={1}
									taskCount={4}
									percent={70}
								/>
								<Items
									name='Website'
									teamName='Facit Team'
									dueDate='14 days left'
									attachCount={12}
									taskCount={34}
									percent={78}
								/>
							</div>
						</CardBody>
					</Card>

					<div className='col-12'>
						<div className='display-4 fw-bold py-3'>Current Goals</div>
					</div>
					{isLoading ? (
						<div>Loading..</div>
					) : isSuccess && data.length !== 0 ? (
						data
							?.slice(0, 6)
							.map((i: IGoalProps) => (
								<Item
									handleEdit={() => {}}
									handleDelete={() => {}}
									parent='dashboard'
									handleView={(id) => navigate(`../goal-details/${id}`)}
									created_by={i.created_by!}
									key={i.id}
									id={i.id}
									name={i.title}
									attributes={i.description}
									timeline={i.expected_time!}
									task_count={i?.task_count}
								/>
							))
					) : (
						<div>No goals yet.</div>
					)}
					<div className='col-12 d-flex justify-content-end me-10 mb-3'>
						{data && data?.length !== 0 && (
							<Button color='primary' onClick={() => navigate('/goals')}>
								See more...
							</Button>
						)}
					</div>

					<TaskOnHold />
					<div className='col-xxl-3'>
						<CommonDashboardRecentActivities />
					</div>

					<div className='col-12'>
						<div className='display-5 fw-bold py-3'>
							Display by media/marketing support
						</div>
					</div>

					{cards.length === 0 ? (
						<p>Not Found</p>
					) : (
						cards.map((card) => (
							<SocialItem
								onClick={() => openModal(card.id, card.name)}
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
				{/* {isModalOpen ? (
					<MarketingAssetForms
						idOfBussiness={elementId}
						nameOfBussiness={elementName}
						isModalOpen={isModalOpen}
						setIsModalOpen={setIsModalOpen}
						getFormValue={getFormValue}
					/>
				) : null} */}
			</Page>
		</PageWrapper>
	);
};

export default DashboardPage;
