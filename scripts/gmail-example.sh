#!/bin/bash

curl \
  http://0.0.0.0:13987/send \
  -v \
  -X POST \
  -H "Content-Type: application/json" \
  -d @- << EOF
{
  "templateId": "example",
  "strategies": "gmail",
  "data": {
    "from": "strigoaica@gmail.com",
    "to": "john.smith@gmail.com,jane.smith@gmail.com",
    "payload": {
      "answer": 42,
      "longAnswer": "0011010000110010"
    }
  }
}
EOF
