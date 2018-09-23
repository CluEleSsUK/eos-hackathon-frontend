# EOS credit checking application

## Prerequisites
* node
* npm
* an internet connection

## Running
Execute `npm start` to run the service.  It will be accessible at http://localhost:3000

The EOS endpoint is codified in the [service.js](./src/service.js) file, and by default uses http://2eea3844.ngrok.io which is a tunnel to the OnTheBLOCK team EOS blockchain instance. The key provider and requesting username defaults are also configurable here.

Currently the mobile app is configured to verify the user _samkirton123_
