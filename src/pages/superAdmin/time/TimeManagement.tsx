import React, { useState } from 'react';
import { adminDashboardPagesMenu } from '../../../menu';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import { ApexOptions } from 'apexcharts';
import Page from '../../../layout/Page/Page';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import { AvatarGroup } from '../../../components/Avatar';
import Select from '../../../components/bootstrap/forms/Select';
import Chart, { IChartOptions } from '../../../components/extras/Chart';
import Button from '../../../components/bootstrap/Button';
import Progress from '../../../components/bootstrap/Progress';
import TableRow from '../../../helpers/TableRow';

interface ISalePerTab {
	[key: string]: 'Day' | 'Week' | 'Month';
}

const TimeManagement = () => {
	return (
		<PageWrapper title={adminDashboardPagesMenu.timeTracking.text}>
			<Page container='fluid'>
				<div className='row mb-5 '>
					<Card className='col-lg-7 mx-5'>
						<CardHeader>
							<CardLabel>
								<CardTitle tag='div' className='h5'>
									Time spend On Project
								</CardTitle>
							</CardLabel>
							<CardActions>
								<Select
									id='inputGroupSelect01'
									ariaLabel='Default select example'
									list={[
										{ value: 1, text: 'Weekly' },
										{ value: 2, text: 'Monthly' },
										{ value: 3, text: 'Yearly' },
									]}
								/>
							</CardActions>
						</CardHeader>
						<CardBody>Time is in progress......</CardBody>
					</Card>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default TimeManagement;
