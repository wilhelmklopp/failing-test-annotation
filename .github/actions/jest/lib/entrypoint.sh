#!/bin/sh

set -e

npm install jest

export PATH=${PATH}:node_modules/.bin/
ls /

jest --reporters="default" --reporters="/lib/my-custom-reporter.js"