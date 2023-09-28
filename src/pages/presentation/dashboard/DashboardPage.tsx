import React, { FC, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTour } from '@reactour/tour';
import useDarkMode from '../../../hooks/useDarkMode';
import { pagesMenu } from '../../../menu';
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
import data from '../../../common/data/dummyTaskHoldData';
import goalData from '../../../common/data/dummyGoals';
import { useFormik } from 'formik';
import SocialItem from '../../_common/dashboardHelper/SocialItem';
import Item from '../../_common/dashboardHelper/GoalItems';
import TaskOnHold from '../../_common/dashboardHelper/TaskOnHold';
import MarketingAssetForms from './Marketing/MarketingAssetForms/MarketingAssetForms';
import { toast } from 'react-toastify';

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

const DashboardPage = () => {
	const { mobileDesign } = useContext(ThemeContext);
	// const { setIsOpen } = useTour();
	// const [currentPage, setCurrentPage] = useState(1);
	// const [perPage, setPerPage] = useState(PER_COUNT['5']);
	const { themeStatus } = useDarkMode();
	// const [activeTab, setActiveTab] = useState<TTabs>(TABS.YEARLY);
	const navigate = useNavigate();
	const [elementId, setElementId] = useState<number>();
	const [elementName, setElementName] = useState<string>();
	const [maybeCards, setMaybeCards] = useState<CardProp[]>([]);
	const [notInUseCards, setNotInUseCards] = useState<CardProp[]>([]);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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
			name: 'Google Business',
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
			name: 'Facebook',
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
			name: 'Instagram',
			image: instagram,
			option: 'yes',
			teamName: 'MA OSSIM Team',
			dueDate: '14 days left',
			attachCount: 12,
			taskCount: 34,
			percent: 78,
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

	const filteredData = data.filter((f) => formik.values.taskHoldFil.includes(f.category));

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
		<PageWrapper title={pagesMenu.sales.subMenu.dashboard.text}>
			{/* <SubHeader>
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
			</SubHeader> */}

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
							id={i.id}
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
					<TaskOnHold />
					{/* <div className='col-xxl-3'>
						<CommonDashboardRecentActivities />
					</div> */}

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

export default DashboardPage;
