import React from 'react';
import { RouteProps } from 'react-router-dom';
import {
	adminDashboardPagesMenu,
	componentPagesMenu,
	dashboardPagesMenu,
	pagesMenu,
	gettingStartedPagesMenu,
	pageLayoutTypesPagesMenu,
} from '../menu';

import DashboardHeader from '../pages/_layout/_headers/DashboardHeader';
import DashboardBookingHeader from '../pages/_layout/_headers/DashboardBookingHeader';
import ProfilePageHeader from '../pages/_layout/_headers/ProfilePageHeader';
// import SummaryHeader from '../pages/_layout/_headers/SummaryHeader';
import ProductsHeader from '../pages/_layout/_headers/ProductsHeader';
import ProductListHeader from '../pages/_layout/_headers/ProductListHeader';
import PageLayoutHeader from '../pages/_layout/_headers/PageLayoutHeader';
import ComponentsHeader from '../pages/_layout/_headers/ComponentsHeader';
import FormHeader from '../pages/_layout/_headers/FormHeader';
import ChartsHeader from '../pages/_layout/_headers/ChartsHeader';
import ContentHeader from '../pages/_layout/_headers/ContentHeader';
import UtilitiesHeader from '../pages/_layout/_headers/UtilitiesHeader';
import IconHeader from '../pages/_layout/_headers/IconHeader';
import DefaultHeader from '../pages/_layout/_headers/DefaultHeader';
import DocumentationHeader from '../pages/_layout/_headers/DocumentationHeader';

const headers: RouteProps[] = [
	{ path: pageLayoutTypesPagesMenu.pageLayout.subMenu.onlySubheader.path, element: null },
	{ path: pageLayoutTypesPagesMenu.pageLayout.subMenu.onlyContent.path, element: null },
	{ path: pageLayoutTypesPagesMenu.blank.path, element: null },
	{ path: pagesMenu.login.path, element: null },
	{ path: pagesMenu.signUp.path, element: null },
	{ path: pagesMenu.page404.path, element: null },
	{ path: pagesMenu.knowledge.subMenu.grid.path, element: null },
	{ path: dashboardPagesMenu.dashboard.path,
		 element: <DashboardHeader /> 
		},
	{
		path: pagesMenu.projectManagement.subMenu.list.path,
		element: <DashboardHeader />,
	},
	{ path: pagesMenu.pricingTable.path, 
		// element: <DashboardHeader /> 
	},
	{
		path: pagesMenu.appointment.subMenu.calendar.path,
		element: <DashboardBookingHeader />,
	},
	{
		path: pagesMenu.appointment.subMenu.employeeList.path,
		element: <DashboardBookingHeader />,
	},
	{
		path: pagesMenu.listPages.subMenu.listFluid.path,
		element: <DashboardBookingHeader />,
	},
	{
		path: `${pagesMenu.editPages.path}/*`,
		element: <DashboardBookingHeader />,
	},
	{
		path: `${pagesMenu.appointment.subMenu.employeeID.path}/*`,
		element: <DashboardBookingHeader />,
	},
	{
		path: `${pagesMenu.projectManagement.subMenu.itemID.path}/*`,
		element: <DashboardBookingHeader />,
	},
	{
		path: pagesMenu.singlePages.subMenu.fluidSingle.path,
		element: <ProfilePageHeader />,
	},
	{
		path: pagesMenu.singlePages.subMenu.boxedSingle.path,
		element: <ProfilePageHeader />,
	},
	{
		path: pagesMenu.sales.subMenu.transactions.path,
		element: <ProfilePageHeader />,
	},
	{
		path: pagesMenu.chat.subMenu.withListChat.path,
		element: <ProfilePageHeader />,
	},
	{
		path: pagesMenu.chat.subMenu.onlyListChat.path,
		element: <ProfilePageHeader />,
	},
	{
		path: `${pagesMenu.knowledge.subMenu.itemID.path}/:id`,
		element: <ProfilePageHeader />,
	},
	{
		path: pagesMenu.crm.subMenu.dashboard.path,
		element: <ProfilePageHeader />,
	},
	{
		path: pagesMenu.crm.subMenu.customersList.path,
		element: <ProfilePageHeader />,
	},
	{
		path: `${pagesMenu.crm.subMenu.customerID.path}/:id`,
		element: <ProfilePageHeader />,
	},
	// {
	// 	path: dashboardPagesMenu.summary.path,
	// 	element: <SummaryHeader />,
	// },
	{
		path: pagesMenu.gridPages.subMenu.gridBoxed.path,
		element: <ProductsHeader />,
	},
	{
		path: pagesMenu.gridPages.subMenu.gridFluid.path,
		element: <ProductsHeader />,
	},
	{
		path: pagesMenu.listPages.subMenu.listBoxed.path,
		element: <ProductListHeader />,
	},
	{
		path: pagesMenu.sales.subMenu.salesList.path,
		element: <ProductListHeader />,
	},
	{
		path: pagesMenu.sales.subMenu.productsGrid.path,
		element: <ProductListHeader />,
	},
	{
		path: `${pagesMenu.productId.path}/:id`,
		element: <ProductListHeader />,
	},
	{
		path: `${pageLayoutTypesPagesMenu.asideTypes.path}/*`,
		element: <PageLayoutHeader />,
	},
	{
		path: pageLayoutTypesPagesMenu.pageLayout.subMenu.headerAndSubheader.path,
		element: <PageLayoutHeader />,
	},
	{
		path: pageLayoutTypesPagesMenu.pageLayout.subMenu.onlyHeader.path,
		element: <PageLayoutHeader />,
	},
	{
		path: `${componentPagesMenu.components.path}/*`,
		element: <ComponentsHeader />,
	},
	{
		path: `${componentPagesMenu.forms.path}/*`,
		element: <FormHeader />,
	},
	{
		path: `${componentPagesMenu.charts.path}/*`,
		element: <ChartsHeader />,
	},
	{
		path: `${componentPagesMenu.content.path}/*`,
		element: <ContentHeader />,
	},
	{
		path: `${componentPagesMenu.utilities.path}/*`,
		element: <UtilitiesHeader />,
	},
	{
		path: `${componentPagesMenu.icons.path}/*`,
		element: <IconHeader />,
	},
	{
		path: `${gettingStartedPagesMenu.gettingStarted.path}/*`,
		element: <DocumentationHeader />,
	},
	{
		path: `${gettingStartedPagesMenu.routes.path}/*`,
		element: <DocumentationHeader />,
	},
	{
		path: `*`,
		element: <DefaultHeader />,
	},
];

export default headers;
