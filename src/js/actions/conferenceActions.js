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

}

export function beginCallSetup() {
    return (dispatch, getState) => {
        console.log(getState());

        dispatch(startCall());

        // Create peer connections and add behavior.
        /*const localPeerConnection = new RTCPeerConnection(null);
        const remotePeerConnection = new RTCPeerConnection(null);

        // local peer conn. config.
        localPeerConnection.addEventListener('icecandidate', handleConnection.bind(null, localPeerConnection, remotePeerConnection));
        localPeerConnection.addEventListener(
            'iceconnectionstatechange', handleConnectionChange);

        remotePeerConnection.addEventListener('icecandidate', handleConnection);
        remotePeerConnection.addEventListener(
            'iceconnectionstatechange', handleConnectionChange);
        remotePeerConnection.addEventListener('addstream', gotRemoteMediaStream);*/
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
