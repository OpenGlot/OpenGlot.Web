if [ -f /tmp/latest_artifact_web/env_vars ]; then
  source /tmp/latest_artifact_web/env_vars
else
  echo "env_vars file not found!"
  exit 1
fi

# # List all objects in the S3 bucket with the specified prefix
# latest_artifact=$(aws s3 ls $S3_BUCKET/$S3_ARTIFACT_PATH --recursive | sort | tail -n 1 | awk '{print $4}')

# # Download the latest artifact from S3
# aws s3 cp $S3_BUCKET/$latest_artifact /tmp/latest_artifact_web.zip

# # Unzip the latest artifact
# unzip /tmp/latest_artifact_web.zip -d /tmp/latest_artifact_web

kubectl apply -f /tmp/latest_artifact_web/k8s/ --namespace openglot
