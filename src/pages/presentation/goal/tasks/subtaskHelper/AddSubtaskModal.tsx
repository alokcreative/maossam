import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { ITask } from '../../../../../common/data/dummyGoals';
import { Calendar as DatePicker } from 'react-date-range';
import { useFormik } from 'formik';
import {
	useCreateSubTaskwithFAQMutation,
	useUpdateSubTaskMutation,
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
	// id: string;
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
	const [updatedSubTask] = useUpdateSubTaskMutation();

	const navigate = useNavigate();
	const [faqs, setFaqs] = useState<IFaq[]>([{ question: '', answer: '' }]);
	const [date, setDate] = useState<Date>(new Date());
	useEffect(() => {
		if (modalState === 'Add Sub Task') {
			setDate(new Date());
			formik.setFieldValue('name', '');
			formik.setFieldValue('description', '');
			formik.setFieldValue('dueDate', '');
			formik.setFieldValue('category', '');
			formik.setFieldValue('status', '');
			formik.setFieldValue('expected_time', '');
		} else if (modalState === 'Edit Sub Task') {
			console.log('currTask>>>>>>>>>', task);
			formik.setFieldValue('name', task?.title);
			formik.setFieldValue('description', task?.description);
			formik.setFieldValue('sub_id', task?.id);
			formik.setFieldValue('expected_time', task?.expected_time);

			if (task?.due_date) {
				const dueDateObject = new Date(task?.due_date);
				setDate(dueDateObject);
			}
			setFaqs(task?.faqs!);
		}
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
			console.log('values.question', values);
			createSubTaskwithFAQ({
				task_id: String(id),
				title: values.name,
				description: values.description,
				due_date: format(date, 'MM/dd/yyyy'),
				expected_time: values.expected_time,
				faq_data: faqs,
			})
				.unwrap()
				.then((res) => {
					// console.log('Subtask Created', res);
					refetch();
				})
				.catch((res) => {
					console.log('res', res);
				});
			navigate(`../${pagesMenu.subTasks.path}/${id}`);
		},
	});

	const handleAddFAQ = () => {
		// const newId = generateUniqueId();
		setFaqs([...faqs, { question: '', answer: '' }]);
	};
	const handleFAQChange = (index: number, field: string, value: string) => {
		formik.setFieldValue(`faqs[${index}].${field}`, value);
	};
	const handleQuestionChange = (index: number, value: string) => {
		const updatedFaqs = [...faqs];
		updatedFaqs[index].question = value;
		setFaqs(updatedFaqs);
		handleFAQChange(index, 'question', value);
	};

	const handleAnswerChange = (index: number, value: string) => {
		const updatedFaqs = [...faqs];
		updatedFaqs[index].answer = value;
		setFaqs(updatedFaqs);
		handleFAQChange(index, 'answer', value);
	};
	const handleDeleteFAQ = (index: number) => {
		const updatedFaqs = [...faqs];
		updatedFaqs.splice(index, 1);
		setFaqs(updatedFaqs);
	};
	// function generateUniqueId() {
	// 	const newId = faqs && faqs.length + 1; 
	// 	return newId;
	// }

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='lg'>
			<ModalHeader setIsOpen={handleCloseClick} className='p-4'>
				<ModalTitle id='new_task'>{modalState}</ModalTitle>
			</ModalHeader>
			<>
				<ModalBody className='px-4'>
					<div className='row g-4'>
						<div className='col-12 border-bottom' />
						<FormGroup id='name' label='Name' className='col-lg-6'>
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
						<FormGroup id='description' label='Description' className='col-lg-6'>
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
						{/* <FormGroup id='dueDate' label='Due Date' className='col-lg-6'>
							<Input
								type='date'
								onChange={formik.handleChange}
								value={formik.values.dueDate}
							/>
						</FormGroup> */}
						<div className='col-6'>
							<div>
								{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
								<Label>Due Date</Label>
							</div>
							<div className='text-center mt-n4'>
								<DatePicker
									onChange={(item) => setDate(item)}
									date={date}
									minDate={new Date()}
									color={process.env.REACT_APP_PRIMARY_COLOR}
									shownDate={date}
								/>
							</div>
						</div>
						<FormGroup id='expected_time' label='Expected Time' className='col-lg-6'>
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
						{faqs &&
							faqs?.map((faq, index) => (
								<>
									<div key={Number(index)} className='col-lg-12 d-flex'>
										<FormGroup
											id={`question-${index}`}
											label={`Question ${index + 1}`}
											className='col-lg-6 mx-1'>
											<Textarea
												// type='text'
												onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
													handleQuestionChange(index, e.target.value)
												}
												value={faq.question}
											/>
										</FormGroup>
										<FormGroup
											id={`answer-${index}`}
											label={`Answer ${index + 1}`}
											className='col-lg-6 mx-1'>
											<Textarea
												// type='text'
												onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
													handleAnswerChange(index, e.target.value)
												}
												value={faq.answer}
											/>
										</FormGroup>
									</div>

									<Button
										color='danger'
										className='col-lg-1 mx-2'
										onClick={() => {
											handleDeleteFAQ(index);
										}}>
										Delete
									</Button>
								</>
							))}
					</div>
				</ModalBody>
				<ModalFooter>
					<CardFooterRight>
						<Button
							color='success'
							isLight
							icon='Add'
							onClick={() => {
								handleAddFAQ();
							}}>
							Add FAQ
						</Button>
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
