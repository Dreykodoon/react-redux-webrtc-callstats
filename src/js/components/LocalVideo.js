import React, { useEffect, useRef } from 'react';
import { useDispatch } from "react-redux";
import { saveLocalStream } from "../actions/conferenceActions";
import '../../css/Video.css';


const MEDIA_STREAM_CONSTRAINTS = {
    video: true,
};

function LocalVideo() {
    const dispatch = useDispatch();

    const videoRef = useRef(null);

    const gotMediaStream = (mediaStream) => {
        videoRef.current.srcObject = mediaStream;
        dispatch(saveLocalStream(mediaStream));
    };

    const handleMediaStreamError = (error) => {
        console.log('navigator.getUserMedia error: ', error);
    };

    useEffect(() => {
        navigator.mediaDevices.getUserMedia(MEDIA_STREAM_CONSTRAINTS)
            .then(gotMediaStream).catch(handleMediaStreamError);
    });

    return (
        <div>
            <video ref={videoRef} autoPlay playsInline />
        </div>
    );
}

export default LocalVideo;
