import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import logo from './logo.svg';
import './App.css';
// import {Provider} from 'react-redux';
// import {Values} from 'redux-form-website-template';
// import store from './store';
// import showResults from './showResults';
// import FieldArraysForm from './FieldArraysForm';
import { connect } from 'react-redux';
import { addTodo, completedTodo, setVisibilityFilter, VisibilityFilters } from './action';

import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import Footer from './components/Footer';

/*
class App extends Component {
    render () {
        return (
            <Provider store={store}>
                <div style={{ padding: 15}}>
                    <h2>Field Arrays</h2>
                    <FieldArraysForm onSubmit={showResults}/>
                    <Values form="fieldArrays"/>
                </div>
            </Provider>
        );
    }
}

export default App;
*/
class App extends Component {
    render () {
        // 通过调用connect()注入
        const { dispatch, visibleTodos, visibilityFilter } = this.props;
        return (
            <div>
                <AddTodo
                    onAddClick={(text) => {
                        // console.log('add todo', text);
                        dispatch(addTodo(text));
                    }} />
                <TodoList
                    todos={this.props.visibleTodos}
                    onTodoClick={(index) =>
                        // console.log('todo clicked:', index)
                        dispatch(completedTodo(index))
                    }/>
                <Footer
                    filter={this.props.visibilityFilter}
                    onFilterChange={(nextFilter) =>
                        // console.log('filter change', filter)
                        dispatch(setVisibilityFilter(nextFilter))
                    } />
            </div>
        );
    }
}
App.propTypes = {
    visibleTodos: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
    }).isRequired).isRequired,
    visibilityFilter: PropTypes.oneOf([
        'SHOW_ALL',
        'SHOW_COMPLETED',
        'SHOW_ACTIVE',
    ]).isRequired,
};

function selectTodos (todos, filter) {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos;
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter((todo) => todo.completed);
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter((todo) => !todo.completed);
        default:
            return todos;
    }
}

// 基于全局 state ，哪些是我们想注入的 props ?
// 注意：使用 https://github.com/reactjs/reselect 效果更佳。
function select (state) {
    return {
        visibleTodos: selectTodos(state.todos, state.visibilityFilter),
        visibilityFilter: state.visibilityFilter,
    };
}

export default connect(select)(App);
