import React, { FC, startTransition, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signup } from '../../../features/auth/authSlice';
import { useFormik } from 'formik';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import useDarkMode from '../../../hooks/useDarkMode';
import Spinner from '../../../components/bootstrap/Spinner';
import * as Yup from 'yup';
import { Role } from '../../../common/data/userDummyData';

const Signup: FC = () => {
	const { darkModeStatus } = useDarkMode();

	const navigate = useNavigate();
	// const handleOnClick = useCallback(() => navigate('/modals-step-form'), [navigate]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const dispatch = useDispatch();
	const validateEmail = (value: string) => {
		let error;
		if (!emailRegex.test(value)) {
			error = 'Invalid email address';
		}
		return error;
	};

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.required('Email is required')
			.test('email', 'Invalid email address', (value: string) => !validateEmail(value)),
	});

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			email: '',
			username: '',
			surname: '',
			password: '',
		},
		validationSchema,
		validate: (values) => {
			const errors: {
				email?: string;
				username?: string;
				surname?: string;
				password?: string;
			} = {};
			if (!values.email) {
				errors.email = 'Required';
			}

			if (!values.username) {
				errors.username = 'Required';
			}
			if (!values.surname) {
				errors.surname = 'Required';
			}
			if (!values.password) {
				errors.password = 'Required';
			}

			return errors;
		},
		validateOnChange: false,

		onSubmit: (values) => {
			setIsLoading(true);
			if (values.email) {
				startTransition(() => {
					const userdetails = {
						id: '0',
						name: values.username,
						lastname: values.surname,
						email: values.email,
						src: '',
						role: Role.user,
						teamMember: '',
						country: '',
						company: '',
						state: '',
						contact: 0,
						about: { type: '', exp: '', FeieldActivity: '' },
					};
					const value = JSON.stringify(userdetails);
					localStorage.setItem('user', value);
					const user = { user: userdetails };
					dispatch(signup(user));
					navigate('/modals-step-form');
				});
				setIsLoading(false);
			}
		},
	});

	return (
		<>
			<div className='col-12'>
				<FormGroup id='signup-name' isFloating label='FirstName'>
					<Input
						autoComplete='username'
						type='text'
						name='username'
						onChange={formik.handleChange}
						value={formik.values.username}
						isValid={formik.isValid}
						isTouched={formik.touched.username}
						invalidFeedback={formik.errors.username}
						onBlur={formik.handleBlur}
						onFocus={() => {
							formik.setErrors({});
						}}
					/>
				</FormGroup>
			</div>

			<div className='col-12'>
				<FormGroup id='signup-surname' isFloating label='LastName'>
					<Input
						autoComplete='surname'
						type='text'
						name='surname'
						onChange={formik.handleChange}
						value={formik.values.surname}
						isValid={formik.isValid}
						isTouched={formik.touched.surname}
						invalidFeedback={formik.errors.surname}
						onBlur={formik.handleBlur}
						onFocus={() => {
							formik.setErrors({});
						}}
					/>
				</FormGroup>
			</div>
			<div className='col-12'>
				<FormGroup id='signup-email' isFloating label='Email'>
					<Input
						autoComplete='email'
						type='email'
						name='email'
						onChange={formik.handleChange}
						value={formik.values.email}
						isValid={formik.isValid}
						isTouched={formik.touched.email}
						invalidFeedback={formik.errors.email}
						onBlur={formik.handleBlur}
						onFocus={() => {
							formik.setErrors({});
						}}
					/>
				</FormGroup>
			</div>

			<div className='col-12'>
				<FormGroup id='signup-password' isFloating label='Password'>
					<Input
						autoComplete='password'
						type='password'
						name='password'
						onChange={formik.handleChange}
						value={formik.values.password}
						isValid={formik.isValid}
						isTouched={formik.touched.password}
						invalidFeedback={formik.errors.password}
						onBlur={formik.handleBlur}
						onFocus={() => {
							formik.setErrors({});
						}}
					/>
				</FormGroup>
			</div>
			<div className='col-12'>
				<Button color='warning' className='w-100 py-3' onClick={formik.handleSubmit}>
					{isLoading && <Spinner isSmall inButton isGrow />}
					Sign Up
				</Button>
			</div>
		</>
	);
};

export default Signup;
