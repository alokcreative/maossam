import React, { lazy } from 'react';
import { RouteProps } from 'react-router-dom';
import { demoPagesMenu, adminDashboardPagesMenu, dashboardPagesMenu } from '../menu';
import Login from '../pages/presentation/auth/Login';
import ReportAndAnalysis from '../pages/superAdmin/reportingandanalysis/ReportAndAnalysis';
import Subscriptions from '../pages/superAdmin/subscriptions/Subscriptions';
import TimeManagement from '../pages/superAdmin/time/TimeManagement';
import TaskManagement from '../pages/superAdmin/task/TaskManagement';
import Profile from '../pages/presentation/profile/Profile';

const DASHBOARD = {
	DashboardAdmin: lazy(() => import('../pages/superAdmin/DashboardAdmin')),
};
const USERS = {
	USERLIST: lazy(() => import('../pages/superAdmin/UserManagement/userList')),
	USERDETAILS: lazy(() => import('../pages/superAdmin/UserManagement/UserDetail')),
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
		CUSTOMERS: lazy(() => import('../pages/presentation/crm/CustomersLists')),
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
		path: adminDashboardPagesMenu.dashboard.path,
		element: <DASHBOARD.DashboardAdmin />,
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
		path: `${adminDashboardPagesMenu.users.path}/:id`,
		element: <USERS.USERDETAILS />,
	},
	{
		path: `${adminDashboardPagesMenu.projects.path}`,
		element: <APP.PROJECT_MANAGEMENT.PROJECT />,
	},
	{
		path: `${adminDashboardPagesMenu.reportingAndAnalytics.path}`,
		element: <ReportAndAnalysis />,
	},
	{
		path: `${adminDashboardPagesMenu.subscription.path}`,
		element: <Subscriptions />,
	},
	{
		path: `${adminDashboardPagesMenu.timeTracking.path}`,
		element: <TimeManagement />,
	},
	{
		path: `${adminDashboardPagesMenu.task.path}`,
		element: <TaskManagement />,
	},
];
const adminContents = [...presentation, ...documentation];

export default adminContents;
