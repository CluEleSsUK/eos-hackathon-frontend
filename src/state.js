import {BehaviorSubject} from "rxjs";
import {verificationResult, requestVerificationFor} from "./service";

const initialState = {
  requested: false,
  username: null,
  result: null
};

const stateSubject = new BehaviorSubject(initialState);

function onUsernameChanged(state, username) {
  stateSubject.next(merge(state, { username }));
}

const merge = (state, val) => Object.assign({}, {...state, ...val});

function startVerificationAndUpdateOnResult(state) {
  const nextState = merge(state, { requested: true });
  stateSubject.next(nextState);

  requestVerificationFor(state.username)
    .pipe(() => verificationResult(state.username))
    .subscribe({
      next: rows => onResultReceived(nextState, mapRowsToResult(rows)),
      error: err => console.log("Error", err)
    });
}

function onResultReceived(state, result) {
  console.log("result received");
  stateSubject.next(merge(state, { result }));
}

function mapRowsToResult(rows) {
  // easier than stopping C++ using ''
  const convertSingleQuotesToDouble = r => r.replace(/'/g, "\"");

  return rows.map(r => r.data)
    .map(convertSingleQuotesToDouble)
    .map(JSON.parse)[0];
}

function onRestart() {
  stateSubject.next(initialState);
}

export {stateSubject as state, onUsernameChanged, startVerificationAndUpdateOnResult, onResultReceived, onRestart};
