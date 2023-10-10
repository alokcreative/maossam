import React, { useContext, useEffect, useState } from 'react';
import Brand from '../../../layout/Brand/Brand';
import Navigation from '../../../layout/Navigation/Navigation';
import User from '../../../layout/User/User';
import { adminDashboardPagesMenu, dashboardPagesMenu } from '../../../menu';
import ThemeContext from '../../../contexts/themeContext';
import Aside, { AsideBody, AsideHead } from '../../../layout/Aside/Aside';
import { useGetUsersMutation } from '../../../features/auth/authApiSlice';
import Spinner from '../../../components/bootstrap/Spinner';

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
					<Spinner />
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
