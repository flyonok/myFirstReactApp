import React, { findDomNode, Component} from 'react';
import PropTypes from 'prop-types';

export default class AddTodo extends Component {
    render () {
        return (
            <div>
                <input type='text' ref='input' />
                <button onClick={(e) => this.handleClick(e)}>
                    Add
                </button>
            </div>
        );
    }

    handleClick (e) {
        const node = findDomNode(this.refs.input);
        const text = node.value.trim();
        this.props.onAddClick(text);
        node.value = '';
    }
}

AddTodo.PropTypes = {
    onAddClick: PropTypes.func.isRequired,
};

