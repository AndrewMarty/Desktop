import React from 'react'
import { BsCheckLg } from 'react-icons/bs'
import './CheckBox.scss'
import clsx from 'clsx'
const CheckBox = ({ state, onClick, className }) => {
	return (
		<div
			className={clsx('checkbox', { ['checkbox_active']: state }, className)}
			onClick={() => {
				onClick()
			}}
		>
			<BsCheckLg />
		</div>
	)
}

export default CheckBox
