import React from "react";
import VerificationRequestView from "./VerificationRequestView";
import VerificationResultView from "./VerificationResultView";

const App = props => {
  if (!props.requested) {
    return <VerificationRequestView { ...props } /> ;
  }

  return <VerificationResultView { ...props } />;
};

export default App;