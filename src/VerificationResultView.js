import React from "react";

const VerificationResultView = props => {
  if (!props.result) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <p>Passed verification: {"" + props.result}</p>
      <button value={"Start again"} onClick={props.onRestart}>Restart</button>
    </div>
  )
};

export default VerificationResultView;