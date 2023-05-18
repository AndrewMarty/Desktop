import './TodoItem.scss'
import { BsFillTrashFill } from 'react-icons/bs'
import TrashButton from '../TrashButton/TrashButton'
import CheckBox from '../CheckBox/CheckBox'
import clsx from 'clsx'
import { useState } from 'react'
const TodoItem = ({ data, del, className }) => {
	const [complete, setComplete] = useState(data.complete)
	function toggleTodo() {
		if (complete) {
			setComplete(false)
			fetch(`/unset/${data._id}`, { method: 'PUT' })
				.then(response => {
					if (response.ok) {
						setComplete(true)
					}
				})
				.catch(err => {
					alert('Error: ' + err.message)
				})
		} else {
			setComplete(true)
			fetch(`/complete/${data._id}`, { method: 'PUT' })
				.then(response => {
					if (response.ok) {
						setComplete(false)
					}
				})
				.catch(err => {
					alert('Error: ' + err.message)
				})
		}
	}
	return (
		<li className={clsx('todo-item', className)}>
			<CheckBox
				onClick={toggleTodo}
				state={complete}
				className={'todo-item__checkbox'}
			/>
			<p
				className={clsx('todo-item__text', {
					['todo-item__text_active']: complete
				})}
			>
				{data.name}
			</p>
			<TrashButton
				onClick={() => {
					del(data._id)
				}}
			>
				<BsFillTrashFill />
			</TrashButton>
		</li>
	)
}
export default TodoItem
