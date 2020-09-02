import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/App';

import { Provider } from 'react-redux';

import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducer from './js/reducers';


const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
