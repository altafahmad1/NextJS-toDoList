import React from 'react';
import styles from './../styles/TaskItem.module.css';

export default function TaskItem(props) {
	const deleteTask = async (e) => {
		const taskId = e.currentTarget.id;
		await fetch(
			`http://localhost:3000/api/tasks/${props.session.id}/${taskId}`,
			{
				method: 'DELETE',
			}
		)
			.then((response) => response.json())
			.then((data) => {
				props.setTasks([...data.tasks[0].tasks]);
			});
	};

	return (
		<li className='relative overflow-x-auto first-of-type:rounded-tr-md first-of-type:rounded-tl-md last-of-type:rounded-br-md last-of-type:rounded-bl-md bg-white border border-b-gray-300 p-2'>
			<input className='' type='checkbox' />
			<span className='pl-2'>{props.text}</span>
			<button
				onClick={deleteTask}
				id={props.id}
				className='absolute top-2 right-4'
			>
				<img className='h-5' src='./images/delete.png' alt='Delete' />
			</button>
		</li>
	);
}
