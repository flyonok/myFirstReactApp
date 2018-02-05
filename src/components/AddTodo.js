import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class AddTodo extends Component {
    render () {
        return (
            <div>
                <input type='text' ref={(input) => {
                    this.textInput = input;
                }} />
                <button onClick={(e) => this.handleClick(e)}>
                    Add
                </button>
            </div>
        );
    }

    handleClick (e) {
        // const node = findDomNode(this.refs.input);
        const text = this.textInput.value.trim();
        this.props.onAddClick(text);
        this.textInput.value = '';
    }
}

AddTodo.propTypes = {
    onAddClick: PropTypes.func.isRequired,
};

