import React, { Suspense, useContext, useLayoutEffect } from 'react';
import Card, { CardBody } from '../../components/bootstrap/Card';
import PageWrapper from '../PageWrapper/PageWrapper';
import Page from '../Page/Page';
import SubHeader from '../SubHeader/SubHeader';
import ContentRoutes from './ContentRoutes';
import AdminContentRoutes from './AdminContentRoutes';
import MemberContentRoute from './MemberContentRoutes';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Role } from '../../common/data/userDummyData';
import { useNavigate } from 'react-router-dom';
import { demoPagesMenu } from '../../menu';

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
	const navigate = useNavigate();
	const { user } = useSelector((state: RootState) => state.auth);
	const savedValue = localStorage?.getItem('user');
	const localUser = savedValue ? JSON.parse(savedValue) : null;
	const role = user.role || localUser?.role;

	useLayoutEffect(() => {
		if (user === null || localUser === null) {
			navigate(`../${demoPagesMenu.login.path}`);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<main className='content'>
			{role === Role.admin ? (
				<Suspense fallback={LOADING}>
					<AdminContentRoutes />
				</Suspense>
			) : role === Role.user ? (
				<Suspense fallback={LOADING}>
					<ContentRoutes />
				</Suspense>
			) : (
				<Suspense fallback={LOADING}>
					<MemberContentRoute />
				</Suspense>
			)}
		</main>
	);
};

export default Content;
