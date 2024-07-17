import { ActionType, AddTodolistActionCreator, ChangeTodolistFilterActionCreator, ChangeTodolistTitleActionCreator, RemoveTodolistActionCreator, todolistsReducer } from './todolist-reducer'; // Убедитесь, что путь к вашему редьюсеру верен
import { v1 } from 'uuid';
import { TodolistType } from '../App'; // Убедитесь, что путь к вашему типу верен

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    // 1. Стартовый state
    const startState: TodolistType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ];

    // 2. Действие

    const endState = todolistsReducer(startState, RemoveTodolistActionCreator(todolistId1));

    // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
    // в массиве останется один тудулист
    expect(endState.length).toBe(1);
    // удалится нужный тудулист, а не любой
    expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]


    const endState = todolistsReducer(startState, AddTodolistActionCreator(v1(), 'New Todolist'))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('New Todolist')
})


test('correct todolist should change its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]


    const endState = todolistsReducer(startState, ChangeTodolistTitleActionCreator(todolistId2, 'New Todolist'))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('New Todolist')
})


test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]


    const endState = todolistsReducer(startState, ChangeTodolistFilterActionCreator(todolistId2, 'completed'))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('completed')
})