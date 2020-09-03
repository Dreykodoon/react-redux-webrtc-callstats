import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './js/App';

import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from './js/reducers';

// eslint-disable-next-line
import adapter from 'webrtc-adapter';


const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
