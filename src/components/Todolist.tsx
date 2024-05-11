import React, { useRef, useState } from 'react';
import { TaskPropsType, filterValuesType } from '../App';
import { Button } from './Button';


type TodolistPropsType = {

    title: string
    tasks: Array<TaskPropsType>
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
    // changeFilter: (filter: filterValuesType) => void
}

export const Todolist = ({ title, tasks, removeTask, addTask }: TodolistPropsType) => {

    // UI Logic


    const [filter, setFilter] = useState<filterValuesType>("all")
    const [taskTitle, setTaskTitle] = useState("")

    console.log(taskTitle)


    const changeFilter = (filter: filterValuesType) => {
        setFilter(filter)
    }

    const getFilteredTasks = (allTasks: Array<TaskPropsType>, filterValue: filterValuesType): Array<TaskPropsType> => {
        if (filterValue === "active") {
            return allTasks.filter(t => t.isDone !== true)
        } else if (filterValue === "completed") {
            return allTasks.filter(t => t.isDone === true)
        } else {
            return allTasks
        }
    }
    const filteredTasks: Array<TaskPropsType> = getFilteredTasks(tasks, filter)

    //

    const addTaskHandler = () => {

    }
    //

    const tasksList: JSX.Element = filteredTasks.length === 0
        ? <span>Your taskslist is empty</span>
        : <ul>
            {
                filteredTasks.map(task => {
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone} /> <span>{task.title}</span>
                            <Button onClick={() => removeTask(task.id)} title={'x'} />
                        </li>

                    )
                })
            }
        </ul>





    return (
        <div className='todolist'>
            <h3>{title}</h3>
            <div>
                <input value={taskTitle} onChange={(e) => {
                    setTaskTitle(e.currentTarget.value)
                }} />
                <Button
                    title={'+'}
                    onClick={addTaskHandler}
                    disabled={taskTitle.length === 0 || taskTitle.length > 50}
                />
                {taskTitle.length > 10 && <div>Recommended task length 10 charters</div>}
            </div>
            {tasksList}
            <div>
                <Button title={'All'} onClick={() => { changeFilter("all") }} />
                <Button title={'Active'} onClick={() => { changeFilter("active") }} />
                <Button title={'Completed'} onClick={() => { changeFilter("completed") }} />
            </div>
        </div>
    );
};
