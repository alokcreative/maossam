import React, { FC,useState } from 'react';
import { useFormik } from 'formik';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
import InputGroup, { InputGroupText } from '../../../components/bootstrap/forms/InputGroup';
import Input from '../../../components/bootstrap/forms/Input';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Label from '../../../components/bootstrap/forms/Label';
import CommonFilterTag from '../../_common/CommonFilterTag';
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
		<Card stretch data-tour='list'>
			<CardBody className='table-responsive' isScrollable>
				<table className='table table-modern table-hover'>
					<thead>
						<tr>
							<th
								scope='col'
								onClick={() => requestSort('id')}
								className='cursor-pointer text-decoration-underline'>
								 Sr No
								<Icon
									size='lg'
									className={getClassNamesFor('id')}
									icon='FilterList'
								/>
							</th>
							<th scope='col'>Image</th>
							<th scope='col'>Name</th>
							<th
								scope='col'
								onClick={() => requestSort('price')}
								className='cursor-pointer text-decoration-underline'>
								Price
								<Icon
									size='lg'
									className={getClassNamesFor('price')}
									icon='FilterList'
								/>
							</th>
							<th scope='col'>CATEGORY</th>
							{/* <th scope='col'>AVATAR NAME</th> */}
							<th scope='col'>GOAL</th>
							<th scope='col' className='text-end'>
								Actions
							</th>
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
