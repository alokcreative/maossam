import React, { useState } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Icon from '../../../components/icon/Icon';
import SalePerformance from '../dashboardhelper/SalePerformance';
import Transactions from '../dashboardhelper/Transactions';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import useDarkMode from '../../../hooks/useDarkMode';
import { useTranslation } from 'react-i18next';
import goalData from '../../../common/data/dummyGoals';
import Item from '../../_common/dashboardHelper/GoalItems';
import Button from '../../../components/bootstrap/Button';
import TaskOnHold from '../../_common/dashboardHelper/TaskOnHold';
import googleBusiness from '../../../assets/logos/business.png';
import facebook from '../../../assets/logos/facebook.png';
import instagram from '../../../assets/logos/instagram.png';
import SocialItem from '../../_common/dashboardHelper/SocialItem';
import MarketingAssetForms from '../../presentation/dashboard/Marketing/MarketingAssetForms/MarketingAssetForms';
import { toast } from 'react-toastify';
import { useGetGoalsQuery } from '../../../features/auth/taskManagementApiSlice';
import { dashboardPagesMenu } from '../../../menu';

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
}
const DashboardAdmin = () => {
	const { darkModeStatus } = useDarkMode();
	const { t } = useTranslation('menu');
	const navigate = useNavigate();
	const [elementId, setElementId] = useState<number>();
	const [elementName, setElementName] = useState<string>();
	const [maybeCards, setMaybeCards] = useState<CardProp[]>([]);
	const [notInUseCards, setNotInUseCards] = useState<CardProp[]>([]);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const { data, isLoading, isSuccess, isError, refetch } = useGetGoalsQuery({fixedCacheKey: 'listTask'});
	const [goalList, setGoalList] = useState<IGoalProps[]>(data);
	const [existingCards, setExistingCards] = useState<CardProp[]>([]);
	const openModal = (id: number, nameOfBussiness: string) => {
		setElementId(id);
		setElementName(nameOfBussiness);
		setIsModalOpen(true);
	};

	// Function to handle closing the modal
	const notifyOnYes = () => toast('Great! We’ll check out the best set up for you !');
	const notifyOnNoAndNotSure = () =>
		toast(
			'I guess we’ll need to check that out – will send you more info on this media and add it to media to check!',
		);
	const notifyOnNoAndNope = () =>
		toast('– Ok, Good to know, no need to spend time and energy when not necessary ');

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
			<Page container='fluid'>
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
										<div className='text-muted mt-n2'>Number of Users</div>
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
										<div className='text-muted mt-n2'>Number of Products</div>
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
										<div className='text-muted mt-n2'>Sales</div>
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
										<div className='text-muted mt-n2'>Profit</div>
									</div>
								</div>
							</div>
						</div>
					</CardBody>
				</Card>
				<div className='row'>
					<div className='col-12'>
						<div className='display-4 fw-bold py-3'>Current Goals</div>
					</div>
					{isLoading ? (
						<div>Loadning</div>
					) : isSuccess && data.length !== 0 ? (
						goalList
							?.slice(0, 6)
							.map((i) => (
								<Item
									key={i.id}
									id={i.id}
									name={i.title}
									attributes={i.description}
									timeline={i.expected_time!}
								/>
							))
					) : (
						<div>No data found</div>
					)}
					<div className='col-12 d-flex justify-content-end me-10 mb-3'>
					{data && data?.length !== 0 && (
							<Button color='primary' onClick={() => navigate('/goals')}>
								See more...
							</Button>
						)}
					</div>
				</div>
				<div className='col-12'>
					<div className='display-5 fw-bold py-3'>Display by media/marketing support</div>
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
