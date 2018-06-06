#!/bin/bash

set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd ${DIR}/..

path="${STRIGOAICA_REMOTE_PATH}"
user="${STRIGOAICA_REMOTE_USER}"
host="${STRIGOAICA_REMOTE_HOST}"

if [[ "$user" == "" ]]; then
  "Error: Missing env variables"
  exit 1
fi

function uploadFiles() {
    ### Backup
    tarName="backup.`date +%s`.tgz"
    ssh \
        ${user}@${host} \
        "tar --exclude='node_modules' --exclude='backup.*' -zcvf /tmp/${tarName} -C `dirname ${path}` `basename ${path}` && mv /tmp/${tarName} ${path}/"

    ### File Transfer
    rsync \
        -arvPR \
        --exclude '*.ts' \
        --exclude '*.js.map' \
        --exclude 'tsconfig.json' \
        --exclude 'tslint.json' \
        \
        --exclude '.git/' \
        --exclude '.gitignore' \
        --exclude '.travis.yml' \
        --exclude '.idea/' \
        \
        --exclude 'node_modules/' \
        \
        --exclude '*.test.js' \
        --exclude 'test/' \
        --exclude 'coverage/' \
        \
        --exclude 'strigoaica.yml' \
        \
        . \
        ${user}@${host}:${path}/
}

function uploadTemplates() {
    rsync \
        -arvP \
        --exclude '.git' \
        --exclude '.gitignore' \
        --exclude-from='.gitignore' \
        ${1} \
        ${user}@${host}:${path}/templates/
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
