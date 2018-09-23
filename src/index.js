import React from "react";
import ReactDOM from "react-dom";
import { map } from 'rxjs/operators';
import {onUsernameChanged, startVerificationAndUpdateOnResult, onRestart, state} from "./state";
import App from "./App";
import "./index.css";

state.asObservable()
  .pipe(map(nextState => mergeWithActions(nextState)))
  .subscribe({
    next: renderNextView,
    error: err => console.log("error", err)
  });

function mergeWithActions(state) {
  return {
    ...state,
    onUsernameChanged: onUsernameChanged.bind(this, state),
    startVerification: startVerificationAndUpdateOnResult.bind(this, state),
    onRestart: onRestart.bind(this, state)
  }
}

function renderNextView(props) {
  ReactDOM.render(<App { ...props } />, document.getElementById("root"))
}

