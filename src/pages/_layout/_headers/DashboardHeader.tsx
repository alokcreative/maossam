import React from 'react';
import Header, { HeaderLeft } from '../../../layout/Header/Header';
import CommonHeaderChat from './CommonHeaderChat';
import Search from '../../../components/Search';
import CommonHeaderRight from './CommonHeaderRight';

const DashboardHeader = () => {
	return (
		<Header>
			<HeaderLeft>
				{/* <Search /> */}
			</HeaderLeft>
			<CommonHeaderRight  />
			{/* afterChildren={<CommonHeaderChat />}  this is chat page attribute of CommonHeaderRight */}
		</Header>
	);
};

export default DashboardHeader;
