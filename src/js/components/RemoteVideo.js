import React, { useEffect, useRef } from 'react';
import '../../css/Video.css';


const MEDIA_STREAM_CONSTRAINTS = {
    video: true,
};

function RemoteVideo() {
    const videoRef = useRef(null);

    const gotLocalMediaStream = (mediaStream) => {
        videoRef.current.srcObject = mediaStream;
    };

    const handleLocalMediaStreamError = (error) => {
        console.log('navigator.getUserMedia error: ', error);
    };

    useEffect(() => {
        navigator.mediaDevices.getUserMedia(MEDIA_STREAM_CONSTRAINTS)
            .then(gotLocalMediaStream).catch(handleLocalMediaStreamError);
    });

    return (
        <div>
            <video ref={videoRef} autoPlay playsInline />
        </div>
    );
}

export default RemoteVideo;
