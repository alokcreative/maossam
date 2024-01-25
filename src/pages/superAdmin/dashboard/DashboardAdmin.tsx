import React, { useState } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import '../../../assets/css/index.css';

import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Icon from '../../../components/icon/Icon';
import SalePerformance from '../dashboardhelper/SalePerformance';
import Transactions from '../dashboardhelper/Transactions';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../components/bootstrap/Card';
import useDarkMode from '../../../hooks/useDarkMode';
import { useTranslation } from 'react-i18next';
import goalData from '../../../common/data/dummyGoals';
import Item from '../../presentation/dashboardHelper/GoalItems';
import Button, { ButtonGroup } from '../../../components/bootstrap/Button';
import TaskOnHold from '../../presentation/dashboardHelper/TaskOnHold';
import googleBusiness from '../../../assets/logos/business.png';
import facebook from '../../../assets/logos/facebook.png';
import instagram from '../../../assets/logos/instagram.png';
import SocialItem from '../../presentation/dashboardHelper/SocialItem';
import MarketingAssetForms from '../../presentation/dashboard/Marketing/MarketingAssetForms/MarketingAssetForms';
import { useGetGoalsQuery } from '../../../features/auth/taskManagementApiSlice';
import { dashboardPagesMenu } from '../../../menu';
import showNotification from '../../../components/extras/showNotification';
import CommonDashboardAlert from '../../presentation/dashboard/common/CommonDashboardAlert';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import { TABS, TTabs } from '../../presentation/dashboard/common/helper';
import CommonAvatarTeam from '../../../common/other/CommonAvatarTeam';
import CommonDashboardRecentActivities from '../../presentation/dashboard/common/CommonDashboardRecentActivities';

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

