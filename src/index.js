import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import todoApp from './study_redux03';
import registerServiceWorker from './registerServiceWorker';

let store = createStore(todoApp);
let rootElement = document.getElementById('root');
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
);
registerServiceWorker();
