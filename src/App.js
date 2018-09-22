import React from "react";
import VerificationRequest from "./VerificationRequest";
import VerificationResult from "./VerificationResult";

const App = props => {
  if (!props.requested) {
    return <VerificationRequest { ...props } /> ;
  }

  return <VerificationResult { ...props } />;
};

export default App;