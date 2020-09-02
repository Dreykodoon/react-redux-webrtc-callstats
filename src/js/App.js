import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { addUser } from "./actions/userActions";


function App() {
    const dispatch = useDispatch();

    const users = useSelector(state => state.user.users);

    const onClickAddUser = () => {
      dispatch(addUser('another user'));
    };

    return (
        <div>
          <p>Hello, World!</p>
          {users}
          <button onClick={onClickAddUser}>Add user</button>
        </div>
    );
}

export default App;
