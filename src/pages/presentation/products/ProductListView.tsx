import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { Calendar as DatePicker } from 'react-date-range';
import classNames from 'classnames';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Avatar from '../../../components/Avatar';
import UserImageWebp from '../../../assets/img/wanna/wanna1.webp';
import UserImage from '../../../assets/img/wanna/wanna1.png';
import Button from '../../../components/bootstrap/Button';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
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
import Select from '../../../components/bootstrap/forms/Select';
import Popovers from '../../../components/bootstrap/Popovers';

import data from '../../../common/data/dummyProductData';
import { pagesMenu } from '../../../menu';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons';
import useSortableData from '../../../hooks/useSortableData';
import Icon from '../../../components/icon/Icon';
import useSelectTable from '../../../hooks/useSelectTable';
import useDarkMode from '../../../hooks/useDarkMode';
import useTourStep from '../../../hooks/useTourStep';

interface IValues {
	name: string;
	price: number;
	stock: number;
	category: string;
	image?: string | null;
}
const ProductListView = () => {
	/**
	 * For Tour
	 */
	useTourStep(6);

	const { themeStatus, darkModeStatus } = useDarkMode();

	const [date, setDate] = useState<Date>(new Date());

	const [filterMenu, setFilterMenu] = useState<boolean>(false);
	const formik = useFormik({
		initialValues: {
			minPrice: '',
			maxPrice: '',
			categoryName: '3D Shapes',
			companyA: true,
			companyB: true,
			companyC: true,
			companyD: true,
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
			setFilterMenu(false);
			// alert(JSON.stringify(values, null, 2));
		},
	});

	const filteredData = data.filter(
		(f) =>
			// Category
			f.category === formik.values.categoryName &&
			// Price
			(formik.values.minPrice === '' || f.price > Number(formik.values.minPrice)) &&
			(formik.values.maxPrice === '' || f.price < Number(formik.values.maxPrice)) 
			//	Company
			// ((formik.values.companyA ? f.store === 'Company A' : false) ||
			// 	(formik.values.companyB ? f.store === 'Company B' : false) ||
			// 	(formik.values.companyC ? f.store === 'Company C' : false) ||
			// 	(formik.values.companyD ? f.store === 'Company D' : false)),
	);

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);

	const { items, requestSort, getClassNamesFor } = useSortableData(filteredData);
	const onCurrentPageItems = dataPagination(items, currentPage, perPage);
	const { selectTable, SelectAllCheck } = useSelectTable(onCurrentPageItems);

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
								#{' '}
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
								Price{' '}
								<Icon
									size='lg'
									className={getClassNamesFor('price')}
									icon='FilterList'
								/>
							</th>
							<th scope='col'>CATEGORY</th>
							<th scope='col'>AVATAR NAME</th>
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
