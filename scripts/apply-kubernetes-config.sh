#!/bin/bash
ls
echo "Cluster Name: $CLUSTER_NAME"
kubectl apply -f k8s/ --namespace openglot
