import React from 'react';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import USERS from '../../../common/data/userDummyData';
import { adminDashboardPagesMenu } from '../../../menu';

const UserAnalytics = () => {
	return (
		<Card stretch>
			<CardHeader>
				<CardLabel>
					<CardTitle tag='div' className='h5'>
						User Analytics
					</CardTitle>
				</CardLabel>
				<CardActions>
					<Button
						color='info'
						isLink
						icon='Summarize'
						tag='a'
						to={`../${adminDashboardPagesMenu.users.path}`}>
						All Users
					</Button>
				</CardActions>
			</CardHeader>
			<CardBody>
				<div key='dashboard' className='col-12'>
					<div className='row my-2'>
						<div className='col d-flex align-items-center'>
							<div className='flex-grow-1'>
								<div className='fs-6'>Total number of registered users</div>
							</div>
						</div>
						<div className='col-auto text-end'>
							<div>
								<strong>36K</strong>
							</div>
						</div>
					</div>
					<div className='row my-2'>
						<div className='col d-flex align-items-center'>
							<div className='flex-grow-1'>
								<div className='fs-6'>Users taken subscription</div>
							</div>
						</div>
						<div className='col-auto text-end'>
							<div>
								<strong>12K</strong>
							</div>
						</div>
					</div>
					<div className='row my-2'>
						<div className='col d-flex align-items-center'>
							<div className='flex-grow-1'>
								<div className='fs-6'>Active users</div>
							</div>
						</div>
						<div className='col-auto text-end'>
							<div>
								<strong>6K</strong>
							</div>
						</div>
					</div>
					<div className='row my-2'>
						<div className='col d-flex align-items-center'>
							<div className='flex-grow-1'>
								<div className='fs-6'>Online</div>
							</div>
						</div>
						<div className='col-auto text-end'>
							<div>
								<strong>8K</strong>
							</div>
						</div>
					</div>
					<div className='row my-2'>
						<div className='col d-flex align-items-center'>
							<div className='flex-grow-1'>
								<div className='fs-6'>Fake User</div>
							</div>
						</div>
						<div className='col-auto text-end'>
							<div>
								<strong>2K</strong>
							</div>
						</div>
					</div>
					<div className='row my-2'>
						<div className='col d-flex align-items-center'>
							<div className='flex-grow-1'>
								<div className='fs-6'>Social Media Integration</div>
							</div>
						</div>
						<div className='col-auto text-end'>
							<div>
								<strong>3K</strong>
							</div>
						</div>
					</div>
					<div className='row my-2'>
						<div className='col d-flex align-items-center'>
							<div className='flex-grow-1'>
								<div className='fs-6'>User Retention</div>
							</div>
						</div>
						<div className='col-auto text-end'>
							<div>
								<strong>5K</strong>
							</div>
						</div>
					</div>
					<div className='row my-2'>
						<div className='col d-flex align-items-center'>
							<div className='flex-grow-1'>
								<div className='fs-6'>User Engagement</div>
							</div>
						</div>
						<div className='col-auto text-end'>
							<div>
								<strong>3K</strong>
							</div>
						</div>
					</div>
					<div className='row my-2'>
						<div className='col d-flex align-items-center'>
							<div className='flex-grow-1'>
								<div className='fs-6'>Acquisition Channels</div>
							</div>
						</div>
						<div className='col-auto text-end'>
							<div>
								<strong>07K</strong>
							</div>
						</div>
					</div>
					<div className='row my-2'>
						<div className='col d-flex align-items-center'>
							<div className='flex-grow-1'>
								<div className='fs-6'>User Segmentation</div>
							</div>
						</div>
						<div className='col-auto text-end'>
							<div>
								<strong>18K</strong>
							</div>
						</div>
					</div>
					<div className='row my-2'>
						<div className='col d-flex align-items-center'>
							<div className='flex-grow-1'>
								<div className='fs-6'>User Referrals</div>
							</div>
						</div>
						<div className='col-auto text-end'>
							<div>
								<strong>11K</strong>
							</div>
						</div>
					</div>
					<div className='row my-2'>
						<div className='col d-flex align-items-center'>
							<div className='flex-grow-1'>
								<div className='fs-6'>Social Engagement</div>
							</div>
						</div>
						<div className='col-auto text-end'>
							<div>
								<strong>8K</strong>
							</div>
						</div>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

export default UserAnalytics;
