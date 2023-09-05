import React from 'react';
import { adminDashboardPagesMenu } from '../../../menu';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';

const ReportAndAnalysis = () => {
	return (
		<PageWrapper title={adminDashboardPagesMenu.projects.text}>
			<Page>
				<div>Report And Analysis in progress....</div>
			</Page>
		</PageWrapper>
	);
};

export default ReportAndAnalysis;
