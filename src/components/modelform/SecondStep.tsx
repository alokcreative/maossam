import React, { FC } from 'react'
import FormGroup from '../bootstrap/forms/FormGroup'
import Select from '../bootstrap/forms/Select'
import Button from '../bootstrap/Button'
import PhoneInput from 'react-phone-number-input'
import { FormikProps, useFormik } from 'formik'

interface IButtonPerTab {
	[key: string]: 'Freelancer' | 'Business Owner' | 'Team Manager' | 'Team Member' | 'Student'
}
interface IOptionsProps {
	value: string | number
	text: string | number
}
interface IProps {
	first_name: string
	countryList: IOptionsProps
	stateList: IOptionsProps
	setValue(...args: unknown[]): unknown
	value: any
	ROLE_PER_TAB: { [key: string]: IButtonPerTab['key'] }
	activeRolePerTab: string
	setActiveRolePerTab(...args: unknown[]): unknown
}

const SecondStep: FC<IProps> = ({
	first_name,
	countryList,
	stateList,
	setValue,
	value,
	ROLE_PER_TAB,
	setActiveRolePerTab,
	activeRolePerTab,
}) => {
	const formik = useFormik({
		initialValues: {
			country: '',
			state: '',
		},
		validate: (values) => {
			const errors: {
				country?: string
				state?: string
			} = {}

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
		},
	})
	return (
		<div>
			<div className='text-center h3 fw-bold mb-4'>
				Hi {first_name && first_name},Welcome to SoSimple!
			</div>
			<div className='text-center h5 mb-2'>
				First things first, tell us a bit about your activity This will help us adapt the
				platform to fit your needs.
			</div>
			{/* <div className='mb-3'>
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
			</div> */}
			{/* Phone number field */}
			<div className='mb-3'>
				<FormGroup id='signup-telephone' label='What’s your phone number*'>
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
							isLink={activeRolePerTab !== ROLE_PER_TAB.Freelancer}
							isLight={activeRolePerTab === ROLE_PER_TAB.Freelancer}>
							Freelancer
						</Button>
						<Button
							color='info'
							onClick={() => {
								setActiveRolePerTab(ROLE_PER_TAB.Business_Owner)
							}}
							isLink={activeRolePerTab !== ROLE_PER_TAB.Business_Owner}
							isLight={activeRolePerTab === ROLE_PER_TAB.Business_Owner}>
							Business Owner
						</Button>
						<Button
							color='info'
							onClick={() => {
								setActiveRolePerTab(ROLE_PER_TAB.Team_Manager)
							}}
							isLink={activeRolePerTab !== ROLE_PER_TAB.Team_Manager}
							isLight={activeRolePerTab === ROLE_PER_TAB.Team_Manager}>
							Team Manager
						</Button>
						<Button
							color='info'
							onClick={() => {
								setActiveRolePerTab(ROLE_PER_TAB.Team_Member)
							}}
							isLink={activeRolePerTab !== ROLE_PER_TAB.Team_Member}
							isLight={activeRolePerTab === ROLE_PER_TAB.Team_Member}>
							Team Member
						</Button>
						<Button
							color='info'
							onClick={() => {
								setActiveRolePerTab(ROLE_PER_TAB.Student)
							}}
							isLink={activeRolePerTab !== ROLE_PER_TAB.Student}
							isLight={activeRolePerTab === ROLE_PER_TAB.Student}>
							Student
						</Button>
					</div>
				</FormGroup>
			</div>
		</div>
	)
}

export default SecondStep
