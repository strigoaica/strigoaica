#!/usr/bin/env bash

curl \
  http://0.0.0.0:12987/send \
  -v \
  -X POST \
  -H "Content-Type: application/json" \
  -d @- << EOF
{
  "templateId": "example",
  "data": {
    "from": "strigoaica@gmail.com",
    "to": "john.smith@gmail.com,jane.smith@gmail.com",
    "payload": {
      "answer": 42
    }
  }
}
EOF
