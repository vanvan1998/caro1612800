import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import thunk from 'redux-thunk';
import myReducer from './reducers/reducers';
import Container from './containers/containers';
import * as serviceWorker from './serviceWorker';

const store = createStore(myReducer, applyMiddleware(thunk));
ReactDOM.render(
  <Provider store={store}>
    <Container />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
