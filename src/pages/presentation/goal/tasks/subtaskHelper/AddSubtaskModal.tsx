import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { ITask } from '../../../../../common/data/dummyGoals';
import { Calendar as DatePicker } from 'react-date-range';
import { useFormik } from 'formik';
import {
	useCreateSubTaskwithFAQMutation,
	useDeleteFAQMutation,
	useUpdateFAQMutation,
	useUpdateSubTaskMutation,
	useCreateSubTaskMutation,
} from '../../../../../features/auth/taskManagementApiSlice';
import { pagesMenu } from '../../../../../menu';
import { useNavigate } from 'react-router-dom';
import { format, parse } from 'date-fns';
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
import Textarea from '../../../../../components/bootstrap/forms/Textarea';
import Label from '../../../../../components/bootstrap/forms/Label';
import { toast } from 'react-toastify';

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
	updated_at: string;
	user_assigned: string;
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
	const [createSubTask] = useCreateSubTaskMutation();
	const [updateSubTask] = useUpdateSubTaskMutation();
	const [deleteFAQ] = useDeleteFAQMutation();
	const [updateFAQ] = useUpdateFAQMutation();
	console.log('modals>>', modalState);
	const navigate = useNavigate();
	const [faqs, setFaqs] = useState<IFaq[]>([{ question: '', answer: '' }]);
	const [date, setDate] = useState<Date>(new Date());

	useEffect(() => {
		if (modalState === 'Add Sub Task') {
			setDate(new Date());
			setFaqs([{ question: '', answer: '' }]);
			formik.setFieldValue('name', '');
			formik.setFieldValue('description', '');
			formik.setFieldValue('dueDate', '');
			formik.setFieldValue('category', '');
			formik.setFieldValue('status', '');
			formik.setFieldValue('expected_time', '');
		} else if (modalState === 'Edit Sub Task') {
			setFaqs([{ question: '', answer: '' }]);
			formik.setFieldValue('name', task?.subtask?.title);
			formik.setFieldValue('description', task?.subtask?.description);
			formik.setFieldValue('sub_id', task?.subtask?.id);
			formik.setFieldValue('expected_time', task?.subtask?.expected_time);

			if (task) {
				const dueDateObject = new Date(task?.subtask?.due_date);
				setDate(dueDateObject);
				console.log('dueDateObject>>', dueDateObject);
			}
			// eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
			setFaqs(task?.subtask_faqs!);
		}
		// eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
		// setFaqs(task?.subtask_faqs!);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modalState, handleCloseClick]);
	const formik = useFormik({
		initialValues: {
			name: '',
			description: '',
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
				answer?: string;
				due_date?: string;
			} = {};
			if (!values.name) {
				errors.name = 'Required';
			}
			if (!values.description) {
				errors.description = 'Required';
			}
			if (!values.expected_time) {
				errors.expected_time = 'Required';
			}

			// if (!values.question) {
			// 	errors.question = 'Required';
			// }

			// // if (!values.due_date) {
			// // 	errors.due_date = 'Required';
			// // }
			// if (!values.answer) {
			// 	errors.answer = 'Required';
			// }

			return errors;
		},
		validateOnChange: false,
		onSubmit: (values) => {
			setIsOpen(false);
			if (modalState === 'Add Sub Task') {
				createSubTaskwithFAQ({
					task_id: String(id),
					title: values.name,
					description: values.description,
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
			} else if (modalState === 'Edit Sub Task') {
				const parts = values.expected_time.split(':');
				const timeWithoutSeconds = `${parts[0]}:${parts[1]}`;
				const taskData = {
					expected_time: timeWithoutSeconds,
					due_date: String(format(date, 'MM/dd/yyyy')),
					description: values.description,
					title: values.name,
				};
				updateSubTask({ subtaskId: String(task?.subtask.id), taskData })
					.unwrap()
					.then((res) => {
						toast(`Task updated sucessfully`);
						refetch();
					})
					.catch((res) => {
						toast(`Something went wrong`);
					});
			}
			navigate(`../${pagesMenu.subTasks.path}/${id}`);
		},
	});

	const handleAddFAQ = () => {
		if (faqs[faqs.length - 1]?.question !== '' && faqs[faqs.length - 1]?.answer !== '') {
			setFaqs([...faqs, { question: '', answer: '' }]);
		} else if (faqs.length === 0) {
			setFaqs([...faqs, { question: '', answer: '' }]);
		} else {
		}
	};

	const handleFAQChange = (index: number, field: string, value: string) => {
		formik.setFieldValue(`faqs[${index}].${field}`, value);
	};
	const handleQuestionChange = (index: number, value: string) => {
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
				toast('Updated Successfully');
				updatedFaqs.splice(index, 1);
				setFaqs(updatedFaqs);
			})
			.catch((res) => {});
	};
	// function generateUniqueId() {
	// 	const newId = faqs && faqs.length + 1;
	// 	return newId;
	// }

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='lg' isStaticBackdrop>
			<ModalHeader setIsOpen={handleCloseClick} className='p-4'>
				<ModalTitle id='new_task'>{modalState}</ModalTitle>
			</ModalHeader>
			<>
				<ModalBody className='px-4'>
					<div className='row g-4'>
						<div className='col-12 border-bottom' />
						<div className='col-lg-6'>
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
							<FormGroup id='description' label='Description' className='mt-3'>
								<Input
									type='text'
									onChange={formik.handleChange}
									value={formik.values.description}
									isValid={formik.isValid}
									isTouched={formik.touched.description}
									invalidFeedback={formik.errors.description}
									onFocus={() => {
										formik.setErrors({});
									}}
								/>
							</FormGroup>
							<FormGroup id='expected_time' label='Expected Time' className='mt-3'>
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
						</div>
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

						{faqs &&
							faqs?.map((faq, index) => {
								return (
									<>
										<div key={Number(index)} className='col-lg-12 d-flex'>
											<FormGroup
												id={`question-${index}`}
												label={`Question ${index + 1}`}
												className='col-lg-6 mx-1'>
												<Textarea
													onChange={(
														e: ChangeEvent<HTMLTextAreaElement>,
													) => {
														handleQuestionChange(index, e.target.value);
													}}
													value={faq.question}
												/>
											</FormGroup>
											<FormGroup
												id={`answer-${index}`}
												label={`Answer ${index + 1}`}
												className='col-lg-6 mx-1'>
												<Textarea
													onChange={(
														e: ChangeEvent<HTMLTextAreaElement>,
													) => handleAnswerChange(index, e.target.value)}
													value={faq.answer}
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
