#!/bin/bash

# Check if the required argument (BETA or PROD) is provided
if [ "$#" -ne 1 ]; then
  echo "Usage: $0 [BETA|PROD]"
  exit 1
fi

# Set the bucket name based on the environment argument
if [ "$1" == "BETA" ]; then
  BUCKET_NAME="dwi-dotcom-beta-static-assets"
elif [ "$1" == "PROD" ]; then
  BUCKET_NAME="dwi-dotcom-static-assets"
else
  echo "Invalid argument. Please specify either BETA or PROD."
  exit 1
fi

echo "Using bucket: $BUCKET_NAME"

# Find all files in the "out" directory
find out -type f ! -name "*.*" | sed 's|^out/||' | \
  xargs -I {} -P 30 gsutil setmeta -h "Content-Type:text/html" "gs://$BUCKET_NAME/{}"

echo "Metadata setting completed."
