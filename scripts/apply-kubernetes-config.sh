#!/bin/bash
cd "$CODEBUILD_SRC_DIR"
# List files in the Kubernetes configuration directory
echo "Listing files in Kubernetes configuration directory ($CODEBUILD_SRC_DIR/k8s):"
ls
kubectl apply -f k8s/ --namespace openglot
