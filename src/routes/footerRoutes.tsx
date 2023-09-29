import React from 'react';
import { RouteProps } from 'react-router-dom';
import { pagesMenu, pageLayoutTypesPagesMenu } from '../menu';
import DefaultFooter from '../pages/_layout/_footers/DefaultFooter';

const footers: RouteProps[] = [
	{ path: pageLayoutTypesPagesMenu.blank.path, element: null },
	{ path: pagesMenu.login.path, element: null },
	{ path: pagesMenu.signUp.path, element: null },
	{ path: pagesMenu.page404.path, element: null },
	{ path: pagesMenu.knowledge.subMenu.grid.path, element: null },
	{ path: '*', element: <DefaultFooter /> },
];

export default footers;
