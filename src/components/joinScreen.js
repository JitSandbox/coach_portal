import React, { useEffect, useState } from "react";

function JoinScreen({ getMeetingAndToken, setMode , isHost}) {
  const [meetingId, setMeetingId] = useState(null);
  const [meetingIDFromLocal, setMeetingIdFromLocal ] = useState();
  //Set the mode of joining participant and set the meeting id or generate new one
  const onClick = async (mode) => {
    setMode(mode);
    await getMeetingAndToken(meetingId);
  };
  useEffect(()=>{
    const meetingID = localStorage.getItem('meetingId');
    setMeetingIdFromLocal(meetingID);
  },[])
  return (
    <div className="container">
    {  isHost && <button onClick={() => onClick("CONFERENCE")}>Create Meeting</button> }
      <br />
      <br />
      <br />
      <br />
    { !isHost &&   
      <div>
      <span>use this meeting Id below to join: </span>
      <span style={{color:"blue",}}>{meetingIDFromLocal}</span>
      <br />
      <div style={{margin:30,}}>

      <input
        type="text"
        placeholder="Enter Meeting Id"
        onChange={(e) => {
          setMeetingId(e.target.value);
        }}
      />
      </div>
      <br />
      <br />
      <button style={{margin: 30,marginTop:0}} onClick={() => onClick("CONFERENCE")}>Join as participant</button>
      </div>
    }
    </div>
  );
}

export default JoinScreen;