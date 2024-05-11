import React, { useState } from 'react';
import './App.css';
import { Todolist } from './components/Todolist';
import { v1 } from 'uuid';


export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

export type filterValuesType = "all" | "active" | "completed"

function App() {

    // C (create)
    // R (view mode, filter, sort, search, pagination)
    // U
    // D

    // DATA

    const [tasks, setTasks] = useState([
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'ReactJS', isDone: false },
    ]
    )








    // Change Logic

    // const removeTask = (taskId: number) => {
    //     const nextState = tasks.filter(t => t.id !== taskId)
    //     setTasks(nextState)
    // }

    const removeTask = (taskId: string) => {
        const nextState: any = [];
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id !== taskId) {
                nextState.push(tasks[i])
            }
        }
        setTasks(nextState)
    }

    const addTask = (title: string) => {
        const newTask: TaskPropsType = {
            id: v1(),
            title: title,
            isDone: false
        }

        const nextTasksState = [newTask, ...tasks]
        setTasks(nextTasksState)
    }




    // UI
    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={tasks}
                removeTask={removeTask}
                addTask={addTask}
            />

        </div>
    );
}

export default App;




