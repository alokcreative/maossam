import React, { useContext, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import Brand from '../../../layout/Brand/Brand';
import Navigation from '../../../layout/Navigation/Navigation';
import User from '../../../layout/User/User';
import { adminDashboardPagesMenu, dashboardPagesMenu } from '../../../menu';
import ThemeContext from '../../../contexts/themeContext';
// import AuthContext from '../../../contexts/authContext';
import Aside, { AsideBody, AsideHead } from '../../../layout/Aside/Aside';
import { Role } from '../../../common/data/userDummyData';
import { useNavigate } from 'react-router-dom';

const DefaultAside = () => {
	const { asideStatus, setAsideStatus } = useContext(ThemeContext);
	const { user } = useSelector((state: RootState) => state.auth);
	const savedValue = localStorage?.getItem('user');
	const localUser = savedValue ? JSON.parse(savedValue) : null;
	const navigate = useNavigate();

	const role = user.role || Number(localUser?.role);

	return (
		<Aside>
			<AsideHead>
				<Brand asideStatus={asideStatus} setAsideStatus={setAsideStatus} />
			</AsideHead>
			<AsideBody>
				{role === Role.admin ? (
					<Navigation menu={adminDashboardPagesMenu} id='aside-dashboard' />
				) : (
					<Navigation menu={dashboardPagesMenu} id='aside-dashboard' />
				)}
			</AsideBody>
			<User />
		</Aside>
	);
};

export default DefaultAside;
