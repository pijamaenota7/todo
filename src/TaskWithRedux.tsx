import React, { ChangeEvent, memo } from 'react';
import { TaskType } from './Todolist';
import { Checkbox, IconButton } from '@mui/material';
import { EditableSpan } from './EditableSpan';
import { Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import { TasksStateType } from './App';
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/tasks-reducer';



type TaskWithReduxPropsType = {
    task: TaskType
    todolistId: string

}

export const TaskWithRedux = memo(({ task, todolistId }: TaskWithReduxPropsType) => {

    const dispatch = useDispatch();


    const onClickHandler = () => dispatch(removeTaskAC(task.id, todolistId))
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(task.id, newIsDoneValue, todolistId));
    }
    const onTitleChangeHandler = (newValue: string) => {
        dispatch(changeTaskTitleAC(task.id, newValue, todolistId));
    }

    return <div className={task.isDone ? "is-done" : ""}>
        <Checkbox
            checked={task.isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={task.title} onChange={onTitleChangeHandler} />
        <IconButton onClick={onClickHandler}>
            <Delete />
        </IconButton>
    </div>
});

