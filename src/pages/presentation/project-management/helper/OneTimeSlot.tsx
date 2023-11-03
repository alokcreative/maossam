import React, { FC, useEffect } from 'react';
import Checks from '../../../../components/bootstrap/forms/Checks';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import { FormikHelpers, useFormik } from 'formik';

interface ITimeSlotProps {
	weekdayname: string;
	getdata(...args: unknown[]): unknown;
}

const OneTimeSlot: FC<ITimeSlotProps> = ({ weekdayname, getdata, ...props }) => {
	const flexChecks = useFormik({
		initialValues: {
			activeDay: false,
		},
		onSubmit: (values) => {},
	});

	const formik = useFormik({
		onSubmit<Values>(
			values: Values,
			formikHelpers: FormikHelpers<Values>,
		): void | Promise<null> {
			return undefined;
		},
		initialValues: {
			startWorkTime: '10:00',
			endWorkTime: '06:00',
			startBreakTime: '02:00',
			endBreakTime: '03:00',
		},
	});
	useEffect(() => {
		getdata(
			flexChecks.values.activeDay,
			formik.values.startWorkTime,
			formik.values.endWorkTime,
			formik.values.startBreakTime,
			formik.values.endBreakTime,
			weekdayname,
		);
	}, [flexChecks.values.activeDay, formik.values, getdata, weekdayname]);
	return (
		<div>
			<div className='row align-items-center'>
				<div className='col-12 col-md-2'>
					<div className='mb-3'>
						<Checks
							id='activeDay'
							label={weekdayname}
							name='activeDay'
							onChange={flexChecks.handleChange}
							checked={flexChecks.values.activeDay}
						/>
					</div>
				</div>
				<div className='col-12 col-md-5'>
					<div className='row'>
						<div className='col-12 col-md-6'>
							<div className='mb-3'>
								<h6 className='fw-bold d-block d-md-none'>Start Work Time</h6>
								<FormGroup id='startWorkTime' label='Start Time' isFloating>
									<Input
										id='startWorkTime'
										placeholder='Time'
										onChange={formik.handleChange}
										value={formik.values.startWorkTime}
										type='time'
									/>
								</FormGroup>
							</div>
						</div>
						<div className='col-12 col-md-6'>
							<div className='mb-3'>
								<h6 className='fw-bold d-block d-md-none'>End Work Time</h6>
								<FormGroup id='endWorkTime' label='End Time' isFloating>
									<Input
										id='endWorkTime'
										placeholder='Time'
										onChange={formik.handleChange}
										value={formik.values.endWorkTime}
										type='time'
									/>
								</FormGroup>
							</div>
						</div>
					</div>
				</div>
				<div className='col-12 col-md-5'>
					<div className='row'>
						<div className='col-12 col-md-6'>
							<div className='mb-3'>
								<h6 className='fw-bold d-block d-md-none'>Start Break Time</h6>
								<FormGroup id='startBreakTime' label='Start Time' isFloating>
									<Input
										id='startBreakTime'
										placeholder='Time'
										onChange={formik.handleChange}
										value={formik.values.startBreakTime}
										type='time'
									/>
								</FormGroup>
							</div>
						</div>
						<div className='col-12 col-md-6'>
							<div className='mb-3'>
								<h6 className='fw-bold d-block d-md-none'>End Break Time</h6>
								<FormGroup id='endBreakTime' label='End Time' isFloating>
									<Input
										id='endBreakTime'
										placeholder='Time'
										onChange={formik.handleChange}
										value={formik.values.endBreakTime}
										type='time'
									/>
								</FormGroup>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OneTimeSlot;
