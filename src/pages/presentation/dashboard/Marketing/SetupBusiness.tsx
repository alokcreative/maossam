import React from 'react';
import { useFormik } from 'formik';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import { demoPagesMenu } from '../../../../menu';
import Page from '../../../../layout/Page/Page';
import Wizard, { WizardItem } from '../../../../components/Wizard';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Card, { CardBody, CardHeader, CardTitle } from '../../../../components/bootstrap/Card';
import Input from '../../../../components/bootstrap/forms/Input';
import USERS from '../../../../common/data/userDummyData';
import Accordion, { AccordionItem } from '../../../../components/bootstrap/Accordion';
import BusinessLogo from '../../../../assets/logos/business.png';
import FacebookImg from '../../../../assets/logos/facebook.png';
import InstagramImg from '../../../../assets/logos/instagram.png';
import LinkedinImg from '../../../../assets/logos/linkedin.png';
import PinterestImg from '../../../../assets/logos/pinterest.png';
import TicktokImg from '../../../../assets/logos/tiktok.png';
import TwitterImg from '../../../../assets/logos/twitter.png';
import WhatsappImg from '../../../../assets/logos/whatsapp.png';
import TelegramImg from '../../../../assets/logos/telegram.png';
import Avatar from '../../../../components/Avatar';
import Button from '../../../../components/bootstrap/Button';
import { useNavigate } from 'react-router';

