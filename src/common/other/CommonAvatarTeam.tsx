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
					srcSet={USERS.GRACE.srcSet}
					// @ts-ignore
					color='info'
					userName={`${USERS.GRACE.name} ${USERS.GRACE.surname}`}
				/>
				<Avatar
					src={USERS.JANE.src}
					srcSet={USERS.JANE.srcSet}
					// @ts-ignore
					color='info'
					userName={`${USERS.JANE.name} ${USERS.JANE.surname}`}
				/>
				<Avatar
					src={USERS.RYAN.src}
					srcSet={USERS.RYAN.srcSet}
					// @ts-ignore
					color='info'
					userName={`${USERS.RYAN.name} ${USERS.RYAN.surname}`}
				/>
				<Avatar
					src={USERS.ELLA.src}
					srcSet={USERS.ELLA.srcSet}
					// @ts-ignore
					color='info'
					userName={`${USERS.ELLA.name} ${USERS.ELLA.surname}`}
				/>
				<Avatar
					src={USERS.CHLOE.src}
					srcSet={USERS.CHLOE.srcSet}
					// @ts-ignore
					color='info'
					userName={`${USERS.CHLOE.name} ${USERS.CHLOE.surname}`}
				/>
				<Avatar
					src={USERS.SAM.src}
					srcSet={USERS.SAM.srcSet}
					// @ts-ignore
					color='info'
					userName={`${USERS.SAM.name} ${USERS.SAM.surname}`}
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
