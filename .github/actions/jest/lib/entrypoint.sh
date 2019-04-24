#!/bin/sh

set -e

npm install @octokit/rest
npm install jest

export PATH=${PATH}:node_modules/.bin/

jest --reporters="default" --reporters="/lib/action/my-custom-reporter.js" --testLocationInResults