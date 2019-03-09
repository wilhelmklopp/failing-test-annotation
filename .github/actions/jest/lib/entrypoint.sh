#!/bin/sh

set -e

npm install jest

NODE_PATH=node_modules jest --reporters="default" --reporters="<rootDir>/lib/my-custom-reporter.js"