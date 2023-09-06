import React from 'react';
import { useNavigate } from 'react-router-dom';
import USERS from '../../../../common/data/userDummyData';
import { demoPagesMenu } from '../../../../menu';
import UserContact from '../../../../components/UserContact';

const CommonDashboardUserCard = () => {
	const navigate = useNavigate();

	return (
		<UserContact
			name={`${USERS.SAM.name} ${USERS.SAM.lastname}`}
			position='Team Lead'
			mail={`${USERS.SAM.lastname}@site.com`}
			phone='1234567'
			onChat={() => navigate(`../${demoPagesMenu.chat.subMenu.withListChat.path}`)}
			src={USERS.SAM.src}
			srcSet={USERS.SAM.src}
			color='info'
		/>
	);
};

export default CommonDashboardUserCard;
