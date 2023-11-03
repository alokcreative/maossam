import React, { ChangeEvent, FC, HtmlHTMLAttributes, useEffect, useState } from 'react';
import { Calendar as DatePicker } from 'react-date-range';
import { useFormik } from 'formik';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
	useCreateSubTaskwithFAQMutation,
	useDeleteFAQMutation,
	useUpdateFAQMutation,
	useUpdateSubTaskMutation,
} from '../../../../../features/auth/taskManagementApiSlice';
import { pagesMenu } from '../../../../../menu';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../../../components/bootstrap/Modal';
import { CardFooterLeft, CardFooterRight } from '../../../../../components/bootstrap/Card';
import Button from '../../../../../components/bootstrap/Button';
import FormGroup from '../../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../../components/bootstrap/forms/Input';
import Label from '../../../../../components/bootstrap/forms/Label';
import showNotification from '../../../../../components/extras/showNotification';
import Icon from '../../../../../components/icon/Icon';

interface IAddSubtaskProps {
	setIsOpen(...args: unknown[]): unknown;
	id: string | undefined;
	refetch(...args: unknown[]): unknown;
	isOpen: boolean;
	handleCloseClick(...args: unknown[]): unknown;
	modalState: string;
	// eslint-disable-next-line react/require-default-props
	currTask?: ITaskProps;
}
interface IFaq {
	id?: string;
	question: string;
	answer: string;
}

