import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import '../../css/Video.css';


function RemoteVideo() {
    const videoRef = useRef(null);

    const remoteMediaStream = useSelector(state => state.conference.remoteStream);

    useEffect(() => {
        if (remoteMediaStream !== null) {
            videoRef.current.srcObject = remoteMediaStream;
        }
    }, [remoteMediaStream]);

    return (
        <div>
            <video ref={videoRef} autoPlay playsInline />
        </div>
    );
}

export default RemoteVideo;
