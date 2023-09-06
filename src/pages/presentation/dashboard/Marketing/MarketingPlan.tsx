import React, { FC, HTMLAttributes, useCallback, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import { dashboardPagesMenu, demoPagesMenu } from '../../../../menu';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../../layout/SubHeader/SubHeader';
import useDarkMode from '../../../../hooks/useDarkMode';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import { Badge } from '../../../../components/icon/material-icons';
import Icon from '../../../../components/icon/Icon';
import Progress from '../../../../components/bootstrap/Progress';
import Avatar, { AvatarGroup } from '../../../../components/Avatar';
import useTourStep from '../../../../hooks/useTourStep';
import CommonAvatarTeam from '../../../../common/other/CommonAvatarTeam';
import Page from '../../../../layout/Page/Page';
import Button from '../../../../components/bootstrap/Button';
import USERS from '../../../../common/data/userDummyData';
import metaAds from '../../../../assets/logos/Meta_Ads_Manager__1.png';
import linkedin from '../../../../assets/logos/linkedin-svgrepo-com.svg';
import googleBusiness from '../../../../assets/logos/business.png';
import facebook from '../../../../assets/logos/facebook.png';
import instagram from '../../../../assets/logos/instagram.png';
import pinterest from '../../../../assets/logos/pinterest.png';
import AuthContext from '../../../../contexts/authContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MarketingAssetForms from './MarketingAssetForms/MarketingAssetForms';
import CalendarPage from '../../appointment/CalendarPage';
import CommonGridProductItem from '../../../_common/CommonGridProductItem';
import tableData from '../../../../common/data/dummyProductData';
import Breadcrumb from '../../../../components/bootstrap/Breadcrumb';

interface IItemProps extends HTMLAttributes<HTMLDivElement> {
	name: string;
	teamName: string;
	attachCount: number;
	taskCount: number;
	percent: number;
	dueDate: string;
}
const Item: FC<IItemProps> = ({
	name,
	teamName,
	attachCount,
	taskCount,
	percent,
	dueDate,
	...props
}) => {
	const { darkModeStatus } = useDarkMode();

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
							<Badge color={darkModeStatus ? 'light' : 'dark'}>
								<Icon icon='AttachFile' /> {attachCount}
							</Badge>
						</div>
						<div className='col-auto'>
							<Badge color={darkModeStatus ? 'light' : 'dark'}>
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
							<AvatarGroup url='/teamlists'>
								<Link to='/profile-pages/modern'>
									<Avatar
										srcSet={USERS.GRACE.src}
										src={USERS.GRACE.src}
										userName={`${USERS.GRACE.name} ${USERS.GRACE.lastname}`}
										color='info'
										size={35}
									/>
								</Link>
								<Link to='/profile-pages/modern'>
									<Avatar
										srcSet={USERS.SAM.src}
										src={USERS.SAM.src}
										userName={`${USERS.SAM.name} ${USERS.SAM.lastname}`}
										color='info'
										size={35}
									/>
								</Link>
								<Link to='/profile-pages/modern'>
									<Avatar
										srcSet={USERS.CHLOE.src}
										src={USERS.CHLOE.src}
										userName={`${USERS.CHLOE.name} ${USERS.CHLOE.lastname}`}
										color='info'
										size={35}
									/>
								</Link>
								<Link to='/profile-pages/modern'>
									<Avatar
										srcSet={USERS.JANE.src}
										src={USERS.JANE.src}
										userName={`${USERS.JANE.name} ${USERS.JANE.lastname}`}
										color='info'
										size={35}
									/>
								</Link>
								<Link to='/profile-pages/modern'>
									<Avatar
										srcSet={USERS.JOHN.src}
										src={USERS.JOHN.src}
										userName={`${USERS.JOHN.name} ${USERS.JOHN.lastname}`}
										color='info'
										size={35}
									/>
								</Link>
								<Link to='/profile-pages/modern'>
									<Avatar
										srcSet={USERS.RYAN.src}
										src={USERS.RYAN.src}
										userName={`${USERS.RYAN.name} ${USERS.RYAN.lastname}`}
										color='info'
										size={35}
									/>
								</Link>
							</AvatarGroup>
						</div>
					</div>
				</CardBody>
			</Card>
		</div>
	);
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
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
interface IValues {
	name: string;
	price: number;
	stock: number;
	category: string;
	image?: string | null;
}
const MarketingPlan = () => {
	useTourStep(12);
	const navigate = useNavigate();

	const { userData } = useContext(AuthContext);
	const savedValue = localStorage.getItem('user');
	const parsedValue = savedValue ? JSON.parse(savedValue) : null;
	const newUserName = parsedValue?.newUserName;
	const name = userData?.name || newUserName;
	const [elementId, setElementId] = useState<number>();
	const [elementName, setElementName] = useState<string>();
	const [existingCards, setExistingCards] = useState<CardProp[]>([]);
	const [maybeCards, setMaybeCards] = useState<CardProp[]>([]);
	const [notInUseCards, setNotInUseCards] = useState<CardProp[]>([]);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [data, setData] = useState(tableData);
	const [editPanel, setEditPanel] = useState<boolean>(false);
	const [editItem, setEditItem] = useState<IValues | null>(null);

	// Function to handle closing the modal
	const notifyOnYes = () => toast('Great! We’ll check out the best set up for you !');
	const notifyOnNoAndNotSure = () =>
		toast(
			'I guess we’ll need to check that out – will send you more info on this media and add it to media to check!',
		);
	const notifyOnNoAndNope = () =>
		toast('– Ok, Good to know, no need to spend time and energy when not necessary ');

	// Handle Card Moves
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
		{
			id: 4,
			name: 'Meta Ads',
			image: metaAds,
			option: 'yes',
			teamName: 'Omtanke Taem',
			dueDate: '21 days left',
			attachCount: 4,
			taskCount: 18,
			percent: 43,
		},
		{
			id: 5,
			name: 'Google Ads',
			image: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Ads_logo.svg',
			option: 'yes',
			teamName: 'MA OSSIM Theme',
			dueDate: '21 days left',
			attachCount: 2,
			taskCount: 12,
			percent: 30,
		},
		{
			id: 6,
			name: 'Linkedin',
			image: linkedin,
			option: 'yes',
			teamName: 'Omtanke Taem',
			dueDate: '21 days left',
			attachCount: 4,
			taskCount: 18,
			percent: 43,
		},
		{
			id: 7,
			name: 'Pinterest',
			image: pinterest,
			option: 'yes',
			teamName: 'Code Team',
			dueDate: '14 days left',
			attachCount: 1,
			taskCount: 4,
			percent: 70,
		},
	]);

	const getFormValue = (isSocialMedia: string, isSocialMediaimportant: string) => {
		// console.log('getDta', ' ', isSocialMedia, isSocialMediaimportant);
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
		<PageWrapper title={dashboardPagesMenu.marketingplan.text}>
			<SubHeader>
				<SubHeaderLeft className='d-flex row mt-0'>
					<Breadcrumb
						list={[
							{ title: 'Marketing Plan', to: '/' },
							// { title: 'Edit User', to: '/' },
						]}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					<CommonAvatarTeam>
						<strong>MA OSSIM</strong> Team
					</CommonAvatarTeam>
				</SubHeaderRight>
			</SubHeader>
			<Page container='fluid'>
				<div className='row mt-3'>
					<div className='col-12'>
						<div className='display-6 fw-bold py-3'>DISPLAY BY MEDIA/MEDIUM</div>
					</div>
					{cards.length === 0 ? (
						<p>Not Found</p>
					) : (
						cards.map((card) => (
							<Item
								// onClick={() => openModal(card.id, card.name)}
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
					<div className='col-md-4'>
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
				<div className='row mt-3'>
					<div className='display-6 fw-bold py-3'>DISPLAY BY PRODUCT OBJECTIVE</div>
					{cards.length === 0 ? (
						<p>Not Found</p>
					) : (
						data.slice(0, 5).map((card) => (
							<Item
								// onClick={}
								key={card.id}
								name={card.image}
								teamName={card.name}
								dueDate='21 days left'
								attachCount={10}
								taskCount={8}
								percent={Math.floor(Math.random() * 100)}
								data-tour='project-item'
							/>
						))
					)}
					<div className='col-md-4'>
						<Card stretch>
							<CardBody className='d-flex align-items-center justify-content-center'>
								<Button
									color='info'
									size='lg'
									isLight
									className='w-100 h-100'
									icon='AddCircle'
									// onClick={() => navigate('/setupbusiness')}
								>
									Add New
								</Button>
							</CardBody>
						</Card>
					</div>
				</div>
				<div className='row mt-3'>
					<div className='display-6 fw-bold py-3'> CALENDAR DISPLAY</div>
					<CalendarPage />
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

export default MarketingPlan;
