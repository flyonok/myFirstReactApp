/* jshint undef:true, unused:true , esversion:6
*/
import {createStore} from 'redux';
import {addTodo, ADD_TODO} from './action';
function counter(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DESCREMENT':
            return state - 1;
        case ADD_TODO:
            console.log(action.text);
            return state + 2;
        default:
            return state;
    }
}

let store = createStore(counter);

store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch({type: 'INCREMENT'});

store.dispatch({type: 'INCREMENT'});

store.dispatch({type: 'DESCREMENT'});

store.dispatch(addTodo('123'));
