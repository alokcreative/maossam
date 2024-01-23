import React from 'react';
import Header, { HeaderLeft } from '../../../layout/Header/Header';
import CommonHeaderRight from './CommonHeaderRight';
import CommonHeaderChat from './CommonHeaderChat';
import Search from '../../../components/Search';

const DashboardHeader = () => {
	return (
		<Header>
			<HeaderLeft>
				<Search />
			</HeaderLeft>
			<CommonHeaderRight afterChildren={<CommonHeaderChat />} />
		</Header>
	);
};

export default DashboardHeader;
