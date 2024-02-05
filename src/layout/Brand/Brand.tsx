import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from '../../components/icon/Icon';
import Logo from '../../components/Logo';
import classNames from 'classnames';
import useDarkMode from '../../hooks/useDarkMode';

interface IBrandProps {
	asideStatus: boolean;
	setAsideStatus(...args: unknown[]): unknown;
}
const Brand: FC<IBrandProps> = ({ asideStatus, setAsideStatus }) => {
	const { darkModeStatus } = useDarkMode();

	return (
		<div className='brand d-flex align-items-center'>
			<div className='brand-logo'>
				<div className='brand-title'>
					<Link to='/' aria-label='Logo' className='d-flex'>
						<Logo height={40} width={150} />
					</Link>
				</div>
			</div>
			<button
				type='button'
				className='btn brand-aside-toggle'
				aria-label='Toggle Aside'
				onClick={() => setAsideStatus(!asideStatus)}>
				<Icon icon='FirstPage' className='brand-aside-toggle-close' />
				<Icon icon='LastPage' className='brand-aside-toggle-open' />
			</button>
		</div>
	);
};
Brand.propTypes = {
	asideStatus: PropTypes.bool.isRequired,
	setAsideStatus: PropTypes.func.isRequired,
};

export default Brand;
