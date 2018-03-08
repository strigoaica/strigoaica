#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

pushd .

cd ${DIR}/..

path="${STRIGOAICA_REMOTE_PATH}"
user="${STRIGOAICA_REMOTE_USER}"
host="${STRIGOAICA_REMOTE_HOST}"

ssh \
    ${user}@${host} \
    "tar --exclude='node_modules' --exclude='backup.*' -zcvf ${path}/backup.`date +%s`.tgz -C `dirname ${path}` `basename ${path}`"

rsync \
    -arvP \
    config \
    lib \
    node_modules \
    strategies \
    templates \
    ecosystem.config.js \
    server.js \
    strigoaica.yml \
    ${user}@${host}:${path}/

popd
