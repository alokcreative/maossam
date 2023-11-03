import React, { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import Card, {
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
} from '../../../../components/bootstrap/Card';
import { dashboardPagesMenu } from '../../../../menu';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../layout/Page/Page';
import Checks, { ChecksGroup } from '../../../../components/bootstrap/forms/Checks';
import OneTimeSlot from '../helper/OneTimeSlot';

dayjs.extend(localizedFormat);
interface TimeSlot {
	startTime: unknown;
	endTime: unknown;
}

const WorkingTimeSlot: FC = () => {
	const flexChecks = useFormik({
		initialValues: {
			mondayCheck: false,
			tuesdayCheck: false,
			wednesdayCheck: false,
			thursdayCheck: false,
			fridayCheck: false,
			saturdayCheck: false,
			sundayCheck: false,
		},
		onSubmit: (values) => {},
	});

	const formikdisplay = useFormik({
		initialValues: {
			display: '',
		},
		onSubmit: () => {},
	});

	const getdata = (
		activeDay: boolean,
		startWorkTime: string,
		endWorkTime: string,
		startBreakTime: string,
		endBreakTime: string,
		weekdayname: string,
	) => {
		// console.log(
		// 	`activeDay>>>> ${activeDay}  startWorkTime${startWorkTime} endWorkTime${endWorkTime} startBreakTime${startBreakTime} endBreakTime${endBreakTime} weekdayname${weekdayname}`,
		// );
	};
	const currdate = new Date();
	const formattedDate: string = currdate.toLocaleDateString();
	const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Saturday'];
	return (
		<PageWrapper title={dashboardPagesMenu.workingslot.text} isProtected>
			<Page container='fluid'>
				<div className='display-4 fw-bold py-3'>Timeslot</div>
				<Card>
					<CardBody>
						<div className='row mb-4 mb-lg-5'>
							<div className='col-12'>
								<p className='h4'>
									<span className='fw-bold '>Operating Hours</span>
								</p>
							</div>
							{/* <div className='col-2'>
								<p className='h4'>Date: {formattedDate}</p>
							</div> */}
						</div>
						<div className='row'>
							<div
								className={
									formikdisplay.values.display[0] === 'd-none'
										? 'col-lg-12 user-select-none opacity-50 pe-none bg-[#ccc]'
										: 'col-lg-12'
								}>
								<div className='row align-items-center'>
									<div className='col-12 col-md-2'>
										<div className='mb-3 d-none d-md-block'>
											<h5 className='text-start fw-bold'>Weekdays</h5>
										</div>
									</div>
									<div className='col-6 col-md-5'>
										<div className='mb-3 d-none d-md-block'>
											<h5 className='text-center fw-bold'>Work Time</h5>
										</div>
									</div>
									<div className='col-6 col-md-5'>
										<div className='mb-3 d-none d-md-block'>
											<h5 className='text-center fw-bold'>Break Time</h5>
										</div>
									</div>
								</div>
								<div>
									{weekdays.map((i, index) => (
										// eslint-disable-next-line react/no-array-index-key
										<div className='mb-3' key={index}>
											<OneTimeSlot getdata={getdata} weekdayname={i} />
										</div>
									))}
								</div>
							</div>
						</div>
					</CardBody>
					<CardFooter>
						<CardFooterLeft>
							{/* <FormGroup label='' className='col-12'>
								<ChecksGroup>
									<Checks
										key='d-none'
										id='d-none'
										label="You can disable this feature if you don't want us to help you manage your time."
										name='display'
										value='d-none'
										onChange={formikdisplay.handleChange}
										checked={formikdisplay.values.display.includes('d-none')}
									/>
								</ChecksGroup>
							</FormGroup> */}
						</CardFooterLeft>
						<CardFooterRight>
							<button
								type='button'
								className='btn btn-info'
								disabled={formikdisplay.values.display[0] === 'd-none'}>
								Save
							</button>
							<button
								type='button'
								className='btn btn-danger'
								disabled={formikdisplay.values.display[0] === 'd-none'}>
								Cancel
							</button>
						</CardFooterRight>
					</CardFooter>
				</Card>
			</Page>
		</PageWrapper>
	);
};
export default WorkingTimeSlot;
