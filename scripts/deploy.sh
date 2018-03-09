#!/bin/bash

set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd ${DIR}/..

path="${STRIGOAICA_REMOTE_PATH}"
user="${STRIGOAICA_REMOTE_USER}"
host="${STRIGOAICA_REMOTE_HOST}"

### Backup
tarName="backup.`date +%s`.tgz"
ssh \
    ${user}@${host} \
    "tar --exclude='node_modules' --exclude='backup.*' -zcvf /tmp/${tarName} -C `dirname ${path}` `basename ${path}` && mv /tmp/${tarName} ${path}/"

### File Transfer
rsync \
    -arvP \
    config \
    lib \
    node_modules \
    strategies \
    templates \
    app.js \
    ecosystem.config.js \
    server.js \
    ${user}@${host}:${path}/

### Deploy options
while [ -n "$1" ]; do
    case "$1" in
        -t)
            shift
            if [ ! -d "$1" ]; then
                echo "Wrong template path"
                exit 1
            fi
            templatePath="${1%/}/*"
            rsync \
                -arvP \
                ${templatePath} \
                ${user}@${host}:${path}/templates/
            ;;
    esac
    shift
done
