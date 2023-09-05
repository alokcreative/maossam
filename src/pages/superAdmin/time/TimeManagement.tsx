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
	const [stackedColumn] = useState<IChartOptions>({
		series: [
			{
				name: 'PROJECT A',
				data: [3, 2, 1, 2.3, 4],
			},
			{
				name: 'PROJECT B',
				data: [2, 3, 1, 1.7, 0],
			},
			{
				name: 'PROJECT C',
				data: [1, 2.5, 2.5, 3, 3],
			},
			{
				name: 'PROJECT D',
				data: [2, 0.5, 3.5, 1, 1],
			},
		],
		options: {
			chart: {
				type: 'bar',
				height: 350,
				stacked: true,
				toolbar: {
					show: true,
				},
				zoom: {
					enabled: true,
				},
			},
			responsive: [
				{
					breakpoint: 480,
					options: {
						legend: {
							position: 'bottom',
							offsetX: -10,
							offsetY: 0,
						},
					},
				},
			],
			plotOptions: {
				bar: {
					horizontal: false,
				},
			},
			xaxis: {
				type: 'category',
				categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
			},
			legend: {
				position: 'right',
				offsetY: 40,
			},
			fill: {
				opacity: 1,
			},
		},
	});

	const chartOptions: ApexOptions = {
		chart: {
			type: 'donut',
			height: 350,
		},
		stroke: {
			width: 0,
		},
		labels: ['Project A', 'Project B', 'Project C'],
		dataLabels: {
			enabled: false,
		},
		plotOptions: {
			pie: {
				expandOnClick: true,
				donut: {
					labels: {
						show: true,
						name: {
							show: true,
							fontSize: '24px',
							fontFamily: 'Poppins',
							fontWeight: 900,
							offsetY: 0,
							formatter(val) {
								return val;
							},
						},
						value: {
							show: true,
							fontSize: '16px',
							fontFamily: 'Poppins',
							fontWeight: 900,
							offsetY: 16,
							formatter(val) {
								return val;
							},
						},
					},
				},
			},
		},
		legend: {
			show: true,
			position: 'bottom',
		},
	};

	const DUMMY_DATA: { [key: string]: IChartOptions } = {
		DAY: {
			series: [1.8, 3.7, 2.5],
			options: {
				...chartOptions,
			},
		},
		WEEK: {
			series: [42, 90, 68],
			options: {
				...chartOptions,
			},
		},
		MONTH: {
			series: [320, 245, 235],
			options: {
				...chartOptions,
			},
		},
	};

	const [state, setState] = useState<IChartOptions>({
		series: DUMMY_DATA.MONTH.series,
		options: chartOptions,
	});

	const SALE_PER_TAB: { [key: string]: ISalePerTab['key'] } = {
		DAY: 'Day',
		WEEK: 'Week',
		MONTH: 'Month',
	};
	const [activeSalePerTab, setActiveSalePerTab] = useState<ISalePerTab['key']>(
		SALE_PER_TAB.MONTH,
	);

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
						<CardBody>
							<div className='row align-items-end'>
								<div>
									<div className='h4 mb-3'>Total Time Spend</div>
									<span className='display-6 fw-bold text-success'>200</span>
									<span className='text-muted ms-3'>(hours)</span>
								</div>
								<div>
									<Chart
										series={stackedColumn.series}
										options={stackedColumn.options}
										type='bar'
										height={500}
									/>
								</div>
							</div>
						</CardBody>
					</Card>
					<Card className='col-lg-4'>
						<CardHeader>
							<CardLabel>
								<CardTitle tag='div' className='h5'>
									Report.
								</CardTitle>
							</CardLabel>
							<CardActions>
								<Button
									color='info'
									onClick={() => {
										setActiveSalePerTab(SALE_PER_TAB.DAY);
										setState({
											series: DUMMY_DATA.DAY.series,
											options: DUMMY_DATA.DAY.options,
										});
									}}
									isLink={activeSalePerTab !== SALE_PER_TAB.DAY}
									isLight={activeSalePerTab === SALE_PER_TAB.DAY}>
									Day
								</Button>
								<Button
									color='info'
									onClick={() => {
										setActiveSalePerTab(SALE_PER_TAB.WEEK);
										setState({
											series: DUMMY_DATA.WEEK.series,
											options: DUMMY_DATA.WEEK.options,
										});
									}}
									isLink={activeSalePerTab !== SALE_PER_TAB.WEEK}
									isLight={activeSalePerTab === SALE_PER_TAB.WEEK}>
									Week
								</Button>
								<Button
									color='info'
									onClick={() => {
										setActiveSalePerTab(SALE_PER_TAB.MONTH);
										setState({
											series: DUMMY_DATA.MONTH.series,
											options: DUMMY_DATA.MONTH.options,
										});
									}}
									isLink={activeSalePerTab !== SALE_PER_TAB.MONTH}
									isLight={activeSalePerTab === SALE_PER_TAB.MONTH}>
									Month
								</Button>
							</CardActions>
						</CardHeader>
						<CardBody>
							<Chart
								series={state.series}
								options={state.options}
								type={state.options.chart?.type}
								height={state.options.chart?.height}
							/>
							<div className='mt-5'>
								<div className='col-md-6  mb-3'>
									<div className='h4'>Project A</div>
									{85}%
									<Progress isAutoColor value={85} height={10} />
								</div>
								<div className='col-md-6 mb-3'>
									<div className='h4 '>Project B</div>
									{80}%
									<Progress isAutoColor value={78} height={10} />
								</div>
								<div className='col-md-6 mb-3'>
									<div className='h4 mb-3'>Project C</div>
									{80}%
									<Progress isAutoColor value={65} height={10} />
								</div>
							</div>
						</CardBody>
					</Card>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default TimeManagement;
