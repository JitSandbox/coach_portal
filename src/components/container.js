import { Constants, useMeeting } from "@videosdk.live/react-sdk";
import React, { useEffect, useRef, useState } from "react";
import SpeakerView from "./speakerView";
import ViewerView from "./viewerView";

function Container(props) {
  const { hostDetails, isHost, meetingId, setHostDetails, participantDetails, setParticipantDetails } = props;
  const [joined, setJoined] = useState("");
  //Get the method which will be used to join the meeting.
  const { join } = useMeeting();
  const mMeeting = useMeeting({
    //callback for when meeting is joined successfully
    onMeetingJoined: () => {
      //we will pin the local participant if he joins in CONFERENCE mode
      if (mMeetingRef.current.localParticipant.mode == "CONFERENCE") {
        mMeetingRef.current.localParticipant.pin();
      }
      setJoined("JOINED");
    },
    //callback for when meeting is left
    onMeetingLeft: () => {
      props.onMeetingLeave();
    },
    //callback for when there is error in meeting
    onError: (error) => {
      alert(error.message);
    },
  });
  const joinMeeting = () => {
    setJoined("JOINING");
    join();
  };

  //We will create a ref to meeting object so that when used inside the
  //Callback functions, meeting state is maintained
  const mMeetingRef = useRef(mMeeting);
  useEffect(() => {
    mMeetingRef.current = mMeeting;
  }, [mMeeting]);

  return (
    <div className="container">
      <h3>Meeting Id: {meetingId}</h3>
      {joined && joined === "JOINED" ? (
        <SpeakerView
          isHost={isHost}
          hostDetails={hostDetails}
          setHostDetails={setHostDetails}
          participantDetails={participantDetails}
          setParticipantDetails={setParticipantDetails}
        />
      ) : joined && joined === "JOINING" ? (
        <p>Joining the meeting...</p>
      ) : (
        <button onClick={joinMeeting}>Join</button>
      )}
    </div>
  );
}

export default Container;
