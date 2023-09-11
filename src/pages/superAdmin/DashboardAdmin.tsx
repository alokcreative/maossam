import React, { FC, HTMLAttributes, useCallback } from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft } from '../../layout/SubHeader/SubHeader';
import Page from '../../layout/Page/Page';
import Icon from '../../components/icon/Icon';
import SalePerformance from './dashboardhelper/SalePerformance';
import UserAnalytics from './dashboardhelper/UserAnalytics';
import Transactions from './dashboardhelper/Transactions';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../components/bootstrap/Card';
import useDarkMode from '../../hooks/useDarkMode';
import CommonDashboardRecentActivities from '../presentation/dashboard/common/CommonDashboardRecentActivities';
import USERS from '../../common/data/userDummyData';
import Avatar, { AvatarGroup } from '../../components/Avatar';
import Progress from '../../components/bootstrap/Progress';
import Badge from '../../components/bootstrap/Badge';
import { demoPagesMenu } from '../../menu';
import { useTranslation } from 'react-i18next';

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
	const navigate = useNavigate();
	const handleOnClickToProjectPage = useCallback(
		() => navigate(`../${demoPagesMenu.projectManagement.subMenu.itemID.path}/1`),
		[navigate],
	);
	const { t, i18n } = useTranslation();

	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<div className='col-md-4' {...props}>
			<Card
				stretch
				onClick={handleOnClickToProjectPage}
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
							<Badge color={darkModeStatus ? 'light' : 'dark'} isLight>
								<Icon icon='AttachFile' /> {attachCount}
							</Badge>
						</div>
						<div className='col-auto'>
							<Badge color={darkModeStatus ? 'light' : 'dark'} isLight>
								<Icon icon='TaskAlt' /> {taskCount}
							</Badge>
						</div>
					</div>
					<div className='row'>
						<div className='col-md-6'>
							{percent}%
							<Progress isAutoColor value={percent} height={10} />
						</div>
					</div>
				</CardBody>
			</Card>
		</div>
	);
};
const Dashboard = () => {
	const { darkModeStatus } = useDarkMode();
	const { t } = useTranslation('menu');
	return (
		<PageWrapper isProtected>
			<SubHeader>
				<SubHeaderLeft>
					<Icon icon='Info' className='me-2' size='2x' />
					<span className='text-muted'>Check out latest updates.</span>
				</SubHeaderLeft>
			</SubHeader>
			<Page>
				<Card className='shadow-3d-info'>
					<CardHeader>
						<CardLabel icon='ShowChart' iconColor='secondary'>
							<CardTitle>{t('Statics') as string}</CardTitle>
						</CardLabel>
						<CardActions>
							Only in <strong>{dayjs().format('MMM')}</strong>.
						</CardActions>
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
										<div className='fw-bold fs-3 mb-0'>183K</div>
										<div className='text-muted mt-n2'>Total Projects</div>
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
										<div className='fw-bold fs-3 mb-0'>1247</div>
										<div className='text-muted mt-n2'>Total Customers</div>
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
										<div className='fw-bold fs-3 mb-0'>500+</div>
										<div className='text-muted mt-n2'>Total Tasks</div>
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
										<div className='fw-bold fs-3 mb-0'>112,458</div>
										<div className='text-muted mt-n2'>Total Users</div>
									</div>
								</div>
							</div>
						</div>
					</CardBody>
				</Card>
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
							<Item
								name='Theme'
								teamName='Facit Team'
								dueDate='3 days left'
								attachCount={6}
								taskCount={24}
								percent={65}
								data-tour='project-item'
							/>
							<Item
								name='Plugin'
								teamName='Code Team'
								dueDate='14 days left'
								attachCount={1}
								taskCount={4}
								percent={70}
							/>
							<Item
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
				<div className='row'>
					<div className='col-lg-8'>
						<SalePerformance />
					</div>
					<div className='col-lg-4'>
						<CommonDashboardRecentActivities />
					</div>
				</div>
				<div className='row'>
					<div className='col-lg-6'>
						<Transactions />
					</div>
					<div className='col-lg-6'>
						<UserAnalytics />
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default Dashboard;
