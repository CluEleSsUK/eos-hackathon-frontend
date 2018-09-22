import React from "react";
import {valueFor} from "./utils";

const VerificationRequest = props => {
  return (
    <div>
      <p>Enter a username to verify:</p>
      <input type={"text"} value={props.username} onChange={event => props.onUsernameChanged(valueFor(event))}/>
      <button onClick={props.startVerification} disabled={usernameEmpty(props)}>Verify</button>
    </div>
  );
};

function usernameEmpty(props) {
  return props.username == null || props.username.length === 0;
}

export default VerificationRequest;
