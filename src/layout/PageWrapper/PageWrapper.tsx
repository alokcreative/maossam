import React, { useLayoutEffect, forwardRef, ReactElement, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { ISubHeaderProps } from '../SubHeader/SubHeader';
import { IPageProps } from '../Page/Page';
import { pagesMenu } from '../../menu';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useGetUsersMutation } from '../../features/auth/authApiSlice';
import { useEffectOnce } from 'react-use';

interface IPageWrapperProps {
	isProtected?: boolean;
	title?: string;
	description?: string;
	children:
		| ReactElement<ISubHeaderProps>[]
		| ReactElement<IPageProps>
		| ReactElement<IPageProps>[];
	className?: string;
}
const PageWrapper = forwardRef<HTMLDivElement, IPageWrapperProps>(
	({ isProtected, title, description, className, children }, ref) => {
		useLayoutEffect(() => {
			// @ts-ignore
			document.getElementsByTagName('TITLE')[0].text = `${title ? `${title} | ` : ''}${
				process.env.REACT_APP_SITE_NAME
			}`;
			// @ts-ignore
			document
				?.querySelector('meta[name="description"]')
				.setAttribute('content', description || process.env.REACT_APP_META_DESC || '');
		});

		const token = localStorage?.getItem('access_token');
		const [GetUsersMutation] = useGetUsersMutation();
		const navigate = useNavigate();

		useEffect(() => {
			if (token) {
				GetUsersMutation(token)
					.unwrap()
					.then((data) => {
						console.log('data>>>', data);
						if (isProtected && (data === '' || token === '')) {
							navigate(`../${pagesMenu.login.path}`);
						}
					});
			}
		// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [token, GetUsersMutation]);

		return (
			<div ref={ref} className={classNames('page-wrapper', 'container-fluid', className)}>
				{children}
			</div>
		);
	},
);
PageWrapper.displayName = 'PageWrapper';
PageWrapper.propTypes = {
	isProtected: PropTypes.bool,
	title: PropTypes.string,
	description: PropTypes.string,
	// @ts-ignore
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};
PageWrapper.defaultProps = {
	isProtected: true,
	title: undefined,
	description: undefined,
	className: undefined,
};

export default PageWrapper;
