import React, { useState, useContext, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { logout } from '../../features/auth/authSlice';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { pagesMenu } from '../../menu';
import { DropdownItem, DropdownMenu } from '../../components/bootstrap/Dropdown';
import Button from '../../components/bootstrap/Button';
import useDarkMode from '../../hooks/useDarkMode';
import Collapse from '../../components/bootstrap/Collapse';
import { NavigationLine } from '../Navigation/Navigation';
import Icon from '../../components/icon/Icon';
import useNavigationItemHandle from '../../hooks/useNavigationItemHandle';
import UserImage from '../../assets/img/wanna/wanna1.png';
import { useGetUsersMutation, useLogoutMutation } from '../../features/auth/authApiSlice';
import Spinner from '../../components/bootstrap/Spinner';

interface IUserData {
	id: string;
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
const User = () => {
	const navigate = useNavigate();
	const handleItem = useNavigationItemHandle();
	const { darkModeStatus, setDarkModeStatus } = useDarkMode();
	const [collapseStatus, setCollapseStatus] = useState<boolean>(false);
	const { t } = useTranslation(['translation', 'menu']);
	const token = localStorage?.getItem('access_token');
	const [GetUsersMutation, { data, isLoading }] = useGetUsersMutation({
		fixedCacheKey: 'shared-data',
	  });
	const [userData, setUserData] = useState<IUserData>(data);
	const [LogoutMutation] = useLogoutMutation();
	useEffect(() => {
		setUserData(data);
	}, [data,GetUsersMutation,isLoading]);
	useEffect(() => {
		if (!token) {
			navigate('/auth-pages/login');
		} else {
			GetUsersMutation(token)
				.unwrap()
				.then((res: IUserData) => {
					setUserData(res);
					// console.log('data>>>>>>>', data);
					localStorage.setItem('role', res.role);
					localStorage.setItem('UserId', res.id);
				})
				.catch((error) => {
					localStorage.removeItem('refresh_token');
					localStorage.removeItem('access_token');
					localStorage.removeItem('tourModalStarted');
					localStorage.removeItem('role');
					localStorage.removeItem('i18nextLng');
					localStorage.removeItem('facit_asideStatus');
					localStorage.removeItem('user');
					navigate('/auth-pages/login');
				});
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token]);

	const handleLogout = () => {
		const refresh = localStorage.getItem('refresh_token');
		const accessToken = localStorage.getItem('access_token');
		if (refresh && accessToken) {
			LogoutMutation({ accessToken, refresh: { refresh } });
		}
		localStorage.removeItem('refresh_token');
		localStorage.removeItem('access_token');
		navigate(`../${pagesMenu.login.path}`);
	};

	return (
		<div>
			{isLoading ? (
				<Spinner />
			) : (
				<div>
					<div
						className={classNames('user', { open: collapseStatus })}
						role='presentation'
						data-tour='profile'
						onClick={() => setCollapseStatus(!collapseStatus)}>
						<div className='user-avatar'>
							<img
								src={userData?.avatar || UserImage}
								alt='Avatar'
								width={128}
								height={128}
							/>
						</div>
						<div className='user-info'>
							<div className='user-name d-flex align-items-center'>
								{`${userData?.first_name}`}
								<Icon icon='Verified' className='ms-1' color='info' />
							</div>
						</div>
					</div>
					<DropdownMenu>
						<DropdownItem>
							<Button
								icon='AccountBox'
								onClick={() =>
									navigate(
										`../${pagesMenu.profile.path}/${(
											userData?.id || 0
										).toString()}`,
									)
								}>
								{t('menu:Profile') as ReactNode}
							</Button>
						</DropdownItem>
						<DropdownItem>
							<Button
								icon={darkModeStatus ? 'DarkMode' : 'LightMode'}
								onClick={() => setDarkModeStatus(!darkModeStatus)}
								aria-label='Toggle fullscreen'>
								{darkModeStatus ? 'Dark Mode' : 'Light Mode'}
							</Button>
						</DropdownItem>
					</DropdownMenu>

					<Collapse isOpen={collapseStatus} className='user-menu'>
						<nav aria-label='aside-bottom-user-menu'>
							<div className='navigation'>
								<div
									role='presentation'
									className='navigation-item cursor-pointer'
									onClick={() =>
										navigate(
											`../${pagesMenu.profile.path}/${userData?.id || 0}`,
											// @ts-ignore
											handleItem(),
										)
									}>
									<span className='navigation-link navigation-link-pill'>
										<span className='navigation-link-info'>
											<Icon icon='AccountBox' className='navigation-icon' />
											<span className='navigation-text'>
												{t('menu:Profile') as ReactNode}
											</span>
										</span>
									</span>
								</div>
							</div>
						</nav>
						<NavigationLine />
						<nav aria-label='aside-bottom-user-menu-2'>
							<div className='navigation'>
								<div
									role='presentation'
									className='navigation-item cursor-pointer'
									onClick={handleLogout}>
									<span className='navigation-link navigation-link-pill'>
										<span className='navigation-link-info'>
											<Icon icon='Logout' className='navigation-icon' />
											<span className='navigation-text'>
												{t('menu:Logout') as ReactNode}
											</span>
										</span>
									</span>
								</div>
							</div>
						</nav>
					</Collapse>
				</div>
			)}
		</div>
	);
};

export default User;
