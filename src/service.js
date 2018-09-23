import {from, of, throwError} from "rxjs"
import {retry, mergeMap, timeout} from "rxjs/operators";
import Eos from "eosjs"

const config = {
  httpEndpoint: "http://2eea3844.ngrok.io",
  keyProvider: "5KZ1BiacReLkqDkcQCWrumutDG82vhjt8W6suFf2fuX2UbZnViq"
};

const client = Eos(config);

const localAccount = "realestateee";

function requestVerificationFor(username) {
  return from(client.transaction({
    actions: [{
      account: "rentcontract",
      name: "request",
      authorization: [{
        actor: localAccount,
        permission: "active",
      }],
      data: {
        requester: localAccount,
        requestee: username
      },
    }],
  }))
}

function verificationResult(username) {
  return from(client.getTableRows({
    code: "rentcontract",
    scope: "rentcontract",
    table: "requests",
    json: true,
    limit: 100
  })).pipe(mergeMap(rows => resultOrError(rows, username)), retry(10), timeout(60000));
}

function resultOrError(response, username) {
  // if response doesnt contain the permission
  // throw an error to do a retry
  if (!response || !response.rows || response.rows.length === 0) {
    return throwError(new Error());
  }

  if (userHasNotYetVerified(response, username)) {
    return throwError(new Error());
  }

  return of(response.rows);
}

function userHasNotYetVerified(response, username) {
  return response.rows.filter(r => r["authorizer"] === username).length === 0;
}

export {requestVerificationFor, verificationResult}
