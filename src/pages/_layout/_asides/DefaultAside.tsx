import React, { useContext, useEffect, useState } from 'react';
import Brand from '../../../layout/Brand/Brand';
import Navigation from '../../../layout/Navigation/Navigation';
import User from '../../../layout/User/User';
import { adminDashboardPagesMenu, dashboardPagesMenu } from '../../../menu';
import ThemeContext from '../../../contexts/themeContext';
import Aside, { AsideBody, AsideHead } from '../../../layout/Aside/Aside';
import { useGetUsersMutation } from '../../../features/auth/authApiSlice';
import Spinner from '../../../components/bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';

export interface IUserData {
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
	const navigate = useNavigate();
	useEffect(() => {
		if (token) {
			GetUsersMutation(token)
				.unwrap()
				.then((data) => {
					setUserData(data);
				})
				.catch(() => {
					// localStorage.removeItem('refresh_token');
					// localStorage.removeItem('access_token');
					// localStorage.removeItem('tourModalStarted');
					// localStorage.removeItem('role');
					// localStorage.removeItem('i18nextLng');
					// localStorage.removeItem('facit_asideStatus');
					// localStorage.removeItem('user');
					// navigate('/auth-pages/login');
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
				{userData && userData?.role === 'superadmin' ? (
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
