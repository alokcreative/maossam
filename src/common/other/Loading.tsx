import React from 'react';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import SubHeader from '../../layout/SubHeader/SubHeader';
import Page from '../../layout/Page/Page';
import Card, { CardBody } from '../../components/bootstrap/Card';

const Loading = () => (
	<PageWrapper isProtected={false}>
		<SubHeader>
			<div />
		</SubHeader>
		<Page>
			<div className='row h-100'>
				<div className='col-lg-6'>
					<Card stretch>
						<CardBody>
							<div />
						</CardBody>
					</Card>
				</div>
				<div className='col-lg-6'>
					<Card stretch='semi'>
						<CardBody>
							<div />
						</CardBody>
					</Card>
					<Card stretch='semi'>
						<CardBody>
							<div />
						</CardBody>
					</Card>
				</div>
			</div>
		</Page>
	</PageWrapper>
);

export default Loading;
