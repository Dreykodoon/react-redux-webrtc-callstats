const INITIAL_STATE = {
    controls: {
        startCallDisabled: false,
        hangUpCallDisabled: true,
    },
    localStream: null,
    remoteStream: null,
    localPeerConnection: null,
    remotePeerConnection: null,
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
        case 'SAVE_PEER_CONNECTIONS': {
            return {
                ...state,
                localPeerConnection: action.payload.localPeerConnection,
                remotePeerConnection: action.payload.remotePeerConnection,
            };
        }
        default:
            return state;
    }
}