const SetupBusiness = () => {
	const navigate = useNavigate();
	const formik = useFormik({
		initialValues: {
			firstName: 'John',
			lastName: 'Doe',
			emailAddress: 'johndoe@site.com',
			phoneNumber: '',
			addressLine: '',
			addressLine2: '',
			city: '',
			state: '',
			zip: '',
			selectedBank: '',
			youSend: '',
			iban: '',
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: () => {
			navigate('/marketing-assets');
		},
	});
	return (
		<PageWrapper title={demoPagesMenu.setupbusiness.text}>
			<Page>
				<div className='row'>
					<div className='col-12'>
						<div className='display-5 fw-bold py-3 text-center'>MA OSSIM</div>
					</div>
				</div>
				<div className='row'>
					<div className='col-12 shadow-3d-container'>
						<Wizard
							// isHeader
							color='info'
							onSubmit={formik.handleSubmit}
							className='shadow-3d-info'>
							<WizardItem id='step1'>
								<Card>
									<CardHeader>
										<CardTitle className='fs-3'>Do you have a logo?</CardTitle>
									</CardHeader>
									<CardBody>
										<div className='row g-4'>
											<div className='col-12'>
												<div className='mb-3 mb-lg-5'>
													<h5 className='fw-bold'>
														You can always change it later
													</h5>
												</div>
												<div className='have-logo mb-4'>
													<div className='mb-3'>
														<div className='form-check'>
															<input
																className='form-check-input'
																name='logoyes'
																type='checkbox'
																id='example'
																value='checkbox value'
															/>
															Yes
															{/* <label className='form-check-label'>
																</label> */}
														</div>
													</div>
													<div className='row g-4 align-items-center'>
														<div className='col-lg-auto'>
															<Avatar
																srcSet={BusinessLogo}
																src={BusinessLogo}
																color='info'
															/>
														</div>
														<div className='col-lg'>
															<div className='row g-4'>
																<div className='col-auto'>
																	<Input
																		type='file'
																		autoComplete='photo'
																		ariaLabel='Upload logo image file'
																	/>
																</div>
																<div className='col-auto'>
																	<Button
																		color='danger'
																		isLight
																		icon='Delete'>
																		Delete Logo
																	</Button>
																</div>
																<div className='col-12'>
																	<p className='lead text-muted'>
																		Upload logo image file
																	</p>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div className='hav-not-logo mb-4'>
													<div className='row g-4'>
														<div className='col-lg-2'>
															<div className='mb-4'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='logono'
																		type='checkbox'
																		id='example'
																		value='checkbox value'
																	/>
																	No
																	{/* <label className='form-check-label'>
																</label> */}
																</div>
															</div>
														</div>
														<div className='col-lg-10'>
															<div className='mb-4'>
																<h5 className='mb-4'>Why not? </h5>
																<div className='row g-4 align-items-center'>
																	<div className='col-lg-auto'>
																		<div className='form-check'>
																			<input
																				className='form-check-input'
																				name='no-idea'
																				type='checkbox'
																				id='example'
																				value='checkbox value'
																			/>
																			No budget , no idea
																		</div>
																	</div>
																	<div className='col-lg-auto'>
																		<div className='form-check'>
																			<input
																				className='form-check-input'
																				name='not-time'
																				type='checkbox'
																				id='example'
																				value='checkbox value'
																			/>
																			No time yet
																		</div>
																	</div>
																	<div className='col-lg-auto'>
																		<div className='form-check'>
																			<input
																				className='form-check-input'
																				name='in-progress'
																				type='checkbox'
																				id='example'
																				value='checkbox value'
																			/>
																			In process
																		</div>
																	</div>
																</div>
																<div className='row g-4 align-items-center mt-4'>
																	<div className='col-lg-12'>
																		<Button
																			color='success'
																			isLight
																			icon='Add'>
																			ADD TASK CREATE LOGO
																		</Button>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</CardBody>
									<div className='row g-3'>
											<div className='col-12'>
												<Accordion id='logofaq' shadow='sm'>
													<AccordionItem
														id='logofaq1'
														title='Why is a logo important for a business?'>
														In at urna nec risus aliquam accumsan.
														Vivamus rutrum rhoncus massa, sed facilisis
														justo sodales vitae. Pellentesque mattis
														felis ac enim viverra faucibus. Curabitur
														maximus nibh massa, ut dictum quam
														scelerisque eget. Maecenas scelerisque
														egestas diam a posuere. Sed non vehicula
														nunc. Proin feugiat nisi ut mi mattis
														bibendum. Suspendisse lobortis libero ut
														libero semper, sed fermentum lectus commodo.
														Nam pretium mi sit amet purus imperdiet
														tempus. Aliquam congue ligula quis vulputate
														viverra. Morbi dapibus vitae odio vel
														luctus. Vivamus tellus tortor, aliquet id
														ultricies a, hendrerit non massa. Ut feugiat
														quam non sollicitudin molestie. Praesent ut
														ante mattis, efficitur est ac, scelerisque
														magna. Donec congue erat a suscipit
														condimentum. Curabitur purus nunc,
														ullamcorper vitae lectus quis, aliquam
														lacinia arcu.
													</AccordionItem>
													<AccordionItem
														id='logofaq2'
														title='How expensive is it to make a logo'>
														Nunc ex odio, fermentum dignissim urna eu,
														suscipit vehicula magna. Vestibulum vel
														risus sed metus pellentesque gravida. Etiam
														hendrerit lorem vitae elit tempor bibendum.
														Vivamus tincidunt consectetur erat at
														venenatis. Nam elementum varius massa non
														congue. Class aptent taciti sociosqu ad
														litora torquent per conubia nostra, per
														inceptos himenaeos. Vivamus fermentum
														scelerisque ligula, quis bibendum felis
														luctus quis. Donec magna sem, ullamcorper id
														tempus ut, pharetra sed felis. Ut quis ante
														tristique, condimentum lacus eget, mollis
														magna. Phasellus fringilla diam ac erat
														consequat feugiat. Vestibulum eu ex eget
														ligula placerat finibus. Quisque vitae velit
														feugiat, mattis lectus nec, molestie justo.
														Vivamus nec tincidunt augue. Pellentesque
														nec mattis ipsum, non malesuada libero.
														Proin aliquam est turpis, sit amet efficitur
														ex gravida ac. Nunc in molestie augue.
													</AccordionItem>
													<AccordionItem
														id='logofaq3'
														title='Can I create one myself?'>
														Nunc ex odio, fermentum dignissim urna eu,
														suscipit vehicula magna. Vestibulum vel
														risus sed metus pellentesque gravida. Etiam
														hendrerit lorem vitae elit tempor bibendum.
														Vivamus tincidunt consectetur erat at
														venenatis. Nam elementum varius massa non
														congue. Class aptent taciti sociosqu ad
														litora torquent per conubia nostra, per
														inceptos himenaeos. Vivamus fermentum
														scelerisque ligula, quis bibendum felis
														luctus quis. Donec magna sem, ullamcorper id
														tempus ut, pharetra sed felis. Ut quis ante
														tristique, condimentum lacus eget, mollis
														magna. Phasellus fringilla diam ac erat
														consequat feugiat. Vestibulum eu ex eget
														ligula placerat finibus. Quisque vitae velit
														feugiat, mattis lectus nec, molestie justo.
														Vivamus nec tincidunt augue. Pellentesque
														nec mattis ipsum, non malesuada libero.
														Proin aliquam est turpis, sit amet efficitur
														ex gravida ac. Nunc in molestie augue.
													</AccordionItem>
												</Accordion>
											</div>
										</div>
								</Card>
							</WizardItem>
							<WizardItem id='step2'>
								<Card>
									<CardHeader>
										<CardTitle className='fs-3'>
											Do you have a website?
										</CardTitle>
									</CardHeader>
									<CardBody>
										<div className='row g-4'>
											<div className='col-12'>
												<div className='mb-3 mb-lg-5'>
													<h5 className='fw-bold'>
														You can always change it later
													</h5>
												</div>
												<div className='have-website mb-4'>
													<div className='row g-4'>
														<div className='col-lg-2'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='websiteyes'
																		type='checkbox'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes
																</div>
															</div>
														</div>
														<div className='col-lg-4'>
															<div className='mb-3'>
																<FormGroup id='websiteaddress'>
																	<Input
																		placeholder='Web site address (optional) www….'
																		onChange={
																			formik.handleChange
																		}
																		value={
																			formik.values
																				.addressLine
																		}
																	/>
																</FormGroup>
															</div>
															<div className='mb-3'>
																<Button
																	color='success'
																	isLight
																	icon='Add'>
																	ADD TASK CHECK WEBSITE SETUP
																</Button>
															</div>
														</div>
													</div>
												</div>
												<div className='hav-not-website mb-4'>
													<div className='row g-4'>
														<div className='col-lg-2'>
															<div className='mb-4'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='websitno'
																		type='checkbox'
																		id='example'
																		value='checkbox value'
																	/>
																	No
																	{/* <label className='form-check-label'>
																</label> */}
																</div>
															</div>
														</div>
														<div className='col-lg-10'>
															<div className='mb-4'>
																<h5 className='mb-4'>
																	Would a website help you promote
																	your business?
																</h5>
																<div className='row g-4 align-items-center'>
																	<div className='col-lg-auto'>
																		<div className='form-check'>
																			<input
																				className='form-check-input'
																				name='yes-sure'
																				type='checkbox'
																				id='example'
																				value='checkbox value'
																			/>
																			Yes, sure!
																		</div>
																	</div>
																	<div className='col-lg-auto'>
																		<div className='form-check'>
																			<input
																				className='form-check-input'
																				name='no-website'
																				type='checkbox'
																				id='example'
																				value='checkbox value'
																			/>
																			Nope, no need for a web
																			site
																		</div>
																	</div>
																	<div className='col-lg-auto'>
																		<div className='form-check'>
																			<input
																				className='form-check-input'
																				name='maybe'
																				type='checkbox'
																				id='example'
																				value='checkbox value'
																			/>
																			Maybe, I’m not sure
																		</div>
																	</div>
																</div>
																<div className='row g-4 align-items-center mt-4'>
																	<div className='col-lg-12'>
																		<Button
																			color='success'
																			isLight
																			icon='Add'>
																			ADD TASK CREATE WEBSITE
																		</Button>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</CardBody>
									<CardBody>
										<div className='row g-3'>
											<div className='col-12'>
												<Accordion id='websitefaq' shadow='sm'>
													<AccordionItem
														id='websitefaq1'
														title='More info about websites'>
														In at urna nec risus aliquam accumsan.
														Vivamus rutrum rhoncus massa, sed facilisis
														justo sodales vitae. Pellentesque mattis
														felis ac enim viverra faucibus. Curabitur
														maximus nibh massa, ut dictum quam
														scelerisque eget. Maecenas scelerisque
														egestas diam a posuere. Sed non vehicula
														nunc. Proin feugiat nisi ut mi mattis
														bibendum. Suspendisse lobortis libero ut
														libero semper, sed fermentum lectus commodo.
														Nam pretium mi sit amet purus imperdiet
														tempus. Aliquam congue ligula quis vulputate
														viverra. Morbi dapibus vitae odio vel
														luctus. Vivamus tellus tortor, aliquet id
														ultricies a, hendrerit non massa. Ut feugiat
														quam non sollicitudin molestie. Praesent ut
														ante mattis, efficitur est ac, scelerisque
														magna. Donec congue erat a suscipit
														condimentum. Curabitur purus nunc,
														ullamcorper vitae lectus quis, aliquam
														lacinia arcu.
													</AccordionItem>
													<AccordionItem
														id='websitefaq2'
														title='How expensive is it to make a website'>
														Nunc ex odio, fermentum dignissim urna eu,
														suscipit vehicula magna. Vestibulum vel
														risus sed metus pellentesque gravida. Etiam
														hendrerit lorem vitae elit tempor bibendum.
														Vivamus tincidunt consectetur erat at
														venenatis. Nam elementum varius massa non
														congue. Class aptent taciti sociosqu ad
														litora torquent per conubia nostra, per
														inceptos himenaeos. Vivamus fermentum
														scelerisque ligula, quis bibendum felis
														luctus quis. Donec magna sem, ullamcorper id
														tempus ut, pharetra sed felis. Ut quis ante
														tristique, condimentum lacus eget, mollis
														magna. Phasellus fringilla diam ac erat
														consequat feugiat. Vestibulum eu ex eget
														ligula placerat finibus. Quisque vitae velit
														feugiat, mattis lectus nec, molestie justo.
														Vivamus nec tincidunt augue. Pellentesque
														nec mattis ipsum, non malesuada libero.
														Proin aliquam est turpis, sit amet efficitur
														ex gravida ac. Nunc in molestie augue.
													</AccordionItem>
													<AccordionItem
														id='websitefaq3'
														title='Can I create one myself?'>
														Nunc ex odio, fermentum dignissim urna eu,
														suscipit vehicula magna. Vestibulum vel
														risus sed metus pellentesque gravida. Etiam
														hendrerit lorem vitae elit tempor bibendum.
														Vivamus tincidunt consectetur erat at
														venenatis. Nam elementum varius massa non
														congue. Class aptent taciti sociosqu ad
														litora torquent per conubia nostra, per
														inceptos himenaeos. Vivamus fermentum
														scelerisque ligula, quis bibendum felis
														luctus quis. Donec magna sem, ullamcorper id
														tempus ut, pharetra sed felis. Ut quis ante
														tristique, condimentum lacus eget, mollis
														magna. Phasellus fringilla diam ac erat
														consequat feugiat. Vestibulum eu ex eget
														ligula placerat finibus. Quisque vitae velit
														feugiat, mattis lectus nec, molestie justo.
														Vivamus nec tincidunt augue. Pellentesque
														nec mattis ipsum, non malesuada libero.
														Proin aliquam est turpis, sit amet efficitur
														ex gravida ac. Nunc in molestie augue.
													</AccordionItem>
												</Accordion>
											</div>
										</div>
									</CardBody>
								</Card>
							</WizardItem>
							<WizardItem id='step3'>
								<Card>
									<CardHeader>
										<CardTitle className='fs-3'>
											Do you have landing pages?
										</CardTitle>
									</CardHeader>
									<CardBody>
										<div className='row g-4'>
											<div className='col-12'>
												<div className='mb-3 mb-lg-5'>
													<h5 className='fw-bold'>
														You can always change it later
													</h5>
												</div>
												<div className='have-landing mb-4'>
													<div className='row g-4'>
														<div className='col-lg-2'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='landingyes'
																		type='checkbox'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes
																</div>
															</div>
														</div>
														<div className='col-lg-4'>
															<div className='mb-3'>
																<FormGroup id='landingaddress'>
																	<Input
																		placeholder='landing page address (optional) www….'
																		onChange={
																			formik.handleChange
																		}
																		value={
																			formik.values
																				.addressLine
																		}
																	/>
																</FormGroup>
															</div>
															<div className='mb-3'>
																<Button
																	color='success'
																	isLight
																	icon='Add'>
																	ADD TASK CHECK LANDING PAGE
																	SETUP
																</Button>
															</div>
														</div>
													</div>
												</div>
												<div className='hav-not-landing mb-4'>
													<div className='row g-4'>
														<div className='col-lg-2'>
															<div className='mb-4'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='landingno'
																		type='checkbox'
																		id='example'
																		value='checkbox value'
																	/>
																	No
																</div>
															</div>
														</div>
														<div className='col-lg-10'>
															<div className='mb-4'>
																<h5 className='mb-4'>
																	Would a landing page help you
																	promote your business?
																</h5>
																<div className='row g-4 align-items-center'>
																	<div className='col-lg-auto'>
																		<div className='form-check'>
																			<input
																				className='form-check-input'
																				name='landing-yes-sure'
																				type='checkbox'
																				id='example'
																				value='checkbox value'
																			/>
																			Yes, sure!
																		</div>
																	</div>
																	<div className='col-lg-auto'>
																		<div className='form-check'>
																			<input
																				className='form-check-input'
																				name='nope-landing'
																				type='checkbox'
																				id='example'
																				value='checkbox value'
																			/>
																			Nope, no need for a web
																			site
																		</div>
																	</div>
																	<div className='col-lg-auto'>
																		<div className='form-check'>
																			<input
																				className='form-check-input'
																				name='landing-maybe'
																				type='checkbox'
																				id='example'
																				value='checkbox value'
																			/>
																			Maybe, I’m not sure
																		</div>
																	</div>
																</div>
																<div className='row g-4 align-items-center mt-4'>
																	<div className='col-lg-12'>
																		<Button
																			color='success'
																			isLight
																			icon='Add'>
																			ADD TASK CREATE LANDING
																			PAGE
																		</Button>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</CardBody>
									<CardBody>
										<Accordion id='landingfaq' shadow='sm'>
											<AccordionItem
												id='landingfaq1'
												title='More info about landing pages'>
												In at urna nec risus aliquam accumsan. Vivamus
												rutrum rhoncus massa, sed facilisis justo sodales
												vitae. Pellentesque mattis felis ac enim viverra
												faucibus. Curabitur maximus nibh massa, ut dictum
												quam scelerisque eget. Maecenas scelerisque egestas
												diam a posuere. Sed non vehicula nunc. Proin feugiat
												nisi ut mi mattis bibendum. Suspendisse lobortis
												libero ut libero semper, sed fermentum lectus
												commodo. Nam pretium mi sit amet purus imperdiet
												tempus. Aliquam congue ligula quis vulputate
												viverra. Morbi dapibus vitae odio vel luctus.
												Vivamus tellus tortor, aliquet id ultricies a,
												hendrerit non massa. Ut feugiat quam non
												sollicitudin molestie. Praesent ut ante mattis,
												efficitur est ac, scelerisque magna. Donec congue
												erat a suscipit condimentum. Curabitur purus nunc,
												ullamcorper vitae lectus quis, aliquam lacinia arcu.
											</AccordionItem>
											<AccordionItem
												id='landingfaq2'
												title='How expensive is it to make a landing page?'>
												Nunc ex odio, fermentum dignissim urna eu, suscipit
												vehicula magna. Vestibulum vel risus sed metus
												pellentesque gravida. Etiam hendrerit lorem vitae
												elit tempor bibendum. Vivamus tincidunt consectetur
												erat at venenatis. Nam elementum varius massa non
												congue. Class aptent taciti sociosqu ad litora
												torquent per conubia nostra, per inceptos himenaeos.
												Vivamus fermentum scelerisque ligula, quis bibendum
												felis luctus quis. Donec magna sem, ullamcorper id
												tempus ut, pharetra sed felis. Ut quis ante
												tristique, condimentum lacus eget, mollis magna.
												Phasellus fringilla diam ac erat consequat feugiat.
												Vestibulum eu ex eget ligula placerat finibus.
												Quisque vitae velit feugiat, mattis lectus nec,
												molestie justo. Vivamus nec tincidunt augue.
												Pellentesque nec mattis ipsum, non malesuada libero.
												Proin aliquam est turpis, sit amet efficitur ex
												gravida ac. Nunc in molestie augue.
											</AccordionItem>
											<AccordionItem
												id='landingfaq3'
												title='Can I create one myself?'>
												Nunc ex odio, fermentum dignissim urna eu, suscipit
												vehicula magna. Vestibulum vel risus sed metus
												pellentesque gravida. Etiam hendrerit lorem vitae
												elit tempor bibendum. Vivamus tincidunt consectetur
												erat at venenatis. Nam elementum varius massa non
												congue. Class aptent taciti sociosqu ad litora
												torquent per conubia nostra, per inceptos himenaeos.
												Vivamus fermentum scelerisque ligula, quis bibendum
												felis luctus quis. Donec magna sem, ullamcorper id
												tempus ut, pharetra sed felis. Ut quis ante
												tristique, condimentum lacus eget, mollis magna.
												Phasellus fringilla diam ac erat consequat feugiat.
												Vestibulum eu ex eget ligula placerat finibus.
												Quisque vitae velit feugiat, mattis lectus nec,
												molestie justo. Vivamus nec tincidunt augue.
												Pellentesque nec mattis ipsum, non malesuada libero.
												Proin aliquam est turpis, sit amet efficitur ex
												gravida ac. Nunc in molestie augue.
											</AccordionItem>
										</Accordion>
									</CardBody>
								</Card>
							</WizardItem>
							<WizardItem id='step4'>
								<Card>
									<CardHeader>
										<CardTitle className='fs-3'>
											Do you have a Google Business Account?
										</CardTitle>
									</CardHeader>
									<CardBody>
										<div className='row g-4'>
											<div className='col-12'>
												<div className='mb-3 mb-lg-5'>
													<h5 className='fw-bold'>
														You can always change it later
													</h5>
												</div>
												<div className='have-landing mb-4'>
													<div className='row g-4'>
														<div className='col-lg-2'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='gbusinessyes'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes
																</div>
															</div>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='gbusinessyes'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	No
																</div>
															</div>
														</div>
														<div className='col-lg-4'>
															<div className='mb-3'>
																<Button
																	color='success'
																	isLight
																	icon='Add'>
																	ADD TASK OPEN GOOGLE BUSINESS
																	ACCOUNT
																</Button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</CardBody>
									<CardBody>
										<Accordion id='gbusniessfaq' shadow='sm'>
											<AccordionItem
												id='gbusniessfaq1'
												title='More info about Google business'>
												In at urna nec risus aliquam accumsan. Vivamus
												rutrum rhoncus massa, sed facilisis justo sodales
												vitae. Pellentesque mattis felis ac enim viverra
												faucibus. Curabitur maximus nibh massa, ut dictum
												quam scelerisque eget. Maecenas scelerisque egestas
												diam a posuere. Sed non vehicula nunc. Proin feugiat
												nisi ut mi mattis bibendum. Suspendisse lobortis
												libero ut libero semper, sed fermentum lectus
												commodo. Nam pretium mi sit amet purus imperdiet
												tempus. Aliquam congue ligula quis vulputate
												viverra. Morbi dapibus vitae odio vel luctus.
												Vivamus tellus tortor, aliquet id ultricies a,
												hendrerit non massa. Ut feugiat quam non
												sollicitudin molestie. Praesent ut ante mattis,
												efficitur est ac, scelerisque magna. Donec congue
												erat a suscipit condimentum. Curabitur purus nunc,
												ullamcorper vitae lectus quis, aliquam lacinia arcu.
											</AccordionItem>
										</Accordion>
									</CardBody>
								</Card>
							</WizardItem>
							<WizardItem id='step5'>
								<Card>
									<CardHeader>
										<CardTitle className='fs-3'>
											Is your business listed on the following directories?
										</CardTitle>
									</CardHeader>
									<CardBody>
										<div className='row g-4'>
											<div className='col-12'>
												<div className='mb-3 mb-lg-5'>
													<h5 className='fw-bold'>
														You can always change it later
													</h5>
												</div>
												<div className='business-listed mb-3'>
													<div className='row g-4 align-items-center'>
														<div className='col-lg-4'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='gbusinessyes1'
																		type='checkbox'
																		id='example'
																		value='checkbox value'
																	/>
																	http://www.easy.co.il/
																</div>
															</div>
														</div>
														<div className='col-lg-4'>
															<div className='mb-3'>
																<Button
																	color='success'
																	isLight
																	icon='Add'>
																	ADD TASK
																</Button>
															</div>
														</div>
													</div>
												</div>
												<div className='business-listed mb-3'>
													<div className='row g-4 align-items-center'>
														<div className='col-lg-4'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='gbusinessyes2'
																		type='checkbox'
																		id='example'
																		value='checkbox value'
																	/>
																	https://www.t.co.il/
																</div>
															</div>
														</div>
														<div className='col-lg-4'>
															<div className='mb-3'>
																<Button
																	color='success'
																	isLight
																	icon='Add'>
																	ADD TASK
																</Button>
															</div>
														</div>
													</div>
												</div>
												<div className='business-listed mb-3'>
													<div className='row g-4 align-items-center'>
														<div className='col-lg-4'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='gbusinessyes3'
																		type='checkbox'
																		id='example'
																		value='checkbox value'
																	/>
																	https://www.b144.co.il/indexes/clients/
																</div>
															</div>
														</div>
														<div className='col-lg-4'>
															<div className='mb-3'>
																<Button
																	color='success'
																	isLight
																	icon='Add'>
																	ADD TASK
																</Button>
															</div>
														</div>
													</div>
												</div>
												<div className='business-listed mb-3'>
													<div className='row g-4 align-items-center'>
														<div className='col-lg-4'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='gbusinessyes4'
																		type='checkbox'
																		id='example'
																		value='checkbox value'
																	/>
																	https://www.d.co.il/
																</div>
															</div>
														</div>
														<div className='col-lg-4'>
															<div className='mb-3'>
																<Button
																	color='success'
																	isLight
																	icon='Add'>
																	ADD TASK
																</Button>
															</div>
														</div>
													</div>
												</div>
												<div className='business-listed mb-3'>
													<div className='row g-4 align-items-center'>
														<div className='col-lg-4'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='gbusinessyes5'
																		type='checkbox'
																		id='example'
																		value='checkbox value'
																	/>
																	https://www.dunsguide.co.il/
																</div>
															</div>
														</div>
														<div className='col-lg-4'>
															<div className='mb-3'>
																<Button
																	color='success'
																	isLight
																	icon='Add'>
																	ADD TASK
																</Button>
															</div>
														</div>
													</div>
												</div>
												<div className='business-action mb-3'>
													<Button color='success' isLight icon='Add'>
														Add Directory
													</Button>
												</div>
											</div>
										</div>
									</CardBody>
									<CardBody>
										<Accordion id='gbusniessindexesfaq' shadow='sm'>
											<AccordionItem
												id='gbusniessindexesfaq1'
												title='More info about business indexes'>
												In at urna nec risus aliquam accumsan. Vivamus
												rutrum rhoncus massa, sed facilisis justo sodales
												vitae. Pellentesque mattis felis ac enim viverra
												faucibus. Curabitur maximus nibh massa, ut dictum
												quam scelerisque eget. Maecenas scelerisque egestas
												diam a posuere. Sed non vehicula nunc. Proin feugiat
												nisi ut mi mattis bibendum. Suspendisse lobortis
												libero ut libero semper, sed fermentum lectus
												commodo. Nam pretium mi sit amet purus imperdiet
												tempus. Aliquam congue ligula quis vulputate
												viverra. Morbi dapibus vitae odio vel luctus.
												Vivamus tellus tortor, aliquet id ultricies a,
												hendrerit non massa. Ut feugiat quam non
												sollicitudin molestie. Praesent ut ante mattis,
												efficitur est ac, scelerisque magna. Donec congue
												erat a suscipit condimentum. Curabitur purus nunc,
												ullamcorper vitae lectus quis, aliquam lacinia arcu.
											</AccordionItem>
										</Accordion>
									</CardBody>
								</Card>
							</WizardItem>
							<WizardItem id='step6'>
								<Card>
									<CardHeader>
										<CardTitle className='fs-3'>
											Is your business present on Facebook?
										</CardTitle>
									</CardHeader>
									<CardBody>
										<div className='facebook-page mb-4'>
											<div className='row'>
												<div className='col-12'>
													<div className='mb-3 mb-lg-5'>
														<h5 className='fw-bold'>
															You can always change it later
														</h5>
													</div>
													<div className='d-flex align-items-center mb-4'>
														<Avatar
															srcSet={FacebookImg}
															src={FacebookImg}
															size={40}
														/>
														<span className='ms-3'>
															<strong>
																Facebook - Business page
															</strong>
														</span>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='yes'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes
																	{/* <Field
																		className='form-check-input'
																		type='radio'
																		name='isSocialMedia'
																		value='yes'
																	/>
																	Yes */}
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<FormGroup id='mCustomer'>
																	<Input
																		placeholder='Lien profile (option) '
																		// onChange={formik.handleChange}
																		// onBlur={formik.handleBlur}
																		// value={formik.values.mCustomer}
																		// isValid={formik.isValid}
																		// isTouched={formik.touched.taskName}
																		// invalidFeedback={formik.errors.taskname}
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='no'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	No
																	{/* <Field
																		className='form-check-input'
																		type='radio'
																		name='isSocialMedia'
																		value='no'
																	/>
																	No */}
																</div>
															</div>
														</div>
													</div>

													<div className='row my-3'>
														<div className='col-12'>
															<h5 className='card-title'>
																Can Facebook help you promote your
																business?
															</h5>
														</div>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='canfacebbok'
																		type='radio'
																		id='canfacebbok'
																		value='checkbox value'
																	/>
																	No
																	{/* <Field
																		type='radio'
																		name='isSocialMediaimportant'
																		value='nope'
																	/>
																	Nope */}
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='canfacebbok'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Maybe, I’m not sure
																	{/* <Field
																		type='radio'
																		name='isSocialMediaimportant'
																		value='maybe'
																	/>
																	Maybe, I’m not sure */}
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='canfacebbok'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes, Sure
																	{/* <Field
																		type='radio'
																		name='isSocialMediaimportant'
																		value='yes'
																	/>
																	Yes, Sure */}
																</div>
															</div>
														</div>

														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<Button
																	color='success'
																	isLight
																	icon='Add'>
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
															srcSet={FacebookImg}
															src={FacebookImg}
															size={40}
														/>
														<span className='ms-3'>
															<strong>
																Facebook - private profile
															</strong>
														</span>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='facebookprivate'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<FormGroup id='mCustomer'>
																	<Input
																		placeholder='Lien private profile (option) '
																		// onChange={formik.handleChange}
																		// onBlur={formik.handleBlur}
																		// value={formik.values.mCustomer}
																		// isValid={formik.isValid}
																		// isTouched={formik.touched.taskName}
																		// invalidFeedback={formik.errors.taskname}
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='facebookprivate'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	No
																</div>
															</div>
														</div>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='facebookprivate2'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<FormGroup id='mCustomer'>
																	<Input
																		placeholder='Lien profile (option) '
																		// onChange={formik.handleChange}
																		// onBlur={formik.handleBlur}
																		// value={formik.values.mCustomer}
																		// isValid={formik.isValid}
																		// isTouched={formik.touched.taskName}
																		// invalidFeedback={formik.errors.taskname}
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='facebookprivate2'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	No
																</div>
															</div>
														</div>
													</div>
													<div className='row my-3'>
														<div className='col-12'>
															<h5 className='card-title'>
																Do you need a Facebook private
																profile to promote your business?
															</h5>
														</div>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='fbprivateprofile'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Nope
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='fbprivateprofile'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Maybe, I’m not sure
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='fbprivateprofile'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes, sure
																</div>
															</div>
														</div>

														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<Button
																	color='success'
																	isLight
																	icon='Add'>
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
															srcSet={FacebookImg}
															src={FacebookImg}
															size={40}
														/>
														<span className='ms-3'>
															<strong>Facebook - Group</strong>
														</span>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='facebooyesgroup'
																		type='radio'
																		id='facebooyesgroup'
																		value='checkbox value'
																		checked
																	/>
																	Yes
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<FormGroup id='mCustomer'>
																	<Input
																		placeholder='Lien facebook group (option)'
																		// onChange={formik.handleChange}
																		// onBlur={formik.handleBlur}
																		// value={formik.values.mCustomer}
																		// isValid={formik.isValid}
																		// isTouched={formik.touched.taskName}
																		// invalidFeedback={formik.errors.taskname}
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='facebooyesgroup'
																		type='radio'
																		id='facebooyesgroup'
																		value='checkbox value'
																	/>
																	No
																</div>
															</div>
														</div>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='facebooprofileyesgroup'
																		type='radio'
																		id='facebooyesgroup2'
																		value='checkbox value'
																	/>
																	Yes
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<FormGroup id='mCustomer'>
																	<Input
																		placeholder='Lien profile (option) '
																		// onChange={formik.handleChange}
																		// onBlur={formik.handleBlur}
																		// value={formik.values.mCustomer}
																		// isValid={formik.isValid}
																		// isTouched={formik.touched.taskName}
																		// invalidFeedback={formik.errors.taskname}
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='facebooprofileyesgroup'
																		type='radio'
																		id='facebooyesgroup2'
																		value='checkbox value'
																	/>
																	No
																</div>
															</div>
														</div>
													</div>
													<div className='row my-3'>
														<div className='col-12'>
															<h5 className='card-title'>
																Would a Facebook Group help you
																promote your business?
															</h5>
														</div>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='fbgrouphelp'
																		type='radio'
																		id='whouldexample'
																		value='checkbox value'
																	/>
																	Nope
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='fbgrouphelp'
																		type='radio'
																		id='whouldexample'
																		value='checkbox value'
																	/>
																	Maybe, I’m not sure
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='fbgrouphelp'
																		type='radio'
																		id='whouldexample'
																		value='checkbox value'
																	/>
																	Yes, sure
																</div>
															</div>
														</div>

														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<Button
																	color='success'
																	isLight
																	icon='Add'>
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
												title='More info about Facebook private profile'>
												In at urna nec risus aliquam accumsan. Vivamus
												rutrum rhoncus massa, sed facilisis justo sodales
												vitae. Pellentesque mattis felis ac enim viverra
												faucibus. Curabitur maximus nibh massa, ut dictum
												quam scelerisque eget. Maecenas scelerisque egestas
												diam a posuere. Sed non vehicula nunc. Proin feugiat
												nisi ut mi mattis bibendum. Suspendisse lobortis
												libero ut libero semper, sed fermentum lectus
												commodo. Nam pretium mi sit amet purus imperdiet
												tempus. Aliquam congue ligula quis vulputate
												viverra. Morbi dapibus vitae odio vel luctus.
												Vivamus tellus tortor, aliquet id ultricies a,
												hendrerit non massa. Ut feugiat quam non
												sollicitudin molestie. Praesent ut ante mattis,
												efficitur est ac, scelerisque magna. Donec congue
												erat a suscipit condimentum. Curabitur purus nunc,
												ullamcorper vitae lectus quis, aliquam lacinia arcu.
											</AccordionItem>
											<AccordionItem
												id='faq2'
												title='More info about Facebook business page'>
												Nunc ex odio, fermentum dignissim urna eu, suscipit
												vehicula magna. Vestibulum vel risus sed metus
												pellentesque gravida. Etiam hendrerit lorem vitae
												elit tempor bibendum. Vivamus tincidunt consectetur
												erat at venenatis. Nam elementum varius massa non
												congue. Class aptent taciti sociosqu ad litora
												torquent per conubia nostra, per inceptos himenaeos.
												Vivamus fermentum scelerisque ligula, quis bibendum
												felis luctus quis. Donec magna sem, ullamcorper id
												tempus ut, pharetra sed felis. Ut quis ante
												tristique, condimentum lacus eget, mollis magna.
												Phasellus fringilla diam ac erat consequat feugiat.
												Vestibulum eu ex eget ligula placerat finibus.
												Quisque vitae velit feugiat, mattis lectus nec,
												molestie justo. Vivamus nec tincidunt augue.
												Pellentesque nec mattis ipsum, non malesuada libero.
												Proin aliquam est turpis, sit amet efficitur ex
												gravida ac. Nunc in molestie augue.
											</AccordionItem>
											<AccordionItem
												id='faq2'
												title='More info about Facebook groups'>
												Nunc ex odio, fermentum dignissim urna eu, suscipit
												vehicula magna. Vestibulum vel risus sed metus
												pellentesque gravida. Etiam hendrerit lorem vitae
												elit tempor bibendum. Vivamus tincidunt consectetur
												erat at venenatis. Nam elementum varius massa non
												congue. Class aptent taciti sociosqu ad litora
												torquent per conubia nostra, per inceptos himenaeos.
												Vivamus fermentum scelerisque ligula, quis bibendum
												felis luctus quis. Donec magna sem, ullamcorper id
												tempus ut, pharetra sed felis. Ut quis ante
												tristique, condimentum lacus eget, mollis magna.
												Phasellus fringilla diam ac erat consequat feugiat.
												Vestibulum eu ex eget ligula placerat finibus.
												Quisque vitae velit feugiat, mattis lectus nec,
												molestie justo. Vivamus nec tincidunt augue.
												Pellentesque nec mattis ipsum, non malesuada libero.
												Proin aliquam est turpis, sit amet efficitur ex
												gravida ac. Nunc in molestie augue.
											</AccordionItem>
										</Accordion>
									</CardBody>
								</Card>
							</WizardItem>
							<WizardItem id='step7'>
								<Card>
									<CardHeader>
										<CardTitle className='fs-3'>
											Is your business present on Instagram?
										</CardTitle>
									</CardHeader>
									<CardBody>
										<div className='instagram-page mb-4'>
											<div className='row'>
												<div className='col-12'>
													<div className='mb-3 mb-lg-5'>
														<h5 className='fw-bold'>
															You can always change it later
														</h5>
													</div>
													<div className='d-flex align-items-center mb-4'>
														<Avatar
															srcSet={InstagramImg}
															src={InstagramImg}
															size={40}
														/>
														<span className='ms-3'>
															<strong>
																Instagram - Business page
															</strong>
														</span>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='iyes'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes
																	{/* <Field
																		className='form-check-input'
																		type='radio'
																		name='isSocialMedia'
																		value='yes'
																	/>
																	Yes */}
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<FormGroup id='mCustomer'>
																	<Input
																		placeholder='Lien profile (option) '
																		// onChange={formik.handleChange}
																		// onBlur={formik.handleBlur}
																		// value={formik.values.mCustomer}
																		// isValid={formik.isValid}
																		// isTouched={formik.touched.taskName}
																		// invalidFeedback={formik.errors.taskname}
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ino'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	No
																	{/* <Field
																		className='form-check-input'
																		type='radio'
																		name='isSocialMedia'
																		value='no'
																	/>
																	No */}
																</div>
															</div>
														</div>
													</div>

													<div className='row my-3'>
														<div className='col-12'>
															<h5 className='card-title'>
																Can Instagram help you promote your
																business?
															</h5>
														</div>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='icanfacebbok'
																		type='radio'
																		id='canfacebbok'
																		value='checkbox value'
																	/>
																	No
																	{/* <Field
																		type='radio'
																		name='isSocialMediaimportant'
																		value='nope'
																	/>
																	Nope */}
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='icanfacebbok'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Maybe, I’m not sure
																	{/* <Field
																		type='radio'
																		name='isSocialMediaimportant'
																		value='maybe'
																	/>
																	Maybe, I’m not sure */}
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='icanfacebbok'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes, Sure
																	{/* <Field
																		type='radio'
																		name='isSocialMediaimportant'
																		value='yes'
																	/>
																	Yes, Sure */}
																</div>
															</div>
														</div>

														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<Button
																	color='success'
																	isLight
																	icon='Add'>
																	Add Task
																</Button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className='instagram-page mb-4'>
											<div className='row'>
												<div className='col-12'>
													<div className='d-flex align-items-center mb-4'>
														<Avatar
															srcSet={InstagramImg}
															src={InstagramImg}
															size={40}
														/>
														<span className='ms-3'>
															<strong>
																Instagram - private profile
															</strong>
														</span>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifacebookprivate'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<FormGroup id='mCustomer'>
																	<Input
																		placeholder='Lien private profile (option) '
																		// onChange={formik.handleChange}
																		// onBlur={formik.handleBlur}
																		// value={formik.values.mCustomer}
																		// isValid={formik.isValid}
																		// isTouched={formik.touched.taskName}
																		// invalidFeedback={formik.errors.taskname}
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifacebookprivate'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	No
																</div>
															</div>
														</div>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifacebookprivate2'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<FormGroup id='mCustomer'>
																	<Input
																		placeholder='Lien profile (option) '
																		// onChange={formik.handleChange}
																		// onBlur={formik.handleBlur}
																		// value={formik.values.mCustomer}
																		// isValid={formik.isValid}
																		// isTouched={formik.touched.taskName}
																		// invalidFeedback={formik.errors.taskname}
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='facebookprivate2'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	No
																</div>
															</div>
														</div>
													</div>
													<div className='row my-3'>
														<div className='col-12'>
															<h5 className='card-title'>
																Do you need a Instagram private
																profile to promote your business?
															</h5>
														</div>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifbprivateprofile'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Nope
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifbprivateprofile'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Maybe, I’m not sure
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifbprivateprofile'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes, sure
																</div>
															</div>
														</div>

														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<Button
																	color='success'
																	isLight
																	icon='Add'>
																	Add Task
																</Button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className='instagram-page mb-4'>
											<div className='row'>
												<div className='col-12'>
													<div className='d-flex align-items-center mb-4'>
														<Avatar
															srcSet={InstagramImg}
															src={InstagramImg}
															size={40}
														/>
														<span className='ms-3'>
															<strong>Instagram - Group</strong>
														</span>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifacebooyesgroup'
																		type='radio'
																		id='facebooyesgroup'
																		value='checkbox value'
																		checked
																	/>
																	Yes
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<FormGroup id='mCustomer'>
																	<Input
																		placeholder='Lien facebook group (option)'
																		// onChange={formik.handleChange}
																		// onBlur={formik.handleBlur}
																		// value={formik.values.mCustomer}
																		// isValid={formik.isValid}
																		// isTouched={formik.touched.taskName}
																		// invalidFeedback={formik.errors.taskname}
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifacebooyesgroup'
																		type='radio'
																		id='facebooyesgroup'
																		value='checkbox value'
																	/>
																	No
																</div>
															</div>
														</div>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifacebooprofileyesgroup'
																		type='radio'
																		id='facebooyesgroup2'
																		value='checkbox value'
																	/>
																	Yes
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<FormGroup id='mCustomer'>
																	<Input
																		placeholder='Lien profile (option) '
																		// onChange={formik.handleChange}
																		// onBlur={formik.handleBlur}
																		// value={formik.values.mCustomer}
																		// isValid={formik.isValid}
																		// isTouched={formik.touched.taskName}
																		// invalidFeedback={formik.errors.taskname}
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='facebooprofileyesgroup'
																		type='radio'
																		id='facebooyesgroup2'
																		value='checkbox value'
																	/>
																	No
																</div>
															</div>
														</div>
													</div>
													<div className='row my-3'>
														<div className='col-12'>
															<h5 className='card-title'>
																Would a Instagram Group help you
																promote your business?
															</h5>
														</div>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifbgrouphelp'
																		type='radio'
																		id='whouldexample'
																		value='checkbox value'
																	/>
																	Nope
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifbgrouphelp'
																		type='radio'
																		id='whouldexample'
																		value='checkbox value'
																	/>
																	Maybe, I’m not sure
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifbgrouphelp'
																		type='radio'
																		id='whouldexample'
																		value='checkbox value'
																	/>
																	Yes, sure
																</div>
															</div>
														</div>

														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<Button
																	color='success'
																	isLight
																	icon='Add'>
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
												title='More info about Instagram private profile'>
												In at urna nec risus aliquam accumsan. Vivamus
												rutrum rhoncus massa, sed facilisis justo sodales
												vitae. Pellentesque mattis felis ac enim viverra
												faucibus. Curabitur maximus nibh massa, ut dictum
												quam scelerisque eget. Maecenas scelerisque egestas
												diam a posuere. Sed non vehicula nunc. Proin feugiat
												nisi ut mi mattis bibendum. Suspendisse lobortis
												libero ut libero semper, sed fermentum lectus
												commodo. Nam pretium mi sit amet purus imperdiet
												tempus. Aliquam congue ligula quis vulputate
												viverra. Morbi dapibus vitae odio vel luctus.
												Vivamus tellus tortor, aliquet id ultricies a,
												hendrerit non massa. Ut feugiat quam non
												sollicitudin molestie. Praesent ut ante mattis,
												efficitur est ac, scelerisque magna. Donec congue
												erat a suscipit condimentum. Curabitur purus nunc,
												ullamcorper vitae lectus quis, aliquam lacinia arcu.
											</AccordionItem>
											<AccordionItem
												id='faq2'
												title='More info about Instagram business page'>
												Nunc ex odio, fermentum dignissim urna eu, suscipit
												vehicula magna. Vestibulum vel risus sed metus
												pellentesque gravida. Etiam hendrerit lorem vitae
												elit tempor bibendum. Vivamus tincidunt consectetur
												erat at venenatis. Nam elementum varius massa non
												congue. Class aptent taciti sociosqu ad litora
												torquent per conubia nostra, per inceptos himenaeos.
												Vivamus fermentum scelerisque ligula, quis bibendum
												felis luctus quis. Donec magna sem, ullamcorper id
												tempus ut, pharetra sed felis. Ut quis ante
												tristique, condimentum lacus eget, mollis magna.
												Phasellus fringilla diam ac erat consequat feugiat.
												Vestibulum eu ex eget ligula placerat finibus.
												Quisque vitae velit feugiat, mattis lectus nec,
												molestie justo. Vivamus nec tincidunt augue.
												Pellentesque nec mattis ipsum, non malesuada libero.
												Proin aliquam est turpis, sit amet efficitur ex
												gravida ac. Nunc in molestie augue.
											</AccordionItem>
											<AccordionItem
												id='faq2'
												title='More info about Instagram groups'>
												Nunc ex odio, fermentum dignissim urna eu, suscipit
												vehicula magna. Vestibulum vel risus sed metus
												pellentesque gravida. Etiam hendrerit lorem vitae
												elit tempor bibendum. Vivamus tincidunt consectetur
												erat at venenatis. Nam elementum varius massa non
												congue. Class aptent taciti sociosqu ad litora
												torquent per conubia nostra, per inceptos himenaeos.
												Vivamus fermentum scelerisque ligula, quis bibendum
												felis luctus quis. Donec magna sem, ullamcorper id
												tempus ut, pharetra sed felis. Ut quis ante
												tristique, condimentum lacus eget, mollis magna.
												Phasellus fringilla diam ac erat consequat feugiat.
												Vestibulum eu ex eget ligula placerat finibus.
												Quisque vitae velit feugiat, mattis lectus nec,
												molestie justo. Vivamus nec tincidunt augue.
												Pellentesque nec mattis ipsum, non malesuada libero.
												Proin aliquam est turpis, sit amet efficitur ex
												gravida ac. Nunc in molestie augue.
											</AccordionItem>
										</Accordion>
									</CardBody>
								</Card>
							</WizardItem>
							<WizardItem id='step8'>
								<Card>
									<CardHeader>
										<CardTitle className='fs-3'>
											Is your business present on Linkedin?
										</CardTitle>
									</CardHeader>
									<CardBody>
										<div className='linkedin-page mb-4'>
											<div className='row'>
												<div className='col-12'>
													<div className='mb-3 mb-lg-5'>
														<h5 className='fw-bold'>
															You can always change it later
														</h5>
													</div>
													<div className='d-flex align-items-center mb-4'>
														<Avatar
															srcSet={LinkedinImg}
															src={LinkedinImg}
															size={40}
														/>
														<span className='ms-3'>
															<strong>
																Linkedin - Business page
															</strong>
														</span>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='iyes'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes
																	{/* <Field
																		className='form-check-input'
																		type='radio'
																		name='isSocialMedia'
																		value='yes'
																	/>
																	Yes */}
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<FormGroup id='mCustomer'>
																	<Input
																		placeholder='Lien profile (option) '
																		// onChange={formik.handleChange}
																		// onBlur={formik.handleBlur}
																		// value={formik.values.mCustomer}
																		// isValid={formik.isValid}
																		// isTouched={formik.touched.taskName}
																		// invalidFeedback={formik.errors.taskname}
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ino'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	No
																	{/* <Field
																		className='form-check-input'
																		type='radio'
																		name='isSocialMedia'
																		value='no'
																	/>
																	No */}
																</div>
															</div>
														</div>
													</div>

													<div className='row my-3'>
														<div className='col-12'>
															<h5 className='card-title'>
																Can Instagram help you promote your
																business?
															</h5>
														</div>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='icanfacebbok'
																		type='radio'
																		id='canfacebbok'
																		value='checkbox value'
																	/>
																	No
																	{/* <Field
																		type='radio'
																		name='isSocialMediaimportant'
																		value='nope'
																	/>
																	Nope */}
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='icanfacebbok'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Maybe, I’m not sure
																	{/* <Field
																		type='radio'
																		name='isSocialMediaimportant'
																		value='maybe'
																	/>
																	Maybe, I’m not sure */}
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='icanfacebbok'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes, Sure
																	{/* <Field
																		type='radio'
																		name='isSocialMediaimportant'
																		value='yes'
																	/>
																	Yes, Sure */}
																</div>
															</div>
														</div>

														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<Button
																	color='success'
																	isLight
																	icon='Add'>
																	Add Task
																</Button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className='linkedin-page mb-4'>
											<div className='row'>
												<div className='col-12'>
													<div className='d-flex align-items-center mb-4'>
														<Avatar
															srcSet={LinkedinImg}
															src={LinkedinImg}
															size={40}
														/>
														<span className='ms-3'>
															<strong>
																Linkedin - private profile
															</strong>
														</span>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifacebookprivate'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<FormGroup id='mCustomer'>
																	<Input
																		placeholder='Lien private profile (option) '
																		// onChange={formik.handleChange}
																		// onBlur={formik.handleBlur}
																		// value={formik.values.mCustomer}
																		// isValid={formik.isValid}
																		// isTouched={formik.touched.taskName}
																		// invalidFeedback={formik.errors.taskname}
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifacebookprivate'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	No
																</div>
															</div>
														</div>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifacebookprivate2'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<FormGroup id='mCustomer'>
																	<Input
																		placeholder='Lien profile (option) '
																		// onChange={formik.handleChange}
																		// onBlur={formik.handleBlur}
																		// value={formik.values.mCustomer}
																		// isValid={formik.isValid}
																		// isTouched={formik.touched.taskName}
																		// invalidFeedback={formik.errors.taskname}
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='facebookprivate2'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	No
																</div>
															</div>
														</div>
													</div>
													<div className='row my-3'>
														<div className='col-12'>
															<h5 className='card-title'>
																Do you need a Instagram private
																profile to promote your business?
															</h5>
														</div>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifbprivateprofile'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Nope
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifbprivateprofile'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Maybe, I’m not sure
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifbprivateprofile'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes, sure
																</div>
															</div>
														</div>

														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<Button
																	color='success'
																	isLight
																	icon='Add'>
																	Add Task
																</Button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className='instagram-page mb-4'>
											<div className='row'>
												<div className='col-12'>
													<div className='d-flex align-items-center mb-4'>
														<Avatar
															srcSet={LinkedinImg}
															src={LinkedinImg}
															size={40}
														/>
														<span className='ms-3'>
															<strong>Linkedin - Group</strong>
														</span>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifacebooyesgroup'
																		type='radio'
																		id='facebooyesgroup'
																		value='checkbox value'
																		checked
																	/>
																	Yes
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<FormGroup id='mCustomer'>
																	<Input
																		placeholder='Lien facebook group (option)'
																		// onChange={formik.handleChange}
																		// onBlur={formik.handleBlur}
																		// value={formik.values.mCustomer}
																		// isValid={formik.isValid}
																		// isTouched={formik.touched.taskName}
																		// invalidFeedback={formik.errors.taskname}
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifacebooyesgroup'
																		type='radio'
																		id='facebooyesgroup'
																		value='checkbox value'
																	/>
																	No
																</div>
															</div>
														</div>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifacebooprofileyesgroup'
																		type='radio'
																		id='facebooyesgroup2'
																		value='checkbox value'
																	/>
																	Yes
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<FormGroup id='mCustomer'>
																	<Input
																		placeholder='Lien profile (option) '
																		// onChange={formik.handleChange}
																		// onBlur={formik.handleBlur}
																		// value={formik.values.mCustomer}
																		// isValid={formik.isValid}
																		// isTouched={formik.touched.taskName}
																		// invalidFeedback={formik.errors.taskname}
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='facebooprofileyesgroup'
																		type='radio'
																		id='facebooyesgroup2'
																		value='checkbox value'
																	/>
																	No
																</div>
															</div>
														</div>
													</div>
													<div className='row my-3'>
														<div className='col-12'>
															<h5 className='card-title'>
																Would a Instagram Group help you
																promote your business?
															</h5>
														</div>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifbgrouphelp'
																		type='radio'
																		id='whouldexample'
																		value='checkbox value'
																	/>
																	Nope
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifbgrouphelp'
																		type='radio'
																		id='whouldexample'
																		value='checkbox value'
																	/>
																	Maybe, I’m not sure
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifbgrouphelp'
																		type='radio'
																		id='whouldexample'
																		value='checkbox value'
																	/>
																	Yes, sure
																</div>
															</div>
														</div>

														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<Button
																	color='success'
																	isLight
																	icon='Add'>
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
										<Accordion id='instagram' shadow='sm'>
											<AccordionItem
												id='instagram1'
												title='More info about Instagram private profile'>
												In at urna nec risus aliquam accumsan. Vivamus
												rutrum rhoncus massa, sed facilisis justo sodales
												vitae. Pellentesque mattis felis ac enim viverra
												faucibus. Curabitur maximus nibh massa, ut dictum
												quam scelerisque eget. Maecenas scelerisque egestas
												diam a posuere. Sed non vehicula nunc. Proin feugiat
												nisi ut mi mattis bibendum. Suspendisse lobortis
												libero ut libero semper, sed fermentum lectus
												commodo. Nam pretium mi sit amet purus imperdiet
												tempus. Aliquam congue ligula quis vulputate
												viverra. Morbi dapibus vitae odio vel luctus.
												Vivamus tellus tortor, aliquet id ultricies a,
												hendrerit non massa. Ut feugiat quam non
												sollicitudin molestie. Praesent ut ante mattis,
												efficitur est ac, scelerisque magna. Donec congue
												erat a suscipit condimentum. Curabitur purus nunc,
												ullamcorper vitae lectus quis, aliquam lacinia arcu.
											</AccordionItem>
											<AccordionItem
												id='instagram2'
												title='More info about Instagram business page'>
												Nunc ex odio, fermentum dignissim urna eu, suscipit
												vehicula magna. Vestibulum vel risus sed metus
												pellentesque gravida. Etiam hendrerit lorem vitae
												elit tempor bibendum. Vivamus tincidunt consectetur
												erat at venenatis. Nam elementum varius massa non
												congue. Class aptent taciti sociosqu ad litora
												torquent per conubia nostra, per inceptos himenaeos.
												Vivamus fermentum scelerisque ligula, quis bibendum
												felis luctus quis. Donec magna sem, ullamcorper id
												tempus ut, pharetra sed felis. Ut quis ante
												tristique, condimentum lacus eget, mollis magna.
												Phasellus fringilla diam ac erat consequat feugiat.
												Vestibulum eu ex eget ligula placerat finibus.
												Quisque vitae velit feugiat, mattis lectus nec,
												molestie justo. Vivamus nec tincidunt augue.
												Pellentesque nec mattis ipsum, non malesuada libero.
												Proin aliquam est turpis, sit amet efficitur ex
												gravida ac. Nunc in molestie augue.
											</AccordionItem>
											<AccordionItem
												id='instagram3'
												title='More info about Instagram groups'>
												Nunc ex odio, fermentum dignissim urna eu, suscipit
												vehicula magna. Vestibulum vel risus sed metus
												pellentesque gravida. Etiam hendrerit lorem vitae
												elit tempor bibendum. Vivamus tincidunt consectetur
												erat at venenatis. Nam elementum varius massa non
												congue. Class aptent taciti sociosqu ad litora
												torquent per conubia nostra, per inceptos himenaeos.
												Vivamus fermentum scelerisque ligula, quis bibendum
												felis luctus quis. Donec magna sem, ullamcorper id
												tempus ut, pharetra sed felis. Ut quis ante
												tristique, condimentum lacus eget, mollis magna.
												Phasellus fringilla diam ac erat consequat feugiat.
												Vestibulum eu ex eget ligula placerat finibus.
												Quisque vitae velit feugiat, mattis lectus nec,
												molestie justo. Vivamus nec tincidunt augue.
												Pellentesque nec mattis ipsum, non malesuada libero.
												Proin aliquam est turpis, sit amet efficitur ex
												gravida ac. Nunc in molestie augue.
											</AccordionItem>
										</Accordion>
									</CardBody>
								</Card>
							</WizardItem>
							<WizardItem id='step9'>
								<Card>
									<CardHeader>
										<CardTitle className='fs-3'>
											Is your business present on Pinterest?
										</CardTitle>
									</CardHeader>
									<CardBody>
										<div className='pinterest-page mb-4'>
											<div className='row'>
												<div className='col-12'>
													<div className='mb-3 mb-lg-5'>
														<h5 className='fw-bold'>
															You can always change it later
														</h5>
													</div>
													<div className='d-flex align-items-center mb-4'>
														<Avatar
															srcSet={PinterestImg}
															src={PinterestImg}
															size={40}
														/>
														<span className='ms-3'>
															<strong>
																Pinterest - Business page
															</strong>
														</span>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='iyes'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes
																	{/* <Field
																		className='form-check-input'
																		type='radio'
																		name='isSocialMedia'
																		value='yes'
																	/>
																	Yes */}
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<FormGroup id='mCustomer'>
																	<Input
																		placeholder='Lien profile (option) '
																		// onChange={formik.handleChange}
																		// onBlur={formik.handleBlur}
																		// value={formik.values.mCustomer}
																		// isValid={formik.isValid}
																		// isTouched={formik.touched.taskName}
																		// invalidFeedback={formik.errors.taskname}
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ino'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	No
																	{/* <Field
																		className='form-check-input'
																		type='radio'
																		name='isSocialMedia'
																		value='no'
																	/>
																	No */}
																</div>
															</div>
														</div>
													</div>

													<div className='row my-3'>
														<div className='col-12'>
															<h5 className='card-title'>
																Can Pinterest help you promote your
																business?
															</h5>
														</div>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='icanfacebbok'
																		type='radio'
																		id='canfacebbok'
																		value='checkbox value'
																	/>
																	No
																	{/* <Field
																		type='radio'
																		name='isSocialMediaimportant'
																		value='nope'
																	/>
																	Nope */}
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='icanfacebbok'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Maybe, I’m not sure
																	{/* <Field
																		type='radio'
																		name='isSocialMediaimportant'
																		value='maybe'
																	/>
																	Maybe, I’m not sure */}
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='icanfacebbok'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes, Sure
																	{/* <Field
																		type='radio'
																		name='isSocialMediaimportant'
																		value='yes'
																	/>
																	Yes, Sure */}
																</div>
															</div>
														</div>

														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<Button
																	color='success'
																	isLight
																	icon='Add'>
																	Add Task
																</Button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className='pinterest-page mb-4'>
											<div className='row'>
												<div className='col-12'>
													<div className='d-flex align-items-center mb-4'>
														<Avatar
															srcSet={PinterestImg}
															src={PinterestImg}
															size={40}
														/>
														<span className='ms-3'>
															<strong>
																Pinterest - private profile
															</strong>
														</span>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifacebookprivate'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<FormGroup id='mCustomer'>
																	<Input
																		placeholder='Lien private profile (option) '
																		// onChange={formik.handleChange}
																		// onBlur={formik.handleBlur}
																		// value={formik.values.mCustomer}
																		// isValid={formik.isValid}
																		// isTouched={formik.touched.taskName}
																		// invalidFeedback={formik.errors.taskname}
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifacebookprivate'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	No
																</div>
															</div>
														</div>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifacebookprivate2'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<FormGroup id='mCustomer'>
																	<Input
																		placeholder='Lien profile (option) '
																		// onChange={formik.handleChange}
																		// onBlur={formik.handleBlur}
																		// value={formik.values.mCustomer}
																		// isValid={formik.isValid}
																		// isTouched={formik.touched.taskName}
																		// invalidFeedback={formik.errors.taskname}
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='facebookprivate2'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	No
																</div>
															</div>
														</div>
													</div>
													<div className='row my-3'>
														<div className='col-12'>
															<h5 className='card-title'>
																Do you need a Pinterest private
																profile to promote your business?
															</h5>
														</div>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifbprivateprofile'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Nope
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifbprivateprofile'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Maybe, I’m not sure
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifbprivateprofile'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes, sure
																</div>
															</div>
														</div>

														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<Button
																	color='success'
																	isLight
																	icon='Add'>
																	Add Task
																</Button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className='pinterest-page mb-4'>
											<div className='row'>
												<div className='col-12'>
													<div className='d-flex align-items-center mb-4'>
														<Avatar
															srcSet={PinterestImg}
															src={PinterestImg}
															size={40}
														/>
														<span className='ms-3'>
															<strong>Pinterest - Group</strong>
														</span>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifacebooyesgroup'
																		type='radio'
																		id='facebooyesgroup'
																		value='checkbox value'
																		checked
																	/>
																	Yes
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<FormGroup id='mCustomer'>
																	<Input
																		placeholder='Lien facebook group (option)'
																		// onChange={formik.handleChange}
																		// onBlur={formik.handleBlur}
																		// value={formik.values.mCustomer}
																		// isValid={formik.isValid}
																		// isTouched={formik.touched.taskName}
																		// invalidFeedback={formik.errors.taskname}
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifacebooyesgroup'
																		type='radio'
																		id='facebooyesgroup'
																		value='checkbox value'
																	/>
																	No
																</div>
															</div>
														</div>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifacebooprofileyesgroup'
																		type='radio'
																		id='facebooyesgroup2'
																		value='checkbox value'
																	/>
																	Yes
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<FormGroup id='mCustomer'>
																	<Input
																		placeholder='Lien profile (option) '
																		// onChange={formik.handleChange}
																		// onBlur={formik.handleBlur}
																		// value={formik.values.mCustomer}
																		// isValid={formik.isValid}
																		// isTouched={formik.touched.taskName}
																		// invalidFeedback={formik.errors.taskname}
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='facebooprofileyesgroup'
																		type='radio'
																		id='facebooyesgroup2'
																		value='checkbox value'
																	/>
																	No
																</div>
															</div>
														</div>
													</div>
													<div className='row my-3'>
														<div className='col-12'>
															<h5 className='card-title'>
																Would a Pinterest Group help you
																promote your business?
															</h5>
														</div>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifbgrouphelp'
																		type='radio'
																		id='whouldexample'
																		value='checkbox value'
																	/>
																	Nope
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifbgrouphelp'
																		type='radio'
																		id='whouldexample'
																		value='checkbox value'
																	/>
																	Maybe, I’m not sure
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifbgrouphelp'
																		type='radio'
																		id='whouldexample'
																		value='checkbox value'
																	/>
																	Yes, sure
																</div>
															</div>
														</div>

														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<Button
																	color='success'
																	isLight
																	icon='Add'>
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
										<Accordion id='pinterest' shadow='sm'>
											<AccordionItem
												id='pinterest3'
												title='More info about Pinterest private profile'>
												In at urna nec risus aliquam accumsan. Vivamus
												rutrum rhoncus massa, sed facilisis justo sodales
												vitae. Pellentesque mattis felis ac enim viverra
												faucibus. Curabitur maximus nibh massa, ut dictum
												quam scelerisque eget. Maecenas scelerisque egestas
												diam a posuere. Sed non vehicula nunc. Proin feugiat
												nisi ut mi mattis bibendum. Suspendisse lobortis
												libero ut libero semper, sed fermentum lectus
												commodo. Nam pretium mi sit amet purus imperdiet
												tempus. Aliquam congue ligula quis vulputate
												viverra. Morbi dapibus vitae odio vel luctus.
												Vivamus tellus tortor, aliquet id ultricies a,
												hendrerit non massa. Ut feugiat quam non
												sollicitudin molestie. Praesent ut ante mattis,
												efficitur est ac, scelerisque magna. Donec congue
												erat a suscipit condimentum. Curabitur purus nunc,
												ullamcorper vitae lectus quis, aliquam lacinia arcu.
											</AccordionItem>
											<AccordionItem
												id='pinterest2'
												title='More info about Pinterest business page'>
												Nunc ex odio, fermentum dignissim urna eu, suscipit
												vehicula magna. Vestibulum vel risus sed metus
												pellentesque gravida. Etiam hendrerit lorem vitae
												elit tempor bibendum. Vivamus tincidunt consectetur
												erat at venenatis. Nam elementum varius massa non
												congue. Class aptent taciti sociosqu ad litora
												torquent per conubia nostra, per inceptos himenaeos.
												Vivamus fermentum scelerisque ligula, quis bibendum
												felis luctus quis. Donec magna sem, ullamcorper id
												tempus ut, pharetra sed felis. Ut quis ante
												tristique, condimentum lacus eget, mollis magna.
												Phasellus fringilla diam ac erat consequat feugiat.
												Vestibulum eu ex eget ligula placerat finibus.
												Quisque vitae velit feugiat, mattis lectus nec,
												molestie justo. Vivamus nec tincidunt augue.
												Pellentesque nec mattis ipsum, non malesuada libero.
												Proin aliquam est turpis, sit amet efficitur ex
												gravida ac. Nunc in molestie augue.
											</AccordionItem>
											<AccordionItem
												id='pinterest3'
												title='More info about Pinterest groups'>
												Nunc ex odio, fermentum dignissim urna eu, suscipit
												vehicula magna. Vestibulum vel risus sed metus
												pellentesque gravida. Etiam hendrerit lorem vitae
												elit tempor bibendum. Vivamus tincidunt consectetur
												erat at venenatis. Nam elementum varius massa non
												congue. Class aptent taciti sociosqu ad litora
												torquent per conubia nostra, per inceptos himenaeos.
												Vivamus fermentum scelerisque ligula, quis bibendum
												felis luctus quis. Donec magna sem, ullamcorper id
												tempus ut, pharetra sed felis. Ut quis ante
												tristique, condimentum lacus eget, mollis magna.
												Phasellus fringilla diam ac erat consequat feugiat.
												Vestibulum eu ex eget ligula placerat finibus.
												Quisque vitae velit feugiat, mattis lectus nec,
												molestie justo. Vivamus nec tincidunt augue.
												Pellentesque nec mattis ipsum, non malesuada libero.
												Proin aliquam est turpis, sit amet efficitur ex
												gravida ac. Nunc in molestie augue.
											</AccordionItem>
										</Accordion>
									</CardBody>
								</Card>
							</WizardItem>
							<WizardItem id='step10'>
								<Card>
									<CardHeader>
										<CardTitle className='fs-3'>
											Is your business present on Tiktok?
										</CardTitle>
									</CardHeader>
									<CardBody>
										<div className='tiktok-page mb-4'>
											<div className='row'>
												<div className='col-12'>
													<div className='mb-3 mb-lg-5'>
														<h5 className='fw-bold'>
															You can always change it later
														</h5>
													</div>
													<div className='d-flex align-items-center mb-4'>
														<Avatar
															srcSet={TicktokImg}
															src={TicktokImg}
															size={40}
														/>
														<span className='ms-3'>
															<strong>Tiktok - Business page</strong>
														</span>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='iyes'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes
																	{/* <Field
																		className='form-check-input'
																		type='radio'
																		name='isSocialMedia'
																		value='yes'
																	/>
																	Yes */}
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<FormGroup id='mCustomer'>
																	<Input
																		placeholder='Lien profile (option) '
																		// onChange={formik.handleChange}
																		// onBlur={formik.handleBlur}
																		// value={formik.values.mCustomer}
																		// isValid={formik.isValid}
																		// isTouched={formik.touched.taskName}
																		// invalidFeedback={formik.errors.taskname}
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ino'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	No
																	{/* <Field
																		className='form-check-input'
																		type='radio'
																		name='isSocialMedia'
																		value='no'
																	/>
																	No */}
																</div>
															</div>
														</div>
													</div>

													<div className='row my-3'>
														<div className='col-12'>
															<h5 className='card-title'>
																Can Pinterest help you promote your
																business?
															</h5>
														</div>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='icanfacebbok'
																		type='radio'
																		id='canfacebbok'
																		value='checkbox value'
																	/>
																	No
																	{/* <Field
																		type='radio'
																		name='isSocialMediaimportant'
																		value='nope'
																	/>
																	Nope */}
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='icanfacebbok'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Maybe, I’m not sure
																	{/* <Field
																		type='radio'
																		name='isSocialMediaimportant'
																		value='maybe'
																	/>
																	Maybe, I’m not sure */}
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='icanfacebbok'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes, Sure
																	{/* <Field
																		type='radio'
																		name='isSocialMediaimportant'
																		value='yes'
																	/>
																	Yes, Sure */}
																</div>
															</div>
														</div>

														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<Button
																	color='success'
																	isLight
																	icon='Add'>
																	Add Task
																</Button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className='tiktok-page mb-4'>
											<div className='row'>
												<div className='col-12'>
													<div className='d-flex align-items-center mb-4'>
														<Avatar
															srcSet={TicktokImg}
															src={TicktokImg}
															size={40}
														/>
														<span className='ms-3'>
															<strong>
																Tiktok - private profile
															</strong>
														</span>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifacebookprivate'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<FormGroup id='mCustomer'>
																	<Input
																		placeholder='Lien private profile (option) '
																		// onChange={formik.handleChange}
																		// onBlur={formik.handleBlur}
																		// value={formik.values.mCustomer}
																		// isValid={formik.isValid}
																		// isTouched={formik.touched.taskName}
																		// invalidFeedback={formik.errors.taskname}
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifacebookprivate'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	No
																</div>
															</div>
														</div>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifacebookprivate2'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<FormGroup id='mCustomer'>
																	<Input
																		placeholder='Lien profile (option) '
																		// onChange={formik.handleChange}
																		// onBlur={formik.handleBlur}
																		// value={formik.values.mCustomer}
																		// isValid={formik.isValid}
																		// isTouched={formik.touched.taskName}
																		// invalidFeedback={formik.errors.taskname}
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='facebookprivate2'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	No
																</div>
															</div>
														</div>
													</div>
													<div className='row my-3'>
														<div className='col-12'>
															<h5 className='card-title'>
																Do you need a Tiktok private profile
																to promote your business?
															</h5>
														</div>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifbprivateprofile'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Nope
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifbprivateprofile'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Maybe, I’m not sure
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifbprivateprofile'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes, sure
																</div>
															</div>
														</div>

														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<Button
																	color='success'
																	isLight
																	icon='Add'>
																	Add Task
																</Button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className='instagram-page mb-4'>
											<div className='row'>
												<div className='col-12'>
													<div className='d-flex align-items-center mb-4'>
														<Avatar
															srcSet={TicktokImg}
															src={TicktokImg}
															size={40}
														/>
														<span className='ms-3'>
															<strong>Tiktok - Group</strong>
														</span>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifacebooyesgroup'
																		type='radio'
																		id='facebooyesgroup'
																		value='checkbox value'
																		checked
																	/>
																	Yes
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<FormGroup id='mCustomer'>
																	<Input
																		placeholder='Lien facebook group (option)'
																		// onChange={formik.handleChange}
																		// onBlur={formik.handleBlur}
																		// value={formik.values.mCustomer}
																		// isValid={formik.isValid}
																		// isTouched={formik.touched.taskName}
																		// invalidFeedback={formik.errors.taskname}
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifacebooyesgroup'
																		type='radio'
																		id='facebooyesgroup'
																		value='checkbox value'
																	/>
																	No
																</div>
															</div>
														</div>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifacebooprofileyesgroup'
																		type='radio'
																		id='facebooyesgroup2'
																		value='checkbox value'
																	/>
																	Yes
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<FormGroup id='mCustomer'>
																	<Input
																		placeholder='Lien profile (option) '
																		// onChange={formik.handleChange}
																		// onBlur={formik.handleBlur}
																		// value={formik.values.mCustomer}
																		// isValid={formik.isValid}
																		// isTouched={formik.touched.taskName}
																		// invalidFeedback={formik.errors.taskname}
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='facebooprofileyesgroup'
																		type='radio'
																		id='facebooyesgroup2'
																		value='checkbox value'
																	/>
																	No
																</div>
															</div>
														</div>
													</div>
													<div className='row my-3'>
														<div className='col-12'>
															<h5 className='card-title'>
																Would a Tiktok Group help you
																promote your business?
															</h5>
														</div>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifbgrouphelp'
																		type='radio'
																		id='whouldexample'
																		value='checkbox value'
																	/>
																	Nope
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifbgrouphelp'
																		type='radio'
																		id='whouldexample'
																		value='checkbox value'
																	/>
																	Maybe, I’m not sure
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifbgrouphelp'
																		type='radio'
																		id='whouldexample'
																		value='checkbox value'
																	/>
																	Yes, sure
																</div>
															</div>
														</div>

														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<Button
																	color='success'
																	isLight
																	icon='Add'>
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
										<Accordion id='tiktok' shadow='sm'>
											<AccordionItem
												id='tiktok1'
												title='More info about Tiktok private profile'>
												In at urna nec risus aliquam accumsan. Vivamus
												rutrum rhoncus massa, sed facilisis justo sodales
												vitae. Pellentesque mattis felis ac enim viverra
												faucibus. Curabitur maximus nibh massa, ut dictum
												quam scelerisque eget. Maecenas scelerisque egestas
												diam a posuere. Sed non vehicula nunc. Proin feugiat
												nisi ut mi mattis bibendum. Suspendisse lobortis
												libero ut libero semper, sed fermentum lectus
												commodo. Nam pretium mi sit amet purus imperdiet
												tempus. Aliquam congue ligula quis vulputate
												viverra. Morbi dapibus vitae odio vel luctus.
												Vivamus tellus tortor, aliquet id ultricies a,
												hendrerit non massa. Ut feugiat quam non
												sollicitudin molestie. Praesent ut ante mattis,
												efficitur est ac, scelerisque magna. Donec congue
												erat a suscipit condimentum. Curabitur purus nunc,
												ullamcorper vitae lectus quis, aliquam lacinia arcu.
											</AccordionItem>
											<AccordionItem
												id='tiktok2'
												title='More info about Tiktok business page'>
												Nunc ex odio, fermentum dignissim urna eu, suscipit
												vehicula magna. Vestibulum vel risus sed metus
												pellentesque gravida. Etiam hendrerit lorem vitae
												elit tempor bibendum. Vivamus tincidunt consectetur
												erat at venenatis. Nam elementum varius massa non
												congue. Class aptent taciti sociosqu ad litora
												torquent per conubia nostra, per inceptos himenaeos.
												Vivamus fermentum scelerisque ligula, quis bibendum
												felis luctus quis. Donec magna sem, ullamcorper id
												tempus ut, pharetra sed felis. Ut quis ante
												tristique, condimentum lacus eget, mollis magna.
												Phasellus fringilla diam ac erat consequat feugiat.
												Vestibulum eu ex eget ligula placerat finibus.
												Quisque vitae velit feugiat, mattis lectus nec,
												molestie justo. Vivamus nec tincidunt augue.
												Pellentesque nec mattis ipsum, non malesuada libero.
												Proin aliquam est turpis, sit amet efficitur ex
												gravida ac. Nunc in molestie augue.
											</AccordionItem>
											<AccordionItem
												id='tiktok3'
												title='More info about Tiktok groups'>
												Nunc ex odio, fermentum dignissim urna eu, suscipit
												vehicula magna. Vestibulum vel risus sed metus
												pellentesque gravida. Etiam hendrerit lorem vitae
												elit tempor bibendum. Vivamus tincidunt consectetur
												erat at venenatis. Nam elementum varius massa non
												congue. Class aptent taciti sociosqu ad litora
												torquent per conubia nostra, per inceptos himenaeos.
												Vivamus fermentum scelerisque ligula, quis bibendum
												felis luctus quis. Donec magna sem, ullamcorper id
												tempus ut, pharetra sed felis. Ut quis ante
												tristique, condimentum lacus eget, mollis magna.
												Phasellus fringilla diam ac erat consequat feugiat.
												Vestibulum eu ex eget ligula placerat finibus.
												Quisque vitae velit feugiat, mattis lectus nec,
												molestie justo. Vivamus nec tincidunt augue.
												Pellentesque nec mattis ipsum, non malesuada libero.
												Proin aliquam est turpis, sit amet efficitur ex
												gravida ac. Nunc in molestie augue.
											</AccordionItem>
										</Accordion>
									</CardBody>
								</Card>
							</WizardItem>
							<WizardItem id='step11'>
								<Card>
									<CardHeader>
										<CardTitle className='fs-3'>
											Is your business present on Twitter?
										</CardTitle>
									</CardHeader>
									<CardBody>
										<div className='twitter-page mb-4'>
											<div className='row'>
												<div className='col-12'>
													<div className='mb-3 mb-lg-5'>
														<h5 className='fw-bold'>
															You can always change it later
														</h5>
													</div>
													<div className='d-flex align-items-center mb-4'>
														<Avatar
															srcSet={TwitterImg}
															src={TwitterImg}
															size={40}
														/>
														<span className='ms-3'>
															<strong>Twitter - Business page</strong>
														</span>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='iyes'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes
																	{/* <Field
																		className='form-check-input'
																		type='radio'
																		name='isSocialMedia'
																		value='yes'
																	/>
																	Yes */}
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<FormGroup id='mCustomer'>
																	<Input
																		placeholder='Lien profile (option) '
																		// onChange={formik.handleChange}
																		// onBlur={formik.handleBlur}
																		// value={formik.values.mCustomer}
																		// isValid={formik.isValid}
																		// isTouched={formik.touched.taskName}
																		// invalidFeedback={formik.errors.taskname}
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ino'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	No
																	{/* <Field
																		className='form-check-input'
																		type='radio'
																		name='isSocialMedia'
																		value='no'
																	/>
																	No */}
																</div>
															</div>
														</div>
													</div>

													<div className='row my-3'>
														<div className='col-12'>
															<h5 className='card-title'>
																Can Twitter help you promote your
																business?
															</h5>
														</div>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='icanfacebbok'
																		type='radio'
																		id='canfacebbok'
																		value='checkbox value'
																	/>
																	No
																	{/* <Field
																		type='radio'
																		name='isSocialMediaimportant'
																		value='nope'
																	/>
																	Nope */}
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='icanfacebbok'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Maybe, I’m not sure
																	{/* <Field
																		type='radio'
																		name='isSocialMediaimportant'
																		value='maybe'
																	/>
																	Maybe, I’m not sure */}
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='icanfacebbok'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes, Sure
																	{/* <Field
																		type='radio'
																		name='isSocialMediaimportant'
																		value='yes'
																	/>
																	Yes, Sure */}
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<Button
																	color='success'
																	isLight
																	icon='Add'>
																	Add Task
																</Button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className='twitter-page mb-4'>
											<div className='row'>
												<div className='col-12'>
													<div className='d-flex align-items-center mb-4'>
														<Avatar
															srcSet={TwitterImg}
															src={TwitterImg}
															size={40}
														/>
														<span className='ms-3'>
															<strong>
																Twitter - private profile
															</strong>
														</span>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifacebookprivate'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<FormGroup id='mCustomer'>
																	<Input
																		placeholder='Lien private profile (option) '
																		// onChange={formik.handleChange}
																		// onBlur={formik.handleBlur}
																		// value={formik.values.mCustomer}
																		// isValid={formik.isValid}
																		// isTouched={formik.touched.taskName}
																		// invalidFeedback={formik.errors.taskname}
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifacebookprivate'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	No
																</div>
															</div>
														</div>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifacebookprivate2'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<FormGroup id='mCustomer'>
																	<Input
																		placeholder='Lien profile (option) '
																		// onChange={formik.handleChange}
																		// onBlur={formik.handleBlur}
																		// value={formik.values.mCustomer}
																		// isValid={formik.isValid}
																		// isTouched={formik.touched.taskName}
																		// invalidFeedback={formik.errors.taskname}
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='facebookprivate2'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	No
																</div>
															</div>
														</div>
													</div>
													<div className='row my-3'>
														<div className='col-12'>
															<h5 className='card-title'>
																Do you need a Twitter private
																profile to promote your business?
															</h5>
														</div>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifbprivateprofile'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Nope
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifbprivateprofile'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Maybe, I’m not sure
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifbprivateprofile'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes, sure
																</div>
															</div>
														</div>

														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<Button
																	color='success'
																	isLight
																	icon='Add'>
																	Add Task
																</Button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className='instagram-page mb-4'>
											<div className='row'>
												<div className='col-12'>
													<div className='d-flex align-items-center mb-4'>
														<Avatar
															srcSet={TwitterImg}
															src={TwitterImg}
															size={40}
														/>
														<span className='ms-3'>
															<strong>Twitter - Group</strong>
														</span>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifacebooyesgroup'
																		type='radio'
																		id='facebooyesgroup'
																		value='checkbox value'
																		checked
																	/>
																	Yes
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<FormGroup id='mCustomer'>
																	<Input
																		placeholder='Lien facebook group (option)'
																		// onChange={formik.handleChange}
																		// onBlur={formik.handleBlur}
																		// value={formik.values.mCustomer}
																		// isValid={formik.isValid}
																		// isTouched={formik.touched.taskName}
																		// invalidFeedback={formik.errors.taskname}
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifacebooyesgroup'
																		type='radio'
																		id='facebooyesgroup'
																		value='checkbox value'
																	/>
																	No
																</div>
															</div>
														</div>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifacebooprofileyesgroup'
																		type='radio'
																		id='facebooyesgroup2'
																		value='checkbox value'
																	/>
																	Yes
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<FormGroup id='mCustomer'>
																	<Input
																		placeholder='Lien profile (option) '
																		// onChange={formik.handleChange}
																		// onBlur={formik.handleBlur}
																		// value={formik.values.mCustomer}
																		// isValid={formik.isValid}
																		// isTouched={formik.touched.taskName}
																		// invalidFeedback={formik.errors.taskname}
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='facebooprofileyesgroup'
																		type='radio'
																		id='facebooyesgroup2'
																		value='checkbox value'
																	/>
																	No
																</div>
															</div>
														</div>
													</div>
													<div className='row my-3'>
														<div className='col-12'>
															<h5 className='card-title'>
																Would a Twitter Group help you
																promote your business?
															</h5>
														</div>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifbgrouphelp'
																		type='radio'
																		id='whouldexample'
																		value='checkbox value'
																	/>
																	Nope
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifbgrouphelp'
																		type='radio'
																		id='whouldexample'
																		value='checkbox value'
																	/>
																	Maybe, I’m not sure
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifbgrouphelp'
																		type='radio'
																		id='whouldexample'
																		value='checkbox value'
																	/>
																	Yes, sure
																</div>
															</div>
														</div>

														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<Button
																	color='success'
																	isLight
																	icon='Add'>
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
										<Accordion id='twitter' shadow='sm'>
											<AccordionItem
												id='twitter1'
												title='More info about Twitter private profile'>
												In at urna nec risus aliquam accumsan. Vivamus
												rutrum rhoncus massa, sed facilisis justo sodales
												vitae. Pellentesque mattis felis ac enim viverra
												faucibus. Curabitur maximus nibh massa, ut dictum
												quam scelerisque eget. Maecenas scelerisque egestas
												diam a posuere. Sed non vehicula nunc. Proin feugiat
												nisi ut mi mattis bibendum. Suspendisse lobortis
												libero ut libero semper, sed fermentum lectus
												commodo. Nam pretium mi sit amet purus imperdiet
												tempus. Aliquam congue ligula quis vulputate
												viverra. Morbi dapibus vitae odio vel luctus.
												Vivamus tellus tortor, aliquet id ultricies a,
												hendrerit non massa. Ut feugiat quam non
												sollicitudin molestie. Praesent ut ante mattis,
												efficitur est ac, scelerisque magna. Donec congue
												erat a suscipit condimentum. Curabitur purus nunc,
												ullamcorper vitae lectus quis, aliquam lacinia arcu.
											</AccordionItem>
											<AccordionItem
												id='twitterfaq2'
												title='More info about Twitter business page'>
												Nunc ex odio, fermentum dignissim urna eu, suscipit
												vehicula magna. Vestibulum vel risus sed metus
												pellentesque gravida. Etiam hendrerit lorem vitae
												elit tempor bibendum. Vivamus tincidunt consectetur
												erat at venenatis. Nam elementum varius massa non
												congue. Class aptent taciti sociosqu ad litora
												torquent per conubia nostra, per inceptos himenaeos.
												Vivamus fermentum scelerisque ligula, quis bibendum
												felis luctus quis. Donec magna sem, ullamcorper id
												tempus ut, pharetra sed felis. Ut quis ante
												tristique, condimentum lacus eget, mollis magna.
												Phasellus fringilla diam ac erat consequat feugiat.
												Vestibulum eu ex eget ligula placerat finibus.
												Quisque vitae velit feugiat, mattis lectus nec,
												molestie justo. Vivamus nec tincidunt augue.
												Pellentesque nec mattis ipsum, non malesuada libero.
												Proin aliquam est turpis, sit amet efficitur ex
												gravida ac. Nunc in molestie augue.
											</AccordionItem>
											<AccordionItem
												id='twitter3'
												title='More info about Twitter groups'>
												Nunc ex odio, fermentum dignissim urna eu, suscipit
												vehicula magna. Vestibulum vel risus sed metus
												pellentesque gravida. Etiam hendrerit lorem vitae
												elit tempor bibendum. Vivamus tincidunt consectetur
												erat at venenatis. Nam elementum varius massa non
												congue. Class aptent taciti sociosqu ad litora
												torquent per conubia nostra, per inceptos himenaeos.
												Vivamus fermentum scelerisque ligula, quis bibendum
												felis luctus quis. Donec magna sem, ullamcorper id
												tempus ut, pharetra sed felis. Ut quis ante
												tristique, condimentum lacus eget, mollis magna.
												Phasellus fringilla diam ac erat consequat feugiat.
												Vestibulum eu ex eget ligula placerat finibus.
												Quisque vitae velit feugiat, mattis lectus nec,
												molestie justo. Vivamus nec tincidunt augue.
												Pellentesque nec mattis ipsum, non malesuada libero.
												Proin aliquam est turpis, sit amet efficitur ex
												gravida ac. Nunc in molestie augue.
											</AccordionItem>
										</Accordion>
									</CardBody>
								</Card>
							</WizardItem>
							<WizardItem id='step12'>
								<Card>
									<CardHeader>
										<CardTitle className='fs-3'>
											Is your business present on Whatsapp?
										</CardTitle>
									</CardHeader>
									<CardBody>
										<div className='whatsapp-page mb-4'>
											<div className='row'>
												<div className='col-12'>
													<div className='mb-3 mb-lg-5'>
														<h5 className='fw-bold'>
															You can always change it later
														</h5>
													</div>
													<div className='d-flex align-items-center mb-4'>
														<Avatar
															srcSet={WhatsappImg}
															src={WhatsappImg}
															size={40}
														/>
														<span className='ms-3'>
															<strong>
																Whatsapp - Business page
															</strong>
														</span>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='iyes'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes
																	{/* <Field
																		className='form-check-input'
																		type='radio'
																		name='isSocialMedia'
																		value='yes'
																	/>
																	Yes */}
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<FormGroup id='mCustomer'>
																	<Input
																		placeholder='Lien profile (option) '
																		// onChange={formik.handleChange}
																		// onBlur={formik.handleBlur}
																		// value={formik.values.mCustomer}
																		// isValid={formik.isValid}
																		// isTouched={formik.touched.taskName}
																		// invalidFeedback={formik.errors.taskname}
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ino'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	No
																	{/* <Field
																		className='form-check-input'
																		type='radio'
																		name='isSocialMedia'
																		value='no'
																	/>
																	No */}
																</div>
															</div>
														</div>
													</div>
													<div className='row my-3'>
														<div className='col-12'>
															<h5 className='card-title'>
																Can Whatsapp help you promote your
																business?
															</h5>
														</div>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='icanfacebbok'
																		type='radio'
																		id='canfacebbok'
																		value='checkbox value'
																	/>
																	No
																	{/* <Field
																		type='radio'
																		name='isSocialMediaimportant'
																		value='nope'
																	/>
																	Nope */}
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='icanfacebbok'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Maybe, I’m not sure
																	{/* <Field
																		type='radio'
																		name='isSocialMediaimportant'
																		value='maybe'
																	/>
																	Maybe, I’m not sure */}
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='icanfacebbok'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes, Sure
																	{/* <Field
																		type='radio'
																		name='isSocialMediaimportant'
																		value='yes'
																	/>
																	Yes, Sure */}
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<Button
																	color='success'
																	isLight
																	icon='Add'>
																	Add Task
																</Button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className='whatsapp-page mb-4'>
											<div className='row'>
												<div className='col-12'>
													<div className='d-flex align-items-center mb-4'>
														<Avatar
															srcSet={WhatsappImg}
															src={WhatsappImg}
															size={40}
														/>
														<span className='ms-3'>
															<strong>
																Whatsapp - private profile
															</strong>
														</span>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifacebookprivate'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<FormGroup id='mCustomer'>
																	<Input
																		placeholder='Lien private profile (option) '
																		// onChange={formik.handleChange}
																		// onBlur={formik.handleBlur}
																		// value={formik.values.mCustomer}
																		// isValid={formik.isValid}
																		// isTouched={formik.touched.taskName}
																		// invalidFeedback={formik.errors.taskname}
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifacebookprivate'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	No
																</div>
															</div>
														</div>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifacebookprivate2'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<FormGroup id='mCustomer'>
																	<Input
																		placeholder='Lien profile (option) '
																		// onChange={formik.handleChange}
																		// onBlur={formik.handleBlur}
																		// value={formik.values.mCustomer}
																		// isValid={formik.isValid}
																		// isTouched={formik.touched.taskName}
																		// invalidFeedback={formik.errors.taskname}
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='facebookprivate2'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	No
																</div>
															</div>
														</div>
													</div>
													<div className='row my-3'>
														<div className='col-12'>
															<h5 className='card-title'>
																Do you need a Whatsapp private
																profile to promote your business?
															</h5>
														</div>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifbprivateprofile'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Nope
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifbprivateprofile'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Maybe, I’m not sure
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifbprivateprofile'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes, sure
																</div>
															</div>
														</div>

														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<Button
																	color='success'
																	isLight
																	icon='Add'>
																	Add Task
																</Button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className='whatsapp-page mb-4'>
											<div className='row'>
												<div className='col-12'>
													<div className='d-flex align-items-center mb-4'>
														<Avatar
															srcSet={WhatsappImg}
															src={WhatsappImg}
															size={40}
														/>
														<span className='ms-3'>
															<strong>Whatsapp - Group</strong>
														</span>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifacebooyesgroup'
																		type='radio'
																		id='facebooyesgroup'
																		value='checkbox value'
																		checked
																	/>
																	Yes
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<FormGroup id='mCustomer'>
																	<Input
																		placeholder='Lien facebook group (option)'
																		// onChange={formik.handleChange}
																		// onBlur={formik.handleBlur}
																		// value={formik.values.mCustomer}
																		// isValid={formik.isValid}
																		// isTouched={formik.touched.taskName}
																		// invalidFeedback={formik.errors.taskname}
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifacebooyesgroup'
																		type='radio'
																		id='facebooyesgroup'
																		value='checkbox value'
																	/>
																	No
																</div>
															</div>
														</div>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifacebooprofileyesgroup'
																		type='radio'
																		id='facebooyesgroup2'
																		value='checkbox value'
																	/>
																	Yes
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<FormGroup id='mCustomer'>
																	<Input
																		placeholder='Lien profile (option) '
																		// onChange={formik.handleChange}
																		// onBlur={formik.handleBlur}
																		// value={formik.values.mCustomer}
																		// isValid={formik.isValid}
																		// isTouched={formik.touched.taskName}
																		// invalidFeedback={formik.errors.taskname}
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='facebooprofileyesgroup'
																		type='radio'
																		id='facebooyesgroup2'
																		value='checkbox value'
																	/>
																	No
																</div>
															</div>
														</div>
													</div>
													<div className='row my-3'>
														<div className='col-12'>
															<h5 className='card-title'>
																Would a Whatsapp Group help you
																promote your business?
															</h5>
														</div>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifbgrouphelp'
																		type='radio'
																		id='whouldexample'
																		value='checkbox value'
																	/>
																	Nope
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifbgrouphelp'
																		type='radio'
																		id='whouldexample'
																		value='checkbox value'
																	/>
																	Maybe, I’m not sure
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifbgrouphelp'
																		type='radio'
																		id='whouldexample'
																		value='checkbox value'
																	/>
																	Yes, sure
																</div>
															</div>
														</div>

														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<Button
																	color='success'
																	isLight
																	icon='Add'>
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
												title='More info about Tiktok private profile'>
												In at urna nec risus aliquam accumsan. Vivamus
												rutrum rhoncus massa, sed facilisis justo sodales
												vitae. Pellentesque mattis felis ac enim viverra
												faucibus. Curabitur maximus nibh massa, ut dictum
												quam scelerisque eget. Maecenas scelerisque egestas
												diam a posuere. Sed non vehicula nunc. Proin feugiat
												nisi ut mi mattis bibendum. Suspendisse lobortis
												libero ut libero semper, sed fermentum lectus
												commodo. Nam pretium mi sit amet purus imperdiet
												tempus. Aliquam congue ligula quis vulputate
												viverra. Morbi dapibus vitae odio vel luctus.
												Vivamus tellus tortor, aliquet id ultricies a,
												hendrerit non massa. Ut feugiat quam non
												sollicitudin molestie. Praesent ut ante mattis,
												efficitur est ac, scelerisque magna. Donec congue
												erat a suscipit condimentum. Curabitur purus nunc,
												ullamcorper vitae lectus quis, aliquam lacinia arcu.
											</AccordionItem>
											<AccordionItem
												id='faq2'
												title='More info about Tiktok business page'>
												Nunc ex odio, fermentum dignissim urna eu, suscipit
												vehicula magna. Vestibulum vel risus sed metus
												pellentesque gravida. Etiam hendrerit lorem vitae
												elit tempor bibendum. Vivamus tincidunt consectetur
												erat at venenatis. Nam elementum varius massa non
												congue. Class aptent taciti sociosqu ad litora
												torquent per conubia nostra, per inceptos himenaeos.
												Vivamus fermentum scelerisque ligula, quis bibendum
												felis luctus quis. Donec magna sem, ullamcorper id
												tempus ut, pharetra sed felis. Ut quis ante
												tristique, condimentum lacus eget, mollis magna.
												Phasellus fringilla diam ac erat consequat feugiat.
												Vestibulum eu ex eget ligula placerat finibus.
												Quisque vitae velit feugiat, mattis lectus nec,
												molestie justo. Vivamus nec tincidunt augue.
												Pellentesque nec mattis ipsum, non malesuada libero.
												Proin aliquam est turpis, sit amet efficitur ex
												gravida ac. Nunc in molestie augue.
											</AccordionItem>
											<AccordionItem
												id='faq2'
												title='More info about Tiktok groups'>
												Nunc ex odio, fermentum dignissim urna eu, suscipit
												vehicula magna. Vestibulum vel risus sed metus
												pellentesque gravida. Etiam hendrerit lorem vitae
												elit tempor bibendum. Vivamus tincidunt consectetur
												erat at venenatis. Nam elementum varius massa non
												congue. Class aptent taciti sociosqu ad litora
												torquent per conubia nostra, per inceptos himenaeos.
												Vivamus fermentum scelerisque ligula, quis bibendum
												felis luctus quis. Donec magna sem, ullamcorper id
												tempus ut, pharetra sed felis. Ut quis ante
												tristique, condimentum lacus eget, mollis magna.
												Phasellus fringilla diam ac erat consequat feugiat.
												Vestibulum eu ex eget ligula placerat finibus.
												Quisque vitae velit feugiat, mattis lectus nec,
												molestie justo. Vivamus nec tincidunt augue.
												Pellentesque nec mattis ipsum, non malesuada libero.
												Proin aliquam est turpis, sit amet efficitur ex
												gravida ac. Nunc in molestie augue.
											</AccordionItem>
										</Accordion>
									</CardBody>
								</Card>
							</WizardItem>
							<WizardItem id='step13'>
								<Card>
									<CardHeader>
										<CardTitle className='fs-3'>
											Is your business present on Telegram
										</CardTitle>
									</CardHeader>
									<CardBody>
										<div className='tiktok-page mb-4'>
											<div className='row'>
												<div className='col-12'>
													<div className='mb-3 mb-lg-5'>
														<h5 className='fw-bold'>
															You can always change it later
														</h5>
													</div>
													<div className='d-flex align-items-center mb-4'>
														<Avatar
															srcSet={TelegramImg}
															src={TelegramImg}
															size={40}
														/>
														<span className='ms-3'>
															<strong>
																Telegram - Business page
															</strong>
														</span>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='iyes'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes
																	{/* <Field
																		className='form-check-input'
																		type='radio'
																		name='isSocialMedia'
																		value='yes'
																	/>
																	Yes */}
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<FormGroup id='mCustomer'>
																	<Input
																		placeholder='Lien profile (option) '
																		// onChange={formik.handleChange}
																		// onBlur={formik.handleBlur}
																		// value={formik.values.mCustomer}
																		// isValid={formik.isValid}
																		// isTouched={formik.touched.taskName}
																		// invalidFeedback={formik.errors.taskname}
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ino'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	No
																	{/* <Field
																		className='form-check-input'
																		type='radio'
																		name='isSocialMedia'
																		value='no'
																	/>
																	No */}
																</div>
															</div>
														</div>
													</div>

													<div className='row my-3'>
														<div className='col-12'>
															<h5 className='card-title'>
																Can Telegram help you promote your
																business?
															</h5>
														</div>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='icanfacebbok'
																		type='radio'
																		id='canfacebbok'
																		value='checkbox value'
																	/>
																	No
																	{/* <Field
																		type='radio'
																		name='isSocialMediaimportant'
																		value='nope'
																	/>
																	Nope */}
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='icanfacebbok'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Maybe, I’m not sure
																	{/* <Field
																		type='radio'
																		name='isSocialMediaimportant'
																		value='maybe'
																	/>
																	Maybe, I’m not sure */}
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='icanfacebbok'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes, Sure
																	{/* <Field
																		type='radio'
																		name='isSocialMediaimportant'
																		value='yes'
																	/>
																	Yes, Sure */}
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<Button
																	color='success'
																	isLight
																	icon='Add'>
																	Add Task
																</Button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className='tiktok-page mb-4'>
											<div className='row'>
												<div className='col-12'>
													<div className='d-flex align-items-center mb-4'>
														<Avatar
															srcSet={TelegramImg}
															src={TelegramImg}
															size={40}
														/>
														<span className='ms-3'>
															<strong>
																Telegram - private profile
															</strong>
														</span>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifacebookprivate'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<FormGroup id='mCustomer'>
																	<Input
																		placeholder='Lien private profile (option) '
																		// onChange={formik.handleChange}
																		// onBlur={formik.handleBlur}
																		// value={formik.values.mCustomer}
																		// isValid={formik.isValid}
																		// isTouched={formik.touched.taskName}
																		// invalidFeedback={formik.errors.taskname}
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifacebookprivate'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	No
																</div>
															</div>
														</div>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifacebookprivate2'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<FormGroup id='mCustomer'>
																	<Input
																		placeholder='Lien profile (option) '
																		// onChange={formik.handleChange}
																		// onBlur={formik.handleBlur}
																		// value={formik.values.mCustomer}
																		// isValid={formik.isValid}
																		// isTouched={formik.touched.taskName}
																		// invalidFeedback={formik.errors.taskname}
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='facebookprivate2'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	No
																</div>
															</div>
														</div>
													</div>
													<div className='row my-3'>
														<div className='col-12'>
															<h5 className='card-title'>
																Do you need a Telegram private
																profile to promote your business?
															</h5>
														</div>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifbprivateprofile'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Nope
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifbprivateprofile'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Maybe, I’m not sure
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifbprivateprofile'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes, sure
																</div>
															</div>
														</div>

														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<Button
																	color='success'
																	isLight
																	icon='Add'>
																	Add Task
																</Button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className='instagram-page mb-4'>
											<div className='row'>
												<div className='col-12'>
													<div className='d-flex align-items-center mb-4'>
														<Avatar
															srcSet={TelegramImg}
															src={TelegramImg}
															size={40}
														/>
														<span className='ms-3'>
															<strong>Telegram - Group</strong>
														</span>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifacebooyesgroup'
																		type='radio'
																		id='facebooyesgroup'
																		value='checkbox value'
																		checked
																	/>
																	Yes
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<FormGroup id='mCustomer'>
																	<Input
																		placeholder='Lien facebook group (option)'
																		// onChange={formik.handleChange}
																		// onBlur={formik.handleBlur}
																		// value={formik.values.mCustomer}
																		// isValid={formik.isValid}
																		// isTouched={formik.touched.taskName}
																		// invalidFeedback={formik.errors.taskname}
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifacebooyesgroup'
																		type='radio'
																		id='facebooyesgroup'
																		value='checkbox value'
																	/>
																	No
																</div>
															</div>
														</div>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifacebooprofileyesgroup'
																		type='radio'
																		id='facebooyesgroup2'
																		value='checkbox value'
																	/>
																	Yes
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<FormGroup id='mCustomer'>
																	<Input
																		placeholder='Lien profile (option) '
																		// onChange={formik.handleChange}
																		// onBlur={formik.handleBlur}
																		// value={formik.values.mCustomer}
																		// isValid={formik.isValid}
																		// isTouched={formik.touched.taskName}
																		// invalidFeedback={formik.errors.taskname}
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='facebooprofileyesgroup'
																		type='radio'
																		id='facebooyesgroup2'
																		value='checkbox value'
																	/>
																	No
																</div>
															</div>
														</div>
													</div>
													<div className='row my-3'>
														<div className='col-12'>
															<h5 className='card-title'>
																Would a Telegram Group help you
																promote your business?
															</h5>
														</div>
													</div>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifbgrouphelp'
																		type='radio'
																		id='whouldexample'
																		value='checkbox value'
																	/>
																	Nope
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifbgrouphelp'
																		type='radio'
																		id='whouldexample'
																		value='checkbox value'
																	/>
																	Maybe, I’m not sure
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-3'>
															<div className='mb-3'>
																<div className='form-check'>
																	<input
																		className='form-check-input'
																		name='ifbgrouphelp'
																		type='radio'
																		id='whouldexample'
																		value='checkbox value'
																	/>
																	Yes, sure
																</div>
															</div>
														</div>

														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<Button
																	color='success'
																	isLight
																	icon='Add'>
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
										<Accordion id='telegramfaq' shadow='sm'>
											<AccordionItem
												id='telegramfaq1'
												title='More info about Telegram private profile'>
												In at urna nec risus aliquam accumsan. Vivamus
												rutrum rhoncus massa, sed facilisis justo sodales
												vitae. Pellentesque mattis felis ac enim viverra
												faucibus. Curabitur maximus nibh massa, ut dictum
												quam scelerisque eget. Maecenas scelerisque egestas
												diam a posuere. Sed non vehicula nunc. Proin feugiat
												nisi ut mi mattis bibendum. Suspendisse lobortis
												libero ut libero semper, sed fermentum lectus
												commodo. Nam pretium mi sit amet purus imperdiet
												tempus. Aliquam congue ligula quis vulputate
												viverra. Morbi dapibus vitae odio vel luctus.
												Vivamus tellus tortor, aliquet id ultricies a,
												hendrerit non massa. Ut feugiat quam non
												sollicitudin molestie. Praesent ut ante mattis,
												efficitur est ac, scelerisque magna. Donec congue
												erat a suscipit condimentum. Curabitur purus nunc,
												ullamcorper vitae lectus quis, aliquam lacinia arcu.
											</AccordionItem>
											<AccordionItem
												id='telegramfaq2'
												title='More info about Telegram business page'>
												Nunc ex odio, fermentum dignissim urna eu, suscipit
												vehicula magna. Vestibulum vel risus sed metus
												pellentesque gravida. Etiam hendrerit lorem vitae
												elit tempor bibendum. Vivamus tincidunt consectetur
												erat at venenatis. Nam elementum varius massa non
												congue. Class aptent taciti sociosqu ad litora
												torquent per conubia nostra, per inceptos himenaeos.
												Vivamus fermentum scelerisque ligula, quis bibendum
												felis luctus quis. Donec magna sem, ullamcorper id
												tempus ut, pharetra sed felis. Ut quis ante
												tristique, condimentum lacus eget, mollis magna.
												Phasellus fringilla diam ac erat consequat feugiat.
												Vestibulum eu ex eget ligula placerat finibus.
												Quisque vitae velit feugiat, mattis lectus nec,
												molestie justo. Vivamus nec tincidunt augue.
												Pellentesque nec mattis ipsum, non malesuada libero.
												Proin aliquam est turpis, sit amet efficitur ex
												gravida ac. Nunc in molestie augue.
											</AccordionItem>
											<AccordionItem
												id='telegramfaq3'
												title='More info about Telegram groups'>
												Nunc ex odio, fermentum dignissim urna eu, suscipit
												vehicula magna. Vestibulum vel risus sed metus
												pellentesque gravida. Etiam hendrerit lorem vitae
												elit tempor bibendum. Vivamus tincidunt consectetur
												erat at venenatis. Nam elementum varius massa non
												congue. Class aptent taciti sociosqu ad litora
												torquent per conubia nostra, per inceptos himenaeos.
												Vivamus fermentum scelerisque ligula, quis bibendum
												felis luctus quis. Donec magna sem, ullamcorper id
												tempus ut, pharetra sed felis. Ut quis ante
												tristique, condimentum lacus eget, mollis magna.
												Phasellus fringilla diam ac erat consequat feugiat.
												Vestibulum eu ex eget ligula placerat finibus.
												Quisque vitae velit feugiat, mattis lectus nec,
												molestie justo. Vivamus nec tincidunt augue.
												Pellentesque nec mattis ipsum, non malesuada libero.
												Proin aliquam est turpis, sit amet efficitur ex
												gravida ac. Nunc in molestie augue.
											</AccordionItem>
										</Accordion>
									</CardBody>
								</Card>
							</WizardItem>
							<WizardItem id='step14'>
								<Card>
									<CardHeader>
										<CardTitle className='fs-3'>Direct Marketing</CardTitle>
									</CardHeader>
									<CardBody>
										<div className='row g-4'>
											<div className='col-12'>
												<div className='mb-3 mb-lg-5'>
													<h5 className='fw-bold'>
														You can always change it later
													</h5>
												</div>
												<div className='direct-marketing mb-4'>
													<div className='row'>
														<div className='col-12'>
															<h5 className='mb-3'>
																Do you have a potential clients and
																clients database?
															</h5>
														</div>
														<div className='col-12'>
															<div className='mb-3'>
																<div className='form-check form-check-inline'>
																	<input
																		className='form-check-input'
																		name='potentialclients'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes
																</div>
																<div className='form-check form-check-inline'>
																	<input
																		className='form-check-input'
																		name='potentialclients'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	No
																</div>
															</div>
														</div>
													</div>
												</div>
												<div className='direct-marketing mb-4'>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-12'>
															<h5 className='mb-3'>
																Do you or will you communicate with
																your clients by whatsapp?
															</h5>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<div className='form-check form-check-inline'>
																	<input
																		className='form-check-input'
																		name='whatsapp'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Nope
																</div>
																<div className='form-check form-check-inline'>
																	<input
																		className='form-check-input'
																		name='whatsapp'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Maybe, I’m not sure
																</div>
																<div className='form-check form-check-inline'>
																	<input
																		className='form-check-input'
																		name='whatsapp'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes, sure
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<Button
																	color='success'
																	isLight
																	icon='Add'>
																	ADD TASK
																</Button>
															</div>
														</div>
													</div>
												</div>
												<div className='direct-marketing mb-4'>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-12'>
															<h5 className='mb-3'>
																Do you or will you communicate with
																your clients by SMS?
															</h5>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<div className='form-check form-check-inline'>
																	<input
																		className='form-check-input'
																		name='comsms'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Nope
																</div>
																<div className='form-check form-check-inline'>
																	<input
																		className='form-check-input'
																		name='comsms'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Maybe, I’m not sure
																</div>
																<div className='form-check form-check-inline'>
																	<input
																		className='form-check-input'
																		name='comsms'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes, sure
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<Button
																	color='success'
																	isLight
																	icon='Add'>
																	ADD TASK
																</Button>
															</div>
														</div>
													</div>
												</div>
												<div className='direct-marketing mb-4'>
													<div className='row align-items-center'>
														<div className='col-12 col-lg-12'>
															<h5 className='mb-3'>
																Do you or will you communicate with
																your clients by mail?
															</h5>
														</div>
														<div className='col-12 col-lg-6'>
															<div className='mb-3'>
																<div className='form-check form-check-inline'>
																	<input
																		className='form-check-input'
																		name='commail'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Nope
																</div>
																<div className='form-check form-check-inline'>
																	<input
																		className='form-check-input'
																		name='commail'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Maybe, I’m not sure
																</div>
																<div className='form-check form-check-inline'>
																	<input
																		className='form-check-input'
																		name='commail'
																		type='radio'
																		id='example'
																		value='checkbox value'
																	/>
																	Yes, sure
																</div>
															</div>
														</div>
														<div className='col-12 col-lg-auto'>
															<div className='mb-3'>
																<Button
																	color='success'
																	isLight
																	icon='Add'>
																	ADD TASK
																</Button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</CardBody>
									<CardBody>
										<Accordion id='directmarketingfaq' shadow='sm'>
											<AccordionItem
												id='directmarketingfaq1'
												title='More info about creating a database'>
												In at urna nec risus aliquam accumsan. Vivamus
												rutrum rhoncus massa, sed facilisis justo sodales
												vitae. Pellentesque mattis felis ac enim viverra
												faucibus. Curabitur maximus nibh massa, ut dictum
												quam scelerisque eget. Maecenas scelerisque egestas
												diam a posuere. Sed non vehicula nunc. Proin feugiat
												nisi ut mi mattis bibendum. Suspendisse lobortis
												libero ut libero semper, sed fermentum lectus
												commodo. Nam pretium mi sit amet purus imperdiet
												tempus. Aliquam congue ligula quis vulputate
												viverra. Morbi dapibus vitae odio vel luctus.
												Vivamus tellus tortor, aliquet id ultricies a,
												hendrerit non massa. Ut feugiat quam non
												sollicitudin molestie. Praesent ut ante mattis,
												efficitur est ac, scelerisque magna. Donec congue
												erat a suscipit condimentum. Curabitur purus nunc,
												ullamcorper vitae lectus quis, aliquam lacinia arcu.
											</AccordionItem>
											<AccordionItem
												id='directmarketingfaq2'
												title='More info about mailing tools'>
												In at urna nec risus aliquam accumsan. Vivamus
												rutrum rhoncus massa, sed facilisis justo sodales
												vitae. Pellentesque mattis felis ac enim viverra
												faucibus. Curabitur maximus nibh massa, ut dictum
												quam scelerisque eget. Maecenas scelerisque egestas
												diam a posuere. Sed non vehicula nunc. Proin feugiat
												nisi ut mi mattis bibendum. Suspendisse lobortis
												libero ut libero semper, sed fermentum lectus
												commodo. Nam pretium mi sit amet purus imperdiet
												tempus. Aliquam congue ligula quis vulputate
												viverra. Morbi dapibus vitae odio vel luctus.
												Vivamus tellus tortor, aliquet id ultricies a,
												hendrerit non massa. Ut feugiat quam non
												sollicitudin molestie. Praesent ut ante mattis,
												efficitur est ac, scelerisque magna. Donec congue
												erat a suscipit condimentum. Curabitur purus nunc,
												ullamcorper vitae lectus quis, aliquam lacinia arcu.
											</AccordionItem>
										</Accordion>
									</CardBody>
								</Card>
							</WizardItem>
						</Wizard>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default SetupBusiness;
