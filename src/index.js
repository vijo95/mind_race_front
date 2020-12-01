import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {createStore, compose, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'

import authReducer from './store/reducers/auth'

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(rootReducer,composeEnhances(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
