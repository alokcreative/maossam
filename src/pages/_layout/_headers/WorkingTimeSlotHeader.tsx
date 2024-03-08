import React, { useEffect, useState } from 'react'
import Header, { HeaderLeft } from '../../../layout/Header/Header'
import CommonHeaderRight from './CommonHeaderRight'
import { IUserData } from '../_asides/DefaultAside'
import { useGetUsersMutation } from '../../../features/auth/authApiSlice'
import { useNavigate } from 'react-router-dom'

const WorkingTimeSlotHeader = () => {
	const navigate = useNavigate()

	const token = localStorage?.getItem('access_token')
	const role = localStorage.getItem('role')
	const [GetUsersMutation, { isLoading }] = useGetUsersMutation()
	const [userData, setUserData] = useState<IUserData>()
	useEffect(() => {
		if (token) {
			GetUsersMutation(token)
				.unwrap()
				.then((res) => {
					setUserData(res)
				})
				.catch(() => {
					localStorage.removeItem('refresh_token')
					localStorage.removeItem('access_token')
					localStorage.removeItem('tourModalStarted')
					localStorage.removeItem('role')
					localStorage.removeItem('i18nextLng')
					localStorage.removeItem('facit_asideStatus')
					localStorage.removeItem('user')
					navigate('/auth-pages/login')
				})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token])
	return (
		<Header>
			<HeaderLeft>
				<div className='d-flex ' style={{ gap: '45%' }}>
					<div className='h4 text-dark'>Hi, {userData?.first_name}!</div>
					<div className='h4 text-dark'>Working Time slots</div>
				</div>

				{/* <Navigation
					menu={{ ...pageLayoutTypesPagesMenu, ...componentPagesMenu }}
					id='header-top-menu'
					horizontal={
						!!width && width >= Number(process.env.REACT_APP_MOBILE_BREAKPOINT_SIZE)
					}
				/> */}
			</HeaderLeft>
			<CommonHeaderRight />
		</Header>
	)
}

export default WorkingTimeSlotHeader
