import {BehaviorSubject} from "rxjs";
import {verificationResult, requestVerificationFor} from "./service";

const initialState = {
  requested: false,
  username: null,
  result: null
};

const stateSubject = new BehaviorSubject(initialState);

function onUsernameChanged(state, username) {
  stateSubject.next(Object.assign({}, {...state, username}));
}

function startVerificationAndUpdateOnResult(state) {
  const nextState = {...state, requested: true};
  stateSubject.next(Object.assign({}, nextState));

  requestVerificationFor(state.username)
    .pipe(verificationResult)
    .subscribe({
      next: response => onResultReceived(nextState, mapRowsToResult(response)),
      error: err => console.log("error", err)
    });
}

function mapRowsToResult(rows) {
  return rows.map(r => r.data)
    // easier than stopping C++ using ''
    .map(r => r.replace(/\'/g, "\""))
    .map(r => JSON.parse(r))
    .map(j => j["status"]);
}

function onResultReceived(state, result) {
  console.log("on result received", result);
  stateSubject.next(Object.assign({}, {...state, result}));
}

function onRestart() {
  stateSubject.next(initialState);
}

export {stateSubject as state, onUsernameChanged, startVerificationAndUpdateOnResult, onResultReceived, onRestart};
