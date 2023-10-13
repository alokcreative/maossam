import React from 'react';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import SubHeader from '../../layout/SubHeader/SubHeader';
import Page from '../../layout/Page/Page';
import Card, { CardBody } from '../../components/bootstrap/Card';
import Spinner from '../../components/bootstrap/Spinner';

const Loading = () => (
	<PageWrapper isProtected={false}>
		<Page>
			<div
				className='modal'
				id='loaderModal'
				tabIndex={-1}
				role='dialog'
				style={{
					position: 'fixed',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					background: 'rgba(0, 0, 0, 0.5)',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					zIndex: 9999,
				}}>
				<div className='modal-dialog modal-dialog-centered' role='document'>
					<div
						className='modal-content'
						style={{ background: 'transparent', border: 'none' }}>
						<div className='modal-body text-center'>
							<div
								className='spinner-border text-primary'
								role='status'
								style={{ width: '5rem', height: '5rem' }}>
								<span className='visually-hidden'>Loading...</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Page>
	</PageWrapper>
);

export default Loading;
