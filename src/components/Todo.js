import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Todo extends Component {
    render () {
        return (
            <li
                onclick = {this.props.onclick}
                style = {{
                    textDecoration: this.props.completed ? 'line-through' : 'none',
                    cursor: this.props.completed ? 'default' : 'pointer'
                }}
            >
                {this.props.text}
            </li>

        );
    }
}

Todo.propTypes = {
    onclick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
};