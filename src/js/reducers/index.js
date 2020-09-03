import {combineReducers} from 'redux';

import user from './userReducer';
import conferenceControls from "./conferenceControlsReducer";

export default combineReducers({
    user,
    conferenceControls,
});
