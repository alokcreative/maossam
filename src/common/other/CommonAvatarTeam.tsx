import React, { FC, memo, ReactNode } from 'react';
import PropTypes from 'prop-types';
import Avatar, { AvatarGroup } from '../../components/Avatar';
import USERS from '../data/userDummyData';

interface ICommonAvatarTeamProps {
	children: ReactNode;
	isAlignmentEnd?: boolean;
}
const CommonAvatarTeam: FC<ICommonAvatarTeamProps> = ({ children, isAlignmentEnd }) => {
	return (
		<>
			{children && !isAlignmentEnd && <span className='me-3'>{children}</span>}
			<AvatarGroup>
				<Avatar
					src={USERS.GRACE.src}
					srcSet={USERS.GRACE.src}
					// @ts-ignore
					color='info'
					userName={`${USERS.GRACE.name} ${USERS.GRACE.lastname}`}
				/>
				<Avatar
					src={USERS.JANE.src}
					srcSet={USERS.JANE.src}
					// @ts-ignore
					color='info'
					userName={`${USERS.JANE.name} ${USERS.JANE.lastname}`}
				/>
				<Avatar
					src={USERS.RYAN.src}
					srcSet={USERS.RYAN.src}
					// @ts-ignore
					color='info'
					userName={`${USERS.RYAN.name} ${USERS.RYAN.lastname}`}
				/>
				<Avatar
					src={USERS.ELLA.src}
					srcSet={USERS.ELLA.src}
					// @ts-ignore
					color='info'
					userName={`${USERS.ELLA.name} ${USERS.ELLA.lastname}`}
				/>
				<Avatar
					src={USERS.CHLOE.src}
					srcSet={USERS.CHLOE.src}
					// @ts-ignore
					color='info'
					userName={`${USERS.CHLOE.name} ${USERS.CHLOE.lastname}`}
				/>
				<Avatar
					src={USERS.SAM.src}
					srcSet={USERS.SAM.src}
					// @ts-ignore
					color='info'
					userName={`${USERS.SAM.name} ${USERS.SAM.lastname}`}
				/>
			</AvatarGroup>
			{children && isAlignmentEnd && <span>{children}</span>}
		</>
	);
};
CommonAvatarTeam.propTypes = {
	children: PropTypes.node,
	isAlignmentEnd: PropTypes.bool,
};
CommonAvatarTeam.defaultProps = {
	children: undefined,
	isAlignmentEnd: false,
};

export default memo(CommonAvatarTeam);
