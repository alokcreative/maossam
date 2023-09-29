import React, { FC, useCallback } from 'react';
import useDarkMode from '../../../hooks/useDarkMode';
import { useNavigate } from 'react-router-dom';
import { pagesMenu } from '../../../menu';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Badge from '../../../components/bootstrap/Badge';
import Progress from '../../../components/bootstrap/Progress';

interface IItemProps {
	id: number;
	name: string;
	attributes: string;
	timeline: string;
	status: string;
}
const Item: FC<IItemProps> = ({ name, attributes, timeline, status, id }) => {
	const navigate = useNavigate();
	const handleOnClickToProjectPage = useCallback(
		() => navigate(`../${pagesMenu.goalId.path}/${id}`),
		[navigate, id],
	);
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<div className='col-md-4'>
			<Card stretch onClick={handleOnClickToProjectPage} className='cursor-pointer'>
				<CardHeader>
					<CardLabel>
						<CardTitle>{name}</CardTitle>
					</CardLabel>
				</CardHeader>
				<CardBody>
					<div className='row g-2 mb-3'>
						<div className='col-auto'>
							<p className='h6 fw-bold'>Description:</p>
						</div>
						<div className='col-12'>
							<p className='text-muted'>{attributes}</p>
						</div>
					</div>
					<div className='row'>
						<div className='col-md-12'>
							{60}%
							<Progress isAutoColor value={60} height={10} />
						</div>
					</div>
				</CardBody>
			</Card>
		</div>
	);
};
export default Item;
