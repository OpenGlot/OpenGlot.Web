#!/bin/bash
aws eks update-kubeconfig --name $EKS_CLUSTER_NAME --region $AWS_REGION
