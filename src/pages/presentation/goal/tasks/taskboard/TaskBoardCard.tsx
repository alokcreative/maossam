import React, { FC, useState } from 'react';
import { useFormik } from 'formik';
import classNames from 'classnames';
import useDarkMode from '../../../../../hooks/useDarkMode';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../../../components/bootstrap/Card';
import Avatar from '../../../../../components/Avatar';
import Icon from '../../../../../components/icon/Icon';
import Badge from '../../../../../components/bootstrap/Badge';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../../../components/bootstrap/Modal';
import FormGroup from '../../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../../components/bootstrap/forms/Input';
import Textarea from '../../../../../components/bootstrap/forms/Textarea';
import Button from '../../../../../components/bootstrap/Button';
import Checks, { ChecksGroup } from '../../../../../components/bootstrap/forms/Checks';
import Chat, { ChatGroup } from '../../../../../components/Chat';
import CHATS from '../../../../../common/data/chatDummyData';
import InputGroup from '../../../../../components/bootstrap/forms/InputGroup';
import Select from '../../../../../components/bootstrap/forms/Select';
import Option from '../../../../../components/bootstrap/Option';
import USERS from '../../../../../common/data/userDummyData';
import TAGS from '../../../../../common/data/boardTagsData';
import { TCard, TCards, TColumnsData } from '../../../project-management/type/types';
import { move } from '../../../project-management/helper/helper';
import CommonDashboardUserIssue from '../../../dashboard/common/CommonDashboardUserIssue';
import { ISubTask } from '../../../../../common/data/dummyGoals';
import MiniTasks from './MiniTasks';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../../../components/bootstrap/Dropdown';
import {
	useDeleteSubTaskMutation,
	useGetSubTaskMutation,
	useUpdateSubTaskMutation,
} from '../../../../../features/auth/taskManagementApiSlice';
import ConfirmationModal from '../../../../documentation/components/ConfirmationModal';
import AddSubtaskModal from '../subtaskHelper/AddSubtaskModal';
import { useParams } from 'react-router-dom';

