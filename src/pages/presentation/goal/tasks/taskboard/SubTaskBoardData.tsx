import React, { FC, useState } from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd';
import classNames from 'classnames';
import Card from '../../../../../components/bootstrap/Card';
import { getItemStyle } from '../../../project-management/helper/style';
import { TCard, TCards, TColumnsData } from '../../../project-management/type/types';
import ColumnCard from '../../../project-management/component/ColumnCard';
import { ISubTask } from '../../../../../common/data/dummyGoals';
import TaskBoardCard from './TaskBoardCard';

interface ICardsInColumn {
	[key: string]: ISubTask[];
}
interface IColumnCardWrapper {
	columnKey: string;
	columnsData: TColumnsData;
	cardsInTheColumn: any;
	setCardsData(...args: unknown[]): unknown;
}

const SubTaskBoardData: FC<IColumnCardWrapper> = ({
	columnKey,
	columnsData,
	cardsInTheColumn,
	setCardsData,
}) => {
	// console.log('cardsData', cardsInTheColumn);
	// console.log('columnKey', columnKey);

	const cardsInThe = cardsInTheColumn[columnKey];
	// console.log('cardsInThe', cardsInThe);

	return (
		<div>
			{cardsInThe &&
				cardsInThe.map((card: ISubTask) => (
					<Draggable key={String(card.id)} draggableId={String(card.id)} index={Number(card.id)}>
						{(
							providedDraggable: DraggableProvided,
							snapshotDraggable: DraggableStateSnapshot,
						) => (
							<Card
								shadow='none'
								borderSize={1}
								className={classNames('rounded-2', {
									'border-info': snapshotDraggable.isDragging,
								})}
								ref={providedDraggable.innerRef}
								// eslint-disable-next-line react/jsx-props-no-spreading
								{...providedDraggable.draggableProps}
								// eslint-disable-next-line react/jsx-props-no-spreading
								{...providedDraggable.dragHandleProps}
								style={getItemStyle(
									snapshotDraggable.isDragging,
									providedDraggable.draggableProps.style,
								)}>
								<TaskBoardCard
									columnKey={columnKey}
									columnsData={columnsData}
									card={card}
									cardsData={card}
									setCardsData={setCardsData}
									index={card.id}
								/>
							</Card>
						)}
					</Draggable>
				))}
		</div>
	);
};

export default SubTaskBoardData;
