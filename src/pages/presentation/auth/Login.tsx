import React, { FC, useCallback, useState, lazy, startTransition, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
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
import USERS, { Role, getUserDataWithUsername } from '../../../common/data/userDummyData';
import Spinner from '../../../components/bootstrap/Spinner';
import Alert from '../../../components/bootstrap/Alert';
import { login } from '../../../features/auth/authSlice';
import { useGoogleLogin } from '@react-oauth/google';
import { useGetUserMutation } from '../../../features/auth/authApiSlice';

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

	const [signInPassword, setSignInPassword] = useState<boolean>(false);
	const [singUpStatus, setSingUpStatus] = useState<boolean>(!!isSignUp);
	const [getUserMutation] = useGetUserMutation();

	const navigate = useNavigate();

	const handleOnClick = useCallback(() => navigate('/'), [navigate]);

	const usernameCheck = (username: string) => {
		return !!getUserDataWithUsername(username);
	};

	const passwordCheck = (username: string, password: string) => {
		return getUserDataWithUsername(username).password === password;
	};

	const dispatch = useDispatch();

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			email: '',
			loginPassword: '',
		},
		validate: (values) => {
			const errors: { email?: string; loginPassword?: string } = {};

			if (!values.email) {
				errors.email = 'Required';
			}

			if (!values.loginPassword) {
				errors.loginPassword = 'Required';
			}

			return errors;
		},
		validateOnChange: false,
		onSubmit: async (values) => {
			setIsLoading(true);
			if (usernameCheck(values.email)) {
				if (passwordCheck(values.email, values.loginPassword)) {
					const userdata = getUserDataWithUsername(values.email);
					const userdetails = {
						id: userdata.id,
						name: userdata.name,
						lastname: userdata.lastname,
						email: userdata.email,
						role: userdata.role,
						src: userdata.src,
					};
					const user = { user: userdetails };
					dispatch(login(user));
					const value = JSON.stringify(userdetails);

					try {
						const  data  = await getUserMutation(values);
						console.log(data);
					} catch (error) {
						console.log(error);
					}
					localStorage.setItem('user', value);
					setIsLoading(true);
					startTransition(() => {
						navigate('/');
					});
					setIsLoading(false);
				} else {
					formik.setFieldError('loginPassword', 'Username and password do not match.');
					setIsLoading(false);
				}
			}
		},
	});

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const handleContinue = () => {
		setIsLoading(true);
		setTimeout(() => {
			if (
				!Object.keys(USERS).find((f) => USERS[f].email.toString() === formik.values.email)
			) {
				formik.setFieldError('email', 'User not found');
			} else {
				setSignInPassword(true);

				// dispatch(login(user))
			}
			setIsLoading(false);
		}, 1000);
	};
	const [token, setToken] = useState('');
	const [profile, setProfile] = useState([]);

	const handleLoginWithGoogle = useGoogleLogin({
		onSuccess: (tokenResponse) => setToken(tokenResponse.access_token),
		onError: (error) => console.log('Login Failed:', error),
	});
	useEffect(() => {
		if (token) {
			axios
				.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`, {
					headers: {
						Authorization: `Bearer ${token}`,
						Accept: 'application/json',
					},
				})
				.then((res) => {
					setProfile(res.data);
					// console.log(res.data);
					const userdetails = {
						id: res.data.id,
						name: res.data.given_name,
						lastname: res.data.family_name,
						role: Role.user,
						email: res.data.email,
						src: res.data.picture,
					};
					const user = { user: userdetails };
					dispatch(login(user));
					const value = JSON.stringify(userdetails);
					localStorage.setItem('user', value);
					setIsLoading(true);
					startTransition(() => {
						navigate('/');
					});
					setIsLoading(false);
					// console.log(res.data)
				})
				.catch((err) => setProfile(err));
		}
	}, [token, navigate, dispatch]);

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
													setSignInPassword(false);
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
													setSignInPassword(false);
													setSingUpStatus(!singUpStatus);
												}}>
												Sign Up
											</Button>
										</div>
									</div>
								</div>

								<LoginHeader isNewUser={singUpStatus} />

								<Alert isLight icon='Lock' isDismissible>
									<div className='row'>
										<div className='col-12'>
											<strong>Username:</strong> {USERS.JOHN.email}
										</div>
										<div className='col-12'>
											<strong>Password:</strong> {USERS.JOHN.password}
										</div>
									</div>
								</Alert>
								<form className='row g-4'>
									{singUpStatus ? (
										<Signup />
									) : (
										<>
											<div className='col-12'>
												<FormGroup
													id='email'
													isFloating
													label='Your email or username'
													className={classNames({
														'd-none': signInPassword,
													})}>
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
												{signInPassword && (
													<div className='text-center h4 mb-3 fw-bold'>
														Hi, {formik.values.email}.
													</div>
												)}
												<FormGroup
													id='loginPassword'
													isFloating
													label='Password'
													className={classNames({
														'd-none': !signInPassword,
													})}>
													<Input
														type='password'
														autoComplete='current-password'
														value={formik.values.loginPassword}
														isTouched={formik.touched.loginPassword}
														invalidFeedback={
															formik.errors.loginPassword
														}
														validFeedback='Looks good!'
														isValid={formik.isValid}
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
												{!signInPassword ? (
													<Button
														color='warning'
														className='w-100 py-3'
														isDisable={!formik.values.email}
														onClick={handleContinue}>
														{isLoading && (
															<Spinner isSmall inButton isGrow />
														)}
														Continue
													</Button>
												) : (
													<Button
														color='warning'
														className='w-100 py-3'
														onClick={formik.handleSubmit}>
														{isLoading && (
															<Spinner isSmall inButton isGrow />
														)}
														Login
													</Button>
												)}
											</div>
										</>
									)}

									{/* BEGIN :: Social Login */}
									{!signInPassword && (
										<>
											<div className='col-12 mt-3 text-center text-muted'>
												OR
											</div>
											{/* <div className='col-12 mt-3'>
												<Button
													isOutline
													color={darkModeStatus ? 'light' : 'dark'}
													className={classNames('w-100 py-3', {
														'border-light': !darkModeStatus,
														'border-dark': darkModeStatus,
													})}
													icon='CustomApple'
													onClick={handleOnClick}>
													Sign in with Apple
												</Button>
											</div> */}
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
										</>
									)}
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
 