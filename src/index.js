import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import thunk from 'redux-thunk';
import { CookiesProvider } from 'react-cookie';
import myReducer from './reducers/reducers';
import Container from './containers/containers';
import * as serviceWorker from './serviceWorker';

const store = createStore(myReducer, applyMiddleware(thunk));
ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <Container />
    </Provider>
  </CookiesProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
