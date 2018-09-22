import React from "react";
import ReactDOM from "react-dom";
import { map } from 'rxjs/operators';
import {onUsernameChanged, startVerificationAndUpdateOnResult, onRestart, state} from "./state";
import App from "./App";
import "./index.css";

state.asObservable()
  .pipe(map(nextState => Object.assign({}, { ...nextState, ...bindStateToActions(nextState) })))
  .subscribe({
    next: renderNextView,
    error: err => console.log("error", err),
    complete: () => console.log("wtf, it completed")
  });

function bindStateToActions(state) {
  return {
    onUsernameChanged: onUsernameChanged.bind(this, state),
    startVerification: startVerificationAndUpdateOnResult.bind(this, state),
    onRestart: onRestart.bind(this, state)
  }
}

function renderNextView(props) {
  ReactDOM.render(<App { ...props } />, document.getElementById("root"))
}

