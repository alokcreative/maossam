import React from 'react';
import Header, { HeaderLeft } from '../../../layout/Header/Header';
import CommonHeaderRight from './CommonHeaderRight';

const DashboardHeader = () => {
	return (
		<Header>
			{/* <HeaderLeft> */}
				{/* <Search /> */}
				{/* <div /> */}
			{/* </HeaderLeft> */}
			<CommonHeaderRight />
			{/* afterChildren={<CommonHeaderChat />}  this is chat page attribute of CommonHeaderRight */}
		</Header>
	);
};

export default DashboardHeader;
