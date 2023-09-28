import React, { lazy, useLayoutEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import contents from '../../routes/mainRoutes';
import adminContents from '../../routes/adminContentRoutes';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Role } from '../../common/data/userDummyData';

const PAGE_404 = lazy(() => import('../../pages/presentation/auth/Page404'));
const ContentRoutes = () => {
	const navigate = useNavigate();
	const { user } = useSelector((state: RootState) => state.auth);
	const savedValue = localStorage?.getItem('user');
	const localUser = savedValue ? JSON.parse(savedValue) : null;
	const role = user.role || localUser?.role;
	useLayoutEffect(() => {
		if (!user || !localUser) {
			navigate('/auth-pages/login');
		}
	}, [user, localUser, navigate]);
	return (
		<Routes>
			{role === Role.admin ? (
				<Route>
					{adminContents.map((page) => (
						// eslint-disable-next-line react/jsx-props-no-spreading
						<Route key={page.path} {...page} />
					))}
				</Route>
			) : (
				<Route>
					{contents.map((page) => (
						// eslint-disable-next-line react/jsx-props-no-spreading
						<Route key={page.path} {...page} />
					))}
				</Route>
			)}

			<Route path='*' element={<PAGE_404 />} />
		</Routes>
	);
};

export default ContentRoutes;