import React, { FC, useState, HTMLAttributes } from 'react';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import Badge from '../../../../components/bootstrap/Badge';
import Icon from '../../../../components/icon/Icon';
import Progress from '../../../../components/bootstrap/Progress';
import Avatar, { AvatarGroup } from '../../../../components/Avatar';
import USERS from '../../../../common/data/userDummyData';
import googleBusiness from '../../../../assets/logos/business.png';
import facebook from '../../../../assets/logos/facebook.png';
import instagram from '../../../../assets/logos/instagram.png';
import pinterest from '../../../../assets/logos/pinterest.png';
import linkedin from '../../../../assets/logos/linkedin-svgrepo-com.svg';
import metaAds from '../../../../assets/logos/Meta_Ads_Manager__1.png';


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
									userName={`${USERS.RYAN.name} ${USERS.RYAN.las}`}
									color='info'
								/>
							</AvatarGroup> */}
							Avatar removed2
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

const DashboardMarketingList = () => {

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


	return (
		<PageWrapper className='p-0'>
			<div className='row mt-3'>
				<div className='col-12'>
					<div className='display-4 fw-bold py-3'>Marketing Channels</div>
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
		</PageWrapper>
	);
};

export default DashboardMarketingList;
