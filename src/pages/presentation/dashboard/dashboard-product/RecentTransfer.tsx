import React, { useEffect, useRef, useState } from 'react';
import { useHoverDirty } from 'react-use';
import {
	CardActions,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import Button from '../../../../components/bootstrap/Button';
import Bank1 from '../../../../assets/logos/logo1.png';
import Bank2 from '../../../../assets/logos/logo2.png';
import Bank3 from '../../../../assets/logos/logo3.png';
import TransferAction, { TTransferActionStatus } from './TransferAction';
import Spinner from '../../../../components/bootstrap/Spinner';
import showNotification from '../../../../components/extras/showNotification';
import Icon from '../../../../components/icon/Icon';

const RecentTransfer = () => {
	const ref = useRef<HTMLAnchorElement>(null);
	const isHovering = useHoverDirty(ref);
	const [isLoading, setIsLoading] = useState(false);
	const [demoStatus, setDemoStatus] = useState<TTransferActionStatus>('Processing');

	useEffect(() => {
		const timer = isLoading
			? setTimeout(() => {
					setIsLoading(false);
					setDemoStatus('Completed');
					showNotification(
						<span className='d-flex align-items-center'>
							<Icon icon='Info' size='lg' className='me-1' />
							<span>Updated Successfully</span>
						</span>,
						'Transfer list has been updated successfully',
					);
			  }, 1500)
			: undefined;
		return () => clearTimeout(timer);
	}, [isLoading]);

	return (
		<div className='row'>
			<div className='col-lg-12'>
				<CardHeader className='px-0 bg-transparent pt-0'>
					<CardLabel>
						<CardTitle tag='div' className='h5'>
							Competitors/Collegues
						</CardTitle>
					</CardLabel>
					<CardActions>
						<Button
							ref={ref}
							color='info'
							isLight
							icon={isLoading ? undefined : 'PublishedWithChanges'}
							onClick={() => {
								ref?.current?.blur();
								setIsLoading(true);
							}}>
							{isLoading && (
								<Spinner color={isHovering ? 'light' : 'info'} inButton isSmall>
									Loading...
								</Spinner>
							)}
							Refresh
						</Button>
					</CardActions>
				</CardHeader>
				<TransferAction name='Demo Competitors' link='/dashboard-product' img={Bank1} />
				<TransferAction name='Demo Competitors' link='/dashboard-product' img={Bank2} />
				<TransferAction name='Demo Competitors' link='/dashboard-product' img={Bank3} />
			</div>
		</div>
	);
};

export default RecentTransfer;
