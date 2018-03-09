#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

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
