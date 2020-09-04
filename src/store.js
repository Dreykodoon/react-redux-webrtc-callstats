import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from './js/reducers';


export default createStore(reducer, applyMiddleware(thunk));
