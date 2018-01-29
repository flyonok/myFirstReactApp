import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Provider} from 'react-redux';
import {Values} from 'redux-form-website-template';
import store from './store';
import showResults from './showResults';
import FieldArraysForm from './FieldArraysForm';

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
