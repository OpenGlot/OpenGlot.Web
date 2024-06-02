if [ -f /tmp/latest_artifact_web/env_vars ]; then
  source /tmp/latest_artifact_web/env_vars
else
  echo "env_vars file not found!"
  exit 1
fi

sed -i "s|{{IMAGE_NAME}}|$ECR_REPOSITORY_URI/$ECR_REPOSITORY:latest|g" "/tmp/latest_artifact_web/k8s/openglotWeb-deployment.yaml"
kubectl apply -f /tmp/latest_artifact_web/k8s/ --namespace openglot
