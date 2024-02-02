import React, { useContext, useEffect, useLayoutEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'react-jss';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ReactNotifications } from 'react-notifications-component';
import { useFullscreen } from 'react-use';
import { TourProvider } from '@reactour/tour';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ToastContainer } from 'react-toastify';
import ThemeContext from '../contexts/themeContext';
import { DashboardProvider } from '../contexts/dashboardContext';
import { ProductProvider } from '../contexts/productContext';
import Wrapper from '../layout/Wrapper/Wrapper';
import Portal from '../layout/Portal/Portal';
import useDarkMode from '../hooks/useDarkMode';
import COLORS from '../common/data/enumColors';
import { getOS } from '../helpers/helpers';
import steps, { styles } from '../steps';
import AsideRoutes from '../layout/Aside/AsideRoutes';
import { ToastCloseButton } from '../components/bootstrap/Toasts';
import ResetPasswordPage from '../pages/presentation/auth/ResetPasswordPage';
import '../assets/css/index.css';

const App = () => {
	getOS();

	dayjs.extend(localizedFormat);
	dayjs.extend(relativeTime);

	/**
	 * Dark Mode
	 */
	const { themeStatus, darkModeStatus } = useDarkMode();
	const location = useLocation();
	const theme = {
		theme: themeStatus,
		primary: COLORS.PRIMARY.code,
		secondary: COLORS.SECONDARY.code,
		success: COLORS.SUCCESS.code,
		info: COLORS.INFO.code,
		warning: COLORS.WARNING.code,
		danger: COLORS.DANGER.code,
		dark: COLORS.DARK.code,
		light: COLORS.LIGHT.code,
	};

	useEffect(() => {
		if (darkModeStatus) {
			document.documentElement.setAttribute('theme', 'dark');
			document.documentElement.setAttribute('data-bs-theme', 'dark');
		}
		return () => {
			document.documentElement.removeAttribute('theme');
			document.documentElement.removeAttribute('data-bs-theme');
		};
	}, [darkModeStatus]);

	/**
	 * Full Screen
	 */
	const { fullScreenStatus, setFullScreenStatus } = useContext(ThemeContext);
	const ref = useRef(null);
	useFullscreen(ref, fullScreenStatus, {
		onClose: () => setFullScreenStatus(false),
	});

	/**
	 * Modern Design
	 */
	useLayoutEffect(() => {
		if (process.env.REACT_APP_MODERN_DESGIN === 'true' || false) {
			document.body.classList.add('modern-design');
		} else {
			document.body.classList.remove('modern-design');
		}
	});

	return (
		<ThemeProvider theme={theme}>
			<DashboardProvider>
				<ProductProvider>
					<GoogleOAuthProvider clientId={String(process.env.REACT_APP_GOOGLE_CLIENT_ID)}>
						<TourProvider
							steps={steps}
							styles={styles}
							showNavigation={false}
							showBadge={false}>
							<div
								ref={ref}
								className='app'
								style={{
									backgroundColor: fullScreenStatus
										? 'var(--bs-body-bg)'
										: undefined,
									zIndex: fullScreenStatus ? 1 : undefined,
									overflow: fullScreenStatus ? 'scroll' : undefined,
								}}>
								{location.pathname.includes('resetpassword') ? (
									<Routes>
										<Route
											path='resetpassword/:resetCode'
											element={<ResetPasswordPage />}
										/>
									</Routes>
								) : (
									<>
										<AsideRoutes />
										<Wrapper />
									</>
								)}
							</div>
							<Portal id='portal-notification'>
								<ReactNotifications />
							</Portal>
							<ToastContainer
								closeButton={ToastCloseButton}
								toastClassName='toast show'
							/>
						</TourProvider>
					</GoogleOAuthProvider>
				</ProductProvider>
			</DashboardProvider>
		</ThemeProvider>
	);
};

export default App;
