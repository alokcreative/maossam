import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTour } from '@reactour/tour';
import Page from '../../../layout/Page/Page';
import Modal, { ModalBody, ModalFooter } from '../../../components/bootstrap/Modal';
import Input from '../../../components/bootstrap/forms/Input';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Checks from '../../../components/bootstrap/forms/Checks';
import Select from '../../../components/bootstrap/forms/Select';
import DashboardScreen from '../../../assets/let-start.png';
import { Country, State, City } from 'country-state-city';
import useEffectOnce from 'react-use/lib/useEffectOnce';
import Button from '../../../components/bootstrap/Button';

interface IOptionsProps {
	value?: string | number;
	text?: string | number;
}

const ModalsStepForm: React.FC = () => {
	const savedValue = localStorage.getItem('user');
	const parsedValue = savedValue ? JSON.parse(savedValue) : null;
	const username = parsedValue?.newUserName;
	const [countryList, setcountryList] = useState<IOptionsProps[]>();
	const [stateList, setstateList] = useState<IOptionsProps[]>();
	const [activeBtn, setActiveBtn] = useState('');
	const [selectedValue, setSelectedValue] = useState('');

	const onToggleBtn = (value: string) => {
		setActiveBtn(value);
		setSelectedValue(value);
	};
	useEffectOnce(() => {
		const countryListDetails = Country.getAllCountries();
		// const stateList = State.getAllStates();
		// console.log(countryListDetails);
		const LIST = countryListDetails.map(({ name, isoCode }) => ({
			value: isoCode,
			text: name,
		}));
		setcountryList(LIST);
	});

	const navigate = useNavigate();
	const handleOnClick = useCallback(() => navigate('/'), [navigate]);
	// Formik uses

	const formik = useFormik({
		// enableReinitialize: true,
		initialValues: {
			phoneNo: '',
			userConformation: '',
			companyName: '',
			role: '',
			fieldOfActivity: '',
			noOfTeam: selectedValue,
			CountryName: '',
			StateName: '',
		},
		validate: (values) => {
			const errors: {
				userEmail?: string;
				phoneNo?: string;
				userConformation?: string;
			} = {};

			return errors;
		},
		validateOnChange: false,
		onSubmit: (values) => {
			nextStep();

			console.log(selectedValue);
		},
	});
	useEffect(() => {
		const stateListupdated = State.getStatesOfCountry(formik.values.CountryName);
		console.log(formik.values.CountryName);
		const LIST = stateListupdated.map(({ name }) => ({
			value: name,
			text: name,
		}));
		setstateList(LIST);
	}, [formik.values.CountryName]);
	// console.log(formik.values.CountryName);
	// Steps forms
	const [isOpen, setIsOpenParentModal] = useState(true);
	const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6'];
	const [currentStep, setCurrentStep] = useState(0);

	const nextStep = () => {
		setCurrentStep(currentStep + 1);
	};

	const previousStep = () => {
		setCurrentStep(currentStep - 1);
	};
	const { setIsOpen } = useTour();

	const closeModal = () => {
		setIsOpenParentModal(false);
		setIsOpen(true);
		navigate('/');
	};

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
									<div className='text-center h1 my-3 fw-bold'>MA OSSIM</div>
									<div className='text-center display-2 fw-bold mb-5 lh-1'>
										START YOUR FREE TRIAL
									</div>
									<div className='text-center text-muted h5 mb-5'>
										{/* Try all the features -{' '}
										<span className='text-danger'>
											No credit card required??
										</span> */}
									</div>
									<div className='mb-3'>
										<FormGroup
											id='signup-telephone'
											isFloating
											label='Phone Number'>
											<Input
												type='tel'
												name='phoneNo'
												onChange={formik.handleChange}
												value={formik.values.phoneNo}
												isValid={formik.isValid}
												isTouched={formik.touched.phoneNo}
												invalidFeedback={formik.errors.phoneNo}
												onBlur={formik.handleBlur}
												onFocus={() => {
													formik.setErrors({});
												}}
											/>
										</FormGroup>
									</div>

									<div className='mb-3'>
										<Checks
											id='userConformation'
											type='radio'
											value='yes'
											name='userConformation'
											onChange={formik.handleChange}
											checked={formik.values.userConformation}
											label='I agree to the Terms of Use and Privacy Policy'
										/>
									</div>
								</div>
							) : steps[currentStep] === 'Step 2' ? (
								<div>
									<div className='text-center h1 fw-bold mb-4'>
										Welcome to MA OSSIM!
									</div>
									<div className='text-center h3 mb-2'>
										Let’s set up your account
									</div>
									{/* <div className='text-center mb-5 fst-italic'>
										(You can always change it later)
									</div> */}
									<div className='mb-3'>
										<FormGroup id='signup-company' isFloating label='COMPANY'>
											<Input
												type='text'
												name='companyName'
												onChange={formik.handleChange}
												value={formik.values.companyName}
											/>
										</FormGroup>
									</div>
								</div>
							) : //  steps[currentStep] === 'Step 3' ? (
							// 	<div>
							// 		<div className='text-center h1 fw-bold mb-4'>
							// 			Which best describes you?
							// 		</div>
							// 		<div className='text-center h4 mb-5'>
							// 			This will help us adapt the platform to fit your business
							// 			needs
							// 		</div>
							// 		<div className='mb-3'>
							// 			<Checks
							// 				id='role'
							// 				type='radio'
							// 				name='role'
							// 				value='student'
							// 				onChange={formik.handleChange}
							// 				checked={formik.values.role}
							// 				label='Student'
							// 			/>
							// 		</div>
							// 		<div className='mb-3'>
							// 			<Checks
							// 				id='role'
							// 				type='radio'
							// 				name='role'
							// 				value='entrepreneur'
							// 				onChange={formik.handleChange}
							// 				checked={formik.values.role}
							// 				label='Entrepreneur'
							// 			/>
							// 		</div>
							// 		{formik.values.role === 'entrepreneur' ? (
							// 			<>
							// 				<Button
							// 					type='button'
							// 					onClick={() => onToggleBtn('1')}
							// 					className={`btn px-4 m-1 ${
							// 						activeBtn === '1'
							// 							? 'btn-info'
							// 							: 'btn-light-info'
							// 					}`}>
							// 					1 year and less
							// 				</Button>
							// 				<Button
							// 					type='button'
							// 					onClick={() => onToggleBtn('2')}
							// 					className={`btn px-4 m-1 ${
							// 						activeBtn === '2'
							// 							? 'btn-info'
							// 							: 'btn-light-info'
							// 					}`}>
							// 					2-3 years
							// 				</Button>
							// 				<Button
							// 					type='button'
							// 					onClick={() => onToggleBtn('3')}
							// 					className={`btn px-4 m-1 ${
							// 						activeBtn === '3'
							// 							? 'btn-info'
							// 							: 'btn-light-info'
							// 					}`}>
							// 					more than 3 years
							// 				</Button>
							// 			</>
							// 		) : null}

							// 		<div className='mb-3 mt-4'>
							// 			<FormGroup id='activity' label='Field of activity'>
							// 				<Select
							// 					ariaLabel='activity'
							// 					placeholder='Choose...'
							// 					list={[
							// 						{ value: 'a1', text: 'Field of activity 1' },
							// 						{ value: 'a2', text: 'Field of activity 2' },
							// 						{ value: 'a3', text: 'Field of activity 3' },
							// 						{ value: 'a4', text: 'Field of activity 4' },
							// 					]}
							// 				/>
							// 			</FormGroup>
							// 		</div>
							// 	</div>
							// ) : steps[currentStep] === 'Step 4' ? (
							// 	<div>
							// 		<div className='text-center h1 fw-bold mb-4'>MA OSSIM</div>
							// 		<div className='text-center h4 mb-5'>
							// 			How many are you on your team?
							// 		</div>
							// 		<div className='team-button text-center h-100'>
							// 			<Button
							// 				type='button'
							// 				onClick={() => onToggleBtn('Just Me')}
							// 				className={`btn px-4 m-1 ${
							// 					activeBtn === 'Just Me'
							// 						? 'btn-info'
							// 						: 'btn-light-info'
							// 				}`}>
							// 				Just Me
							// 			</Button>
							// 			<Button
							// 				type='button'
							// 				onClick={() => onToggleBtn('2-4')}
							// 				className={`btn px-4 m-1 ${
							// 					activeBtn === '2-4' ? 'btn-info' : 'btn-light-info'
							// 				}`}>
							// 				2-4
							// 			</Button>
							// 			<Button
							// 				type='button'
							// 				onClick={() => onToggleBtn('5-10')}
							// 				className={`btn px-4 m-1 ${
							// 					activeBtn === '5-10' ? 'btn-info' : 'btn-light-info'
							// 				}`}>
							// 				5-10
							// 			</Button>
							// 			<Button
							// 				type='button'
							// 				onClick={() => onToggleBtn('11-30')}
							// 				className={`btn px-4 m-1 ${
							// 					activeBtn === '11-30'
							// 						? 'btn-info'
							// 						: 'btn-light-info'
							// 				}`}>
							// 				11-30
							// 			</Button>
							// 			<Button
							// 				type='button'
							// 				onClick={() => onToggleBtn('31+')}
							// 				className={`btn px-4 m-1 ${
							// 					activeBtn === '31+' ? 'btn-info' : 'btn-light-info'
							// 				}`}>
							// 				31+
							// 			</Button>
							// 		</div>
							// 	</div>
							// )
							steps[currentStep] === 'Step 5' ? (
								<div>
									<div className='text-center h1 fw-bold mb-4'>MA OSSIM</div>
									<div className='text-center h4 mb-5'>
										Where are you located?
									</div>
									{/* <div className='text-center h5 mb-5'>
										This will help us adapt the platform to fit your business
										needs.
									</div> */}
									<div className='mb-3'>
										<FormGroup
											id='CountryName'
											label='Countries'
											//   isFloating
										>
											<Select
												ariaLabel='countries'
												placeholder='Choose from list of countries'
												required
												list={countryList}
												onChange={formik.handleChange}
												value={formik.values.CountryName}
											/>
										</FormGroup>
									</div>
									<div className='mb-3'>
										<FormGroup
											id='StateName'
											label='State'
											//   isFloating
										>
											<Select
												ariaLabel='State'
												placeholder='Choose from list of State'
												required
												list={stateList}
												onChange={formik.handleChange}
												value={formik.values.StateName}
											/>
										</FormGroup>
									</div>
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
											Hi <span className='text-success'>{username}</span>
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
					{/* <h2>{steps[currentStep]}</h2>
          <p>Step {currentStep + 1} content goes here.</p> */}

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
							<button
								type='button'
								onClick={nextStep}
								className='btn btn-info px-4 mx-1'>
								Next
							</button>
						)}
						{currentStep === steps.length - 2 && (
							<Button
								color='success'
								icon='save'
								isLight
								className='btn btn-info px-4 mx-1'
								onClick={formik.handleSubmit}>
								Submit
							</Button>
						)}
						{currentStep === steps.length - 1 && (
							<button
								type='button'
								onClick={() => {
									closeModal();
									handleOnClick();
								}}
								className='btn btn-info px-4 mx-1'>
								Let's Start
							</button>
						)}
					</div>
				</ModalFooter>
			</Modal>
		</Page>
	);
};

export default ModalsStepForm;
