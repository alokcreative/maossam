import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Badge from '../../components/bootstrap/Badge';
import Button from '../../components/bootstrap/Button';
import { pagesMenu } from '../../menu';
import useDarkMode from '../../hooks/useDarkMode';

interface ICommonTableRowProps {
	id: string | number;
	image: string;
	name: string;
	category: string;
	price: number;
	store: string;
}
// to={`../${pagesMenu.productId.path}/${id}`}
const CommonTableRow: FC<ICommonTableRowProps> = ({ id, image, name, category, price, store }) => {
	const { darkModeStatus } = useDarkMode();
	return (
		<tr>
			<th scope='row'>{id}</th>
			<td>
				<Link to={`../${pagesMenu.productId.path}/${id}`}>
					<img src={image} alt={name} width={54} height={54} />
				</Link>
			</td>
			<td>
				<div>
					<Link
						to={`../${pagesMenu.productId.path}/${id}`}
						className={classNames('fw-bold', {
							'link-dark': !darkModeStatus,
							'link-light': darkModeStatus,
						})}>
						{name}
					</Link>
					<div className='text-muted'>
						<small>{category}</small>
					</div>
				</div>
			</td>
			{/* <td>
				<Chart
					series={series}
					options={dummyOptions}
					type={dummyOptions.chart?.type}
					height={dummyOptions.chart?.height}
					width={dummyOptions.chart?.width}
				/>
			</td> */}
			{/* <td>
				<span>{stock}</span>
			</td> */}
			<td>
				<span>
					{price.toLocaleString('en-US', {
						style: 'currency',
						currency: 'USD',
					})}
				</span>
			</td>
			<td className='h5'>
				<Badge
					color={
						(store === 'Company A' && 'danger') ||
						(store === 'Company B' && 'warning') ||
						(store === 'Company C' && 'success') ||
						'info'
					}>
					{store}
				</Badge>
			</td>
			<td>{name}</td>
			<td>{name}</td>
			<td className='text-end'>
				<Button
					color='dark'
					isLight
					icon='info'
					tag='a'
					to={`../${pagesMenu.productId.path}/${id}`}
					aria-label='Detail'
				/>
			</td>
		</tr>
	);
};

export default CommonTableRow;
