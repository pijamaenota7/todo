import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../App";


export type AddTodolistActionType = {
    type: "ADD_TODOLIST"
    payload: {
        title: string
        todolistId: string
    }
}

export type RemoveTodolistActionType = {
    type: "REMOVE_TODOLIST"
    payload: {
        id: string
    }
}

export type ChangeTodolistFilterActionType = {
    type: "CHANGE_TODOLIST_FILTER"
    payload: {
        filter: FilterValuesType
        id: string
    }
}
export type ChangeTodolistTitleType = {
    type: "CHANGE_TODOLIST_TITLE"
    payload: {
        title: string
        id: string
    }
}


export type ActionType = AddTodolistActionType | RemoveTodolistActionType | ChangeTodolistFilterActionType | ChangeTodolistTitleType

export const todolistsReducer = (todolists: Array<TodolistType>, action: ActionType): Array<TodolistType> => {



    switch (action.type) {
        case "ADD_TODOLIST":
            const newTodolist: TodolistType = { id: action.payload.todolistId, title: action.payload.title, filter: 'all' }
            return [newTodolist, ...todolists]

        case "REMOVE_TODOLIST":
            return todolists.filter(tl => tl.id !== action.payload.id)

        case "CHANGE_TODOLIST_FILTER":
            return todolists.map(tl => {
                return tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl
            })
        case "CHANGE_TODOLIST_TITLE":
            return todolists.map(tl => tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl)

        default:
            return todolists
    }
}


export const AddTodolistActionCreator = (title: string): AddTodolistActionType => ({
    type: "ADD_TODOLIST",
    payload: {
        title,
        todolistId: v1()
    }
})
export const RemoveTodolistActionCreator = (id: string): RemoveTodolistActionType => ({
    type: "REMOVE_TODOLIST",
    payload: {
        id
    }
})
export const ChangeTodolistFilterActionCreator = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => ({
    type: "CHANGE_TODOLIST_FILTER",
    payload: {
        id,
        filter
    }
})
export const ChangeTodolistTitleActionCreator = (id: string, title: string): ChangeTodolistTitleType => ({
    type: "CHANGE_TODOLIST_TITLE",
    payload: {
        id,
        title
    }
})