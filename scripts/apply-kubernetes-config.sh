if [ -f /tmp/env_vars ]; then
  source /tmp/env_vars
else
  echo "env_vars file not found!"
  exit 1
fi

echo $CLUSTER_NAME 
echo #{CLUSTER_NAME}
kubectl apply -f /k8s --namespace openglot
