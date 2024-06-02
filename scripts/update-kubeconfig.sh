#!/bin/bash
if [ -f /tmp/latest_artifact_web/env_vars ]; then
  source /tmp/latest_artifact_web/env_vars
else
  echo "env_vars file not found!"
  exit 1
fi

rm -f /tmp/latest_artifact_web.zip
rm -rf /tmp/latest_artifact_web

echo $CLUSTER_NAME
echo $AWS_REGION
aws eks update-kubeconfig --name $CLUSTER_NAME --region $AWS_REGION
