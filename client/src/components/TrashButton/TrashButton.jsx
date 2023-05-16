import React from 'react'
import './TrashButton.scss'
const TrashButton = ({ children, onClick }) => {
	return (
		<button onClick={() => onClick()} className={'trash-button'}>
			{children}
		</button>
	)
}

export default TrashButton
