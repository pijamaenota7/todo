import { FilterValuesType, TasksStateType, TaskType, TodolistType } from "./App";
import { ChangeEvent } from "react";
import Button from '@mui/material/Button';
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from "@mui/material/Box/Box";
import { filterButtonsContainerSx, getListItemSx } from "./Todolist.styles";
import { useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";
import { useDispatch } from "react-redux";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./state/tasks-reducer";
import { ChangeTodolistFilterActionCreator, ChangeTodolistTitleActionCreator, RemoveTodolistActionCreator } from "./state/todolists-reducer";


type PropsType = {
	todolist: TodolistType
}

export const TodolistWithRedux = ({ todolist }: PropsType) => {

	const { id, title, filter } = todolist

	let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[id]);

	let dispatch = useDispatch()

	const changeFilterTasksHandler = (filter: FilterValuesType) => {
		dispatch(ChangeTodolistFilterActionCreator(id, filter))
	}

	const removeTodolistHandler = () => {
		dispatch(RemoveTodolistActionCreator(id))
	}

	const addTaskCallback = (title: string) => {
		dispatch(addTaskAC(title, id))
	}

	const updateTodolistHandler = (title: string) => {
		dispatch(ChangeTodolistTitleActionCreator(id, title))
	}

	if (filter === 'active') {
		tasks = tasks.filter(task => !task.isDone)
	}

	if (filter === 'completed') {
		tasks = tasks.filter(task => task.isDone)
	}

	return (
		<div>
			<div className={"todolist-title-container"}>
				<h3><EditableSpan value={title} onChange={updateTodolistHandler} /></h3>
				<IconButton onClick={removeTodolistHandler}>
					<DeleteIcon />
				</IconButton>
			</div>
			<AddItemForm addItem={addTaskCallback} />
			{
				tasks.length === 0
					? <p>Тасок нет</p>
					: <List>
						{tasks.map((task) => {

							const removeTaskHandler = () => {
								dispatch(removeTaskAC(task.id, id))
							}

							const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
								const newStatusValue = e.currentTarget.checked
								dispatch(changeTaskStatusAC(task.id, newStatusValue, id))
							}

							const changeTaskTitleHandler = (title: string) => {
								dispatch(changeTaskTitleAC(task.id, title, id))
							}

							return <ListItem
								key={task.id}

								sx={getListItemSx(task.isDone)}
							>
								{/*<input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>*/}
								<div>
									<Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
									<EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
								</div>

								<IconButton onClick={removeTaskHandler}>
									<DeleteIcon />
								</IconButton>
							</ListItem>
						})}
					</List>
			}
			<Box sx={filterButtonsContainerSx}>
				<Button
					variant={filter === 'all' ? 'outlined' : 'contained'}
					color={'error'}
					onClick={() => changeFilterTasksHandler('all')}
				>
					All
				</Button>
				<Button
					variant={filter === 'active' ? 'outlined' : 'contained'}
					color={'primary'}
					onClick={() => changeFilterTasksHandler('active')}
				>
					Active
				</Button>
				<Button
					variant={filter === 'completed' ? 'outlined' : 'contained'}
					color={'secondary'}
					onClick={() => changeFilterTasksHandler('completed')}
				>
					Completed
				</Button>
			</Box>
		</div>
	)
}
