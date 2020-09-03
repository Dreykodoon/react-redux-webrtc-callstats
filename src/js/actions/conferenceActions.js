function handleConnection(localPeerConnection, remotePeerConnection, event) {
    const peerConnection = event.target;
    const iceCandidate = event.candidate;

    if (iceCandidate) {
        const newIceCandidate = new RTCIceCandidate(iceCandidate);
        const otherPeer = (peerConnection === localPeerConnection) ?
            remotePeerConnection : localPeerConnection;

        otherPeer.addIceCandidate(newIceCandidate)
            .then(() => {
                console.log('addIceCandidate success');
            }).catch((error) => {
                console.log('failed to add ICE Candidate:\n', error.toString());
            });
    }
}

function handleConnectionChange(event) {
    console.log('ICE state change event: ', event);
}

function createdOffer(localPeerConnection, remotePeerConnection, description) {
    localPeerConnection.setLocalDescription(description)
        .then(() => {}).catch((error) => {
        console.log(`Failed to create session description: ${error.toString()}.`);
    });

    remotePeerConnection.setRemoteDescription(description)
        .then(() => {}).catch((error) => {
        console.log(`Failed to create session description: ${error.toString()}.`);
    });

    remotePeerConnection.createAnswer()
        .then(createdAnswer.bind(null, localPeerConnection, remotePeerConnection)).catch((error) => {
        console.log('Error creating answer: ', error.toString());
    });
}

function createdAnswer(localPeerConnection, remotePeerConnection, description) {
    remotePeerConnection.setLocalDescription(description)
        .then(() => {}).catch((error) => {
        console.log(`Failed to create session description: ${error.toString()}.`);
    });

    localPeerConnection.setRemoteDescription(description)
        .then(() => {}).catch((error) => {
        console.log(`Failed to create session description: ${error.toString()}.`);
    });
}

export function beginCallSetup() {
    return (dispatch, getState) => {
        dispatch(startCall());

        // Create peer connections and add behavior.
        const localPeerConnection = new RTCPeerConnection(null);
        const remotePeerConnection = new RTCPeerConnection(null);

        // local peer conn. config.
        localPeerConnection.addEventListener('icecandidate', handleConnection.bind(null, localPeerConnection, remotePeerConnection));
        localPeerConnection.addEventListener(
            'iceconnectionstatechange', handleConnectionChange);

        remotePeerConnection.addEventListener('icecandidate', handleConnection.bind(null, localPeerConnection, remotePeerConnection));
        remotePeerConnection.addEventListener(
            'iceconnectionstatechange', handleConnectionChange);
        remotePeerConnection.addEventListener('addstream', (event) => {
            dispatch(saveRemoteStream(event.stream));
        });

        // Add local stream to connection and create offer to connect.
        const localStream = getState().conference.localStream;
        localPeerConnection.addStream(localStream);

        localPeerConnection.createOffer({ offerToReceiveVideo: 1 })
            .then(createdOffer.bind(null, localPeerConnection, remotePeerConnection)).catch((error) => {
            console.log('Error creating offer: ', error.toString());
        });
    };
}

export function startCall() {
    return {
        type: 'START_CALL',
    }
}

export function hangUp() {
    return {
        type: 'HANG_UP',
    }
}

export function saveRemoteStream(stream) {
    return {
        type: 'SAVE_REMOTE_STREAM',
        payload: stream,
    };
}

export function saveLocalStream(stream) {
    return {
        type: 'SAVE_LOCAL_STREAM',
        payload: stream,
    };
}
