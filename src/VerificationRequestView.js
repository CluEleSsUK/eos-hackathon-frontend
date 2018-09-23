import React from "react";

const VerificationRequestView = props => {
  return (
    <div>
      <h2>OnTheBLOCK <img height={"20px"}
                          src={"data:image/jpeg;base64,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"} /></h2>
      <p>Enter an EOS username to verify their credit eligibility</p>
      <input type={"text"}
             value={props.username}
             placeholder={"e.g. dlarimer420"}
             onChange={event => props.onUsernameChanged(event.target.value)}/>
      <button onClick={props.startVerification}
              disabled={usernameEmpty(props)}>Verify</button>
    </div>
  );
};

function usernameEmpty(props) {
  return props.username == null || props.username.length === 0;
}

export default VerificationRequestView;
