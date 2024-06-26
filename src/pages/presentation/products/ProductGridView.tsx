import React, { FC } from 'react';
import { ApexOptions } from 'apexcharts';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Chart from '../../../components/extras/Chart';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import Badge from '../../../components/bootstrap/Badge';
import { priceFormat } from '../../../helpers/helpers';
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';
import { pagesMenu } from '../../../menu';
import useDarkMode from '../../../hooks/useDarkMode';
import { useNavigate } from 'react-router-dom';

interface ICommonGridProductItemProps {
	id: string | number;
	name: string;
	category: string;
	img: string;
	price: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	editAction: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	deleteAction: any;
}
const CommonGridProductItem: FC<ICommonGridProductItemProps> = ({
	id,
	name,
	category,
	img,
	price,
	editAction,
	deleteAction,
}) => {
	const { themeStatus, darkModeStatus } = useDarkMode();
	const navigate = useNavigate();
	return (
		<Card>
			<CardHeader>
				<CardLabel onClick={() => navigate(`../${pagesMenu.productId.path}/${id}`)}>
					<CardTitle tag='div' className='h5'>
						{name}{' '}
						{/* {price && (
							<Badge color='success' isLight className='ms-2'>
								{priceFormat(price)}
							</Badge>
						)} */}
					</CardTitle>
					<CardSubTitle tag='div' className='h6'>
						{category}
					</CardSubTitle>
				</CardLabel>
				<CardActions>
					<Dropdown>
						<DropdownToggle hasIcon={false}>
							<Button
								icon='MoreHoriz'
								color={themeStatus}
								shadow='default'
								aria-label='Edit'
							/>
						</DropdownToggle>
						<DropdownMenu isAlignmentEnd>
							<DropdownItem>
								<Button
									icon='FileCopy'
									onClick={() => {
										showNotification(
											<span className='d-flex align-items-center'>
												<Icon icon='Info' size='lg' className='me-1' />
												<span>{name} duplicated.</span>
											</span>,
											`A copy of the ${name} product was created.`,
										);
									}}>
									Duplicate
								</Button>
							</DropdownItem>
							<DropdownItem isDivider />
							<DropdownItem>
								<Button icon='Delete' onClick={() => deleteAction()}>
									Delete
								</Button>
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</CardActions>
			</CardHeader>
			<CardBody onClick={() => navigate(`../${pagesMenu.productId.path}/${id}`)}>
				<img
					src={img}
					alt=''
					width={128}
					height={128}
					className='mx-auto d-block img-fluid mb-3'
				/>
				{/* <div className='row align-items-center'>
					<div className='col'>Monthly sales</div>
					<div className='col-auto'>
						<Chart
							series={series}
							options={dummyOptions}
							type={dummyOptions.chart?.type}
							height={dummyOptions.chart?.height}
							width={dummyOptions.chart?.width}
						/>
					</div>
				</div> */}
			</CardBody>
			<CardFooter className='shadow-3d-container'>
				<Button
					color='dark'
					className={`w-100 mb-4 shadow-3d-up-hover shadow-3d-${
						darkModeStatus ? 'light' : 'dark'
					}`}
					size='lg'
					tag='a'
					to={`../${pagesMenu.productId.path}/${id}`}>
					View Product
				</Button>
			</CardFooter>
		</Card>
	);
};

export default CommonGridProductItem;
