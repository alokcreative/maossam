import React, { lazy } from 'react';
import { RouteProps } from 'react-router-dom';
import { pagesMenu, adminDashboardPagesMenu, dashboardPagesMenu } from '../menu';
import Login from '../pages/presentation/auth/Login';
import Profile from '../pages/presentation/profile/Profile';
import MarketingAssets from '../pages/presentation/dashboard/Marketing/MarketingAssets';
import Tasks from '../pages/presentation/goal/tasks/Tasks';
import TaskManagement from '../pages/presentation/goal/tasks/taskboard/TaskManagement';
import ProductPage from '../pages/presentation/products/ProductPage';
import ProductDetailsPage from '../pages/presentation/products/productDetails/ProductDetailsPage';
import Goals from '../pages/presentation/goal/Goals';
import GoalDescription from '../pages/presentation/goal/GoalDescription';
import SubTask from '../pages/presentation/goal/tasks/SubTask';
import WebIndex from '../pages/presentation/dashboard/WebIndex';
import ToolBox from '../pages/presentation/toolbox/ToolBox';
import CalendarPage from '../pages/presentation/appointment/CalendarPage';
import FaqPage from '../pages/presentation/faq-page/FaqPage';
<<<<<<< Updated upstream
=======
import AssetDetail from '../pages/presentation/dashboard/Marketing/MarketingAssetForms/AssetDetail';
import EditUser from '../pages/superAdmin/UserManagement/EditUser';
>>>>>>> Stashed changes

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
	TOOLS: {
		GRID: lazy(() => import('../pages/presentation/tools/ToolsGridPage')),
		VIEW: lazy(() => import('../pages/presentation/tools/ToolsViewPage')),
	},
	SALES: {
		TRANSACTIONS: lazy(() => import('../pages/presentation/sales/TransActionsPage')),
		PRODUCTS_GRID: lazy(() => import('../pages/presentation/sales/ProductsGridPage')),
		PRODUCTS_VIEW: lazy(
			() => import('../pages/presentation/products/productDetails/ProductDetailsPage'),
		),
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
		path: pagesMenu.login.path,
		element: <Login />,
	},
	{
		path: pagesMenu.signUp.path,
		element: <Login isSignUp />,
	},
	{
		path: adminDashboardPagesMenu.dashboard.path,
		element: <DASHBOARD.DashboardAdmin />,
	},
	{
		path: pagesMenu.page404.path,
		element: <AUTH.PAGE_404 />,
	},

	{
		path: `${pagesMenu.appointment.subMenu.employeeID.path}/:id`,
		element: <APP.APPOINTMENT.EMPLOYEE_VIEW />,
	},
	{
		path: `${pagesMenu.profile.path}/:id`,
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
		element: <EditUser />,
	},
	{
		path: `${adminDashboardPagesMenu.tasks.path}`,
		element: <Tasks />,
	},
	{
		path: `${adminDashboardPagesMenu.tasks.path}/:goalId/:newTask`,
		element: <Tasks />,
	},
	{
		path: `${adminDashboardPagesMenu.marketing_assets.path}`,
		element: <MarketingAssets />,
	},
	{
		path: `${pagesMenu.goalDesc.path}/:id`,
		element: <GoalDescription />,
	},
	{
		path: `${pagesMenu.productId.path}/:id`,
		element: <ProductDetailsPage />,
	},
	{
		path: dashboardPagesMenu.goals.path,
		element: <Goals />,
	},
	{
		path: `${pagesMenu.subTasks.path}/:taskId`,
		element: <SubTask />,
	},
	{
		path: `${pagesMenu.subTasks.path}/:taskId/:addSubtask`,
		element: <SubTask />,
	},
	{
		path: `${adminDashboardPagesMenu.product.path}`,
		element: <ProductPage />,
	},
	{
		path: `${adminDashboardPagesMenu.webindex.path}`,
		element: <WebIndex />,
	},
	{
		path: `${adminDashboardPagesMenu.toolbox.path}`,
		element: <ToolBox />,
	},
	{
		path: pagesMenu.tools.subMenu.grid.path,
		element: <APP.TOOLS.GRID />,
	},
	{
		path: `${pagesMenu.tools.subMenu.itemID.path}/:id`,
		element: <APP.TOOLS.VIEW />,
	},
	{
		path: `${pagesMenu.tools.subMenu.itemID.path}/:id`,
		element: <APP.TOOLS.VIEW />,
	},
	{
		path: `${adminDashboardPagesMenu.calendar.path}`,
		element: <CalendarPage />,
	},
	{
		path: dashboardPagesMenu.faq.path,
		element: <FaqPage />,
	},
];
const adminContents = [...presentation, ...documentation];

export default adminContents;
