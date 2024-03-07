import React, { useState } from 'react'
import FormGroup from '../bootstrap/forms/FormGroup'
import Button from '../bootstrap/Button'

interface Props {
	setActiveTabForNumOfPeople: (tab: string) => void
	activeTabForNumOfPeople: string
}

const NumOfPeopleButtons: React.FC<Props> = ({
	setActiveTabForNumOfPeople,
	activeTabForNumOfPeople,
}) => {
	const buttons = [
		{ label: 'Just me', value: '1' },
		{ label: '2-4', value: '2_4' },
		{ label: '5-10', value: '5_10' },
		{ label: '10+', value: '10+' },
	]

	return (
		<div className='mb-3'>
			<FormGroup id='noOfPeople' label='How many people work at your company*'>
				<div>
					{buttons.map((button) => (
						<Button
							key={button.value}
							color='info'
							className='btn-outline-dark rounded-pill mx-2 my-2 py-3 px-3'
							onClick={() => setActiveTabForNumOfPeople(button.value)}
							isLink={activeTabForNumOfPeople !== button.value}
							isLight={activeTabForNumOfPeople === button.value}>
							{button.label}
						</Button>
					))}
				</div>
			</FormGroup>
		</div>
	)
}

export default NumOfPeopleButtons
