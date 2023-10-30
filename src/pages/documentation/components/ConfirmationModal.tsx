import React from 'react';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';

interface ConfirmationModalProps {
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
	onConfirm(...args: unknown[]): unknown;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, setIsOpen, onConfirm }) => {
	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen} id='cnfModal' isStaticBackdrop isCentered>
			<ModalHeader setIsOpen={setIsOpen}>
				<ModalTitle id='cnfModal'>Confirm Deletion</ModalTitle>
			</ModalHeader>
			<ModalBody>Are you sure you want to delete this item?</ModalBody>
			<ModalFooter>
				<Button icon='Cancel' color='warning' onClick={setIsOpen}>
					Cancel
				</Button>
				<Button icon='DoneOutline' color='danger' onClick={onConfirm}>
					Delete
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default ConfirmationModal;
