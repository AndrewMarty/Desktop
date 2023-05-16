import './styles/reset.scss'
import './styles/globals.scss'
import './App.scss'
import TodoItem from './components/TodoItem/TodoItem'
import { useEffect, useState } from 'react'
import { BsPlus } from 'react-icons/bs'
function App() {
	const [list, setList] = useState([])
	const [name, setName] = useState('')
	useEffect(() => {
		fetch('/get')
			.then(response => {
				return response.json()
			})
			.then(data => {
				console.log(data)
				setList(data)
			})
	}, [])
	function handleChange(event) {
		setName(event.target.value)
	}
	function handleSubmit(event) {
		event.preventDefault()
		fetch('/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name: name.trim(), complete: false })
		}).then(async response => {
			if (response.ok) {
				const item = await response.json()
				const newItems = [...list]
				newItems.push(item)
				setList(newItems)
			}
		})
		setName('')
	}
	function deleteTodo(id) {
		fetch(`/delete/${id}`).then(response => {
			if (response.ok) {
				const newItems = list.filter(item => item._id !== id)
				setList(newItems)
			}
		})
	}
	return (
		<div className={'App__wrapper'}>
			<h1 className={'App__title'}>TodoList for Michael</h1>
			<form className={'App__inner'} onSubmit={handleSubmit}>
				<input
					type='text'
					className={'App__field'}
					value={name}
					placeholder={'Add new task'}
					onChange={handleChange}
				/>
				<button type={'submit'} className={'App__plus'}>
					<BsPlus className={'App__plus-icon'} />
				</button>
			</form>

			{list.length > 0 ? (
				<ul className={'App__list'}>
					{list.map(item => {
						return (
							<TodoItem
								del={deleteTodo}
								data={item}
								key={item._id}
								className={'App__item'}
							/>
						)
					})}
				</ul>
			) : (
				<div className={'App__add-text'}>Add own first todo!</div>
			)}
		</div>
	)
}

export default App
