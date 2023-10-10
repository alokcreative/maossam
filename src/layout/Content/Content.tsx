import React, { Suspense, useContext, useEffect, useState } from 'react';
import Card, { CardBody } from '../../components/bootstrap/Card';
import PageWrapper from '../PageWrapper/PageWrapper';
import Page from '../Page/Page';
import SubHeader from '../SubHeader/SubHeader';
import ContentRoutes from './ContentRoutes';
import AdminContentRoutes from './AdminContentRoutes';
import { useGetUsersMutation } from '../../features/auth/authApiSlice';
import { useNavigate } from 'react-router-dom';
import { useEffectOnce } from 'react-use';
import Loading from '../../common/other/Loading';

const LOADING = (
	<PageWrapper>
		<SubHeader>
			<div />
		</SubHeader>
		<Page>
			<div className='row h-100'>
				<div className='col-lg-6'>
					<Card stretch>
						<CardBody>
							<div />
						</CardBody>
					</Card>
				</div>
				<div className='col-lg-6'>
					<Card stretch='semi'>
						<CardBody>
							<div />
						</CardBody>
					</Card>
					<Card stretch='semi'>
						<CardBody>
							<div />
						</CardBody>
					</Card>
				</div>
			</div>
		</Page>
	</PageWrapper>
);

interface IUserData {
	id: number;
	avatar: string | unknown;
	first_name: string;
	last_name: string;
	email: string;
	phone_number: number;
	country: string;
	state: string;
	gender: string;
	is_active: boolean;
	role: string;
	date_of_birth: string;
	created_at: string;
	updated_at: string;
}
const Content = () => {
	const navigate = useNavigate();
	const token = localStorage?.getItem('access_token');
	const [GetUsersMutation, { isLoading }] = useGetUsersMutation();
	const [userData, setUserData] = useState<IUserData>();
	useEffect(() => {
		if (!token) {
			navigate('/auth-pages/login');
		} else {
			GetUsersMutation(token)
				.unwrap()
				.then((data) => {
					setUserData(data);
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token]);

	return (
		<main className='content'>
			{isLoading ? (
				<Loading />
			) : userData && userData.role === 'superadmin' ? (
				<Suspense fallback={LOADING}>
					<AdminContentRoutes />
				</Suspense>
			) : (
				<Suspense fallback={LOADING}>
					<ContentRoutes />
				</Suspense>
			)}
		</main>
	);
};

export default Content;
