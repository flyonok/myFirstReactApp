import {createStore} from 'redux';
import todoApp from './study_redux03';
// import {initialState} from './study_redux03';
// console.log(initialState);

let store = createStore(todoApp);
// console.log(store);
import {addTodo, toggleTodo, setVisibilityFilter, VisibilityFilters} from './action';

console.log(store.getState());

let unsubscrible = store.subscribe(() => {
    console.log(store.getState());
});

// call action
store.dispatch(addTodo('Learn about actions'));
store.dispatch(addTodo('Learn about reducers'));
store.dispatch(addTodo('Learn about store'));
store.dispatch(toggleTodo(0));
store.dispatch(toggleTodo(1));
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED));

unsubscrible();
