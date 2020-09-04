import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './js/App';
import store from './store';

// WARNING! needs to be initialized AFTER the store
// eslint-disable-next-line
import socket from './socket';
// needs to be initialized, nothing more
// eslint-disable-next-line
import adapter from 'webrtc-adapter';


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
