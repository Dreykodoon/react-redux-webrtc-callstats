const INITIAL_STATE = {
    controls: {
        startCallDisabled: false,
        hangUpCallDisabled: true,
    },
    remoteStream: null,
    localStream: null,
};

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'START_CALL': {
            return {
                ...state,
                controls: {
                    ...state.controls,
                    startCallDisabled: true,
                    hangUpCallDisabled: false,
                },
            };

        }
        case 'HANG_UP': {
            return INITIAL_STATE;
        }
        case 'SAVE_REMOTE_STREAM': {
            return {
                ...state,
                remoteStream: action.payload,
            };
        }
        case 'SAVE_LOCAL_STREAM': {
            return {
                ...state,
                localStream: action.payload,
            };
        }
        default:
            return state;
    }
}
