import './App.css';
import { Todolist } from "./Todolist";
import { useState } from "react";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
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

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

type ThemeMode = 'dark' | 'light'

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'all' },
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
        ],
        [todolistID2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
        ],
    })

    const removeTask = (taskId: string, todolistId: string) => {
        const newTodolistTasks = { ...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId) }
        setTasks(newTodolistTasks)
    }

    const addTask = (title: string, todolistId: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        const newTodolistTasks = { ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] }
        setTasks(newTodolistTasks)
    }


    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        const newTodolistTasks = {
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id == taskId ? { ...t, isDone: taskStatus } : t)
        }
        setTasks(newTodolistTasks)
    }

    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        const newTodolists = todolists.map(tl => {
            return tl.id === todolistId ? { ...tl, filter } : tl
        })
        setTodolists(newTodolists)
    }

    const removeTodolist = (todolistId: string) => {
        const newTodolists = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(newTodolists)

        delete tasks[todolistId]
        setTasks({ ...tasks })
    }

    const addTodolist = (title: string) => {
        const todolistId = v1()
        const newTodolist: TodolistType = { id: todolistId, title: title, filter: 'all' }
        setTodolists([newTodolist, ...todolists])
        setTasks({ ...tasks, [todolistId]: [] })
    }

    const updateTask = (todolistId: string, taskId: string, title: string) => {
        const newTodolistTasks = {
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? { ...t, title } : t)
        }
        setTasks(newTodolistTasks)
    }

    const updateTodolist = (todolistId: string, title: string) => {
        const newTodolists = todolists.map(tl => tl.id === todolistId ? { ...tl, title } : tl)
        setTodolists(newTodolists)
    }

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#8cc4ff',
            },
            // secondary: {
            //     main: '#E0C2FF',
            //     light: '#F5EBFF',
            //     // dark: will be calculated from palette.secondary.main,
            //     contrastText: '#47008F',
            // },
        },
    });

    const changeModeHandler = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    return (
        <div className="App" >
            <ThemeProvider theme={theme}>
                <CssBaseline/>
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

export default App;
