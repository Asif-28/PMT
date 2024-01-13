#!/bin/bash
echo $STAGE
export AWS_REGION=ap-south-1
if [[ "$STAGE" == "PRODUCTION" ]]; then
    teller run bash start.sh init
else
    bash start.sh init
fi
