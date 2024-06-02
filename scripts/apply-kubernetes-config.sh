if [ -f /tmp/env_vars ]; then
  source /tmp/env_vars
else
  echo "env_vars file not found!"
  exit 1
fi

echo $ECR_REPOSITORY_URI
echot $ECR_REPOSITORY
sed -i "s|{{IMAGE_NAME}}|$ECR_REPOSITORY_URI/$ECR_REPOSITORY:latest|g" "/tmp/k8s/openglotWeb-deployment.yaml"
kubectl apply -f /k8s --namespace openglot
