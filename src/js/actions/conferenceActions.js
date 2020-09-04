async function handleConnection(localPeerConnection, remotePeerConnection, event) {
    const peerConnection = event.target;
    const iceCandidate = event.candidate;

    if (iceCandidate) {
        const newIceCandidate = new RTCIceCandidate(iceCandidate);
        const otherPeer = (peerConnection === localPeerConnection) ?
            remotePeerConnection : localPeerConnection;

        try {
            await otherPeer.addIceCandidate(newIceCandidate);
            console.log('addIceCandidate success');
        } catch(error) {
            console.log('failed to add ICE Candidate:\n', error.toString());
        }
    }
}

async function setLocalDescription(localPeerConnection, remotePeerConnection, localDescription) {
    try {
        await localPeerConnection.setLocalDescription(localDescription);
    } catch(error) {
        console.log(`Failed to create session description: ${error.toString()}.`);
    }

    try {
        await remotePeerConnection.setRemoteDescription(localDescription);
    } catch (error) {
        console.log(`Failed to create session description: ${error.toString()}.`);
    }

    try {
        const remoteDescription = await remotePeerConnection.createAnswer();
        await setRemoteDescription(localPeerConnection, remotePeerConnection, remoteDescription);
    } catch(error) {
        console.log('Error creating answer: ', error.toString());
    }
}

async function setRemoteDescription(localPeerConnection, remotePeerConnection, description) {
    try {
        await remotePeerConnection.setLocalDescription(description);
    } catch (error) {
        console.log(`Failed to create session description: ${error.toString()}.`);
    }

    try {
        await localPeerConnection.setRemoteDescription(description);
    } catch (error) {
        console.log(`Failed to create session description: ${error.toString()}.`);
    }
}

export function beginCallSetup() {
    return async (dispatch, getState) => {
        dispatch(startCall());

        // Create peer connections and add behavior.
        const localPeerConnection = new RTCPeerConnection(null);
        const remotePeerConnection = new RTCPeerConnection(null);

        dispatch(savePeerConnections({
            localPeerConnection,
            remotePeerConnection,
        }));

        localPeerConnection.addEventListener('icecandidate', handleConnection.bind(null, localPeerConnection, remotePeerConnection));
        localPeerConnection.addEventListener(
            'iceconnectionstatechange', event => {console.log('ICE state change event: ', event)});

        remotePeerConnection.addEventListener('icecandidate', handleConnection.bind(null, localPeerConnection, remotePeerConnection));
        remotePeerConnection.addEventListener(
            'iceconnectionstatechange', event => {console.log('ICE state change event: ', event)});
        remotePeerConnection.addEventListener('addstream', (event) => {
            dispatch(saveRemoteStream(event.stream));
        });

        // Add local stream to connection and create offer to connect.
        const localStream = getState().conference.localStream;
        localPeerConnection.addStream(localStream);

        try {
            const localDescription = await localPeerConnection.createOffer({ offerToReceiveVideo: 1 });
            await setLocalDescription(localPeerConnection, remotePeerConnection, localDescription);
        } catch (error) {
            console.log('Error creating offer: ', error.toString());
        }
    };
}

function savePeerConnections(peerConnections) {
    return {
        type: 'SAVE_PEER_CONNECTIONS',
        payload: peerConnections,
    };
}

export function startCall() {
    return {
        type: 'START_CALL',
    }
}

function hangUp() {
    return {
        type: 'HANG_UP',
    }
}

export function endConnection() {
    return (dispatch, getState) => {
        const { localPeerConnection, remotePeerConnection } = getState().conference;
        localPeerConnection.close();
        remotePeerConnection.close();

        dispatch(hangUp());
    };
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
