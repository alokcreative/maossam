import React, { FC, startTransition, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Spinner from '../../../components/bootstrap/Spinner';
import * as Yup from 'yup';
import { useRegisterUserMutation } from '../../../features/auth/authApiSlice';
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';

const Signup: FC = () => {
	const [RegisterUserMutation, { isLoading }] = useRegisterUserMutation();
	const navigate = useNavigate();
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
			first_name: '',
			last_name: '',
			email: '',
			password: '',
			confirm_password: '',
		},
		validationSchema,
		validate: (values) => {
			const errors: {
				first_name?: string;
				last_name?: string;
				email?: string;
				password?: string;
				confirm_password?: string;
			} = {};
			if (!values.email) {
				errors.email = 'Required';
			}

			if (!values.first_name) {
				errors.first_name = 'Required';
			}
			if (!values.last_name) {
				errors.last_name = 'Required';
			}
			if (!values.password) {
				errors.password = 'Required';
			}
			if (values.password.length < 8) {
				errors.password = 'Password must be of 8 Character ';
			}
			if (values.confirm_password.length < 8) {
				errors.confirm_password = 'Password must be of 8 Character ';
			}
			if (values.confirm_password.length !== values.password.length) {
				errors.confirm_password = 'Password must be same';
			}
			if (!values.confirm_password) {
				errors.confirm_password = 'Required';
			}

			return errors;
		},
		validateOnChange: false,
		onSubmit: (values) => {
			// setIsLoading(true);
			if (values.email) {
				startTransition(() => {
					RegisterUserMutation(values)
						.unwrap()
						.then((data) => {
							localStorage.setItem('access_token', data.tokens.access_token);
							localStorage.setItem('refresh_token', data.tokens.refresh_token);
							navigate('/modals-step-form');
						})
						.catch((rejected) => {
							showNotification(
								<span className='d-flex align-items-center'>
									<Icon icon='Info' size='lg' className='me-1' />
									<span>{rejected.data?.email[0]}</span>
								</span>,
								``,
							);
							navigate('/auth-pages/login');
							formik.setFieldValue('first_name', '');
							formik.setFieldValue('last_name', '');
							formik.setFieldValue('email', '');
							formik.setFieldValue('password', '');
							formik.setFieldValue('confirm_password', '');
						});
				});
				// setIsLoading(false);
			}
		},
	});

	return (
		<>
			<div className='col-12'>
				<FormGroup id='signup-name' isFloating label='FirstName'>
					<Input
						autoComplete='first_name'
						type='text'
						name='first_name'
						onChange={formik.handleChange}
						value={formik.values.first_name}
						isValid={formik.isValid}
						isTouched={formik.touched.first_name}
						invalidFeedback={formik.errors.first_name}
						onBlur={formik.handleBlur}
						onFocus={() => {
							formik.setErrors({});
						}}
					/>
				</FormGroup>
			</div>

			<div className='col-12'>
				<FormGroup id='signup-lastname' isFloating label='Your lastname'>
					<Input
						autoComplete='last_name'
						type='text'
						name='last_name'
						onChange={formik.handleChange}
						value={formik.values.last_name}
						isValid={formik.isValid}
						isTouched={formik.touched.last_name}
						invalidFeedback={formik.errors.last_name}
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
				<FormGroup id='confirm-password' isFloating label='Confirm password'>
					<Input
						autoComplete='confirm password'
						type='password'
						name='confirm_password'
						onChange={formik.handleChange}
						value={formik.values.confirm_password}
						isValid={formik.isValid}
						isTouched={formik.touched.confirm_password}
						invalidFeedback={formik.errors.confirm_password}
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
