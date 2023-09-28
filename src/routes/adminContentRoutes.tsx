import React, { lazy } from 'react';
import { RouteProps } from 'react-router-dom';
import { demoPagesMenu, adminDashboardPagesMenu } from '../menu';
import Login from '../pages/presentation/auth/Login';
import TaskManagement from '../pages/superAdmin/task/TaskManagement';
import Profile from '../pages/presentation/profile/Profile';
import MarketingAssets from '../pages/presentation/dashboard/Marketing/MarketingAssets';

const DASHBOARD = {
	DashboardAdmin: lazy(() => import('../pages/superAdmin/dashboard/DashboardAdmin')),
};
const USERS = {
	USERLIST: lazy(() => import('../pages/superAdmin/UserManagement/userList')),
};

const AUTH = {
	PAGE_404: lazy(() => import('../pages/presentation/auth/Page404')),
};

const APP = {
	PROJECT_MANAGEMENT: {
		PROJECTS_LIST: lazy(
			() => import('../pages/presentation/project-management/ProjectManagementsList'),
		),
		PROJECT: lazy(
			() => import('../pages/presentation/project-management/ProjectManagementsProject'),
		),
	},
	KNOWLEDGE: {
		GRID: lazy(() => import('../pages/presentation/knowledge/KnowledgeGridPage')),
		VIEW: lazy(() => import('../pages/presentation/knowledge/KnowledgeViewPage')),
	},
	SALES: {
		TRANSACTIONS: lazy(() => import('../pages/presentation/sales/TransActionsPage')),
		PRODUCTS: lazy(() => import('../pages/presentation/sales/SalesListPage')),
		PRODUCTS_GRID: lazy(() => import('../pages/presentation/sales/ProductsGridPage')),
		PRODUCTS_VIEW: lazy(() => import('../pages/presentation/sales/ProductViewPage')),
	},
	APPOINTMENT: {
		CALENDAR: lazy(() => import('../pages/presentation/appointment/CalendarPage')),
		EMPLOYEE_LIST: lazy(() => import('../pages/presentation/appointment/EmployeeList')),
		EMPLOYEE_VIEW: lazy(() => import('../pages/presentation/appointment/EmployeePage')),
		APPOINTMENT_LIST: lazy(() => import('../pages/presentation/appointment/AppointmentList')),
	},
	CRM: {
		CRM_DASHBOARD: lazy(() => import('../pages/presentation/crm/CrmDashboard')),
		CUSTOMER: lazy(() => import('../pages/presentation/crm/CustomerDetails')),
		CUSTOMER_PROFILE: lazy(() => import('../pages/presentation/crm/CustomerProfile')),
	},
	CHAT: {
		WITH_LIST: lazy(() => import('../pages/presentation/chat/WithListChatPage')),
		ONLY_LIST: lazy(() => import('../pages/presentation/chat/OnlyListChatPage')),
	},
};

const presentation: RouteProps[] = [
	/**
	 * Landing
	 */
	{
		path: demoPagesMenu.login.path,
		element: <Login />,
	},
	{
		path: demoPagesMenu.signUp.path,
		element: <Login isSignUp />,
	},
	{
		path: adminDashboardPagesMenu.dashboard.path,
		element: <DASHBOARD.DashboardAdmin />,
	},
	{
		path: demoPagesMenu.page404.path,
		element: <AUTH.PAGE_404 />,
	},

	{
		path: `${demoPagesMenu.appointment.subMenu.employeeID.path}/:id`,
		element: <APP.APPOINTMENT.EMPLOYEE_VIEW />,
	},
	{
		path: `${demoPagesMenu.profile.path}/:id`,
		element: <Profile />,
	},
];
const documentation: RouteProps[] = [
	{
		path: adminDashboardPagesMenu.users.path,
		element: <USERS.USERLIST />,
	},
	{
		path: `${adminDashboardPagesMenu.task.path}`,
		element: <TaskManagement />,
	},
	{
		path: `${adminDashboardPagesMenu.marketing_assets.path}`,
		element: <MarketingAssets />,
	},
];
const adminContents = [...presentation, ...documentation];

export default adminContents;
