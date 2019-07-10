#!/usr/bin/env bash

docker run -t --rm --name test-runner-opentracing-javascript \
    -v ${PWD}:/usr/src/opentracing -w /usr/src/opentracing \
    node:$1 npm test
