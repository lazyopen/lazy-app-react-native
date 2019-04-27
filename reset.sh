#!/usr/bin/env bash
watchman watch-del-all
# rm -rf node_modules && npm install --registry=https://registry.npm.taobao.org
rm -rf node_modules && yarn install
# npm link
react-native link