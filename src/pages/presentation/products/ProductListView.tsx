import React, { FC, useState } from 'react';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import CommonTableRow from '../../_common/CommonTableRow';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons';
import useSortableData from '../../../hooks/useSortableData';
import Icon from '../../../components/icon/Icon';
import useTourStep from '../../../hooks/useTourStep';

interface IListDataProps {
	listData: {
		id: number;
		name: string;
		image: string;
		description: string;
		category: string;
		price: number;
		sales: number;
	}[];
}
const ProductListView: FC<IListDataProps> = ({ listData }) => {
	useTourStep(6);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
	const { items, requestSort, getClassNamesFor } = useSortableData(listData);
	const onCurrentPageItems = dataPagination(items, currentPage, perPage);

	return (
		<Card stretch data-tour='list' className='col-12'>
			<CardBody className='table-responsive' isScrollable>
				<div className='row g-4 '>
					<div className='col-12'>
						<table className='table table-modern table-hover justify-content-between'>
							<thead>
								<tr className='justify-content-between'>
									<th
										scope='col'
										onClick={() => requestSort('id')}
										className='cursor-pointer'>
										Sr No
										<Icon
											size='lg'
											className={getClassNamesFor('id')}
											icon='FilterList'
										/>
									</th>
									<th scope='col'>Name</th>
									<th
										scope='col'
										onClick={() => requestSort('price')}
										className='cursor-pointer'>
										Price
										<Icon
											size='lg'
											className={getClassNamesFor('price')}
											icon='FilterList'
										/>
									</th>
									<th scope='col'>CATEGORY</th>
									<th scope='col'>Actions</th>
								</tr>
							</thead>
							<tbody>
								{onCurrentPageItems.map((i) => (
									<CommonTableRow
										key={i.id}
										// eslint-disable-next-line react/jsx-props-no-spreading
										{...i}
									/>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</CardBody>
			<PaginationButtons
				data={items}
				label='items'
				setCurrentPage={setCurrentPage}
				currentPage={currentPage}
				perPage={perPage}
				setPerPage={setPerPage}
			/>
		</Card>
	);
};

export default ProductListView;
