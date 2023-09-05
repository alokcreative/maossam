import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import Button from '../../../components/bootstrap/Button';
import USERS from '../../../common/data/userDummyData';
import useDarkMode from '../../../hooks/useDarkMode';
import { TColor } from '../../../type/color-type';
import Chart, { IChartOptions }  from '../../../components/extras/Chart';
import Avatar from '../../../components/Avatar';
import Popovers from '../../../components/bootstrap/Popovers';
import { demoPagesMenu } from '../../../menu';

interface IAnswerCustomerProps {
	id: string | number;
	imgWebp: string;
	img: string;
	name: string;
	job: string;
	value: number;
	color: TColor | 'link' | 'brand' | 'brand-two' | 'storybook';
}
const AnswerCustomer: FC<IAnswerCustomerProps> = (props: IAnswerCustomerProps) => {
	const { id, imgWebp, img, name, job, value, color } = props;
	const { darkModeStatus } = useDarkMode();

	const [state] = useState<IChartOptions>({
		series: [value],
		options: {
			chart: {
				type: 'radialBar',
				width: 50,
				height: 50,
				sparkline: {
					enabled: true,
				},
			},
			dataLabels: {
				enabled: false,
			},
			plotOptions: {
				radialBar: {
					hollow: {
						margin: 0,
						size: '50%',
					},
					track: {
						margin: 0,
					},
					dataLabels: {
						show: false,
					},
				},
			},
			stroke: {
				lineCap: 'round',
			},
			colors: [
				(color === 'primary' && process.env.REACT_APP_PRIMARY_COLOR) ||
					(color === 'secondary' && process.env.REACT_APP_SECONDARY_COLOR) ||
					(color === 'success' && process.env.REACT_APP_SUCCESS_COLOR) ||
					(color === 'info' && process.env.REACT_APP_INFO_COLOR) ||
					(color === 'warning' && process.env.REACT_APP_WARNING_COLOR) ||
					(color === 'danger' && process.env.REACT_APP_DANGER_COLOR),
			],
		},
	});
	return (
		<div className='col-12'>
			<div className='row g-2'>
				<div className='col d-flex'>
					<div className='flex-shrink-0'>
						<Avatar
							src={img}
							srcSet={imgWebp}
							size={54}
							userName={name}
							color={color}
						/>
					</div>
					<div className='flex-grow-1 ms-3 d-flex justify-content-between align-items-center'>
						<div>
							<Link
								to={`../${demoPagesMenu.appointment.subMenu.employeeID.path}/${(USERS.id) || 0}`}
								className={classNames('fw-bold fs-6 mb-0', {
									'link-dark': !darkModeStatus,
									'link-light': darkModeStatus,
								})}>
								{name}
							</Link>
							<div className='text-muted mt-n1'>
								<small>{job}</small>
							</div>
						</div>
					</div>
				</div>
				<div className='col-auto'>
					<div className='d-flex align-items-center'>
						<Popovers desc='Remaining time' trigger='hover'>
							<span className='me-3'>%{value}</span>
						</Popovers>
						{/* <Chart
							series={state.series}
							options={state.options}
							type={state.options.chart?.type}
							height={state.options.chart?.height}
							width={state.options.chart?.width}
							className='me-3'
						/> */}
						<Button
							color='info'
							isLight
							icon='ScheduleSend'
							className='text-nowrap'
							tag='a'
							href='mailto:example@site.com'>
							Send
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default AnswerCustomer