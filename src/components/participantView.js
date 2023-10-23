import { useMeeting, useParticipant } from "@videosdk.live/react-sdk";
import React, { useEffect, useMemo, useRef } from "react";
import ReactPlayer from "react-player";

function ParticipantView(props) {
  const { isHost, participantId, hostDetails, participantDetails } = props;
  const micRef = useRef(null);
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName, disableMic, enableMic, enableWebcam, disableWebcam } = useParticipant(participantId);

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  //Playing the audio in the <audio>
  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current.play().catch((error) => console.error("videoElem.current.play() failed", error));
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div>
      <p>
        Participant: {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic: {micOn ? "ON" : "OFF"}
      </p>
      <audio
        ref={micRef}
        autoPlay
        playsInline
        muted={isLocal}
      />
      {isHost && hostDetails.id !== participantId && (
        <div>
          <button
            onClick={() => disableWebcam()}
            disabled={!webcamOn}
          >
            disable webCam
          </button>
          &emsp;|&emsp;
          <button
            onClick={() => enableWebcam()}
            disabled={webcamOn}
          >
            enable webcam
          </button>
          &emsp;|&emsp;
          <button
            onClick={() => disableMic()}
            disabled={!micOn}
          >
            disable Mic
          </button>
          &emsp;|&emsp;
          <button
            onClick={() => enableMic()}
            disabled={micOn}
          >
            enable Mic
          </button>
        </div>
      )}
      {webcamOn && (
        <ReactPlayer
          playsinline
          pip={false}
          light={false}
          controls={false}
          muted={true}
          playing={true}
          url={videoStream}
          height={"300px"}
          width={"300px"}
          onError={(err) => {
            console.log(err, "participant video error");
          }}
        />
      )}
    </div>
  );
}

export default ParticipantView;
