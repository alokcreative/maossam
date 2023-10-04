import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
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
import { useGetUsersMutation } from '../../../features/auth/authApiSlice';

interface IUserData {
	id: number;
	avatar: string | unknown;
	first_name: string;
	last_name: string;
	email: string;
	phone_number: number;
	country: string;
	state: string;
	gender: string;
	is_active: boolean;
	role: string;
	date_of_birth: string;
	created_at: string;
	updated_at: string;
}
const DefaultAside = () => {
	const { asideStatus, setAsideStatus } = useContext(ThemeContext);
	const token = localStorage?.getItem('access_token');
	const [GetUsersMutation, { isLoading }] = useGetUsersMutation();
	const [userData, setUserData] = useState<IUserData>();

	useEffect(() => {
		if (token) {
			GetUsersMutation(token)
				.unwrap()
				.then((data) => {
					setUserData(data);
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token]);
	return (
		<Aside>
			<AsideHead>
				<Brand asideStatus={asideStatus} setAsideStatus={setAsideStatus} />
			</AsideHead>
			<AsideBody>
				{isLoading ? (
					<div>Loading... </div>
				) : userData && userData?.role === 'superadmin' ? (
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
