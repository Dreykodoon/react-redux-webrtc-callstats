import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { addUser } from "./actions/userActions";
import { startCall, hangUp } from "./actions/conferenceControlsActions";
import LocalVideo from "./components/LocalVideo";
import RemoteVideo from "./components/RemoteVideo";


function App() {
    const dispatch = useDispatch();

    const users = useSelector(state => state.user.users);
    const conferenceControls = useSelector(state => state.conferenceControls);
    const { startCallDisabled, hangUpCallDisabled } = conferenceControls;

    const handleAddUser = () => {
        dispatch(addUser('another user'));
    };

    const handleStartCall = () => {
        dispatch(startCall());
    };

    const handleHangUp = () => {
        dispatch(hangUp());
    };

    return (
        <div>
            <p>Hello, World!</p>
            <div>
                {users}
                <button onClick={handleAddUser}>Add user</button>
            </div>
            <div>
                <button disabled={startCallDisabled} onClick={handleStartCall}>Start call</button>
                <button disabled={hangUpCallDisabled} onClick={handleHangUp}>Hang up</button>
            </div>

            <LocalVideo />
            <RemoteVideo />
        </div>
    );
}

export default App;