interface IColumnCard {
	columnKey: string;
	columnsData: TColumnsData;
	card: any;
	cardsData: any;
	setCardsData(...args: unknown[]): unknown;
	refetch(...args: unknown[]): unknown;
	index: number;
}
const TaskBoardCard: FC<IColumnCard> = ({
	columnKey,
	columnsData,
	card,
	cardsData,
	setCardsData,
	index,
	refetch,
}) => {
	const { taskId: id } = useParams();
	const { darkModeStatus } = useDarkMode();
	const [showMore, setShowMore] = useState<boolean>(false);
	const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
	const [modalStatus, setModalStatus] = useState(false);
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [deleteId, setDeleteId] = useState<number>();
	const [updateSubTask] = useUpdateSubTaskMutation();
	const [deleteSubTask] = useDeleteSubTaskMutation();
	const [modalState, setModalState] = useState('Edit Sub Task');
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [getSubtask] = useGetSubTaskMutation();
	const [currTask, setCurrTask] = useState();

	const formik = useFormik({
		initialValues: {
			cardName: card.name || '',
			groupId: columnKey || '',
			description: card.description || '',
			// assignee: card.user.email || '',
			task:
				(card.miniTasks &&
					card.miniTasks.filter((f: any) => f.status).map((m: any) => m.id.toString())) ||
				[],
		},
		onSubmit: (values) => {
			const RESULT = move(
				cardsData[columnKey],
				cardsData[formik.values.groupId],
				{
					index,
					droppableId: columnKey,
				},
				{ index: 0, droppableId: values.groupId },
			);
			setCardsData({ ...cardsData, ...RESULT });
			setEditModalStatus(false);
		},
	});
	const handleDeleteAction = () => {
		const subId = deleteId;
		setShowConfirmation(false);
		if (subId) {
			deleteSubTask(subId)
				.unwrap()
				.then((res: unknown) => {
					refetch();
				});
		}
	};
	const handleEdit = () => {
		getSubtask(cardsData?.id)
			.unwrap()
			.then((res) => {
				setCurrTask(res);
			});
		setModalState(`Edit Sub Task`);
		setIsOpen(true);
	};

	return (
		<>
			<CardHeader>
				<CardLabel>
					<CardTitle
						tag='div'
						className={classNames('h6', 'cursor-pointer', {
							'link-dark': !darkModeStatus,
							'link-light': darkModeStatus,
						})}
						onClick={() => setEditModalStatus(true)}
						data-tour={card.title}>
						{card.title}
					</CardTitle>
					{card.title && <CardSubTitle className='text-muted'>{card.title}</CardSubTitle>}
				</CardLabel>
				<CardActions>
					<Dropdown>
						<DropdownToggle hasIcon={false}>
							<Button
								icon='MoreVert'
								color={darkModeStatus ? 'dark' : undefined}
								aria-label='More actions'
							/>
						</DropdownToggle>
						<DropdownMenu isAlignmentEnd>
							<DropdownItem>
								<Button icon='Edit' onClick={handleEdit}>Edit</Button>
							</DropdownItem>
							<DropdownItem isDivider />
							<DropdownItem>
								<Button
									icon='Delete'
									onClick={() => {
										setShowConfirmation(true);
										setDeleteId(card.id);
									}}>
									Delete
								</Button>
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</CardActions>
			</CardHeader>
			<CardBody className='pt-0'>
				{/* <div className='row g-2 mb-3'> */}
				{/* {!!card?.attachments?.length && (
						<div className='col-auto'>
							<small className='border border-info border-2 text-info fw-bold px-2 py-1 rounded-1'>
								<Icon icon='AttachFile' className='me-1' />
								{card.attachments.length}
							</small>
						</div>
					)} */}
				{/* {!!card?.tasks?.length && (
						<div className='col-auto'>
							<small className='border border-info border-2 text-info fw-bold px-2 py-1 rounded-1'>
								<Icon icon='TaskAlt' className='me-1' />
								{card.tasks.length}
							</small>
						</div>
					)} */}
				{/* {card.label && (
						<div className='col-auto'>
							<small className='border border-success border-2 text-success fw-bold px-2 py-1 rounded-1'>
								{card.label}
							</small>
						</div>
					)} */}
				{/* </div> */}
				{/* {card.img && (
					<img
						src={card.img}
						className={classNames('img-fluid rounded mb-3 mt-1', {
							'bg-lo25-primary': darkModeStatus,
							'bg-l25-primary': !darkModeStatus,
						})}
						alt={card.title}
					/>
				)} */}
				{/* {card.description} */}
				<p className='mb-1'>{card.expectedTime}</p>
				<p>{showMore ? `${card.description}` : `${card.description.substring(0, 100)}`}</p>
				<Button className='p-0' onClick={() => setShowMore(!showMore)}>
					{showMore ? 'Show less' : 'Show more'}
				</Button>
			</CardBody>
			{/* {card.tags && (
				<CardFooter className='pt-0' size='sm'>
					<CardFooterLeft>
						{card.tags.map((tag) => (
							<Badge key={tag.id} color={tag.color} isLight>
								{tag.title}
							</Badge>
						))}
					</CardFooterLeft>
				</CardFooter>
			)} */}

			<Modal
				setIsOpen={setEditModalStatus}
				isOpen={editModalStatus}
				size='lg'
				isScrollable
				isStaticBackdrop
				data-tour='mail-app-modal'>
				<ModalHeader
					className='px-4'
					setIsOpen={setEditModalStatus}
					style={{ filter: modalStatus ? 'blur(1px)' : 'none' }}>
					<ModalTitle id='project-edit'>{card.name}</ModalTitle>
				</ModalHeader>
				<ModalBody className='px-4' style={{ filter: modalStatus ? 'blur(1px)' : 'none' }}>
					<MiniTasks
						subTaskId={card.id}
						modalStatus={modalStatus}
						setModalStatus={setModalStatus}
					/>
				</ModalBody>
				<ModalFooter
					className='px-4 pb-4'
					style={{ filter: modalStatus ? 'blur(1px)' : 'none' }}>
					<Button
						color='primary'
						className='w-100'
						type='submit'
						onClick={() => {
							formik.handleSubmit();
							setEditModalStatus(false);
						}}>
						Save
					</Button>
				</ModalFooter>
			</Modal>
			<ConfirmationModal
				isOpen={showConfirmation}
				setIsOpen={() => setShowConfirmation(false)}
				onConfirm={handleDeleteAction}
			/>
			<AddSubtaskModal
				setIsOpen={setIsOpen}
				id={id}
				refetch={refetch}
				isOpen={isOpen}
				handleCloseClick={()=>setIsOpen(false)}
				modalState={modalState}
				currTask={currTask}
			/>
		</>
	);
};

export default TaskBoardCard;
