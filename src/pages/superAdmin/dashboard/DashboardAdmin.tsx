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
const DashboardAdmin = () => {
	const { darkModeStatus } = useDarkMode();
	const { t } = useTranslation('menu');
	const navigate = useNavigate();
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

	return (
		<PageWrapper isProtected>
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
										<div className='text-muted mt-n2'>Number Product</div>
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
					{goalData.slice(0, 6).map((i) => (
						<Item
							id={i.id}
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

export default DashboardAdmin;
