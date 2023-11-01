import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import dayjs from 'dayjs';
import Checks from '../bootstrap/forms/Checks';
import Badge from '../bootstrap/Badge';
import Button from '../bootstrap/Button';
import Dropdown, { DropdownItem, DropdownMenu, DropdownToggle } from '../bootstrap/Dropdown';
import useDarkMode from '../../hooks/useDarkMode';
import { TColor } from '../../type/color-type';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Role } from '../../common/data/userDummyData';
import {
	useDeleteMinitaskMutation,
	useUpdateMinitaskMutation,
} from '../../features/auth/taskManagementApiSlice';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../bootstrap/Modal';
import FormGroup from '../bootstrap/forms/FormGroup';
import Input from '../bootstrap/forms/Input';
import { useFormik } from 'formik';
import showNotification from './showNotification';
import Icon from '../icon/Icon';
import ConfirmationModal from '../../pages/documentation/components/ConfirmationModal';

/**
 * Prop Types
 * @type {{list: Requireable<(InferPropsInner<Pick<{date: Requireable<object>, badge: Requireable<InferProps<{color: Requireable<string>, text: Requireable<string>}>>, id: Requireable<NonNullable<InferType<Requireable<string>|Requireable<number>>>>, title: Requireable<NonNullable<InferType<Requireable<string>|Requireable<number>>>>, status: Requireable<boolean>}, never>> & Partial<InferPropsInner<Pick<{date: Requireable<object>, badge: Requireable<InferProps<{color: Requireable<string>, text: Requireable<string>}>>, id: Requireable<NonNullable<InferType<Requireable<string>|Requireable<number>>>>, title: Requireable<NonNullable<InferType<Requireable<string>|Requireable<number>>>>, status: Requireable<boolean>}, "date" | "badge" | "id" | "title" | "status">>>)[]>}}
 */
const TodoPropTypes = {
	list: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			status: PropTypes.bool,
			title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			// eslint-disable-next-line react/forbid-prop-types
			date: PropTypes.object,
			badge: PropTypes.shape({
				text: PropTypes.string,
				color: PropTypes.oneOf([
					'primary',
					'secondary',
					'success',
					'info',
					'warning',
					'danger',
					'light',
					'dark',
				]),
			}),
		}),
	),
};

// export interface ITodoListItem {
// 	id?: string | number;
// 	status?: boolean;
// 	title?: string | number;
// 	date?: dayjs.ConfigType;
// 	badge?: {
// 		text?: string;
// 		color?: TColor;
// 	};
// }
export interface ITodoListItem {
	created_by?: string;
	description?: string;
	due_date?: string;
	id: string | number;
	status?: boolean;
	status_name?: string;
	subtask?: string;
	title?: string | number;
	badge?: {
		text?: string;
		color?: TColor;
	};
	date?: dayjs.ConfigType;
}

