import React, { FC, HTMLAttributes, useCallback, useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper'
import { dashboardPagesMenu, pagesMenu } from '../../../../menu'
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../../layout/SubHeader/SubHeader'
import useDarkMode from '../../../../hooks/useDarkMode'
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../../components/bootstrap/Card'
import { Badge } from '../../../../components/icon/material-icons'
import Icon from '../../../../components/icon/Icon'
import Progress from '../../../../components/bootstrap/Progress'
import Avatar, { AvatarGroup } from '../../../../components/Avatar'
import useTourStep from '../../../../hooks/useTourStep'
import CommonAvatarTeam from '../../../../common/other/CommonAvatarTeam'
import Page from '../../../../layout/Page/Page'
import Button from '../../../../components/bootstrap/Button'
import USERS from '../../../../common/data/userDummyData'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MarketingAssetForms from './MarketingAssetForms/MarketingAssetForms'
import Breadcrumb from '../../../../components/bootstrap/Breadcrumb'
import { IUserData } from '../../../_layout/_asides/DefaultAside'
import { useGetUsersMutation } from '../../../../features/auth/authApiSlice'
import MarketingAssetData from '../../../../common/data/marketingAssetDummyData'
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../../components/bootstrap/Dropdown'

interface IItemProps extends HTMLAttributes<HTMLDivElement> {
	name: string
	image: string
	teamName: string
	attachCount: number
	taskCount: number
	percent: number
	dueDate: string
	handleOpenModal(...args: unknown[]): unknown
	handleItemDesc(...args: unknown[]): unknown
}
const Item: FC<IItemProps> = ({
	name,
	image,
	teamName,
	attachCount,
	taskCount,
	percent,
	dueDate,
	handleOpenModal,
	handleItemDesc,
	...props
}) => {
	const { themeStatus, darkModeStatus } = useDarkMode()

	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<div className='col-md-4' {...props}>
			<Card stretch className='cursor-pointer'>
				<CardHeader>
					<CardLabel>
						<CardTitle className='d-flex gap-2' onClick={handleOpenModal}>
							<img
								src={image}
								alt={name}
								width={70}
								height={70}
								className='mx-auto d-block img-fluid mb-1'
							/>
							<div className='mx-auto my-auto'>{name}</div>
						</CardTitle>
						<CardSubTitle onClick={handleOpenModal}>{teamName}</CardSubTitle>
						<div className='position-absolute' style={{ top: '12px', right: '25px' }}>
							<Dropdown>
								<DropdownToggle hasIcon={false}>
									<Button
										icon='info'
										color={themeStatus}
										shadow='default'
										aria-label='Edit'
										onClick={handleItemDesc}
									/>
								</DropdownToggle>
								<DropdownMenu>
									<DropdownItem />
								</DropdownMenu>
							</Dropdown>
						</div>
					</CardLabel>

					<div>
						<small className='border border-success border-2 text-success fw-bold px-2 rounded-1'>
							{dueDate}
						</small>
					</div>
				</CardHeader>
				<CardBody className='m-0' onClick={handleOpenModal}>
					<div className='row g-2'>
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
	)
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
interface CardProp {
	id: number
	name: string
	image: string
	option: string
	teamName: string
	dueDate: string
	attachCount: number
	taskCount: number
	percent: number
}

const MarketingAssets = () => {
	useTourStep(12)
	const navigate = useNavigate()
	const handleOnClickToProjectPage = useCallback(
		() => navigate(`../${pagesMenu.projectManagement.subMenu.itemID.path}/1`),
		[navigate],
	)

	const token = localStorage?.getItem('access_token')
	const [GetUsersMutation, { isLoading }] = useGetUsersMutation()
	const [userData, setUserData] = useState<IUserData>()
	useEffect(() => {
		if (token) {
			GetUsersMutation(token)
				.unwrap()
				.then((res) => {
					setUserData(res)
				})
				.catch(() => {
					// localStorage.removeItem('refresh_token');
					// localStorage.removeItem('access_token');
					// localStorage.removeItem('tourModalStarted');
					// localStorage.removeItem('role');
					// localStorage.removeItem('i18nextLng');
					// localStorage.removeItem('facit_asideStatus');
					// localStorage.removeItem('user');
					// navigate('/auth-pages/login');
				})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token])
	const [elementId, setElementId] = useState<number>()
	const [elementName, setElementName] = useState<string>()
	const [existingCards, setExistingCards] = useState<CardProp[]>([])
	const [maybeCards, setMaybeCards] = useState<CardProp[]>([])
	const [notInUseCards, setNotInUseCards] = useState<CardProp[]>([])
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

	const openModal = (id: number, nameOfBussiness: string) => {
		setElementId(id)
		setElementName(nameOfBussiness)
		setIsModalOpen(true)
	}
	// Function to handle closing the modal
	const notifyOnYes = () => toast('Great! We’ll check out the best set up for you !')
	const notifyOnNoAndNotSure = () =>
		toast(
			'I guess we’ll need to check that out – will send you more info on this media and add it to media to check!',
		)
	const notifyOnNoAndNope = () =>
		toast('– Ok, Good to know, no need to spend time and energy when not necessary ')

	// Handle Card Moves
	const [cards, setCards] = useState<CardProp[]>(MarketingAssetData)

	const getFormValue = (isSocialMedia: string, isSocialMediaimportant: string) => {
		const element: CardProp[] = cards.filter((card) => card.id === elementId)
		if (isSocialMedia === 'yes' && isSocialMediaimportant === 'yes') {
			notifyOnYes()
			setExistingCards((elements) => [...elements, element[0]])
			const updatedCards = cards.filter((card) => card.id !== elementId)
			setCards(updatedCards)
		} else if (isSocialMedia === 'no' && isSocialMediaimportant === 'maybe') {
			notifyOnNoAndNotSure()
			setMaybeCards((elements) => [...elements, element[0]])
			const updatedCards = cards.filter((card) => card.id !== elementId)
			setCards(updatedCards)
		} else if (isSocialMedia === 'no' && isSocialMediaimportant === 'nope') {
			notifyOnNoAndNope()
			setNotInUseCards((elements) => [...elements, element[0]])
			const updatedCards = cards.filter((card) => card.id !== elementId)
			setCards(updatedCards)
		}
	}
	const handleItemDesc = (card: CardProp) => {
		navigate(`${dashboardPagesMenu.marketingassets.path}/${card.id}`)
	}
	return (
		<PageWrapper title={dashboardPagesMenu.marketingassets.text}>
			<SubHeader>
				{/* <SubHeaderLeft>
					<p className='mb-0'>
						<strong>Hi {name}</strong> we're excited to review your marketing assets
						together.
					</p>
				</SubHeaderLeft> */}
				<SubHeaderLeft className='d-flex row mt-0'>
					<Breadcrumb list={[{ title: 'Profile Hub', to: '/' }]} />
				</SubHeaderLeft>
				{/* <SubHeaderRight>
					<CommonAvatarTeam>
						<strong>SoSimple</strong> Team
					</CommonAvatarTeam>
				</SubHeaderRight> */}
			</SubHeader>
			<Page container='fluid'>
				<div className='row mt-3'>
					<div className='display-6 fw-bold py-3'>Proile Hub</div>
					{existingCards.length === 0 ? (
						// <p>Not Found</p>
						<div />
					) : (
						existingCards.map((card) => (
							<Item
								handleItemDesc={() => handleItemDesc(card)}
								handleOpenModal={() => handleOnClickToProjectPage()}
								key={card.id}
								name={card.name}
								image={card.image}
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
				<div className='row mt-3'>
					{/* <div className='col-12'>
						<div className='display-6 fw-bold py-3'>MARKETING CHANNELS TO DO</div>
					</div> */}
					{cards.length === 0 ? (
						<p>Not Found</p>
					) : (
						cards.map((card) => (
							<Item
								handleOpenModal={() => openModal(card.id, card.name)}
								key={card.id}
								name={card.name}
								image={card.image}
								teamName={card.teamName}
								dueDate={card.dueDate}
								attachCount={card.attachCount}
								taskCount={card.taskCount}
								percent={card.percent}
								handleItemDesc={() => handleItemDesc(card)}
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
					<div className='display-6 fw-bold py-3'>MAYBE</div>
					{maybeCards.length === 0 ? (
						<p>Not Found</p>
					) : (
						maybeCards.map((card) => (
							<Item
								handleItemDesc={() => handleItemDesc(card)}
								handleOpenModal={() => {}}
								key={card.id}
								name={card.name}
								image={card.image}
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
				<div className='row mt-3'>
					<div className='display-6 fw-bold py-3'>MEDIA NOT IN USE</div>
					{notInUseCards.length === 0 ? (
						<p>Not Found</p>
					) : (
						notInUseCards.map((card) => (
							<Item
								handleItemDesc={() => handleItemDesc(card)}
								handleOpenModal={() => {}}
								key={card.id}
								name={card.name}
								image={card.image}
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
	)
}

export default MarketingAssets
