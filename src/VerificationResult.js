import React from "react";

const VerificationResult = props => {
  if (!props.result) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <p>Passed verification: {"" + props.result}</p>
      <button value={"Start again"} onClick={props.onRestart}/>
    </div>
  )
};

export default VerificationResult;