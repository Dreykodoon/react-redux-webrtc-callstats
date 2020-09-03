import {combineReducers} from 'redux';

import user from './userReducer';
import conference from "./conferenceReducer";

export default combineReducers({
    user,
    conference,
});
