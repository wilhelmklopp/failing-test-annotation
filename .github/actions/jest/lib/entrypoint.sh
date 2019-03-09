#!/bin/sh

set -e

npm install jest

jest --reporters="default" --reporters="<rootDir>/lib/my-custom-reporter.js"