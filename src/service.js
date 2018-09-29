import {defer, from, of, throwError} from "rxjs"
import {mergeMap, retryWhen, delay} from "rxjs/operators";
import Eos from "eosjs"

const config = {
  httpEndpoint: "http://2eea3844.ngrok.io",
  requesterUsername: "realestateee",
  keyProvider: "5K3D931xHUB4GS7ssuhUdrhUAZgQKM57YxUbCSe3boDpFhxBY5K",
  contractName: "rentcontract",
  actionName: "request",
  tableName: "requests"
};

const client = Eos(config);

function requestVerificationFor(username) {
  return from(client.transaction({
    actions: [{
      account: config.contractName,
      name: config.actionName,
      authorization: [{
        actor: config.requesterUsername,
        permission: "active",
      }],
      data: {
        requester: config.requesterUsername,
        requestee: username
      },
    }],
  }))
}

function verificationResult(username) {
  // must use defer, or promise result is cached for the retries
  return defer(() => client.getTableRows({
    code: config.contractName,
    scope: config.contractName,
    table: config.tableName,
    json: true,
    limit: 100
  })).pipe(
    mergeMap(rows => resultOrError(rows, username)),
    retryWhen(errors => errors.pipe(delay(1000)))
  );
}

function resultOrError(response, username) {
  console.log("req made");
  // if response doesnt contain the permission
  // throw an error to do a retry
  if (!response || !response.rows || response.rows.length === 0) {
    console.log("no response", response);
    return throwError(new Error());
  }

  if (userHasNotYetVerified(response, username)) {
    console.log("not verified yet");
    return throwError(new Error());
  }

  if (response.rows.filter(r => r["authorizer"] === username)[0].data.includes("PENDING")) {
    console.log("still pending");
    return throwError(new Error());
  }

  return of(response.rows);
}

function userHasNotYetVerified(response, username) {
  return response.rows.filter(r => r["authorizer"] === username).length === 0;
}

export {requestVerificationFor, verificationResult}
