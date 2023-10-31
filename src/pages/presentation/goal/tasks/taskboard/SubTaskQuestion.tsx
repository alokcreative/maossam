import React, { FC, useEffect } from 'react';
import Accordion, { AccordionItem } from '../../../../../components/bootstrap/Accordion';
import { useGetFaqBySubTaskIdQuery } from '../../../../../features/auth/taskManagementApiSlice';
import Spinner from '../../../../../components/bootstrap/Spinner';
import { useEffectOnce } from 'react-use';
import parse from 'html-react-parser';

type IAssetNameProps = {
	id: number | undefined;
};

interface IFaq {
	id: number;
	subtask: string;
	question: string;
	answer: string;
}

const SubTaskQuestion: FC<IAssetNameProps> = ({ id }) => {
	const { data, isLoading, isSuccess, isFetching, refetch } = useGetFaqBySubTaskIdQuery(id!);

	useEffectOnce(() => {
		refetch();
	});

	if (isLoading) {
		<Spinner />;
	}

	if (isFetching) {
		<Spinner />;
	}


	return (
		<div className='row g-3'>
			<div className='col-12'>
				{isSuccess &&
					data &&
					data?.subtask_faqs &&
					data?.subtask_faqs.map((q: IFaq) => {
						return (
							<Accordion id={data.id} isFlush className='mb-1'>
								<AccordionItem
									id={q.id}
									title={parse(q.question)}
									activeItem={null}>
									{parse(q.answer)}
								</AccordionItem>
							</Accordion>
						);
					})}
			</div>
		</div>
	);
};

export default SubTaskQuestion;
