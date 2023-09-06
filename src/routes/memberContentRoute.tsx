import React, { lazy } from 'react';
import { RouteProps } from 'react-router-dom';
import { demoPagesMenu, memberDashboardPagesMenu } from '../menu';
import Login from '../pages/presentation/auth/Login';
import Profile from '../pages/presentation/profile/Profile';


const DASHBOARD = {
	Dashboard: lazy(() => import('../pages/member/Dashboard')),
};

const AUTH = {
	PAGE_404: lazy(() => import('../pages/presentation/auth/Page404')),
};




const presentation: RouteProps[] = [
	/**
	 * Landing
	 */
	{
		path: memberDashboardPagesMenu.dashboard.path,
		element: <DASHBOARD.Dashboard />,
	},
	{
		path: demoPagesMenu.page404.path,
		element: <AUTH.PAGE_404 />,
	},
	{
		path: demoPagesMenu.login.path,
		element: <Login />,
	},
	{
		path: demoPagesMenu.signUp.path,
		element: <Login isSignUp />,
	},
	{
		path: `${demoPagesMenu.profile.path}/:id`,
		element: <Profile />,
	},
];

const memberContentRoute = [...presentation];


export default memberContentRoute