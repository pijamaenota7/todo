import './App.css';
import { Todolist } from "./Todolist";
import { Reducer, useReducer, useState } from "react";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper'
import { MenuButton } from './MenuButton';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import Switch from '@mui/material/Switch/Switch';
import { CssBaseline } from '@mui/material';
import { AddTodolistActionCreator, ChangeTodolistFilterActionCreator, ChangeTodolistTitleActionCreator, RemoveTodolistActionCreator, todolistsReducer } from './state/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './state/tasks-reducer';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import { useDispatch } from 'react-redux';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

type ThemeMode = 'dark' | 'light'

function AppWithRedux() {
    //Business logic level:


    // Global states:
    let todolistID1 = v1()
    let todolistID2 = v1()

    let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)

    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)


    const dispatch = useDispatch()
    //CRUD tasks
    const removeTask = (taskId: string, todolistId: string) => {

        dispatch(removeTaskAC(taskId, todolistId))
    }

    const addTask = (title: string, todolistId: string) => {

        dispatch(addTaskAC(title, todolistId))
    }


    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(taskId, taskStatus, todolistId))
    }


    const updateTask = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(taskId, title, todolistId))
    }
    //CRUD todolists
    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        dispatch(ChangeTodolistFilterActionCreator(todolistId, filter))
    }

    const removeTodolist = (todolistId: string) => {

        dispatch(RemoveTodolistActionCreator(todolistId))

    }

    const addTodolist = (title: string) => {

        dispatch(AddTodolistActionCreator(title))

    }

    const updateTodolist = (todolistId: string, title: string) => {
        dispatch(ChangeTodolistTitleActionCreator(todolistId, title))
    }


    // THEMES
    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#8cc4ff',
            }
        },
    });

    const changeModeHandler = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    return (
        <div className="App" >
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box sx={{ flexGrow: 1, marginBottom: 10 }}>
                    <AppBar position="fixed">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                News
                            </Typography>
                            <MenuButton >Login</MenuButton>
                            <MenuButton>Logout</MenuButton>
                            <MenuButton>Faq</MenuButton>
                            <Switch color={'default'} onChange={changeModeHandler} />
                        </Toolbar>
                    </AppBar>
                </Box>

                <Container fixed>
                    <Grid container sx={{ mb: '20px' }}>
                        <AddItemForm addItem={addTodolist} />
                    </Grid>


                    <Grid container spacing={4}>
                        {todolists.map((tl) => {

                            const allTodolistTasks = tasks[tl.id]
                            let tasksForTodolist = allTodolistTasks

                            if (tl.filter === 'active') {
                                tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
                            }

                            if (tl.filter === 'completed') {
                                tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
                            }
                            return (
                                <Grid item>
                                    <Paper elevation={3} sx={{ p: ' 20px' }}>
                                        <Todolist
                                            key={tl.id}
                                            todolistId={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeTaskStatus}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                            updateTask={updateTask}
                                            updateTodolist={updateTodolist}
                                        />
                                    </Paper>

                                </Grid>

                            )
                        })}
                    </Grid>
                </Container>
            </ThemeProvider>
        </div >
    );
}

export default AppWithRedux;
