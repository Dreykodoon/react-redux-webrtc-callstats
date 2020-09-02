import React from 'react';
import { useSelector } from 'react-redux'


function App() {
    const users = useSelector(state => state.user.users);

    return (
    <div>
      <p>Hello, World!</p>
      {users}
    </div>

);
}

export default App;
