import React from 'react';
import { adminDashboardPagesMenu } from '../../../menu';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import GridFluidPage from '../../presentation/demo-pages/GridFluidPage';

const Projects = () => {
	return (
		<PageWrapper title={adminDashboardPagesMenu.projects.text}>
				<GridFluidPage/>
		</PageWrapper>
	);
};

export default Projects;
