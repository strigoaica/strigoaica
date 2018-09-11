#!/bin/bash

set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd ${DIR}/..

path="${STRIGOAICA_REMOTE_PATH}"
user="${STRIGOAICA_REMOTE_USER}"
host="${STRIGOAICA_REMOTE_HOST}"
identity="${STRIGOAICA_REMOTE_IDENTITY}"

if [[ "$user" == "" ]]; then
  "Error: Missing env variables"
  exit 1
fi

function uploadFiles() {
    ### Backup
    tarName="backup.`date +%s`.tgz"
    if [[ "${identity}" != "" ]]; then
        identityCmd="-i ${identity}"
    fi
    eval "ssh \
        ${identityCmd} \
        ${user}@${host} \
            \"tar \
                --exclude='node_modules' \
                --exclude='backup.*' \
                -zcvf \
                /tmp/${tarName} \
                -C `dirname ${path}` `basename ${path}` &&
                mv /tmp/${tarName} ${path}/\""

    ### File Transfer
    if [[ "${identity}" != "" ]]; then
        identityCmd="-e 'ssh -i ${identity}'"
    fi
    eval "rsync \
        ${identityCmd} \
        -arvP \
        --exclude *.test.js \
        --exclude 'strigoaica.yml' \
        \
        dist/* \
        package.json \
        ${user}@${host}:${path}/"
}

function uploadTemplates() {
    if [[ "${identity}" != "" ]]; then
        identityCmd="-e 'ssh -i ${identity}'"
    fi
    eval "rsync \
        ${identityCmd} \
        -arvP \
        --exclude '.git' \
        --exclude '.gitignore' \
        --exclude-from='.gitignore' \
        ${1} \
        ${user}@${host}:${path}/templates/"
}

### Deploy options
while [ -n "$1" ]; do
    case "$1" in
        --files)
            uploadFiles
            ;;
        --templates)
            shift

            if [ ! -d "$1" ]; then
                echo "Wrong template path"
                exit 1
            fi

            uploadTemplates "${1%/}/*"
            ;;
    esac
    shift
done
