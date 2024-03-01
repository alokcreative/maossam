import React, { FC, useState, lazy, startTransition } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useFormik } from 'formik'
import PageWrapper from '../../../layout/PageWrapper/PageWrapper'
import Page from '../../../layout/Page/Page'
import Card, { CardBody } from '../../../components/bootstrap/Card'
import FormGroup from '../../../components/bootstrap/forms/FormGroup'
import Input from '../../../components/bootstrap/forms/Input'
import Button from '../../../components/bootstrap/Button'
import useDarkMode from '../../../hooks/useDarkMode'
import Spinner from '../../../components/bootstrap/Spinner'
import { useGoogleLogin } from '@react-oauth/google'
import {
	useForgetPasswordMutation,
	useLoginUserMutation,
} from '../../../features/auth/authApiSlice'
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal'
import Icon from '../../../components/icon/Icon'
import showNotification from '../../../components/extras/showNotification'
import { TInputTypes } from '../../../type/input-type'
import logoD from '../../../assets/logos/logoLighthome.png'
import logoL from '../../../assets/logos/logoLight.png'

const Signup = lazy(() => import('./Signup'))

interface ILoginHeaderProps {
	isNewUser?: boolean
}
const LoginHeader: FC<ILoginHeaderProps> = ({ isNewUser }) => {
	if (isNewUser) {
		return (
			<>
				<div className='text-center h1 fw-bold mt-5'>Create Account,</div>
				<div className='text-center h4 text-muted mb-5'>Sign up to get started!</div>
			</>
		)
	}
	return (
		<>
			<div className='text-center h1 fw-bold mt-5'>Welcome,</div>
			<div className='text-center h4 text-muted mb-5'>Sign in to continue!</div>
		</>
	)
}
LoginHeader.defaultProps = {
	isNewUser: false,
}

interface ILoginProps {
	isSignUp?: boolean
}

