import React, { FC, useState } from 'react';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../../../components/bootstrap/Modal';
import FormGroup from '../../../../../components/bootstrap/forms/FormGroup';
import Card, {
	CardBody,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../../components/bootstrap/Card';
import Select from '../../../../../components/bootstrap/forms/Select';
import Input from '../../../../../components/bootstrap/forms/Input';
import DatePicker from 'react-modern-calendar-datepicker';
import Button from '../../../../../components/bootstrap/Button';
import { useFormik } from 'formik';
import Textarea from '../../../../../components/bootstrap/forms/Textarea';

interface IProps {
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
}
const AddNewTaskModal: FC<IProps> = ({ isOpen, setIsOpen }) => {
	// const [isOpen, setIsOpen] = useState<boolean>(false);
	const handleCloseClick = () => {
		setIsOpen(false);
	};
	const role = localStorage?.getItem('role');
	const formik = useFormik({
		initialValues: {
			cardName: '',
			groupId: '',
			description: '',
			assignee: '',
			task: [],
			tags: [],
		},
		onSubmit: (values) => {
			setIsOpen(false);
		},
	});
	return (
		<Modal
			style={{
				position: isOpen ? 'fixed' : '',
				top: isOpen ? 0 : '',
				left: isOpen ? 0 : '',
				width: isOpen ? '100%' : '',
				height: isOpen ? '100%' : '',
				background: isOpen ? 'rgba(0, 0, 0, 0.3)' : '',
				display: isOpen ? 'flex' : '',
				justifyContent: isOpen ? 'center' : '',
				alignItems: isOpen ? 'center' : '',
				zIndex: isOpen ? 9999 : '',
				transition: isOpen ? 'background 0.2s ease' : '',
			}}
			id='sdmsk12'
			setIsOpen={setIsOpen}
			isOpen={isOpen}
			size='lg'
			isScrollable
			isStaticBackdrop>
			<ModalHeader className='px-4' setIsOpen={setIsOpen}>
				<ModalTitle id='project-edit'>New Card</ModalTitle>
			</ModalHeader>
			<ModalBody className='px-4'>
				<div className='row'>
					<div className='col-md-8'>
						<Card shadow='sm'>
							<CardHeader>
								<CardLabel icon='Info' iconColor='success'>
									<CardTitle>Task Information</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='row g-4'>
									<FormGroup className='col-12' id='cardName' label='Task Name'>
										<Input
											onChange={formik.handleChange}
											value={formik.values.cardName}
										/>
									</FormGroup>
									<FormGroup
										className='col-12'
										id='description'
										label='Description'>
										<Textarea
											onChange={formik.handleChange}
											value={formik.values.description}
										/>
									</FormGroup>
								</div>
							</CardBody>
						</Card>
					</div>
					<div className='col-md-4'>
						<div className='row g-4 sticky-top'>
							<FormGroup className='col-12' id='groupId' label='Status'>
								<Select
									ariaLabel='Board select'
									placeholder='Select group'
									onChange={formik.handleChange}
									value={formik.values.groupId}
									list={[
										{ value: '1', text: 'Marketing' },
										{ value: '2', text: 'Marketing' },
									]}
								/>
							</FormGroup>
							<FormGroup className='col-12' id='assignee' label='Assignee'>
								<Select
									ariaLabel='Board select'
									placeholder='Select group'
									onChange={formik.handleChange}
									value={formik.values.assignee}
									list={[
										{ value: '1', text: 'Marketing' },
										{ value: '2', text: 'Marketing' },
									]}
								/>
							</FormGroup>
							<FormGroup className='col-12' id='tags' label='Tags'>
								<Select
									multiple
									ariaLabel='Board select'
									placeholder='Select group'
									onChange={formik.handleChange}
									value={formik.values.tags}
									list={[
										{ value: '1', text: 'Critical' },
										{ value: '2', text: 'Design' },
										{ value: '3', text: 'Code' },
									]}
								/>
							</FormGroup>
						</div>
					</div>
				</div>
			</ModalBody>
			<ModalFooter className='px-4 pb-4'>
				<Button
					color='primary'
					className='w-100'
					type='submit'
					onClick={formik.handleSubmit}>
					Save
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default AddNewTaskModal;
