import React, { Suspense, useContext } from 'react';
import Card, { CardBody } from '../../components/bootstrap/Card';
import PageWrapper from '../PageWrapper/PageWrapper';
import Page from '../Page/Page';
import SubHeader from '../SubHeader/SubHeader';
import ContentRoutes from './ContentRoutes';
import AdminContentRoutes from './AdminContentRoutes';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

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

const Content = () => {
	// const { userData } = useContext(AuthContext);
	const { user } = useSelector((state: RootState) => state.auth);
	const savedValue = localStorage?.getItem('user');
	const localUser = savedValue ? JSON.parse(savedValue) : null;
	const admin = user.isAdmin || localUser.isAdmin;

	return (
		<main className='content'>
			{!admin ? (
				<Suspense fallback={LOADING}>
					<ContentRoutes />
				</Suspense>
			) : (

				<Suspense fallback={LOADING}>
					<AdminContentRoutes />
				</Suspense>
			)}
		</main>
	);
};

export default Content;
