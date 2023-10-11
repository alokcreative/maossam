import React, { FC, startTransition } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import useDarkMode from '../../../hooks/useDarkMode';
import Spinner from '../../../components/bootstrap/Spinner';
import { useSetPasswordMutation } from '../../../features/auth/authApiSlice';
import { toast } from 'react-toastify';
import { pagesMenu } from '../../../menu';
import Card, { CardBody, CardTitle } from '../../../components/bootstrap/Card';

const ResetPasswordPage: FC = () => {
	const { darkModeStatus } = useDarkMode();
	const [SetPasswordMutation, { isLoading }] = useSetPasswordMutation();
	const navigate = useNavigate();
	const { resetCode } = useParams();

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			password: '',
			confirmPassword: '',
		},
		validate: (values) => {
			const errors: { password?: string; confirmPassword?: string } = {};

			if (!values.password) {
				errors.password = 'Required';
			}

			if (!values.confirmPassword) {
				errors.confirmPassword = 'Required';
			}

			return errors;
		},
		validateOnChange: false,
		onSubmit: async (values) => {
			if (values) {
				startTransition(() => {
					SetPasswordMutation({
						resetCode,
						payload: JSON.stringify({
							password: values.password,
							confirm_password: values.confirmPassword,
						}),
					})
						.unwrap()
						.then((res) => {
							console.log('ressss>1', res);
							navigate('/');
						})
						.catch((res) => {
							console.log('ressss>reject', res);
							// toast(rejected.data?.detail);
						});
				});
			}
		},
	});

	return (
		<PageWrapper isProtected={false} title={pagesMenu.resetpassword.text}>
			<Page className='p-0 align-items-center justify-content-center'>
			<div className='text-center display-2 fw-bold mb-5 lh-1'>
											MA OSSIM
										</div>
				<div className='display-6 fw-bold'>Set Your Password</div>
				<Card className='col-6 '>
					<CardBody>
						<div className='row h-100 align-items-center justify-content-center gap-5'>
							<div className='col-12'>
								<FormGroup id='password' isFloating label='Password...'>
									<Input
										id='password'
										name='password'
										autoComplete='password'
										value={formik.values.password}
										isTouched={formik.touched.password}
										invalidFeedback={formik.errors.password}
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
									id='confirmPassword'
									isFloating
									label='Confirm password...'>
									<Input
										id='confirmPassword'
										name='confirmPassword'
										autoComplete='username'
										value={formik.values.confirmPassword}
										isTouched={formik.touched.confirmPassword}
										invalidFeedback={formik.errors.confirmPassword}
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
								<Button
									color='warning'
									className='w-100 py-3'
									onClick={formik.handleSubmit}>
									{isLoading && <Spinner isSmall inButton isGrow />}
									Send
								</Button>
							</div>
						</div>
					</CardBody>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default ResetPasswordPage;
