#!/bin/sh

set -e

npm install jest

export PATH=${PATH}:node_modules/.bin/

jest --reporters="default" --reporters="<rootDir>/lib/my-custom-reporter.js"