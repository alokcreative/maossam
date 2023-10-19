import React, { FC } from 'react';
import Accordion, { AccordionItem } from '../../../../../components/bootstrap/Accordion';
import { useGetFaqBySubTaskIdQuery } from '../../../../../features/auth/taskManagementApiSlice';
import Spinner from '../../../../../components/bootstrap/Spinner';

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

	console.log('Question Data>>>>', data);
	console.log('Question Data ID>>>>', id);

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
								<AccordionItem id={q.id} title={q.question} activeItem={null}>
									{q.answer}
								</AccordionItem>
							</Accordion>
						);
					})}
			</div>
		</div>
	);
};

export default SubTaskQuestion;
