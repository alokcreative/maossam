import React from 'react';
import { RouteProps } from 'react-router-dom';
import { pagesMenu, pageLayoutTypesPagesMenu } from '../menu';
import DefaultAside from '../pages/_layout/_asides/DefaultAside';

const asides: RouteProps[] = [
	{ path: pagesMenu.login.path, element: null },
	{ path: pagesMenu.signUp.path, element: null },
	{ path: pageLayoutTypesPagesMenu.blank.path, element: null },
	{ path: '*', element: <DefaultAside /> },
];

export default asides;
