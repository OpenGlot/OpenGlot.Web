#!/bin/bash
ls
echo "Current working directory: $(pwd)"
if [ -n "$CODEBUILD_SRC_DIR" ]; then
  echo "Listing files in CODEBUILD_SRC_DIR ($CODEBUILD_SRC_DIR):"
  ls "$CODEBUILD_SRC_DIR"
fi
echo "Cluster Name: $CLUSTER_NAME"
kubectl apply -f k8s/ --namespace openglot
