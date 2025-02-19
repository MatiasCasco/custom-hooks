import {useEffect, useReducer} from "react";
import {todoReducer} from "./todoReducer";


const initialState = [];

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

export const useTodos = () => {

    const [todos, dispatch] = useReducer(todoReducer, initialState, init);

    useEffect(() =>
    {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);


    const handleNewTodo = (todo) => {
        // console.log({ todo });
        const action = {
            type: '[TODO] Add Todo',
            payload: todo,
        }

        dispatch(action);

    }

    const handleDeleteTodo = (id) => {
        // console.log({id});
        const action = {
            type: '[TODO] Remove Todo',
            payload: id,
        }

        dispatch(action);
    }

    const handleToggleTodo = (id) => {
        const action = {
            type: '[TODO] Done Todo',
            payload: id,
        }

        dispatch(action);
    }

    return {
        todos,
        todosCount: todos.length,
        pedingTodosCount: todos.filter(todo => !todo.done).length,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
    }
}