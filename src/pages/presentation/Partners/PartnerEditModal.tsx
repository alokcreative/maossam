import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal';
import data from '../../../common/data/dummyCustomerData';
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Label from '../../../components/bootstrap/forms/Label';
import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
import PAYMENTS from '../../../common/data/enumPaymentMethod';
import Select from '../../../components/bootstrap/forms/Select';
import { SELECT_OPTIONS } from '../../documentation/forms/SelectPage';
import { SELECT_OPTIONS_CONNECTION } from '../../documentation/forms/SelectPage';
import { SELECT_OPTIONS_SOCIAL_SHARE } from '../../documentation/forms/SelectPage';
import Accordion, { AccordionItem } from '../../../components/bootstrap/Accordion';

interface IPartnerEditModalProps {
	id: string;
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
}
const PartnerEditModal: FC<IPartnerEditModalProps> = ({ id, isOpen, setIsOpen }) => {
	const itemData = id ? data.filter((item) => item.id.toString() === id.toString()) : {};
	const item = id && Array.isArray(itemData) ? itemData[0] : {};

	const formik = useFormik({
		initialValues: {
			name: item?.name || '',
			email: item?.email || '',
			membershipDate: dayjs(item?.membershipDate).format('YYYY-MM-DD') || '',
			type: item?.type || 'Author',
			streetAddress: item?.streetAddress || '',
			streetAddress2: item?.streetAddress2 || '',
			city: item?.city || '',
			stateFull: item?.stateFull || '',
			zip: item?.zip || '',
			number: item?.number || '',
			streetAddressDelivery: item?.streetAddressDelivery || '',
			streetAddress2Delivery: item?.streetAddress2Delivery || '',
			cityDelivery: item?.cityDelivery || '',
			stateFullDelivery: item?.stateFullDelivery || '',
			zipDelivery: item?.zipDelivery || '',
			payoutType: item?.payout || '',
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
			setIsOpen(false);
			showNotification(
				<span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>Updated Successfully</span>
				</span>,
				'Partner has been updated successfully',
			);
		},
	});

	if (id || id === '0') {
		return (
			<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='lg' titleId={id.toString()}>
				<ModalHeader setIsOpen={setIsOpen} className='p-4'>
					<ModalTitle id={id}>{item?.name || 'New Partner'}</ModalTitle>
				</ModalHeader>
				<ModalBody className='px-4'>
					<div className='row g-4'>
						<FormGroup id='name' label='Name' className='col-lg-6'>
							<Input onChange={formik.handleChange} value={formik.values.name} />
						</FormGroup>
						<FormGroup id='email' label='Email' className='col-lg-6'>
							<Input
								type='email'
								onChange={formik.handleChange}
								value={formik.values.email}
							/>
						</FormGroup>
						<FormGroup id='exampleSelectOneWay' label='Connection' className='col-lg-6'>
							<Select
								ariaLabel='Default select example'
								placeholder='Open this select menu'
								// onChange={handleChange}
								// value={values.exampleSelectOneWay}
								list={SELECT_OPTIONS_CONNECTION}
							/>
							<div className='d-block text-end'>
								<a href='#' className='fw-bold text-decoration-none'>
									Add Category
								</a>
							</div>
						</FormGroup>
						<FormGroup
							id='exampleSelectOneWay'
							label='Share on Social media'
							className='col-lg-6'>
							<Select
								ariaLabel='Default select example'
								placeholder='Open this select menu'
								// onChange={handleChange}
								// value={values.exampleSelectOneWay}
								list={SELECT_OPTIONS_SOCIAL_SHARE}
							/>
							<div className='d-block text-end'>
								<a href='#' className='fw-bold text-decoration-none'>
									Add Category
								</a>
							</div>
						</FormGroup>
						<FormGroup
							id='exampleSelectOneWay'
							label='Product/Service'
							className='col-lg-6'>
							<Select
								ariaLabel='Default select example'
								placeholder='Open this select menu'
								// onChange={handleChange}
								// value={values.exampleSelectOneWay}
								list={SELECT_OPTIONS}
							/>
						</FormGroup>
						<FormGroup id='name' label='Tel' className='col-lg-6'>
							<Input onChange={formik.handleChange} value={formik.values.number} />
						</FormGroup>

						{/* <FormGroup id='membershipDate' label='Membership' className='col-md-12'>
							<Input
								type='date'
								onChange={formik.handleChange}
								value={formik.values.membershipDate}
								disabled
							/>
						</FormGroup> */}
						{/* <FormGroup id='type' label='Type' className='col-md-12'>
							<Input
								onChange={formik.handleChange}
								value={formik.values.type}
								disabled
							/>
						</FormGroup> */}
						{/* <FormGroup>
							<Label htmlFor='payoutType'>Payout Type</Label>
							<ChecksGroup isInline>
								{Object.keys(PAYMENTS).map((i) => (
									<Checks
										type='radio'
										key={PAYMENTS[i].name}
										id={PAYMENTS[i].name}
										label={PAYMENTS[i].name}
										name='payoutType'
										value={PAYMENTS[i].name}
										onChange={formik.handleChange}
										checked={formik.values.payoutType}
									/>
								))}
							</ChecksGroup>
						</FormGroup> */}
						<div className='col-md-12'>
							<Card className='rounded-1 mb-0'>
								<CardHeader>
									<CardLabel icon='ReceiptLong'>
										<CardTitle>Address</CardTitle>
									</CardLabel>
								</CardHeader>
								<CardBody>
									<div className='row g-3'>
										<FormGroup
											id='streetAddress'
											label='Address Line'
											className='col-12'>
											<Input
												onChange={formik.handleChange}
												value={formik.values.streetAddress}
											/>
										</FormGroup>
										<FormGroup
											id='streetAddress2'
											label='Address Line 2'
											className='col-12'>
											<Input
												onChange={formik.handleChange}
												value={formik.values.streetAddress2}
											/>
										</FormGroup>
										<FormGroup id='city' label='City' className='col-md-4'>
											<Input
												onChange={formik.handleChange}
												value={formik.values.city}
											/>
										</FormGroup>
										<FormGroup
											id='stateFull'
											label='State'
											className='col-md-4'>
											<Input
												onChange={formik.handleChange}
												value={formik.values.stateFull}
											/>
										</FormGroup>
										<FormGroup id='zip' label='Zip' className='col-md-4'>
											<Input
												onChange={formik.handleChange}
												value={formik.values.zip}
											/>
										</FormGroup>
									</div>
								</CardBody>
								<CardBody>
									<div className='row g-3'>
										<div className='col-12'>
											<Accordion id='faq' shadow='sm'>
												<AccordionItem
													id='faq1'
													title='More info about find the right partner'>
													In at urna nec risus aliquam accumsan. Vivamus
													rutrum rhoncus massa, sed facilisis justo
													sodales vitae. Pellentesque mattis felis ac enim
													viverra faucibus. Curabitur maximus nibh massa,
													ut dictum quam scelerisque eget. Maecenas
													scelerisque egestas diam a posuere. Sed non
													vehicula nunc. Proin feugiat nisi ut mi mattis
													bibendum. Suspendisse lobortis libero ut libero
													semper, sed fermentum lectus commodo. Nam
													pretium mi sit amet purus imperdiet tempus.
													Aliquam congue ligula quis vulputate viverra.
													Morbi dapibus vitae odio vel luctus. Vivamus
													tellus tortor, aliquet id ultricies a, hendrerit
													non massa. Ut feugiat quam non sollicitudin
													molestie. Praesent ut ante mattis, efficitur est
													ac, scelerisque magna. Donec congue erat a
													suscipit condimentum. Curabitur purus nunc,
													ullamcorper vitae lectus quis, aliquam lacinia
													arcu.
												</AccordionItem>
												<AccordionItem
													id='faq2'
													title='More info about what is a good partnership'>
													Nunc ex odio, fermentum dignissim urna eu,
													suscipit vehicula magna. Vestibulum vel risus
													sed metus pellentesque gravida. Etiam hendrerit
													lorem vitae elit tempor bibendum. Vivamus
													tincidunt consectetur erat at venenatis. Nam
													elementum varius massa non congue. Class aptent
													taciti sociosqu ad litora torquent per conubia
													nostra, per inceptos himenaeos. Vivamus
													fermentum scelerisque ligula, quis bibendum
													felis luctus quis. Donec magna sem, ullamcorper
													id tempus ut, pharetra sed felis. Ut quis ante
													tristique, condimentum lacus eget, mollis magna.
													Phasellus fringilla diam ac erat consequat
													feugiat. Vestibulum eu ex eget ligula placerat
													finibus. Quisque vitae velit feugiat, mattis
													lectus nec, molestie justo. Vivamus nec
													tincidunt augue. Pellentesque nec mattis ipsum,
													non malesuada libero. Proin aliquam est turpis,
													sit amet efficitur ex gravida ac. Nunc in
													molestie augue.
												</AccordionItem>
											</Accordion>
										</div>
									</div>
								</CardBody>
							</Card>
						</div>
					</div>
				</ModalBody>
				<ModalFooter className='px-4 pb-4'>
					<Button color='info' onClick={formik.handleSubmit}>
						Save
					</Button>
				</ModalFooter>
			</Modal>
		);
	}
	return null;
};
PartnerEditModal.propTypes = {
	id: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
};

export default PartnerEditModal