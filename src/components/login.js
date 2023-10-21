import React from "react";

export default function Login({
  userName,
  setUserName,
  role,
  setRole,
  handleSubmit,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        justifyContent: "center",
        padding: 20,
        border: "2px solid red",
      }}
    >
      <input
        style={{ width: 400, height: 40 }}
        type="text"
        placeholder="enter user name"
        onChange={(e) => setUserName(e.target.value)}
        value={userName}
      ></input>
      <input
        style={{ width: 400, height: 40 }}
        type="text"
        placeholder="enter user role"
        onChange={(e) => setRole(e.target.value)}
        value={role}
      ></input>

      <button onClick={()=> handleSubmit()}> Submit</button>
    </div>
  );
}
