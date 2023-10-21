import { Constants, useMeeting } from "@videosdk.live/react-sdk";
import React, { useEffect, useMemo } from "react";
import Controls from "./controls";
import ParticipantView from "./participantView";

function SpeakerView({ isHost, hostDetails, setHostDetails, participantDetails, setParticipantDetails }) {
  const onMicRequested = (data) => {
    const { accept } = data;
    accept();
  };
  //Get the participants and hlsState from useMeeting
  const { participants, hlsState } = useMeeting({
    onMicRequested,
  });

  //Filtering the host/speakers from all the participants
  const speakers = useMemo(() => {
    const speakerParticipants = [...participants.values()].filter((participant) => {
      console.log("participant", participant);
      return participant.mode == Constants.modes.CONFERENCE;
    });
    return speakerParticipants;
  }, [participants]);

  useEffect(() => {
    hostDetails.length == 0 && setHostDetails(speakers[0]);
    setParticipantDetails(() => speakers.slice(1));
    console.log("speakersList", speakers);
  }, [speakers]);

  useEffect(() => {
    console.log("host and participant details", hostDetails, participantDetails);
  }, [hostDetails, participantDetails]);

  return (
    <div>
      <p>Current HLS State: {hlsState}</p>
      {/* Controls for the meeting */}
      <Controls />

      {/* Rendring all the HOST participants */}
      {speakers.map((participant) => (
        <ParticipantView
          isHost={isHost}
          participantId={participant.id}
          hostDetails={hostDetails}
          key={participant.id}
        />
      ))}
    </div>
  );
}

export default SpeakerView;
