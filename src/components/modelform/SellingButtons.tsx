import React, { useState } from 'react'
import FormGroup from '../bootstrap/forms/FormGroup'
import Button from '../bootstrap/Button'

interface Props {
	setActiveSellingPerTab: (tab: string) => void
	activeSellingPerTab: string
}

const SellingButtons: React.FC<Props> = ({ setActiveSellingPerTab, activeSellingPerTab }) => {
	const buttons = [
		{ label: 'Services', value: 'Services' },
		{ label: 'Products', value: 'Products' },
		{ label: 'Both', value: 'Both' },
	]

	return (
		<div className='mb-3'>
			<FormGroup
				id='selling'
				label='Are you currently selling or intending to sell in the future?*'>
				<div>
					{buttons.map((button) => (
						<Button
							key={button.value}
							color='info'
							className='btn-outline-dark rounded-pill mx-2 my-2 py-2 px-3'
							onClick={() => setActiveSellingPerTab(button.value)}
							isLink={activeSellingPerTab !== button.value}
							isLight={activeSellingPerTab === button.value}>
							{button.label}
						</Button>
					))}
				</div>
			</FormGroup>
		</div>
	)
}

export default SellingButtons