interface ITaskProps {
	description: string;
	due_date: string;
	expected_time: string;
	id: string;
	scheduled_on: string;
	status: string;
	task: string;
	title: string;
	intro?: string;
	updated_at: string;
	user_assigned?: string;
	faqs?: IFaq[];
	subtask?: any;
	subtask_faqs?: any;
}
const AddSubtaskModal: FC<IAddSubtaskProps> = ({
	setIsOpen,
	id,
	refetch,
	isOpen,
	handleCloseClick,
	modalState,
	currTask: task,
}) => {
	const [createSubTaskwithFAQ] = useCreateSubTaskwithFAQMutation();
	const [updateSubTask] = useUpdateSubTaskMutation();
	const [deleteFAQ] = useDeleteFAQMutation();
	const [updateFAQ] = useUpdateFAQMutation();
	const navigate = useNavigate();
	const [faqs, setFaqs] = useState<IFaq[]>([{ question: '', answer: '' }]);
	const [date, setDate] = useState<Date>(new Date());
	const role = localStorage.getItem('role');
	const formik = useFormik({
		initialValues: {
			name: '',
			description: '',
			intro:'',
			question: '',
			answer: '',
			expected_time: '',
			due_date: '',
		},
		validate: (values) => {
			const errors: {
				name?: string;
				description?: string;
				expected_time?: string;
				question?: string;
				intro?: string;
				answer?: string;
				due_date?: string;
			} = {};
			if (!values.name) {
				errors.name = 'Required';
			}
			if (!values.description) {
				errors.description = 'Required';
			}
			if (!values.intro) {
				errors.intro = 'Required';
			}
			if (role != 'superadmin') {
				if (!values.expected_time) {
					errors.expected_time = 'Required';
				}
			}

			return errors;
		},
		validateOnChange: false,
		onSubmit: (values) => {
			setIsOpen(false);
			if (modalState === 'Add Sub Task') {
				if (role == 'superadmin') {
					createSubTaskwithFAQ({
						task_id: String(id),
						title: values.name,
						description: values.description,
						intro: values.intro,
						faq_data: faqs,
					})
						.unwrap()
						.then((res) => {
							// console.log('Subtask Created', res);
							refetch();
						})
						.catch((res) => {
							// toast("All fields required");
							refetch();
						});
				} else {
					createSubTaskwithFAQ({
						task_id: String(id),
						title: values.name,
						description: values.description,
						intro: values.intro,
						due_date: String(format(date, 'MM/dd/yyyy')),
						expected_time: values.expected_time,
						faq_data: faqs,
					})
						.unwrap()
						.then((res) => {
							// console.log('Subtask Created', res);
							refetch();
						})
						.catch((res) => {
							// toast("All fields required");
							refetch();
						});
				}
			} else if (modalState === 'Edit Sub Task') {
				if (role == 'superadmin') {
					const taskData = {
						description: values.description,
						title: values.name,
						intro: values.intro,
					};

					const subtaskId = String(task?.subtask.id);

					updateSubTask({ subtaskId, taskData })
						.unwrap()
						.then((res) => {
							showNotification(
								<span className='d-flex align-items-center'>
									<Icon icon='Info' size='lg' className='me-1' />
									<span>Task updated sucessfully</span>
								</span>,
								``,
							);
							refetch();
						})
						.catch((res) => {
							showNotification(
								<span className='d-flex align-items-center'>
									<Icon icon='Info' size='lg' className='me-1' />
									<span>Something went wrong</span>
								</span>,
								``,
							);
						});
				} else {
					const parts = values.expected_time.split(':');
					const timeWithoutSeconds = `${parts[0]}:${parts[1]}`;
					const taskData = {
						expected_time: timeWithoutSeconds,
						due_date: String(format(date, 'MM/dd/yyyy')),
						description: values.description,
						title: values.name,
						intro: values.intro,
					};

					const subtaskId = String(task?.subtask.id);

					updateSubTask({ subtaskId, taskData })
						.unwrap()
						.then((res) => {
							showNotification(
								<span className='d-flex align-items-center'>
									<Icon icon='Info' size='lg' className='me-1' />
									<span>Task updated sucessfully</span>
								</span>,
								``,
							);
							refetch();
						})
						.catch((res) => {
							showNotification(
								<span className='d-flex align-items-center'>
									<Icon icon='Info' size='lg' className='me-1' />
									<span>Something went wrong</span>
								</span>,
								``,
							);
						});
				}
			}
			navigate(`../${pagesMenu.subTasks.path}/${id}`);
		},
	});
	useEffect(() => {
		if (modalState === 'Add Sub Task') {
			setDate(new Date());
			formik.setFieldValue('name', '');
			formik.setFieldValue('description', '');
			formik.setFieldValue('dueDate', '');
			formik.setFieldValue('category', '');
			formik.setFieldValue('status', '');
			formik.setFieldValue('expected_time', '');
			formik.setFieldValue('intro', '');
			setFaqs([]);
		} else if (modalState === 'Edit Sub Task' && task) {
			setFaqs([{ question: '', answer: '' }]);
			formik.setFieldValue('name', task?.subtask?.title || task?.title);
			formik.setFieldValue('description', task?.subtask?.description || task?.description);
			formik.setFieldValue('sub_id', task?.subtask?.id || task?.id);
			formik.setFieldValue('intro', task?.subtask?.intro || task?.intro);
			formik.setFieldValue(
				'expected_time',
				task?.subtask?.expected_time || task?.expected_time,
			);

			setFaqs(task?.subtask_faqs || task?.faqs);
			if (task) {
				const dueDateObject = new Date(task?.subtask?.due_date || task?.due_date);
				setDate(dueDateObject);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modalState, handleCloseClick]);
	const handleAddFAQ = () => {
		if (faqs[faqs.length - 1]?.question !== '' && faqs[faqs.length - 1]?.answer !== '') {
			setFaqs([...faqs, { question: '', answer: '' }]);
		} else if (faqs.length === 0) {
			setFaqs([...faqs, { question: '', answer: '' }]);
		}
	};

	const handleFAQChange = (index: number, field: string, value: string) => {
		formik.setFieldValue(`faqs[${index}].${field}`, value);
	};
	const handleQuestionChange = (index: number, value: any) => {
		const updatedFaqs: IFaq[] = [...faqs];
		updatedFaqs[index] = { ...updatedFaqs[index], question: value };
		setFaqs(updatedFaqs);
		handleFAQChange(index, 'question', value);
	};

	const handleAnswerChange = (index: number, value: string) => {
		const updatedFaqs = [...faqs];
		updatedFaqs[index] = { ...updatedFaqs[index], answer: value };
		setFaqs(updatedFaqs);
		handleFAQChange(index, 'answer', value);
	};

	const handleDeleteFAQ = (index: number, _index: number) => {
		if (modalState === 'Edit Sub Task') {
			deleteFAQ(index)
				.unwrap()
				.then((res: unknown) => {
					// refetch();
					const updatedFaqs = [...faqs];
					updatedFaqs.splice(_index, 1);
					setFaqs(updatedFaqs);
				})
				.catch((res: unknown) => {});
		} else if (modalState === 'Add Sub Task') {
			const updatedFaqs = [...faqs];
			updatedFaqs.splice(_index, 1);
			setFaqs(updatedFaqs);
		}
	};
	const handleHandleUpdate = (index: number, _index: number) => {
		const updatedFaqs = [...faqs];
		const faq = {
			question: updatedFaqs[_index].question,
			answer: updatedFaqs[_index].answer,
		};
		updateFAQ({ index, faq })
			.unwrap()
			.then((res) => {
				showNotification(
					<span className='d-flex align-items-center'>
						<Icon icon='Info' size='lg' className='me-1' />
						<span>Updated Successfully</span>
					</span>,
					``,
				);
				updatedFaqs.splice(index, 1);
				setFaqs(updatedFaqs);
			})
			.catch((res) => {});
	};
	const handledescription = (value: any) => {
		formik.setFieldValue('description', value);
	};
	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='lg' isStaticBackdrop>
			<ModalHeader setIsOpen={handleCloseClick} className='p-4'>
				<ModalTitle id='new_task'>{modalState}</ModalTitle>
			</ModalHeader>
			<>
				<ModalBody className='px-4'>
					<div className='row g-4'>
						<div className='col-12 border-bottom' />
						<div className={role != 'superadmin' ? 'col-lg-6' : 'col-lg-12'}>
							<FormGroup id='name' label='Name'>
								<Input
									type='text'
									onChange={formik.handleChange}
									value={formik.values.name}
									isValid={formik.isValid}
									isTouched={formik.touched.name}
									invalidFeedback={formik.errors.name}
									onFocus={() => {
										formik.setErrors({});
									}}
								/>
							</FormGroup>
							<FormGroup id='intro' label='Introduction' className='mt-2'>
								<Input
									type='text'
									onChange={formik.handleChange}
									value={formik.values.intro}
									isValid={formik.isValid}
									isTouched={formik.touched.intro}
									invalidFeedback={formik.errors.intro}
									onFocus={() => {
										formik.setErrors({});
									}}
								/>
							</FormGroup>
							<FormGroup id='description' label='Description' className='mt-3'>
								<ReactQuill
									theme='snow'
									value={formik.values.description}
									onChange={(value) => handledescription(value)}
								/>
								{/* <Input
									type='text'
									onChange={formik.handleChange}
									value={formik.values.description}
									isValid={formik.isValid}
									isTouched={formik.touched.description}
									invalidFeedback={formik.errors.description}
									onFocus={() => {
										formik.setErrors({});
									}}
								/> */}
							</FormGroup>
							{role != 'superadmin' && (
								<FormGroup
									id='expected_time'
									label='Expected Time'
									className='mt-3'>
									<Input
										type='time'
										onChange={formik.handleChange}
										value={formik.values.expected_time}
										isValid={formik.isValid}
										isTouched={formik.touched.expected_time}
										invalidFeedback={formik.errors.expected_time}
										onFocus={() => {
											formik.setErrors({});
										}}
									/>
								</FormGroup>
							)}
						</div>
						{role != 'superadmin' && (
							<div className='col-6'>
								<div>
									{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
									<Label>Due Date</Label>
								</div>
								<div className='text-center mt-n4'>
									<DatePicker
										onChange={(item) => setDate(item)}
										date={date || task?.subtask?.due_date}
										minDate={new Date()}
										color={process.env.REACT_APP_PRIMARY_COLOR}
										shownDate={date}
									/>
								</div>
							</div>
						)}

						{faqs &&
							faqs?.map((faq, index) => {
								return (
									<>
										<div key={Number(index)} className='col-lg-12 d-flex'>
											<FormGroup
												id={`question-${index}`}
												label={`Question ${index + 1}`}
												className='col-lg-6 mx-1'>
												{/* <Textarea
													onChange={(
														e: ChangeEvent<HTMLTextAreaElement>,
													) => {
														handleQuestionChange(index, e.target.value);
													}}
													value={faq.question}
												/> */}
												<ReactQuill
													theme='snow'
													value={faq.question}
													onChange={(value) => {
														handleQuestionChange(index, value);
													}}
												/>
											</FormGroup>
											<FormGroup
												id={`answer-${index}`}
												label={`Answer ${index + 1}`}
												className='col-lg-6 mx-1'>
												{/* <Textarea
													onChange={(
														e: ChangeEvent<HTMLTextAreaElement>,
													) => handleAnswerChange(index, e.target.value)}
													value={faq.answer}
												/> */}
												<ReactQuill
													theme='snow'
													value={faq.answer}
													onChange={(value) => {
														handleAnswerChange(index, value);
													}}
												/>
											</FormGroup>
										</div>
										{modalState === 'Edit Sub Task' && (
											<Button
												color='success'
												className='col-lg-1 mx-2'
												onClick={() => {
													handleHandleUpdate(Number(faq.id!), index);
												}}>
												Update
											</Button>
										)}
										<Button
											color='danger'
											className='col-lg-1 mx-2'
											onClick={() => {
												handleDeleteFAQ(Number(faq.id!), index);
											}}>
											Delete
										</Button>
									</>
								);
							})}
					</div>
				</ModalBody>
				<ModalFooter>
					<CardFooterRight>
						{modalState === 'Add Sub Task' && (
							<Button
								color='success'
								isLight
								icon='Add'
								onClick={() => {
									handleAddFAQ();
								}}>
								Add FAQ
							</Button>
						)}
					</CardFooterRight>
				</ModalFooter>
				<ModalFooter>
					<CardFooterLeft>
						<Button color='info' onClick={formik.handleSubmit}>
							{modalState === 'Edit Sub Task' ? 'Update' : 'Save'}
						</Button>
					</CardFooterLeft>
					<CardFooterRight>
						<Button
							color='danger'
							onClick={() => {
								setIsOpen(false);
							}}>
							Cancel
						</Button>
					</CardFooterRight>
				</ModalFooter>
			</>
		</Modal>
	);
};

export default AddSubtaskModal;