const DashboardAdmin = () => {
	const { darkModeStatus } = useDarkMode();
	const { themeStatus } = useDarkMode();

	const [activeTab, setActiveTab] = useState<TTabs>(TABS.YEARLY);
	const { t } = useTranslation('menu');
	const navigate = useNavigate();
	const [elementId, setElementId] = useState<number>();
	const [elementName, setElementName] = useState<string>();
	const [maybeCards, setMaybeCards] = useState<CardProp[]>([]);
	const [notInUseCards, setNotInUseCards] = useState<CardProp[]>([]);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const { data, isLoading, isSuccess, isError, refetch } = useGetGoalsQuery({
		fixedCacheKey: 'listTask',
	});
	const [goalList, setGoalList] = useState<IGoalProps[]>(data);
	const [existingCards, setExistingCards] = useState<CardProp[]>([]);
	const openModal = (id: number, nameOfBussiness: string) => {
		setElementId(id);
		setElementName(nameOfBussiness);
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
					add it to media to check!
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
			name: 'googleBusiness',
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
			name: 'facebook',
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
			name: 'instagram',
			image: instagram,
			option: 'yes',
			teamName: 'MA OSSIM Team',
			dueDate: '14 days left',
			attachCount: 0,
			taskCount: 0,
			percent: 0,
		},
	]);

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
		<PageWrapper isProtected title={dashboardPagesMenu.dashboard.text}>
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
							<CardLabel icon='ShowChart' iconColor='secondary'>
								<CardTitle>{t("KPI's") as string}</CardTitle>
							</CardLabel>
						</CardHeader>
						<CardBody>
							<div className='row g-4 align-items-center'>
								<div className='col-md-6 col-xl-3'>
									<div
										className={classNames(
											'd-flex align-items-center rounded-2 p-3',
											{
												'bg-l10-warning': !darkModeStatus,
												'bg-lo25-warning': darkModeStatus,
											},
										)}>
										<div className='flex-shrink-0'>
											<Icon icon='AutoStories' size='3x' color='warning' />
										</div>
										<div className='flex-grow-1 ms-3'>
											<div className='fw-bold fs-3 mb-0'>0</div>
											<div
												title='Number of Users'
												className='text-muted mt-n2 lineclamp'>
												Number of Users
											</div>
										</div>
									</div>
								</div>
								<div className='col-md-6 col-xl-3'>
									<div
										className={classNames(
											'd-flex align-items-center rounded-2 p-3',
											{
												'bg-l10-info': !darkModeStatus,
												'bg-lo25-info': darkModeStatus,
											},
										)}>
										<div className='flex-shrink-0'>
											<Icon icon='Group' size='3x' color='info' />
										</div>
										<div className='flex-grow-1 ms-3'>
											<div className='fw-bold fs-3 mb-0'>0</div>
											<div
												title='Number of Products'
												className='text-muted mt-n2 lineclamp'>
												Number of Products
											</div>
										</div>
									</div>
								</div>
								<div className='col-md-6 col-xl-3'>
									<div
										className={classNames(
											'd-flex align-items-center rounded-2 p-3',
											{
												'bg-l10-primary': !darkModeStatus,
												'bg-lo25-primary': darkModeStatus,
											},
										)}>
										<div className='flex-shrink-0'>
											<Icon icon='Flag' size='3x' color='primary' />
										</div>
										<div className='flex-grow-1 ms-3'>
											<div className='fw-bold fs-3 mb-0'>0</div>
											<div
												title='Sales'
												className='text-muted mt-n2 lineclamp'>
												Sales
											</div>
										</div>
									</div>
								</div>
								<div className='col-md-6 col-xl-3'>
									<div
										className={classNames(
											'd-flex align-items-center rounded-2 p-3',
											{
												'bg-l10-success': !darkModeStatus,
												'bg-lo25-success': darkModeStatus,
											},
										)}>
										<div className='flex-shrink-0'>
											<Icon icon='Group' size='3x' color='success' />
										</div>
										<div className='flex-grow-1 ms-3'>
											<div className='fw-bold fs-3 mb-0'>0</div>
											<div
												title='Profit'
												className='text-muted mt-n2 lineclamp'>
												Profit
											</div>
										</div>
									</div>
								</div>
								<div className='col-md-6 col-xl-3'>
									<div
										className={classNames(
											'd-flex align-items-center rounded-2 p-3',
											{
												'bg-l10-warning': !darkModeStatus,
												'bg-lo25-warning': darkModeStatus,
											},
										)}>
										<div className='flex-shrink-0'>
											<Icon icon='AutoStories' size='3x' color='warning' />
										</div>
										<div className='flex-grow-1 ms-3'>
											<div className='fw-bold fs-3 mb-0'>0</div>
											<div
												title='Number of users on trial period'
												className='text-muted mt-n2 lineclamp'>
												Number of users on trial period
											</div>
										</div>
									</div>
								</div>
								<div className='col-md-6 col-xl-3'>
									<div
										className={classNames(
											'd-flex align-items-center rounded-2 p-3',
											{
												'bg-l10-info': !darkModeStatus,
												'bg-lo25-info': darkModeStatus,
											},
										)}>
										<div className='flex-shrink-0'>
											<Icon icon='Group' size='3x' color='info' />
										</div>
										<div className='flex-grow-1 ms-3'>
											<div className='fw-bold fs-3 mb-0'>0</div>
											<div
												title='Number of free users (students)'
												className='text-muted mt-n2 lineclamp'>
												Number of free users (students)
											</div>
										</div>
									</div>
								</div>
								<div className='col-md-6 col-xl-3'>
									<div
										className={classNames(
											'd-flex align-items-center rounded-2 p-3',
											{
												'bg-l10-primary': !darkModeStatus,
												'bg-lo25-primary': darkModeStatus,
											},
										)}>
										<div className='flex-shrink-0'>
											<Icon icon='Flag' size='3x' color='primary' />
										</div>
										<div className='flex-grow-1 ms-3'>
											<div className='fw-bold fs-3 mb-0'>0</div>
											<div
												title='% of users on trial period that become paying users'
												className='text-muted mt-n2 lineclamp'>
												% of users on trial period that become paying users
											</div>
										</div>
									</div>
								</div>
								<div className='col-md-6 col-xl-3'>
									<div
										className={classNames(
											'd-flex align-items-center rounded-2 p-3',
											{
												'bg-l10-success': !darkModeStatus,
												'bg-lo25-success': darkModeStatus,
											},
										)}>
										<div className='flex-shrink-0'>
											<Icon icon='Group' size='3x' color='success' />
										</div>
										<div className='flex-grow-1 ms-3'>
											<div className='fw-bold fs-3 mb-0'>0</div>
											<div
												title='Different packages sales'
												className='text-muted mt-n2 lineclamp'>
												Different packages sales
											</div>
										</div>
									</div>
								</div>
								<div className='col-md-6 col-xl-3'>
									<div
										className={classNames(
											'd-flex align-items-center rounded-2 p-3',
											{
												'bg-l10-success': !darkModeStatus,
												'bg-lo25-success': darkModeStatus,
											},
										)}>
										<div className='flex-shrink-0'>
											<Icon icon='Group' size='3x' color='success' />
										</div>
										<div className='flex-grow-1 ms-3'>
											<div className='fw-bold fs-3 mb-0'>0</div>
											<div
												title='Number of new users /day/week/month'
												className='text-muted mt-n2 lineclamp'>
												Number of new users /day/week/month
											</div>
										</div>
									</div>
								</div>
								<div className='col-md-6 col-xl-3'>
									<div
										className={classNames(
											'd-flex align-items-center rounded-2 p-3',
											{
												'bg-l10-success': !darkModeStatus,
												'bg-lo25-success': darkModeStatus,
											},
										)}>
										<div className='flex-shrink-0'>
											<Icon icon='Group' size='3x' color='success' />
										</div>
										<div className='flex-grow-1 ms-3'>
											<div className='fw-bold fs-3 mb-0'>0</div>
											<div
												title='Number of users/field activity / company size / job title'
												className='text-muted mt-n2 lineclamp'>
												Number of users/field activity / company size / job
												title
											</div>
										</div>
									</div>
								</div>
							</div>
						</CardBody>
					</Card>

					<div className='row'>
						<div className='col-12'>
							<div className='display-6 fw-bold py-3'>Current Goals</div>
						</div>
						{isLoading ? (
							<div>Loading...</div>
						) : isSuccess && data.length !== 0 ? (
							data
								?.slice(0, 6)
								.map((i: IGoalProps) => (
									<Item
										parent='dashboard'
										handleEdit={() => {}}
										handleDelete={() => {}}
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
						{/* <div className='col-12 d-flex justify-content-end me-10 mb-3'>
							{data && data?.length !== 0 && (
								<Button color='primary' onClick={() => navigate('/goals')}>
									See more...
								</Button>
							)}
						</div> */}
						<TaskOnHold />
						<div className='col-md-3 col-xxl-3'>
							<CommonDashboardRecentActivities />
						</div>
					</div>

					<div className='col-12'>
						<div className='display-6 fw-bold py-3'>
							Display by media/marketing support
						</div>
					</div>
					<div className='row'>
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
						<div className='col-md-3'>
							<Card stretch>
								<CardBody className='d-flex align-items-center justify-content-center'>
									<Button
										color='info'
										size='lg'
										isLight
										className='w-100 h-100'
										icon='AddCircle'
										onClick={() => navigate('/setupbusiness')}>
										Add New
									</Button>
								</CardBody>
							</Card>
						</div>
					</div>
				</div>
				{isModalOpen ? (
					<MarketingAssetForms
						idOfBussiness={elementId}
						nameOfBussiness={elementName}
						isModalOpen={isModalOpen}
						setIsModalOpen={setIsModalOpen}
						getFormValue={getFormValue}
					/>
				) : null}
			</Page>
		</PageWrapper>
	);
};

export default DashboardAdmin;
