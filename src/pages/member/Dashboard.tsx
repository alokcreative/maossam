import React from 'react';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import { memberDashboardPagesMenu } from '../../menu';

const Dashboard = () => {
	return (
		<PageWrapper title={memberDashboardPagesMenu.dashboard.text} isProtected>
			<div>Hello</div>
		</PageWrapper>
	);
};

export default Dashboard;
