import React, { FC } from 'react';
import PropTypes from 'prop-types';
import LogoImage from '../assets/logos/logoicon.png';

interface ILogoProps {
	width?: number;
	height?: number;
}
const Logo: FC<ILogoProps> = ({ width, height }) => {
	return <img src={LogoImage} />;
};
Logo.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
};
Logo.defaultProps = {
	width: 2155,
	height: 854,
};

export default Logo;
