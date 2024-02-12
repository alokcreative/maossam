import React, { FC } from 'react';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Badge from '../../../components/bootstrap/Badge';
import Button from '../../../components/bootstrap/Button';
import classNames from 'classnames';
import { TColor } from '../../../type/color-type';

interface IUserProps {
	index: number;
	id: string;
	first_name: string;
	last_name: string;
	position: string;
	email: string;
	company_name: string;
	phone_number: number;
	color: TColor;
	// services: IServiceProps[];
	handleClick(...args: unknown[]): unknown;
	handleEditUser(...args: unknown[]): unknown;
	avatar: string;
	role: string;
}
const UserCard: FC<IUserProps> = ({
	index,
	id,
	first_name,
	last_name,
	position,
	email,
	company_name,
	color,
	phone_number,
	handleClick,
	handleEditUser,
	avatar,
	role,
}) => {
	return (
		<Card>
			<CardBody>
				<div className='row g-3'>
					<div className='col d-flex'>
						<div className='flex-shrink-0'>
							<div className='position-relative'>
								<div className='ratio ratio-1x1' style={{ width: 100 }}>
									<div
										className={classNames(
											`bg-l25-${color}`,
											'rounded-2',
											'd-flex align-items-center justify-content-center',
											'overflow-hidden',
											'shadow',
										)}>
										<img
											src={(avatar && avatar) || ''}
											alt={first_name}
											width={100}
										/>
									</div>
								</div>
								{/* {true && (
									<span className='position-absolute top-100 start-85 translate-middle badge border border-2 border-light rounded-circle bg-success p-2'>
										<span className='visually-hidden'>Online user</span>
									</span>
								)} */}
							</div>
						</div>
						<div className='flex-grow-1 ms-3 d-flex justify-content-between'>
							<div className='w-100'>
								<div className='row'>
									<div className='col'>
										<div className='d-flex align-items-center'>
											<div className='fw-bold fs-5 me-2'>
												{`${first_name} ${last_name}`}
											</div>
											{role && (
												<small className='border border-success border-2 text-success fw-bold px-2 py-1 rounded-1'>
													{role}
												</small>
											)}
										</div>

										<div className='text-muted'>{email}</div>
										<div className='text-muted'>{phone_number}</div>
									</div>
									<div
										className='position-absolute'
										style={{ display: 'contents' }}>
										{/* <Button
												icon='Info'
												color='dark'
												isLight
												hoverShadow='sm'
												tag='a'
												to={`../${
													demoPagesMenu.appointment.subMenu.employeeID
														.path
												}/${user.id || 0}`}
												data-tour={user.name}
												aria-label='More info'
											/> */}
										<Button
											color='info'
											icon='Edit'
											className='me-2'
											isLight
											// isDisable={Number(id) > 8}
											onClick={() => handleEditUser(id)}
										/>
										<Button
											icon='Delete'
											className='me-1'
											color='danger'
											isLight
											onClick={() => handleClick(id)}
										/>
									</div>
								</div>
								{/* {!!user?.services && (
										<div className='row g-2 mt-3'>
											{user?.services.map((service) => (
												<div key={service.name} className='col-auto'>
													<Badge
														isLight
														color={service.color}
														className='px-3 py-2'>
														<Icon
															icon={service.icon}
															size='lg'
															className='me-1'
														/>
														{service.name}
													</Badge>
												</div>
											))}
										</div>
									)} */}
							</div>
						</div>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

export default UserCard;
