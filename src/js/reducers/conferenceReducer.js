const INITIAL_STATE = {
    controls: {
        startCallDisabled: false,
        hangUpCallDisabled: true,
    }
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
        default:
            return state;
    }
}
