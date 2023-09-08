import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import memberContentRoute from '../../routes/memberContentRoute';

const PAGE_404 = lazy(() => import('../../pages/presentation/auth/Page404'));
const MemberContentRoute = () => {
	return (
		<Routes>
			{memberContentRoute.map((page) => (
				// eslint-disable-next-line react/jsx-props-no-spreading
				<Route key={page.path} {...page} />
			))}
			<Route path='*' element={<PAGE_404 />} />
		</Routes>
	);
};

export default MemberContentRoute;
