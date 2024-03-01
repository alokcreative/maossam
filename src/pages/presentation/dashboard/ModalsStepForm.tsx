import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { useTour } from '@reactour/tour'
import Page from '../../../layout/Page/Page'
import Modal, { ModalBody, ModalFooter } from '../../../components/bootstrap/Modal'
import Input from '../../../components/bootstrap/forms/Input'
import FormGroup from '../../../components/bootstrap/forms/FormGroup'
import Checks from '../../../components/bootstrap/forms/Checks'
import Select from '../../../components/bootstrap/forms/Select'
import DashboardScreen from '../../../assets/let-start.png'
import { Country, State, City } from 'country-state-city'
import useEffectOnce from 'react-use/lib/useEffectOnce'
import Button from '../../../components/bootstrap/Button'
import { useGetUsersMutation, useUpdateProfileMutation } from '../../../features/auth/authApiSlice'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

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
	const [activeBtn, setActiveBtn] = useState('')
	const [value, setValue] = useState<any>()
	const [data, setData] = useState<any>()
	const [selectedValue, setSelectedValue] = useState('')
	const [UpdateProfileMutation] = useUpdateProfileMutation()
	const [GetUsersMutation, { isLoading, isSuccess }] = useGetUsersMutation()
	const token = localStorage.getItem('access_token')
	console.log('ata>>', data)
	console.log('value>>', value)
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
	console.log('countryList>>', countryList)
	const navigate = useNavigate()
	const handleOnClick = useCallback(() => navigate('/'), [navigate])
	// Formik uses

	const formik = useFormik({
		initialValues: {
			phone_number: '',
			country: '',
			state: '',
			companyName: '',
		},
		validate: (values) => {
			const errors: {
				phone_number?: string
				country?: string
				state?: string
				companyName?: string
			} = {}
			if (!values.phone_number) {
				errors.phone_number = 'Required'
			}
			if (values.phone_number && values.phone_number.length !== 9) {
				errors.phone_number = 'Characters must be 9'
			}
			if (values.companyName === '') {
				errors.companyName = 'Field Required'
			}
			if (!values.companyName) {
				errors.companyName = 'Field Required'
			}
			if (values.country === '') {
				errors.country = 'Field Required'
			}
			if (values.state === '') {
				errors.state = 'Field Required'
			}

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
	useEffect(() => {
		formik.setFieldValue('phone_number', value)
	}, [value, formik])
	// console.log(formik.values.CountryName);
	// Steps forms
	const [isOpen, setIsOpenParentModal] = useState(true)
	const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4']
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
								<div>
									<div className='text-center h1 my-3 fw-bold'>SoSimple</div>
									<div className='text-center display-4 fw-bold mb-5 lh-1'>
										START YOUR FREE TRIAL
									</div>

									<div className='text-center text-muted h5 mb-5'>
										<span className='text-danger'>
											Free 14-day trial. No credit card required. Cancel
											anytime
										</span>
									</div>
								</div>
							) : steps[currentStep] === 'Step 2' ? (
								<div>
									<div className='text-center h3 fw-bold mb-4'>
										Hi {data?.first_name},Welcome to SoSimple!
									</div>
									<div className='text-center h5 mb-2'>
										First things first, tell us a bit about your activity This
										will help us adapt the platform to fit your needs.
									</div>
									{/* <div className='text-center mb-5 fst-italic'>
										(You can always change it later)
									</div> */}
									{/* <div className='text-center h4 mb-5'>
										Where are you located?
									</div> */}
									{/* <div className='text-center h5 mb-5'>
										This will help us adapt the platform to fit your business
										needs.
									</div> */}
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
												onChange={setValue}
											/>
										</FormGroup>
									</div>
									{/* Company name fields */}
									{/* <div className='mb-3'>
										<FormGroup id='signup-company' isFloating label='COMPANY'>
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
									</div> */}
									<div className='mb-3'>
										<FormGroup
											id='signup-telephone'
											label='What best describes your current role?*
											'>
											<div>
												<Button
													color='info'
													onClick={() => {
														setActiveRolePerTab(ROLE_PER_TAB.Freelancer)
													}}
													isLink={
														activeRolePerTab !== ROLE_PER_TAB.Freelancer
													}
													isLight={
														activeRolePerTab === ROLE_PER_TAB.Freelancer
													}>
													Freelancer
												</Button>
												<Button
													color='info'
													onClick={() => {
														setActiveRolePerTab(
															ROLE_PER_TAB.Business_Owner,
														)
													}}
													isLink={
														activeRolePerTab !==
														ROLE_PER_TAB.Business_Owner
													}
													isLight={
														activeRolePerTab ===
														ROLE_PER_TAB.Business_Owner
													}>
													Business Owner
												</Button>
												<Button
													color='info'
													onClick={() => {
														setActiveRolePerTab(
															ROLE_PER_TAB.Team_Manager,
														)
													}}
													isLink={
														activeRolePerTab !==
														ROLE_PER_TAB.Team_Manager
													}
													isLight={
														activeRolePerTab ===
														ROLE_PER_TAB.Team_Manager
													}>
													Team Manager
												</Button>
												<Button
													color='info'
													onClick={() => {
														setActiveRolePerTab(
															ROLE_PER_TAB.Team_Member,
														)
													}}
													isLink={
														activeRolePerTab !==
														ROLE_PER_TAB.Team_Member
													}
													isLight={
														activeRolePerTab ===
														ROLE_PER_TAB.Team_Member
													}>
													Team Member
												</Button>
												<Button
													color='info'
													onClick={() => {
														setActiveRolePerTab(ROLE_PER_TAB.Student)
													}}
													isLink={
														activeRolePerTab !== ROLE_PER_TAB.Student
													}
													isLight={
														activeRolePerTab === ROLE_PER_TAB.Student
													}>
													Student
												</Button>
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
									{activeRolePerTab === ROLE_PER_TAB.Student && (
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
									)}
								</div>
							) : (
								<div>
									<div className='text-center h2 fw-bold mb-4'>
										<img
											src={DashboardScreen}
											className='img-fluid'
											alt='DashboardScreen'
										/>
									</div>
									<div className='text-center h2 fw-bold mb-4'>
										<p>
											Hi{' '}
											<span className='text-success'>
												{data && data.first_name}
											</span>
										</p>
										Welcome to MaOssim, we hope you enjoy it and make the most
										of it !
									</div>
									<div className='text-center h4 mb-5'>
										An all-in-one platform that will allow you to promote your
										business with confidence.
									</div>
								</div>
							)}
						</div>
					</div>
				</ModalBody>
				<ModalFooter className='justify-content-center'>
					<div className='steps-action'>
						{currentStep > 0 && currentStep < steps.length - 1 && (
							<button
								type='button'
								onClick={previousStep}
								className='btn btn-light-info border-transparent px-4 mx-1'>
								Previous
							</button>
						)}
						{currentStep < steps.length - 2 && (
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
						{currentStep === steps.length - 2 && (
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
						{currentStep === steps.length - 1 && (
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
