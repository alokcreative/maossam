import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { useTour } from '@reactour/tour'
import Page from '../../../../layout/Page/Page'
import Modal, { ModalBody, ModalFooter } from '../../../../components/bootstrap/Modal'
import Input from '../../../../components/bootstrap/forms/Input'
import FormGroup from '../../../../components/bootstrap/forms/FormGroup'
import Select from '../../../../components/bootstrap/forms/Select'
import DashboardScreen from '../../../../assets/let-start.png'
import { Country, State } from 'country-state-city'
import useEffectOnce from 'react-use/lib/useEffectOnce'
import Button from '../../../../components/bootstrap/Button'
import {
	useGetUsersMutation,
	useUpdateProfileMutation,
} from '../../../../features/auth/authApiSlice'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import FirstStep from '../../../../components/modelform/FirstStep'
import SellingButtons from '../../../../components/modelform/SellingButtons'
import NumOfPeopleButtons from '../../../../components/modelform/NumOfPeopleButtons'

interface IOptionsProps {
	value?: string | number
	text?: string | number
}

interface IUserData {
	id: number
	avatar: string | unknown
	first_name: string
	last_name: string
	email: string
	phone_number: number
	country: string
	state: string
	gender: string
	is_active: boolean
	role: string
	date_of_birth: string
	created_at: string
	updated_at: string
}
interface IButtonPerTab {
	[key: string]: 'Freelancer' | 'Business Owner' | 'Team Manager' | 'Team Member' | 'Student'
}
const ModalsStepForm: React.FC = () => {
	const [countryList, setCountryList] = useState<IOptionsProps[]>()
	const [stateList, setstateList] = useState<IOptionsProps[]>()
	const [fieldOfStudy, setFieldOfStudy] = useState<IOptionsProps[]>([
		{
			value: 'Computer_Science',
			text: 'Computer Science',
		},
		{
			value: 'Marketing',
			text: 'Marketing',
		},
	])
	const [value, setValue] = useState<any>()
	const [data, setData] = useState<any>()
	const [UpdateProfileMutation] = useUpdateProfileMutation()
	const [GetUsersMutation] = useGetUsersMutation()
	const token = localStorage.getItem('access_token')
	const [activeCategory, setActiveCategory] = useState<number>(0)
	const years = Array.from({ length: 100 }, (_, index) => ({
		value: new Date().getFullYear() - index,
		text: new Date().getFullYear() - index,
	}))

	useEffect(() => {
		if (!token) {
			navigate('/auth-pages/login')
		} else {
			GetUsersMutation(token)
				.unwrap()
				.then((user: IUserData) => {
					setData(user)
				})
				.catch(() => {
					localStorage.removeItem('refresh_token')
					localStorage.removeItem('access_token')
					localStorage.removeItem('tourModalStarted')
					localStorage.removeItem('role')
					localStorage.removeItem('i18nextLng')
					localStorage.removeItem('facit_asideStatus')
					localStorage.removeItem('user')
					navigate('/auth-pages/login')
				})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token])

	// const onToggleBtn = (value: string) => {
	// 	setActiveBtn(value);
	// 	setSelectedValue(value);
	// };
	useEffectOnce(() => {
		const countryListDetails = Country.getAllCountries()
		// const stateList = State.getAllStates();
		// console.log(countryListDetails);
		const LIST = countryListDetails.map(({ name, isoCode }) => ({
			value: isoCode,
			text: name,
		}))
		setCountryList(LIST)
	})
	const navigate = useNavigate()
	const handleOnClick = useCallback(() => navigate('/'), [navigate])
	// Formik uses

	const formik = useFormik({
		initialValues: {
			phone_number: '',
			country: '',
			state: '',
			companyName: '',
			studyField: '',
			schoolName: '',
			position_post_graduation: '',
			fieldOfActivity: '',
			establishYear: '',
			numberOfYear: 0,
		},
		validate: (values) => {
			const errors: {
				phone_number?: string
				country?: string
				state?: string
				companyName?: string
			} = {}
			// if (!values.phone_number) {
			// 	errors.phone_number = 'Required'
			// }
			// if (values.phone_number && values.phone_number.length !== 9) {
			// 	errors.phone_number = 'Characters must be 9'
			// }
			// if (values.companyName === '') {
			// 	errors.companyName = 'Field Required'
			// }
			// if (!values.companyName) {
			// 	errors.companyName = 'Field Required'
			// }
			// if (values.country === '') {
			// 	errors.country = 'Field Required'
			// }
			// if (values.state === '') {
			// 	errors.state = 'Field Required'
			// }
			// if (values.numberOfYear < 0) {
			// 	errors.state = 'Not Less than 0'
			// }

			return errors
		},
		validateOnChange: false,
		onSubmit: (values) => {
			// console.log('Validated');
			nextStep()
			const userdetails = {
				country: values.country,
				state: values.state,
				phone_number: values.phone_number,
			}
			UpdateProfileMutation({ id: data.id, userdetails })
		},
	})
	useEffect(() => {
		const stateListupdated = State.getStatesOfCountry(formik.values.country)
		// console.log(formik.values.country);
		const LIST = stateListupdated.map(({ name }) => ({
			value: name,
			text: name,
		}))
		setstateList(LIST)
	}, [formik.values.country])

	// console.log(formik.values.CountryName);
	// Steps forms
	const [isOpen, setIsOpenParentModal] = useState(true)
	const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6', 'Step 7']
	const [currentStep, setCurrentStep] = useState(0)

	const nextStep = () => {
		setCurrentStep(currentStep + 1)
	}

	const previousStep = () => {
		setCurrentStep(currentStep - 1)
	}
	const { setIsOpen } = useTour()

	const closeModal = () => {
		setIsOpenParentModal(false)
		setIsOpen(true)
		navigate('/')
	}
	const ROLE_PER_TAB: { [key: string]: IButtonPerTab['key'] } = {
		Freelancer: 'Freelancer',
		Business_Owner: 'Business Owner',
		Team_Manager: 'Team Manager',
		Team_Member: 'Team Member',
		Student: 'Student',
	}
	const [activeRolePerTab, setActiveRolePerTab] = useState<string>('')
	const [activeSellingPerTab, setActiveSellingPerTab] = useState<string>('')
	const [activeTabForNumOfPeople, setActiveTabForNumOfPeople] = useState<string>('')
	const [activeSource, setActiveSource] = useState<number>(0)

	const categoryList = [
		{ id: 1, lable: 'Category 1' },
		{ id: 2, lable: 'Category 2' },
		{ id: 3, lable: 'Category 3' },
		{ id: 4, lable: 'Category 4' },
		{ id: 5, lable: 'Category 5' },
		{ id: 6, lable: 'Category 6' },
	]
	const sourceList = [
		{ id: 1, lable: 'Business/Marketing consultant' },
		{ id: 2, lable: 'Social Media (Facebook, Instagram)' },
		{ id: 3, lable: 'Google' },
		{ id: 4, lable: 'School' },
		{ id: 5, lable: 'Friend/Colleague' },
		{ id: 6, lable: 'Networking' },
		{ id: 7, lable: 'Business Organisation' },
		{ id: 8, lable: 'Other' },
	]
	return (
		<Page className='w-100 mt-10'>
			<Modal
				isOpen={isOpen}
				setIsOpen={setIsOpenParentModal}
				id='sdmsk12'
				size='lg'
				isStaticBackdrop>
				<ModalBody>
					<div className='row'>
						<div className='col-12 col-lg-8 offset-lg-2'>
							{steps[currentStep] === 'Step 1' ? (
								<FirstStep />
							) : steps[currentStep] === 'Step 2' ? (
								<div>
									<div className='text-center h3 fw-bold mb-4'>
										Hi {data?.first_name},Welcome to SoSimple!
									</div>
									<div className='text-center h5 mb-2'>
										First things first, tell us a bit about your activity This
										will help us adapt the platform to fit your needs.
									</div>
									<div className='mb-3'>
										<FormGroup
											id='country'
											label='What’s your country of residence*
											'
											//   isFloating
										>
											<Select
												ariaLabel='countries'
												placeholder='Choose from list of countries'
												required
												list={countryList}
												onChange={formik.handleChange}
												value={formik.values.country}
												isValid={formik.isValid}
												isTouched={formik.touched.country}
												invalidFeedback={formik.errors.country}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
									<div className='mb-3'>
										<FormGroup
											id='state'
											label='State'
											//   isFloating
										>
											<Select
												ariaLabel='State'
												placeholder='Choose from list of State'
												required
												list={stateList}
												onChange={formik.handleChange}
												value={formik.values.state}
												isValid={formik.isValid}
												isTouched={formik.touched.state}
												invalidFeedback={formik.errors.state}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
									{/* Phone number field */}
									<div className='mb-3'>
										<FormGroup
											id='signup-telephone'
											label='What’s your phone number*'>
											{/* <Input
												type='tel'
												name='phone_number'
												onChange={formik.handleChange}
												value={formik.values.phone_number}
												onBlur={formik.handleBlur}
												onFocus={() => {
													formik.setErrors({})
												}}
												isValid={formik.isValid}
												isTouched={formik.touched.phone_number}
												invalidFeedback={formik.errors.phone_number}
												validFeedback='Looks good!'
											/> */}
											<PhoneInput
												placeholder='Enter phone number'
												value={value}
												className='form-control'
												onChange={(e) => {
													// formik.setFieldValue(
													// 	'phone_number',
													// 	e?.target?.values,
													// )
													// setValue(e?.target?.values)
													console.log('e>>', e)
												}}
											/>
										</FormGroup>
									</div>

									<div className='mb-3'>
										<FormGroup
											id='signup-telephone'
											label='What best describes your current role?'>
											<div>
												{Object.values(ROLE_PER_TAB).map((role, index) => (
													<Button
														key={Number(index)}
														color='info'
														className='btn-outline-dark rounded-pill mx-2 my-2 py-3 px-2'
														onClick={() => {
															setActiveRolePerTab(role)
														}}
														isLink={activeRolePerTab !== role}
														isLight={activeRolePerTab === role}>
														{role}
													</Button>
												))}
											</div>
										</FormGroup>
									</div>
								</div>
							) : steps[currentStep] === 'Step 3' ? (
								<div>
									<div className='text-center h3 fw-bold mb-4'>
										Hi {data?.first_name},Welcome to SoSimple!
									</div>
									<div className='text-center h5 mb-2'>
										First things first, tell us a bit about your activity This
										will help us adapt the platform to fit your needs.
									</div>
									{activeRolePerTab === ROLE_PER_TAB.Student ? (
										<>
											<div className='mb-3'>
												<FormGroup
													id='studyField'
													label='What’s your field of studies?*'
													//   isFloating
												>
													<Select
														ariaLabel='studyField'
														placeholder='What’s your field of studies?'
														required
														list={fieldOfStudy}
														onChange={formik.handleChange}
														value={formik.values.studyField}
														isValid={formik.isValid}
														isTouched={formik.touched.studyField}
														invalidFeedback={formik.errors.studyField}
														validFeedback='Looks good!'
													/>
												</FormGroup>
											</div>
											<div className='mb-3'>
												<FormGroup
													id='schoolName'
													label='What’s your name school?*'
													//   isFloating
												>
													<Input
														value={formik.values.schoolName}
														isTouched={formik.touched.schoolName}
														invalidFeedback={formik.errors.schoolName}
														isValid={formik.isValid}
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
														onFocus={() => {
															formik.setErrors({})
														}}
													/>
												</FormGroup>
											</div>
											<div className='mb-3'>
												<FormGroup
													id='position_post_graduation'
													label='What position or company are you targeting post-graduation?'
													//   isFloating
												>
													<Input
														value={
															formik.values.position_post_graduation
														}
														isTouched={
															formik.touched.position_post_graduation
														}
														invalidFeedback={
															formik.errors.position_post_graduation
														}
														isValid={formik.isValid}
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
														onFocus={() => {
															formik.setErrors({})
														}}
													/>
												</FormGroup>
											</div>
											<div className='mb-3'>
												<FormGroup
													id='numberOfYear'
													label='How many years do you have left to complete your studies?'
													//   isFloating
												>
													<Input
														type='number'
														min={0}
														value={formik.values.numberOfYear}
														isTouched={formik.touched.numberOfYear}
														invalidFeedback={formik.errors.numberOfYear}
														isValid={formik.isValid}
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
														onFocus={() => {
															formik.setErrors({})
														}}
													/>
												</FormGroup>
											</div>
										</>
									) : (
										<>
											{/* Company name fields */}
											<div className='mb-3'>
												<FormGroup
													id='companyName'
													isFloating
													label='What’s your company’s name?*
'>
													<Input
														type='text'
														name='companyName'
														onChange={formik.handleChange}
														value={formik.values.companyName}
														isValid={formik.isValid}
														isTouched={formik.touched.companyName}
														invalidFeedback={formik.errors.companyName}
														validFeedback='Looks good!'
														onFocus={() => {
															formik.setErrors({})
														}}
													/>
												</FormGroup>
											</div>
											<div className='mb-3'>
												<FormGroup
													id='fieldOfActivity'
													label='What’s your field of activity?*
													'
													//   isFloating
												>
													<Select
														ariaLabel='fieldOfActivity'
														placeholder='What’s your field of activity?'
														required
														list={fieldOfStudy}
														onChange={formik.handleChange}
														value={formik.values.fieldOfActivity}
														isValid={formik.isValid}
														isTouched={formik.touched.fieldOfActivity}
														invalidFeedback={
															formik.errors.fieldOfActivity
														}
														validFeedback='Looks good!'
													/>
												</FormGroup>
											</div>

											<SellingButtons
												activeSellingPerTab={activeSellingPerTab}
												setActiveSellingPerTab={setActiveSellingPerTab}
											/>

											<NumOfPeopleButtons
												activeTabForNumOfPeople={activeTabForNumOfPeople}
												setActiveTabForNumOfPeople={
													setActiveTabForNumOfPeople
												}
											/>
											<div className='mb-3'>
												<FormGroup
													id='establishYear'
													label='What is the year of establishment of your company?*
													'
													//   isFloating
												>
													<Select
														ariaLabel='establishYear'
														placeholder='What is the year of establishment of your company?'
														required
														list={years}
														onChange={formik.handleChange}
														value={formik.values.establishYear}
														isValid={formik.isValid}
														isTouched={formik.touched.establishYear}
														invalidFeedback={
															formik.errors.establishYear
														}
														validFeedback='Looks good!'
													/>
												</FormGroup>
											</div>
										</>
									)}
								</div>
							) : steps[currentStep] === 'Step 4' ? (
								<div>
									<div className='text-center h3 fw-bold mb-4'>
										Hi {data?.first_name},Welcome to SoSimple!
									</div>
									<div className='text-center h5 mb-2'>
										We’ll customize your So Simple experience based on your
										choice. You can always add more in the future.
									</div>
									<div className='mb-3 mt-2'>
										<FormGroup
											id='category'
											label='Choose your top priorities to focus on – Select up to three options*.'>
											<div>
												{categoryList.map((i) => (
													<Button
														color='info'
														className='btn-outline-dark rounded-pill mx-2 my-2 py-3 px-3'
														onClick={() => {
															setActiveCategory(i.id)
														}}
														isLink={activeCategory !== i.id}
														isLight={activeCategory === i.id}>
														{i.lable}
													</Button>
												))}
											</div>
										</FormGroup>
									</div>
								</div>
							) : steps[currentStep] === 'Step 5' ? (
								<div>
									<div className='text-center h3 fw-bold mb-4'>
										Hi {data?.first_name},Welcome to SoSimple!
									</div>
									<div className='text-center h5 mb-2'>
										One last question, how did you hear about us?
									</div>
									<div className='mb-3 mt-2'>
										<FormGroup id='category'>
											<div className='row'>
												{sourceList.map((i) => (
													<div key={i.id} className='col-md-6'>
														<Button
															color='info'
															className='btn btn-outline-dark rounded-pill my-2 py-3 px-3 w-100 '
															onClick={() => {
																setActiveSource(i.id)
															}}
															isLink={activeSource !== i.id}
															isLight={activeSource === i.id}>
															{i.lable}
														</Button>
													</div>
												))}
											</div>
										</FormGroup>
									</div>
								</div>
							) : (
								<div>
									<div className='text-center h2 fw-bold mb-2'>
										<img
											src={DashboardScreen}
											className='img-fluid'
											alt='DashboardScreen'
										/>
									</div>
									<div className='text-center mb-2'>
										<p className='h4'>
											Hi{' '}
											<span className='text-success'>
												{data && data.first_name}
											</span>
										</p>
										<div className='fw-bold h4'>
											Thank you for signing up! Your account is now active and
											ready to use.
										</div>
									</div>
									<div className='text-center h5 mb-1'>
										Navigate your business with SoSimple, utilizing its
										comprehensive A to Z process designed to help you achieve
										your daily and long-term goals. Break down the marketing
										process into manageable step-by-step tasks. Say goodbye to
										stress! Track your work, manage projects, and make confident
										decisions all in one platform.
									</div>
									<div className='text-center h5 fw-bold mb-1'>
										SoSimple empowers you to promote your business with ease and
										confidence.
									</div>
									<div className='text-center h5 mb-2'>
										We hope you enjoy using it to its fullest potential!
									</div>
								</div>
							)}
						</div>
					</div>
				</ModalBody>
				<ModalFooter className='justify-content-center'>
					<div className='steps-action'>
						{currentStep > 0 && currentStep < steps.length - 2 && (
							<button
								type='button'
								onClick={previousStep}
								className='btn btn-light-info border-transparent px-4 mx-1'>
								Back
							</button>
						)}
						{currentStep < steps.length - 3 && (
							<Button
								onClick={nextStep}
								isDisable={
									currentStep === 0
										? !!formik.errors.phone_number
										: !!formik.errors.companyName
								}
								className='btn btn-info px-4 mx-1'>
								Next
							</Button>
						)}
						{currentStep === steps.length - 3 && (
							<Button
								color='success'
								icon='save'
								className='btn btn-info px-4 mx-1'
								isDisable={
									!!formik.errors.companyName &&
									!!formik.errors.country &&
									!!formik.errors.state
								}
								onClick={formik.handleSubmit}>
								Submit
							</Button>
						)}
						{currentStep === steps.length - 2 && (
							<button
								type='button'
								onClick={() => {
									closeModal()
									handleOnClick()
								}}
								className='btn btn-info px-4 mx-1'>
								Let's Start
							</button>
						)}
					</div>
				</ModalFooter>
			</Modal>
		</Page>
	)
}

export default ModalsStepForm
