/* jshint undef:true, unused:true , esversion:6
*/

/*
* Action type
*/

export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

/*
* Other const variables
*/

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE',
};

/*
* Action creator functions
*/

export function addTodo (text) {
    return { type: ADD_TODO, text};
}

export function toggleTodo (index) {
    return { type: TOGGLE_TODO, index };
}

export function setVisibilityFilter (filter) {
    return { type: SET_VISIBILITY_FILTER, filter};
}

