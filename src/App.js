import "./App.css";
import React, { useEffect, useState } from "react";
import { MeetingProvider, MeetingConsumer } from "@videosdk.live/react-sdk";

import { authToken, createMeeting } from "./Api";
import Container from "./components/container";
import JoinScreen from "./components/joinScreen";
import Login from "./components/login";

function App() {
  const [meetingId, setMeetingId] = useState(null);
  const [isHost, setISHost] = useState();
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [mode, setMode] = useState("CONFERENCE");

  // host and participant details
  const [hostDetails, setHostDetails] = useState([]);
  const [participantDetails, setParticipantDetails] = useState([]);

  //Getting MeetingId from the API we created earlier
  const getMeetingAndToken = async (id) => {
    const meetingId = id == null ? await createMeeting({ token: authToken }) : id;
    localStorage.setItem("meetingId", meetingId);
    setMeetingId(meetingId);
  };

  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  function handleSubmit() {
    role === "coach" ? setISHost(true) : setISHost(false);
  }

  return authToken && meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: userName,
        mode: mode,
        role: role,
      }}
      token={authToken}
    >
      <MeetingConsumer>
        {() => (
          <Container
            meetingId={meetingId}
            isHost={isHost}
            onMeetingLeave={onMeetingLeave}
            hostDetails={hostDetails}
            setHostDetails={setHostDetails}
            participantDetails={participantDetails}
            setParticipantDetails={setParticipantDetails}
          />
        )}
      </MeetingConsumer>
    </MeetingProvider>
  ) : isHost !== undefined ? (
    <div style={{ margin: 50 }}>
      <JoinScreen
        getMeetingAndToken={getMeetingAndToken}
        setMode={setMode}
        isHost={isHost}
      />
    </div>
  ) : (
    <Login
      userName={userName}
      setUserName={setUserName}
      role={role}
      setRole={setRole}
      handleSubmit={() => handleSubmit()}
    />
  );
}

export default App;
