import React, { FC, useState } from 'react';
import Card, {
	CardBody,
	CardFooter,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../components/bootstrap/Card';
import Button from '../../components/bootstrap/Button';
import useDarkMode from '../../hooks/useDarkMode';
import { useNavigate, Link } from 'react-router-dom';

interface ICommonGridMarketingToolItem {
	id: number | string;
	name: string;
	description: string;
	link: string;
	logoLink: string;
}
const CommonGridMarketingToolItem: FC<ICommonGridMarketingToolItem> = ({
	id,
	name,
	description,
	link,
	logoLink,
}) => {
	const { themeStatus, darkModeStatus } = useDarkMode();
	// console.log(name);

	const [showFullDescription, setShowFullDescription] = useState(false);

	const toggleDescription = () => {
		setShowFullDescription(!showFullDescription);
	};
	const navigate = useNavigate();
	return (
		<Card stretch>
			<CardHeader>
				<CardLabel>
					<CardTitle tag='div' className='h5'>
						{name}{' '}
					</CardTitle>
				</CardLabel>
			</CardHeader>
			<CardBody>
				<Link to={link} className='text-decoration-none'>
					<img
						src={logoLink}
						alt='Tool img'
						width={128}
						height={128}
						className='mx-auto d-block mb-3'
					/>
				</Link>
				<div>
					{showFullDescription ? (
						<p className='h6'>{description}</p>
					) : (
						<p className='h6'>
							{description.length > 100
								? `${description.substring(0, 100)}...`
								: description}
						</p>
					)}
					{description.length > 100 && (
						<Button className='btn btn-link p-0 inline' onClick={toggleDescription}>
							{showFullDescription ? 'See less' : 'See more'}
						</Button>
					)}
				</div>
			</CardBody>
			<CardFooter className='shadow-3d-container'>
				<Button
					color='dark'
					className={`w-100 mb-4 shadow-3d-up-hover shadow-3d-${
						darkModeStatus ? 'light' : 'dark'
					}`}
					size='lg'
					tag='a'
					to={link}>
					Click here
				</Button>
			</CardFooter>
		</Card>
	);
};

export default CommonGridMarketingToolItem;
