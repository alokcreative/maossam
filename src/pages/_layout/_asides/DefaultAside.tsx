import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import Brand from '../../../layout/Brand/Brand';
import Navigation from '../../../layout/Navigation/Navigation';
import User from '../../../layout/User/User';
import { adminDashboardPagesMenu, dashboardPagesMenu } from '../../../menu';
import ThemeContext from '../../../contexts/themeContext';
import AuthContext from '../../../contexts/authContext';
import Aside, { AsideBody, AsideHead } from '../../../layout/Aside/Aside';

const DefaultAside = () => {
	const { asideStatus, setAsideStatus } = useContext(ThemeContext);
	// const { userData } = useContext(AuthContext);

	const user = useSelector((state: RootState) => state.auth.user);
	const { isAdmin } = user;
	// console.log(isAdmin);

	return (
		<Aside>
			<AsideHead>
				<Brand asideStatus={asideStatus} setAsideStatus={setAsideStatus} />
			</AsideHead>
			<AsideBody>
				{isAdmin ? (
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
