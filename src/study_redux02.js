/* jshint undef:true, unused:true , esversion:6
*/
function visibilityFilter (state = 'SHOW_ALL', action) {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
}

function todos (state = [], action) {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    text: action.text,
                    completed: false,
                },
            ];
        case 'COMPLETE_TODO':
            return state.map((todo, index) => {
                if (action.index === index) {
                    return Object.assign({}, todo, {
                        completed: true,
                    });
                }
                return todo;
            });
        default:
            return state;
    }
}

import { combineReducers, createStore } from 'redux';

let reducer = combineReducers({ visibilityFilter, todos});
let store = createStore(reducer);
