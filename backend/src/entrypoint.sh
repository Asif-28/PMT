#!/bin/bash
echo $STAGE
export AWS_REGION=us-east-1
if [[ "$STAGE" == "PRODUCTION" ]]; then
    bash start.sh init
else
    bash start.sh init
fi
