import React, { FC, useCallback, useState } from 'react';
import useDarkMode from '../../../hooks/useDarkMode';
import { useNavigate, useParams } from 'react-router-dom';
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
import GoalViewPopup from '../../presentation/goal/goalHelpher/GoalViewPopup';
import { useGetTaskByGoalIdQuery } from '../../../features/auth/taskManagementApiSlice';

interface IItemProps {
	id: number;
	name: string;
	attributes: string;
	timeline: string;
}
const Item: FC<IItemProps> = ({ name, attributes, timeline, id }) => {
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showMore, setShowMore] = useState<boolean>(false);
	const role = localStorage.getItem('role');
	const { data, isLoading, isSuccess, refetch } = useGetTaskByGoalIdQuery(
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		Number(id!),
	);
	console.log("taskid>>",data?.tasks);
	const openModalHandler = () => {
		if (role === 'superadmin') {
			navigate(`../goal-details/${id}`);
		} else {
			setIsModalOpen(true);
		}
	};
	return (
		<div className='col-md-4'>
			<Card stretch onClick={openModalHandler} className='cursor-pointer'>
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
							{showMore ? `${attributes}` : `${attributes.substring(0, 100)}`}
							{attributes.length > 50 && (
								<span aria-hidden='true' onClick={(e) => {e.stopPropagation(); setShowMore(!showMore)}}>
									...
								</span>
							)}
							{/* <p className='text-muted'>{attributes}</p> */}
						</div>
					</div>
					<div className='row'>
						<div className='col-md-12'>
							{0}%
							<Progress isAutoColor value={0} height={10} />
						</div>
					</div>
					<p className='mt-2 mb-0'>Number of task:  {data?.tasks.length}</p>
					{/* <div className='row mt-2 mb-0'>
					</div> */}
				</CardBody>
			</Card>
			{isModalOpen ? (
				<GoalViewPopup isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} id={id} />
			) : null}
		</div>
	);
};
export default Item;
