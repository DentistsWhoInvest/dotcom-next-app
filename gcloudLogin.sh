#!/usr/bin/env bash

# todo: add a check to see if the service account is already authenticated

echo "Checking if credentials exist..."
if [ ! -f /Users/georges_lebreton/.config/gcloud/application_default_credentials.json ]; then
    echo "Credentials file does not exist. Authenticating..."
    gcloud auth application-default login --impersonate-service-account=build-service@electric-node-426223-s2.iam.gserviceaccount.com
else
  echo "Credentials file already exists. Skipping gcloud auth."
fi