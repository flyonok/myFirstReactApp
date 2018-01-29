/* jshint undef:true, unused:true , esversion:6
*/

import {VisibilityFilters, SET_VISIBILITY_FILTER, ADD_TODO, TOGGLE_TODO} from './action';
import {combineReducers} from 'redux';
const {SHOW_ALL} = VisibilityFilters;
// console.log(SHOW_ALL);

/* const initialState = {
    visibilityFilter: VisibilityFilters.SHOW_ALL,
    // todos: [{text: '', completed: false}],
    todos: [],
};
*/

// const initTodoState = {todos: []}; function todos (state = {todos: [{text:
// 'empty', completed: false}]}, action) {
function todos (state = [], action) {
    // console.log(state.todos);
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state, {
                    text: action.text,
                    completed: false,
                },
            ];
        case TOGGLE_TODO:
            return state.map((todo, index) => {
                if (index === action.index) {
                    return Object.assign({}, todo, {
                        completed: !todo.completed,
                    });
                }
                return todo;
            });
        default:

            /*
            if (!state) {
                return initialState.todos;
            } else {
                return state;
            }
            */
            return state;
    }
}

function visibilityFilter (state = SHOW_ALL, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
}

/*
function todoApp (state = {}, action) {
    return {
        visibilityFilter: visibilityFilter(state.visibilityFilter, action),
        todos: todos(state.todos, action),
    };
}
*/

const todoApp = combineReducers({visibilityFilter, todos});
export default todoApp;
