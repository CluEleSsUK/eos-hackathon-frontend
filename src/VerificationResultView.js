import React from "react";
import "./verification-result-view.css";

const VerificationResultView = props => {
  if (!props.result) {
    return <div>Waiting for the EOS user to accept your request...</div>
  }

  return (
    <div className={"verification"}>
      <div>
        <div>Passed verification</div>
        <div><Verified predicate={props.result["status"]}/></div>
        <div>ID verified</div>
        <div><Verified predicate={props.result["id_verified"]}/></div>
        <div>Credit check passed</div>
        <div><Verified predicate={props.result["credit_verified"]}/></div>
      </div>
      <button value={"Start again"} onClick={props.onRestart}>Restart</button>
    </div>
  )
};

const Verified = ({predicate}) => predicate
  ? <span className={"verified"}>&#10003; Verified</span>
  : <span className={"unverified"}>&times;&nbsp; Action required</span>;

export default VerificationResultView;