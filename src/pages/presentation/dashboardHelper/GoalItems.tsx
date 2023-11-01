import React, { FC, ReactNode, useCallback, useState } from 'react';
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
import GoalViewPopup from '../goal/goalHelpher/GoalViewPopup';
import { useGetTaskByGoalIdQuery } from '../../../features/auth/taskManagementApiSlice';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import Button from '../../../components/bootstrap/Button';
import { useTranslation } from 'react-i18next';
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';
import { useEffectOnce } from 'react-use';

interface IItemProps {
	id: number;
	name: string;
	attributes: string;
	timeline: string;
	created_by: string;
	handleDelete(...args: unknown[]): unknown;
	handleEdit(...args: unknown[]): unknown;
	handleView(...args: unknown[]): unknown;
	parent: string;
	task_count: string;
}
const Item: FC<IItemProps> = ({
	name,
	attributes,
	timeline,
	id,
	created_by,
	handleDelete,
	handleEdit,
	handleView,
	parent,
	task_count,
}) => {
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showMore, setShowMore] = useState<boolean>(false);
	const role = localStorage.getItem('role');
	const logUserId = localStorage.getItem('UserId');

	const { themeStatus, darkModeStatus } = useDarkMode();
	const { t } = useTranslation(['translation', 'menu']);
	const { data, refetch } = useGetTaskByGoalIdQuery(
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		Number(id!),
	);
	useEffectOnce(() => {
		refetch();
	});
	const openModalHandler = () => {
		if (role === 'superadmin') {
			navigate(`../goal-details/${id}`);
		} else {
			setIsModalOpen(true);
		}
	};
	const deleteHandler = (id1: number) => {
		handleDelete(id1);
	};

	const viewHandler = (id1: number) => {
		if (role === 'superadmin') {
			handleView(id1);
		} else {
			setIsModalOpen(true);
		}
	};
	const editHandler = (id1: number) => {
		handleEdit(id1);
	};
	return (
		<div className='col-md-4'>
			<Card stretch className='cursor-pointer'>
				<CardHeader>
					<CardLabel onClick={openModalHandler}>
						<CardTitle>{name}</CardTitle>
					</CardLabel>
					{(logUserId == created_by || role == 'superadmin') && (
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
										<Button icon='FileCopy' onClick={() => viewHandler(id)}>
											Details
										</Button>
									</DropdownItem>
									{parent !== 'dashboard' && (
										<>
											<DropdownItem isDivider />
											<DropdownItem>
												<Button icon='Edit' onClick={() => editHandler(id)}>
													Edit
												</Button>
											</DropdownItem>
											<DropdownItem>
												<Button
													icon='Delete'
													onClick={() => deleteHandler(id)}>
													Delete
												</Button>
											</DropdownItem>
										</>
									)}
								</DropdownMenu>
							</Dropdown>
						</CardActions>
					)}
				</CardHeader>
				<CardBody onClick={openModalHandler}>
					<div className='row g-2 mb-3'>
						<div className='col-auto'>
							<p className='h6 fw-bold'>Description:</p>
						</div>
						<div className='col-12'>
							{showMore ? `${attributes}` : `${attributes.substring(0, 100)}`}
							{attributes.length > 30 && (
								<span
									aria-hidden='true'
									onClick={(e) => {
										e.stopPropagation();
										setShowMore(!showMore);
									}}>
									...
								</span>
							)}
							{/* <p className='text-muted'>{attributes}</p> */}
						</div>
					</div>
					<p className='mt-3 mb-1'>No. of task: {task_count}</p>
					<div className='row'>
						<div className='col-md-12'>
							{0}%
							<Progress isAutoColor value={0} height={10} />
						</div>
					</div>

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
