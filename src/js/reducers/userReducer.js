export default function reducer(state = {
    users: ['a user']
}, action) {
    switch (action.type) {
        case 'ADD_USERS': {
            return { ...state, users: state.users.concat(action.payload) };

        }
        default:
            return state;
    }
}
