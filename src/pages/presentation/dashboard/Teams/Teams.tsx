import React, { useState } from 'react';
import classNames from 'classnames';
import { useFormik } from 'formik';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../../layout/SubHeader/SubHeader';
import Icon from '../../../../components/icon/Icon';
import Page from '../../../../layout/Page/Page';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Card, { CardBody } from '../../../../components/bootstrap/Card';
import USERS from '../../../../common/data/userDummyData';
import Badge from '../../../../components/bootstrap/Badge';
import Button from '../../../../components/bootstrap/Button';
import Input from '../../../../components/bootstrap/forms/Input';
import { demoPagesMenu } from '../../../../menu';
import useTourStep from '../../../../hooks/useTourStep';
import { useNavigate } from 'react-router-dom';

const Teams = () => {
	useTourStep(18);
	const navigate = useNavigate();
	const [filterMenu, setFilterMenu] = useState(false);

	const formik = useFormik({
		initialValues: {
			available: false,
			searchInput: '',
			services: [],
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
			setFilterMenu(false);
			// alert(JSON.stringify(values, null, 2));
		},
	});

	const searchUsers = Object.keys(USERS)
		.filter(
			(key) =>
				USERS[key].username
					.toLowerCase()
					.includes(formik.values.searchInput.toLowerCase()) ||
				USERS[key].name.toLowerCase().includes(formik.values.searchInput.toLowerCase()) ||
				USERS[key].surname.toLowerCase().includes(formik.values.searchInput.toLowerCase()),
		)
		.map((i) => USERS[i]);
	return (
		<PageWrapper title={demoPagesMenu.appointment.subMenu.employeeList.text}>
			<SubHeader>
				<SubHeaderLeft>
					<Button
						className='w-25 px-0'
						color='info'
						isLink
						icon='ArrowBack'
						onClick={() => navigate(-1)}>
						Back to Assets
					</Button>
					<SubheaderSeparator />
					<label
						className='border-0 bg-transparent cursor-pointer me-0'
						htmlFor='searchInput'>
						<Icon icon='Search' size='2x' color='primary' />
					</label>
					<Input
						id='searchInput'
						type='search'
						className='border-0 shadow-none bg-transparent'
						placeholder='Search...'
						onChange={formik.handleChange}
						value={formik.values.searchInput}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					<Button
						icon='PersonAdd'
						color='info'
						isLight
						tag='a'
						to={`../${demoPagesMenu.editPages.subMenu.editWizard.path}`}>
						New Team
					</Button>
				</SubHeaderRight>
			</SubHeader>
			<Page container='fluid'>
				<div className='display-4 fw-bold py-3'>Teams</div>
				<div className='row row-cols-xxl-3 row-cols-lg-3 row-cols-md-2'>
					{searchUsers.map((user) => (
						<div key={user.username} className='col'>
							<Card>
								<CardBody>
									<div className='row g-3'>
										<div className='col d-flex'>
											<div className='flex-shrink-0'>
												<div className='position-relative'>
													<div
														className='ratio ratio-1x1'
														style={{ width: 100 }}>
														<div
															className={classNames(
																`bg-l25-info`,
																'rounded-2',
																'd-flex align-items-center justify-content-center',
																'overflow-hidden',
																'shadow',
															)}>
															<img
																src={user.src}
																alt={user.name}
																width={100}
															/>
														</div>
													</div>
												</div>
											</div>
											<div className='flex-grow-1 ms-3 d-flex justify-content-between'>
												<div className='w-100'>
													<div className='row'>
														<div className='col'>
															<div className='d-flex align-items-center'>
																<div className='fw-bold fs-5 me-2'>
																	{`${user.name} ${user.surname}`}
																</div>
																<small className='border border-success border-2 text-success fw-bold px-2 py-1 rounded-1'>
																	{user.role}
																</small>
															</div>

															<div className='text-muted'>
																@{user.username}
															</div>
														</div>
														<div className='col-auto'>
															<Button
																icon='Info'
																color='dark'
																isLight
																hoverShadow='sm'
																tag='a'
																to={`../${
																	demoPagesMenu.appointment
																		.subMenu.employeeID.path
																}/${user.id || 0}`}
																data-tour={user.name}
																aria-label='More info'
															/>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</CardBody>
							</Card>
						</div>
					))}
				</div>
			</Page>
		</PageWrapper>
	);
};

export default Teams;