const Login: FC<ILoginProps> = ({ isSignUp }) => {
	const { darkModeStatus } = useDarkMode()
	const [singUpStatus, setSingUpStatus] = useState<boolean>(!!isSignUp)
	const [LoginUserMutation, { isLoading }] = useLoginUserMutation()
	const [ForgetPasswordMutation, { isLoading: loading }] = useForgetPasswordMutation()
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [passwordType, setPasswordType] = useState<TInputTypes>('password')
	const [passwordIcon, setPasswordIcon] = useState('VisibilityOff')

	const navigate = useNavigate()

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			email: '',
			password: '',
		},
		validate: (values) => {
			const errors: { email?: string; password?: string } = {}

			if (!values.email) {
				errors.email = 'Required'
			}

			if (!values.password) {
				errors.password = 'Required'
			}

			return errors
		},
		validateOnChange: true,
		onSubmit: async (values) => {
			if (values.email) {
				startTransition(() => {
					LoginUserMutation(values)
						.unwrap()
						.then((data1: { access: string; refresh: string }) => {
							localStorage.setItem('access_token', data1.access)
							localStorage.setItem('refresh_token', data1.refresh)
							navigate('/')
						})
						.catch((rejected) => {
							showNotification(
								<span className='d-flex align-items-center'>
									<Icon icon='Info' size='lg' className='me-1' />
									<span>{rejected.data?.detail}</span>
								</span>,
								``,
							)
							formik.setFieldValue('email', '')
							formik.setFieldValue('password', '')
						})
				})
			}
		},
	})

	const handleLoginWithGoogle = useGoogleLogin({
		// onSuccess: (tokenResponse) => setToken(tokenResponse.access_token),
		// onError: (error) => console.log('Login Failed:', error),
	})
	const handleLinkClick = (e: React.FormEvent) => {
		e.preventDefault() // Prevent the default browser behavior
	}

	const formikLink = useFormik({
		enableReinitialize: true,
		initialValues: {
			email: '',
		},
		validate: (values) => {
			const errors: { email?: string } = {}

			if (!values.email) {
				errors.email = 'Required'
			}
			return errors
		},
		validateOnChange: false,
		onSubmit: async (values) => {
			if (values.email) {
				startTransition(() => {
					ForgetPasswordMutation(
						JSON.stringify({
							email: values.email,
						}),
					)
						.unwrap()
						.then((res) => {
							// console.log('res>>>>>', res.message);
							showNotification(
								<span className='d-flex align-items-center'>
									<Icon icon='Info' size='lg' className='me-1' />
									<span>{res.message}</span>
								</span>,
								``,
							)
						})
						.catch((res) => {
							showNotification(
								<span className='d-flex align-items-center'>
									<Icon icon='Info' size='lg' className='me-1' />
									<span>{res.data?.email[0]}</span>
								</span>,
								``,
							)
						})
				})
			}
		},
	})
	const handlePasswordShow = () => {
		if (passwordType === 'password') {
			setPasswordType('text')
			setPasswordIcon('VisibilityOff')
		}
		if (passwordType === 'text') {
			setPasswordType('password')
			setPasswordIcon('Visibility')
		}
	}
	return (
		<PageWrapper isProtected={false} title={singUpStatus ? 'Sign Up' : 'Login'}>
			<Page className='p-0'>
				<div className='row h-100 align-items-center justify-content-center'>
					<div className='col-xl-4 col-lg-6 col-md-8 shadow-3d-container'>
						<Card className='shadow-3d-dark' data-tour='login-page'>
							<CardBody>
								<div className='text-center my-5 '>
									<Link
										to='/'
										className={classNames(
											'text-decoration-none  fw-bold display-2',
											{
												'text-dark': !darkModeStatus,
												'text-light': darkModeStatus,
											},
										)}
										aria-label='SoSimple'>
										<img
											src={darkModeStatus ? logoL : logoD}
											alt='SoSimple'
											height={80}
										/>
									</Link>
								</div>
								<div
									className={classNames('rounded-3', {
										'bg-l10-dark': !darkModeStatus,
										'bg-dark': darkModeStatus,
									})}>
									<div className='row row-cols-2 g-3 pb-3 px-3 mt-0'>
										<div className='col'>
											<Button
												color={darkModeStatus ? 'light' : 'dark'}
												isLight={singUpStatus}
												className='rounded-1 w-100'
												size='lg'
												onClick={() => {
													setSingUpStatus(false)
													setSingUpStatus(!singUpStatus)
												}}>
												Login
											</Button>
										</div>
										<div className='col'>
											<Button
												color={darkModeStatus ? 'light' : 'dark'}
												isLight={!singUpStatus}
												className='rounded-1 w-100'
												size='lg'
												onClick={() => {
													setSingUpStatus(!singUpStatus)
												}}>
												Sign Up
											</Button>
										</div>
									</div>
								</div>

								<LoginHeader isNewUser={singUpStatus} />
								<form className='row g-4'>
									{singUpStatus ? (
										<Signup />
									) : (
										<>
											<div className='col-12'>
												<FormGroup
													id='email'
													isFloating
													label='Your email...'>
													<Input
														autoComplete='username'
														value={formik.values.email}
														isTouched={formik.touched.email}
														invalidFeedback={formik.errors.email}
														isValid={formik.isValid}
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
														onFocus={() => {
															formik.setErrors({})
														}}
													/>
												</FormGroup>
											</div>

											<div className='col-12'>
												<FormGroup
													id='password'
													isFloating
													label='Password'>
													<Input
														type={passwordType}
														autoComplete='Password'
														value={formik.values.password}
														isTouched={formik.touched.password}
														invalidFeedback={formik.errors.password}
														isValid={formik.isValid}
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
														onFocus={() => {
															formik.setErrors({})
														}}
													/>
												</FormGroup>
												<div>
													{formik.values.password !== '' ? (
														<div
															style={{
																position: 'absolute',
																right: '46px',
																bottom: '212px',
															}}>
															<Icon
																size='lg'
																icon={passwordIcon}
																onClick={handlePasswordShow}
															/>
														</div>
													) : (
														<div />
													)}
												</div>

												<div
													className='cursor-pointer me-3 mt-2'
													onClick={() => setIsOpen(true)}
													style={{
														position: 'absolute',
														right: '0px',
														paddingBottom: '10px',
													}}
													onKeyDown={() => setIsOpen(true)}
													aria-hidden='true'>
													Forget Password
												</div>
											</div>
											<div className='col-12'>
												<Button
													color='warning'
													className='w-100 py-3 mt-4'
													onClick={formik.handleSubmit}>
													{isLoading && (
														<Spinner isSmall inButton isGrow />
													)}
													Login
												</Button>
											</div>
										</>
									)}

									{/* BEGIN :: Social Login */}

									<div className='col-12 mt-3 text-center text-muted'>OR</div>
									<div className='col-12 mt-3'>
										<Button
											isOutline
											color={darkModeStatus ? 'light' : 'dark'}
											className={classNames('w-100 py-3', {
												'border-light': !darkModeStatus,
												'border-dark': darkModeStatus,
											})}
											icon='CustomGoogle'
											onClick={() => handleLoginWithGoogle()}>
											Continue with Google
										</Button>
									</div>

									{/* END :: Social Login */}
								</form>
							</CardBody>
						</Card>
						<div className='text-center mb-3'>
							By proceeding, you agree to the{' '}
							<animateMotion
								className={classNames('text-underline link-light ', {
									'link-light': darkModeStatus,
									'link-dark': !darkModeStatus,
								})}>
								Terms of use
							</animateMotion>{' '}
							and{' '}
							<animateMotion
								className={classNames('text-underline me-3', {
									'link-light': darkModeStatus,
									'link-dark': !darkModeStatus,
								})}
								onClick={handleLinkClick}>
								Privacy policy
							</animateMotion>
						</div>
						{singUpStatus && (
							<div className='text-center mb-3'>
								Already have an account?{' '}
								<animateMotion
									className={classNames('link-light ', {
										'link-light': darkModeStatus,
										'link-dark': !darkModeStatus,
									})}
									onClick={() => {
										setSingUpStatus(false)
									}}>
									Log in
								</animateMotion>
							</div>
						)}
					</div>
				</div>
			</Page>
			<Modal isOpen={isOpen} setIsOpen={setIsOpen} titleId='resetPassword'>
				<ModalHeader>
					<ModalTitle id='resetPassword'>Reset Password</ModalTitle>
				</ModalHeader>
				<ModalBody className='d-flex row gap-2'>
					<div className='col-12'>
						<FormGroup id='email' isFloating label='Your email...'>
							<Input
								autoComplete='username'
								value={formikLink.values.email}
								isTouched={formikLink.touched.email}
								invalidFeedback={formikLink.errors.email}
								isValid={formikLink.isValid}
								onChange={formikLink.handleChange}
								onBlur={formikLink.handleBlur}
								onFocus={() => {
									formikLink.setErrors({})
								}}
							/>
						</FormGroup>
					</div>
					<div className='col-12'>
						<Button
							color='warning'
							className='w-100 py-3'
							onClick={formikLink.handleSubmit}>
							{loading && <Spinner isSmall inButton isGrow />}
							Send
						</Button>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button
						color='info'
						isOutline
						className='border-0'
						onClick={() => setIsOpen(false)}>
						Close
					</Button>
				</ModalFooter>
			</Modal>
		</PageWrapper>
	)
}
Login.propTypes = {
	isSignUp: PropTypes.bool,
}
Login.defaultProps = {
	isSignUp: false,
}

export default Login
