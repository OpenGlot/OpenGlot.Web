#!/bin/bash
if [ -f /tmp/env_vars ]; then
  source /tmp/env_vars
else
  echo "env_vars file not found!"
  exit 1
fi

echo $CLUSTER_NAME
echo $AWS_REGION
aws eks update-kubeconfig --name $CLUSTER_NAME --region $AWS_REGION
