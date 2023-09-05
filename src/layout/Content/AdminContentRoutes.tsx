import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import adminContents from '../../routes/adminContentRoutes';

const PAGE_404 = lazy(() => import('../../pages/presentation/auth/Page404'));
const AdminContentRoutes = () => {
	return (
		<Routes>
			{adminContents.map((page) => (
				// eslint-disable-next-line react/jsx-props-no-spreading
				<Route key={page.path} {...page} />
			))}
			<Route path='*' element={<PAGE_404 />} />
		</Routes>
	);
};

export default AdminContentRoutes;
