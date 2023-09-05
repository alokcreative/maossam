import React, { FC } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useDarkMode from '../../../../hooks/useDarkMode';
import Card, { CardBody } from '../../../../components/bootstrap/Card';

export type TTransferActionStatus = 'Completed' | 'Processing' | 'Failed';
interface ITransferActionProps {
	img: string;
	className?: string;
	name: string;
	imgWidth?: number;
	link?: string;
}

const TransferAction: FC<ITransferActionProps> = ({
	img,
	className,
	imgWidth,
    name,
    link,
}) => {
	const { darkModeStatus } = useDarkMode();

	return (
		<Card className={className}>
			<CardBody>
				<div className='row g-3 align-items-center'>
					<div className='col'>
						<img src={img} alt='Bank Of America' width={imgWidth} height='auto' />
                        <h5 className="ps-3 mb-0 mt-2">{name}</h5>
					</div>
					<div className='col-auto'>
						<a href={link}
                            target='_blank'
							className={classNames(
								`bg-l${
									darkModeStatus ? 'o25' : '10'
								}-success text-success fw-bold px-3 py-2 rounded-pill`,
							)}>
							Visit us
						</a>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};
TransferAction.propTypes = {
	name: PropTypes.string.isRequired,
	img: PropTypes.string.isRequired,
	className: PropTypes.string,
	imgWidth: PropTypes.number,
	link: PropTypes.string.isRequired,
};
TransferAction.defaultProps = {
	className: undefined,
	imgWidth: 150,
};

export default TransferAction;
