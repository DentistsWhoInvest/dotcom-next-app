#!/usr/bin/env bash

# todo: add a check to see if the service account is already authenticated

# echo "Checking if credentials exist..."
# if [ ! -f /Users/georges_lebreton/.config/gcloud/application_default_credentials.json ]; then
#     echo "Credentials file does not exist. Authenticating..."
#     gcloud auth application-default login --impersonate-service-account=build-service@electric-node-426223-s2.iam.gserviceaccount.com
# else
#   echo "Credentials file already exists. Skipping gcloud auth."
# fi


#!/bin/bash

CREDENTIALS_PATH="$HOME/.config/gcloud/application_default_credentials.json"

echo "Checking if credentials exist and were recently updated..."

# Check if the credentials file exists
if [ -f "$CREDENTIALS_PATH" ]; then
    # Get the last modified time of the file in seconds since epoch
    last_modified=$(stat -f "%m" "$CREDENTIALS_PATH") # For macOS, use `%m` for modification time
    # For Linux, you can use: `last_modified=$(stat --format="%Y" "$CREDENTIALS_PATH")`

    # Get the current time in seconds since epoch
    current_time=$(date +%s)

    # Calculate the difference in seconds
    time_diff=$((current_time - last_modified))

    # Set the threshold for how old the credentials can be, in seconds (1 hour = 3600 seconds)
    max_age_seconds=3300

    echo "Credentials were last updated $((time_diff / 60)) minutes ago."

    # Check if the credentials were updated within the acceptable range
    if [ "$time_diff" -gt "$max_age_seconds" ]; then
        echo "Credentials file is outdated (more than 1 hour old). Authenticating..."
        gcloud auth application-default login --impersonate-service-account=build-service@electric-node-426223-s2.iam.gserviceaccount.com
    else
        echo "Credentials file is up to date (within 1 hour). Skipping gcloud auth."
    fi
else
    echo "Credentials file does not exist. Authenticating..."
    gcloud auth application-default login --impersonate-service-account=build-service@electric-node-426223-s2.iam.gserviceaccount.com
fi
