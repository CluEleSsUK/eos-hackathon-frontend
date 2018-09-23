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
        <div><ColorCoded predicate={props.result["status"] === "SUCCESS"}>{props.result["status"]}</ColorCoded></div>
        <div>ID verified</div>
        <div><Verified predicate={props.result["id_verified"]}/></div>
        <div>Credit check passed</div>
        <div><Verified predicate={props.result["credit_verified"]}/></div>
      </div>
      <button value={"Start again"} onClick={props.onRestart}>Restart</button>
    </div>
  )
};

const Verified = ({predicate}) =>
  <ColorCoded predicate={predicate}>
    { predicate
      ? <div>&#10003; Verified</div>
      : <div>&times;&nbsp; Action required</div> }
  </ColorCoded>;

const ColorCoded = ({ predicate, children }) => <span className={predicate ? "verified" : "unverified"}>{children}</span>;

export default VerificationResultView;