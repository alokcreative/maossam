import React, { FC, useContext } from 'react';
import Modal, {
	ModalBody,
	ModalHeader,
	ModalTitle,
} from '../../../../../components/bootstrap/Modal';
import { Formik, Field, Form, useFormik } from 'formik';
import Button from '../../../../../components/bootstrap/Button';
import AuthContext from '../../../../../contexts/authContext';
import Card, {
	CardBody,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../../../../../components/bootstrap/Card';
import User1Webp from '../../../../../assets/img/wanna/wanna2.webp';
import User1Img from '../../../../../assets/img/wanna/wanna2.png';
import Avatar from '../../../../../components/Avatar';
import FormGroup from '../../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../../components/bootstrap/forms/Input';
import Accordion, { AccordionItem } from '../../../../../components/bootstrap/Accordion';
import { useNavigate } from 'react-router-dom';
import { pagesMenu } from '../../../../../menu';

type IAssetNameProps = {
	id: number | undefined;
	idOfBussiness: number | undefined;
	nameOfBussiness: string | undefined;
	isModalOpen: boolean;
	setIsModalOpen: (item: boolean) => void;
	getFormValue(...args: unknown[]): unknown;
};

const GoalViewPopup: FC<IAssetNameProps> = (props) => {
	const { idOfBussiness = 0, nameOfBussiness = '', isModalOpen, setIsModalOpen, id } = props;
	const navigate = useNavigate();
	// User data
	const { userData } = useContext(AuthContext);
	const savedValue = localStorage.getItem('user');
	const parsedValue = savedValue ? JSON.parse(savedValue) : null;
	const newUserName = parsedValue?.newUserName;
	const name = userData?.name || newUserName;

	const handleSubmit = (isSocialMedia: string, isSocialMediaimportant: string) => {
		// console.log(
		// 	'handle submit>>> ',
		// 	isSocialMedia,
		// 	' ',
		// 	isSocialMediaimportant,
		// 	' ',
		// 	idOfBussiness,
		// 	' ',
		// 	nameOfBussiness,
		// );
		// eslint-disable-next-line react/destructuring-assignment
		props.getFormValue(isSocialMedia, isSocialMediaimportant);
		setIsModalOpen(false);
		navigate(`../${pagesMenu.goalId.path}/${id}`);

	};

	const formikAddTask = useFormik({
		initialValues: {
			clickVal: '',
		},
		onSubmit(values, formikHelpers) {
			console.log(values.clickVal);
			// navigate('/add-task');
		},
	});
	return (
		<Modal
			isOpen={isModalOpen}
			setIsOpen={setIsModalOpen}
			id='sdmsk12'
			size='lg'
			isScrollable
			isStaticBackdrop>
			<ModalHeader setIsOpen={setIsModalOpen}>
				<ModalTitle id='mks1' />
			</ModalHeader>
			<ModalBody>
				<div className='row p-auto'>
					<div className=' mb-4'>
						<h5 className='mb-3 fw-bold'>Hi {name},</h5>
						<p>
							we're excited to review your marketing assets together. This step will
							allow us to check with you the existing and future marketing channels to
							develop your business and review the setup and features not to be
							missed.
						</p>
						<p className='mb-3'>
							Let’s get a quick tour in the social media world and check out what’s
							relevant for you
						</p>
					</div>

					<div className='mb-3'>
						<Formik
							enableReinitialize
							initialValues={{
								haveBusinesspage: '',
								needBusinesspage: '',
								BusinesspageLink: '',
								havePrivateProfile: '',
								needPrivateProfile: '',
								BusinesspagePrivateProfileLink: '',
								haveBusinessGroup: '',
								needBusinessGroupBusiness: '',
								BusinessGroupLink: '',
							}}
							onSubmit={async (values) => {
								handleSubmit(values.haveBusinesspage, values.needBusinesspage);
							}}>
							{({
								values,
								handleChange,
								handleBlur,
								handleReset,
								errors,
								touched,
								isValid,
							}) => (
								<Form>
									{/* Social Media Card STart */}
									<Card stretch>
										<CardHeader>
											<CardTitle>
												Is your business present on {nameOfBussiness}?
											</CardTitle>
										</CardHeader>
										<CardBody>
											<div className='facebook-page mb-4'>
												<div className='row'>
													<div className='col-12'>
														<div className='d-flex align-items-center mb-4'>
															<Avatar
																srcSet={User1Webp}
																src={User1Img}
																size={32}
															/>
															<span className='ms-3'>
																<strong>
																	{nameOfBussiness} - Business
																	page
																</strong>
															</span>
														</div>
														<div className='row align-items-center'>
															<div className='col-12 col-lg-auto'>
																<div className='mb-3'>
																	<div className='form-check'>
																		<Field
																			className='form-check-input'
																			type='radio'
																			name='haveBusinesspage'
																			value='yes'
																		/>
																		Yes
																	</div>
																</div>
															</div>
															<div className='col-12 col-lg-6'>
																<div className='mb-3'>
																	<FormGroup id='mCustomer'>
																		<Input
																			type='url'
																			placeholder='Lien profile (option) '
																			name='BusinesspageLink'
																			onChange={handleChange}
																			onBlur={handleBlur}
																			value={
																				values.BusinesspageLink
																			}
																			isValid={isValid}
																			validFeedback='Looks good!'
																			disabled={
																				values.haveBusinesspage ===
																				'no'
																			}
																		/>
																	</FormGroup>
																</div>
															</div>
															<div className='col-12 col-lg-auto'>
																<div className='mb-3'>
																	<div className='form-check'>
																		<Field
																			className='form-check-input'
																			type='radio'
																			name='haveBusinesspage'
																			value='no'
																		/>
																		No
																	</div>
																</div>
															</div>
														</div>

														<div
															className={
																values.haveBusinesspage === 'no'
																	? 'row my-3'
																	: 'row my-3 col-lg-12 user-select-none opacity-25 pe-none bg-[#ccc]'
															}>
															<div className='col-12'>
																<h5 className='card-title'>
																	Can {nameOfBussiness} help you
																	promote your business?
																</h5>
															</div>
														</div>
														<div
															className={
																values.haveBusinesspage === 'no'
																	? 'row align-items-center'
																	: 'row align-items-center col-lg-12 user-select-none opacity-25 pe-none bg-[#ccc]'
															}>
															<div className='col-12 col-lg-auto'>
																<div className='mb-3'>
																	<div className='form-check'>
																		<Field
																			className='form-check-input'
																			type='radio'
																			name='needBusinesspage'
																			value='nope'
																		/>
																		Nope
																	</div>
																</div>
															</div>
															<div className='col-12 col-lg-3'>
																<div className='mb-3'>
																	<div className='form-check'>
																		<Field
																			className='form-check-input'
																			type='radio'
																			name='needBusinesspage'
																			value='maybe'
																		/>
																		Maybe, I’m not sure
																	</div>
																</div>
															</div>
															<div className='col-12 col-lg-3'>
																<div className='mb-3'>
																	<div className='form-check'>
																		<Field
																			className='form-check-input'
																			type='radio'
																			name='needBusinesspage'
																			value='yes'
																		/>
																		Yes, Sure
																	</div>
																</div>
															</div>

															<div className='col-12 col-lg-auto'>
																<div className='mb-3'>
																	<Button
																		color='success'
																		isLight
																		icon='Add'
																		isDisable={
																			values.needBusinesspage ===
																			'nope'
																		}
																		onClick={
																			formikAddTask.handleSubmit
																		}>
																		Add Task
																	</Button>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className='facebook-page mb-4'>
												<div className='row'>
													<div className='col-12'>
														<div className='d-flex align-items-center mb-4'>
															<Avatar
																srcSet={User1Webp}
																src={User1Img}
																size={32}
															/>
															<span className='ms-3'>
																<strong>
																	{nameOfBussiness} - private
																	profile
																</strong>
															</span>
														</div>
														<div className='row align-items-center'>
															<div className='col-12 col-lg-auto'>
																<div className='mb-3'>
																	<div className='form-check'>
																		<Field
																			className='form-check-input'
																			type='radio'
																			name='havePrivateProfile'
																			value='yes'
																		/>
																		Yes
																	</div>
																</div>
															</div>
															<div className='col-12 col-lg-6'>
																<div className='mb-3'>
																	<FormGroup id='mCustomer'>
																		<Input
																			type='url'
																			placeholder='Lien profile (option) '
																			name='BusinesspagePrivateProfileLink'
																			onChange={handleChange}
																			onBlur={handleBlur}
																			value={
																				values.BusinesspagePrivateProfileLink
																			}
																			isValid={isValid}
																			validFeedback='Looks good!'
																			disabled={
																				values.havePrivateProfile ===
																				'no'
																			}
																		/>
																	</FormGroup>
																</div>
															</div>
															<div className='col-12 col-lg-auto'>
																<div className='mb-3'>
																	<div className='form-check'>
																		<Field
																			className='form-check-input'
																			type='radio'
																			name='havePrivateProfile'
																			value='no'
																		/>
																		No
																	</div>
																</div>
															</div>
														</div>

														<div
															className={
																values.havePrivateProfile === 'no'
																	? 'row my-3'
																	: 'row my-3 col-lg-12 user-select-none opacity-25 pe-none bg-[#ccc]'
															}>
															<div className='col-12'>
																<h5 className='card-title'>
																	Do you need a {nameOfBussiness}{' '}
																	private profile to promote your
																	business?
																</h5>
															</div>
														</div>
														<div
															className={
																values.havePrivateProfile === 'no'
																	? 'row align-items-center'
																	: 'row align-items-center user-select-none opacity-25 pe-none bg-[#ccc]'
															}>
															<div className='col-12 col-lg-auto'>
																<div className='mb-3'>
																	<div className='form-check'>
																		<Field
																			className='form-check-input'
																			type='radio'
																			name='needPrivateProfile'
																			value='nope'
																		/>
																		Nope
																	</div>
																</div>
															</div>
															<div className='col-12 col-lg-3'>
																<div className='mb-3'>
																	<div className='form-check'>
																		<Field
																			className='form-check-input'
																			type='radio'
																			name='needPrivateProfile'
																			value='maybe'
																		/>
																		Maybe, I’m not sure
																	</div>
																</div>
															</div>
															<div className='col-12 col-lg-3'>
																<div className='mb-3'>
																	<div className='form-check'>
																		<Field
																			className='form-check-input'
																			type='radio'
																			name='needPrivateProfile'
																			value='yes'
																		/>
																		Yes, Sure
																	</div>
																</div>
															</div>

															<div className='col-12 col-lg-auto'>
																<div className='mb-3'>
																	<Button
																		color='success'
																		isLight
																		icon='Add'
																		onClick={
																			formikAddTask.handleSubmit
																		}
																		isDisable={
																			values.needPrivateProfile ===
																			'nope'
																		}>
																		Add Task
																	</Button>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className='facebook-page mb-4'>
												<div className='row'>
													<div className='col-12'>
														<div className='d-flex align-items-center mb-4'>
															<Avatar
																srcSet={User1Webp}
																src={User1Img}
																size={32}
															/>
															<span className='ms-3'>
																<strong>
																	{nameOfBussiness} - Group
																</strong>
															</span>
														</div>
														<div className='row align-items-center'>
															<div className='col-12 col-lg-auto'>
																<div className='mb-3'>
																	<div className='form-check'>
																		<Field
																			className='form-check-input'
																			type='radio'
																			name='haveBusinessGroup'
																			value='yes'
																		/>
																		Yes
																	</div>
																</div>
															</div>
															<div className='col-12 col-lg-6'>
																<div className='mb-3'>
																	<FormGroup id='mCustomer'>
																		<Input
																			type='url'
																			placeholder='Lien profile (option) '
																			name='BusinessGroupLink'
																			onChange={handleChange}
																			onBlur={handleBlur}
																			value={
																				values.BusinessGroupLink
																			}
																			isValid={isValid}
																			validFeedback='Looks good!'
																			disabled={
																				values.haveBusinessGroup ===
																				'no'
																			}
																		/>
																	</FormGroup>
																</div>
															</div>
															<div className='col-12 col-lg-auto'>
																<div className='mb-3'>
																	<div className='form-check'>
																		<Field
																			className='form-check-input'
																			type='radio'
																			name='haveBusinessGroup'
																			value='no'
																		/>
																		No
																	</div>
																</div>
															</div>
														</div>
														<div className='row my-3'>
															<div
																className={
																	values.haveBusinessGroup ===
																	'no'
																		? 'col-12'
																		: 'user-select-none opacity-25 pe-none bg-[#ccc]'
																}>
																<h5 className='card-title'>
																	Would a {nameOfBussiness} Group
																	help you promote your business?
																</h5>
															</div>
														</div>
														<div
															className={
																values.haveBusinessGroup === 'no'
																	? 'row align-items-center'
																	: 'row align-items-center user-select-none opacity-25 pe-none bg-[#ccc]'
															}>
															<div className='col-12 col-lg-auto'>
																<div className='mb-3'>
																	<div className='form-check'>
																		<Field
																			className='form-check-input'
																			type='radio'
																			name='needBusinessGroupBusiness'
																			value='nope'
																		/>
																		Nope
																	</div>
																</div>
															</div>
															<div className='col-12 col-lg-3'>
																<div className='mb-3'>
																	<div className='form-check'>
																		<Field
																			className='form-check-input'
																			type='radio'
																			name='needBusinessGroupBusiness'
																			value='maybe'
																		/>
																		Maybe, I’m not sure
																	</div>
																</div>
															</div>
															<div className='col-12 col-lg-3'>
																<div className='mb-3'>
																	<div className='form-check'>
																		<Field
																			className='form-check-input'
																			type='radio'
																			name='needBusinessGroupBusiness'
																			value='yes'
																		/>
																		Yes, Sure
																	</div>
																</div>
															</div>

															<div className='col-12 col-lg-auto'>
																<div className='mb-3'>
																	<Button
																		color='success'
																		isLight
																		icon='Add'
																		onClick={
																			formikAddTask.handleSubmit
																		}
																		isDisable={
																			values.needBusinessGroupBusiness ===
																			'nope'
																		}>
																		Add Task
																	</Button>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</CardBody>
										<CardBody>
											<Accordion id='faq' shadow='sm'>
												<AccordionItem
													id='faq1'
													title={`More info about ${nameOfBussiness} private profile`}>
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
													title={`More info about ${nameOfBussiness} business page`}>
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
												<AccordionItem
													id='faq2'
													title={`More info about ${nameOfBussiness} groups`}>
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
										</CardBody>
										<CardFooter>
											<Button
												type='submit'
												color='primary'
												isLight
												icon='Save'>
												Save
											</Button>
											<Button
												type='submit'
												color='danger'
												isLight
												icon='Close'>
												Cancel
											</Button>
										</CardFooter>
									</Card>
									{/* Social Media Card End */}
								</Form>
							)}
						</Formik>
					</div>
				</div>
			</ModalBody>
		</Modal>
	);
};

export default GoalViewPopup;