interface ITodoItemProps {
	list: ITodoListItem[];
	setList(...args: unknown[]): unknown;
	index: number;
	refetch(...args: unknown[]): unknown;
}
export const TodoItem = forwardRef<HTMLDivElement, ITodoItemProps>(
	({ refetch, index, list, setList, ...props }, ref) => {
		const itemData = list[index];
		const [updateMinitask] = useUpdateMinitaskMutation({});
		const [deleteMinitask] = useDeleteMinitaskMutation({});
		const [modalStatus, setModalStatus] = useState<boolean>(false);
		const handleChange = (_index: number, id: number, status: boolean | string) => {
			// console.log('_index>>', _index);
			// console.log('id>>', id);
			// console.log('status>>', status);
			if (status === false) {
				const miniTaskData = {
					status: 'done',
				};
				updateMinitask({ miniTaskId: String(id), miniTaskData })
					.unwrap()
					.then((res) => {
						refetch();
						showNotification(
							<span className='d-flex align-items-center'>
								<Icon icon='Info' size='lg' className='me-1' />
								<span>Status Changed.</span>
							</span>,
							``,
						);
					})
					.catch((res) => {
						// console.log('resc>>1', res);
					});
			} else {
				const miniTaskData = {
					status: 'todo',
				};
				updateMinitask({ miniTaskId: String(id), miniTaskData })
					.unwrap()
					.then((res) => {
						refetch();
						showNotification(
							<span className='d-flex align-items-center'>
								<Icon icon='Info' size='lg' className='me-1' />
								<span>Status Changed.</span>
							</span>,
							``,
						);
					})
					.catch((res) => {
						// console.log('resc>>1', res);
					});
			}

			const newTodos = [...list];
			newTodos[_index].status = !newTodos[_index].status;
			setList(newTodos);
		};
		const logUserId = localStorage.getItem('UserId');
		const role = localStorage.getItem('role');
		const [showConfirmation, setShowConfirmation] = useState(false);
		const [deleteId, setDeleteId] = useState<number>();
		const removeTodo = () => {
			const indextemp = deleteId;
			setShowConfirmation(false);
			const newTodos = [...list];
			deleteMinitask(Number(indextemp))
				.unwrap()
				.then((res) => {
					showNotification(
						<span className='d-flex align-items-center'>
							<Icon icon='Info' size='lg' className='me-1' />
							<span>Deleted Successfully.</span>
						</span>,
						``,
					);
					refetch();
				})
				.catch((res) => {
					// console.log('resCatch', res);
				});
			// newTodos.splice(_index, 1);
			// setList(newTodos);
		};
		const updateTodo = (_index: number | string) => {
			setModalStatus(true);
			// console.log('_index', _index);
			formik.setFieldValue('minitaskTitle', itemData.title);
			formik.setFieldValue('description', itemData.description);
			// const newTodos = [...list];
			// newTodos.splice(_index, 1);
			// setList(newTodos);
		};

		const { themeStatus } = useDarkMode();
		const validate = (values: { minitaskTitle?: string; description?: string }) => {
			const errors: {
				minitaskTitle?: string;
				description?: string;
			} = {};
			if (!values.minitaskTitle) {
				errors.minitaskTitle = 'Required';
			} else if (values.minitaskTitle.length > 40) {
				errors.minitaskTitle = 'Must be 40 characters or less';
			}
			if (!values.description) {
				errors.description = 'Required';
			}
			return errors;
		};
		const formik = useFormik({
			initialValues: {
				minitaskTitle: '',
				description: '',
			},
			validate,
			validateOnChange: false,
			onSubmit: (values, { resetForm }) => {
				const miniTaskData = {
					// subtask_id: String(subTaskId),
					title: values.minitaskTitle,
					description: values.description,
				};
				updateMinitask({ miniTaskId: String(itemData.id), miniTaskData })
					.unwrap()
					.then((res) => {
						showNotification(
							<span className='d-flex align-items-center'>
								<Icon icon='Info' size='lg' className='me-1' />
								<span>Task Updated.</span>
							</span>,
							``,
						);
						refetch();
					})
					.catch((res) => {
					});
				setModalStatus(false);
				resetForm({
					values: {
						minitaskTitle: '',
						description: '',
					},
				});
			},
		});
		return (
			<>
				{/* eslint-disable-next-line react/jsx-props-no-spreading */}
				<div ref={ref} className={classNames('todo-item')} {...props}>
					<div className='todo-bar'>
						<div
							className={classNames('h-100 w-100', 'rounded', {
								[`bg-${itemData?.badge?.color}`]: itemData?.badge,
							})}
						/>
					</div>
					<div className='todo-check'>
						<Checks
							checked={list[index].status}
							onChange={() =>
								handleChange(
									index,
									Number(itemData.id),
									Boolean(list[index].status),
								)
							}
							ariaLabel={itemData.title as string}
						/>
					</div>
					<div className='todo-content'>
						<div
							className={classNames('todo-title', {
								'text-decoration-line-through': list[index].status,
							})}>
							{itemData.title}
						</div>
						{itemData.description && (
							<div className='todo-subtitle text-muted small'>
								{itemData.description}
							</div>
						)}
					</div>
					<div className='todo-extras'>
						{logUserId == itemData.created_by || role == 'superadmin' ? (
							<span>
								<Dropdown>
									<DropdownToggle hasIcon={false}>
										<Button
											color={themeStatus}
											icon='MoreHoriz'
											aria-label='More options'
										/>
									</DropdownToggle>

									<DropdownMenu isAlignmentEnd>
										<DropdownItem>
											<>
												<Button
													onClick={() => {
														setShowConfirmation(true);
														setDeleteId(Number(itemData.id!));
													}}
													icon='Delete'>
													Delete
												</Button>
												<Button
													onClick={() => updateTodo(itemData.id)}
													icon='Edit'>
													Update
												</Button>
											</>
										</DropdownItem>
									</DropdownMenu>
								</Dropdown>
							</span>
						) : null}
					</div>
				</div>
				<Modal
					setIsOpen={setModalStatus}
					isOpen={modalStatus}
					titleId='new-todo-modal'
					isStaticBackdrop
					// style={{
					// 	position: 'fixed',
					// 	top: 0,
					// 	left: 0,
					// 	width: '100%',
					// 	height: '100%',
					// 	background: 'rgba(0, 0, 0, 0.3)',
					// 	display: 'flex',
					// 	justifyContent: 'center',
					// 	alignItems: 'center',
					// 	zIndex: 99999,
					// }}
				>
					<ModalHeader setIsOpen={setModalStatus}>
						<ModalTitle id='new-todo-modal'>Update Mini Task</ModalTitle>
					</ModalHeader>
					<ModalBody>
						<div className='row d-flex align-items-center justify-content-center'>
							<FormGroup id='minitaskTitle' label='Title'>
								<Input
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									isValid={formik.isValid}
									isTouched={formik.touched.minitaskTitle}
									invalidFeedback={formik.errors.minitaskTitle}
									validFeedback='Looks good!'
									value={formik.values.minitaskTitle}
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='description' label='Title'>
								<Input
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									isValid={formik.isValid}
									isTouched={formik.touched.description}
									invalidFeedback={formik.errors.description}
									validFeedback='Looks good!'
									value={formik.values.description}
								/>
							</FormGroup>
						</div>
						<div className='col' />
						<Button
							type='submit'
							color='info'
							className='col-12 mt-4'
							onClick={formik.handleSubmit}>
							Update
						</Button>
					</ModalBody>
				</Modal>
				<ConfirmationModal
					isOpen={showConfirmation}
					setIsOpen={() => setShowConfirmation(false)}
					onConfirm={removeTodo}
				/>
			</>
		);
	},
);
TodoItem.displayName = 'TodoItem';
TodoItem.propTypes = {
	// @ts-ignore
	list: TodoPropTypes.list.isRequired,
	setList: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
};
TodoItem.defaultProps = {};

export interface ITodoProps {
	list: ITodoListItem[];
	className?: string;
	setList(...args: unknown[]): unknown;
	refetch(...args: unknown[]): unknown;
}
const Todo = forwardRef<HTMLDivElement, ITodoProps>(
	({ refetch, className, list, setList, ...props }, ref) => {
		return (
			// eslint-disable-next-line react/jsx-props-no-spreading
			<div ref={ref} className={classNames('todo', className)} {...props}>
				{list.map((i, index) => (
					<TodoItem
						key={i.id}
						index={index}
						list={list}
						setList={setList}
						refetch={refetch}
					/>
				))}
			</div>
		);
	},
);
Todo.displayName = 'Todo';
Todo.propTypes = {
	className: PropTypes.string,
	// @ts-ignore
	list: TodoPropTypes.list.isRequired,
	setList: PropTypes.func.isRequired,
};
Todo.defaultProps = {
	className: undefined,
};

export default Todo;
