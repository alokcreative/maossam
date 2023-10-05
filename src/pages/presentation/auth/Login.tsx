import React, { FC, useState, lazy, startTransition, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useFormik } from 'formik';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import useDarkMode from '../../../hooks/useDarkMode';
import Spinner from '../../../components/bootstrap/Spinner';
import { useGoogleLogin } from '@react-oauth/google';
import {  useLoginUserMutation } from '../../../features/auth/authApiSlice';
import { toast } from 'react-toastify';

const Signup = lazy(() => import('./Signup'));

interface ILoginHeaderProps {
	isNewUser?: boolean;
}
const LoginHeader: FC<ILoginHeaderProps> = ({ isNewUser }) => {
	if (isNewUser) {
		return (
			<>
				<div className='text-center h1 fw-bold mt-5'>Create Account,</div>
				<div className='text-center h4 text-muted mb-5'>Sign up to get started!</div>
			</>
		);
	}
	return (
		<>
			<div className='text-center h1 fw-bold mt-5'>Welcome,</div>
			<div className='text-center h4 text-muted mb-5'>Sign in to continue!</div>
		</>
	);
};
LoginHeader.defaultProps = {
	isNewUser: false,
};

interface ILoginProps {
	isSignUp?: boolean;
}

const Login: FC<ILoginProps> = ({ isSignUp }) => {
	// const { setUser } = useContext(AuthContext);

	const { darkModeStatus } = useDarkMode();

	const [singUpStatus, setSingUpStatus] = useState<boolean>(!!isSignUp);
	const [LoginUserMutation, { isLoading }] = useLoginUserMutation();

	const navigate = useNavigate();

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			email: '',
			password: '',
		},
		validate: (values) => {
			const errors: { email?: string; password?: string } = {};

			if (!values.email) {
				errors.email = 'Required';
			}

			if (!values.password) {
				errors.password = 'Required';
			}

			return errors;
		},
		validateOnChange: false,
		onSubmit: async (values) => {
			if (values.email) {
				startTransition(() => {
					LoginUserMutation(values)
						.unwrap()
						.then((data1: { access: string; refresh: string }) => {
							localStorage.setItem('access_token', data1.access);
							localStorage.setItem('refresh_token', data1.refresh);
							navigate('/');
						})
						.catch((rejected) => {
							toast(rejected.data?.detail);
							formik.setFieldValue('email', '');
							formik.setFieldValue('password', '');
						});
				});
			}
		},
	});

	// const handleContinue = () => {
	// 	setIsLoading(true);
	// 	setTimeout(() => {
	// 		if (
	// 			!Object.keys(USERS).find((f) => USERS[f].email.toString() === formik.values.email)
	// 		) {
	// 			formik.setFieldError('email', 'User not found');
	// 		} else {
	// 			setSignInPassword(true);

	// 			// dispatch(login(user))
	// 		}
	// 		setIsLoading(false);
	// 	}, 1000);
	// };

	const handleLoginWithGoogle = useGoogleLogin({
		// onSuccess: (tokenResponse) => setToken(tokenResponse.access_token),
		// onError: (error) => console.log('Login Failed:', error),
	});
	// useEffect(() => {
	// 	if (token) {
	// 		axios
	// 			.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`, {
	// 				headers: {
	// 					Authorization: `Bearer ${token}`,
	// 					Accept: 'application/json',
	// 				},
	// 			})
	// 			.then((res) => {
	// 				setProfile(res.data);
	// 				// console.log(res.data);
	// 				const userdetails = {
	// 					id: res.data.id,
	// 					name: res.data.given_name,
	// 					lastname: res.data.family_name,
	// 					role: Role.user,
	// 					email: res.data.email,
	// 					src: res.data.picture,
	// 				};
	// 				const user = { user: userdetails };
	// 				dispatch(login(user));
	// 				const value = JSON.stringify(userdetails);
	// 				localStorage.setItem('user', value);
	// 				setIsLoading(true);
	// 				startTransition(() => {
	// 					navigate('/');
	// 				});
	// 				setIsLoading(false);
	// 				// console.log(res.data)
	// 			})
	// 			.catch((err) => setProfile(err));
	// 	}
	// }, [token, navigate, dispatch]);

	const handleLinkClick = (e: React.FormEvent) => {
		e.preventDefault(); // Prevent the default browser behavior
		// You can add additional logic here if needed
	};

	return (
		<PageWrapper isProtected={false} title={singUpStatus ? 'Sign Up' : 'Login'}>
			<Page className='p-0'>
				<div className='row h-100 align-items-center justify-content-center'>
					<div className='col-xl-4 col-lg-6 col-md-8 shadow-3d-container'>
						<Card className='shadow-3d-dark' data-tour='login-page'>
							<CardBody>
								<div className='text-center my-5'>
									<Link
										to='/'
										className={classNames(
											'text-decoration-none  fw-bold display-2',
											{
												'text-dark': !darkModeStatus,
												'text-light': darkModeStatus,
											},
										)}
										aria-label='MA-OSSIM'>
										<div className='text-center display-2 fw-bold mb-5 lh-1'>
											MA OSSIM
										</div>
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
													setSingUpStatus(false);
													setSingUpStatus(!singUpStatus);
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
													setSingUpStatus(!singUpStatus);
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
															formik.setErrors({});
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
														type='password'
														name='password'
														autoComplete='current-password'
														value={formik.values.password}
														isTouched={formik.touched.password}
														invalidFeedback={formik.errors.password}
														validFeedback='Looks good!'
														isValid={formik.isValid}
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
												<Button
													color='warning'
													className='w-100 py-3'
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
						<div className='text-center'>
							<a
								href='/'
								className={classNames('text-decoration-none me-3', {
									'link-light': darkModeStatus,
									'link-dark': !darkModeStatus,
								})}
								onClick={handleLinkClick}>
								Privacy policy
							</a>
							<a
								href='/'
								className={classNames('link-light text-decoration-none', {
									'link-light': darkModeStatus,
									'link-dark': !darkModeStatus,
								})}
								onClick={handleLinkClick}>
								Terms of use
							</a>
						</div>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};
Login.propTypes = {
	isSignUp: PropTypes.bool,
};
Login.defaultProps = {
	isSignUp: false,
};

export default Login;
